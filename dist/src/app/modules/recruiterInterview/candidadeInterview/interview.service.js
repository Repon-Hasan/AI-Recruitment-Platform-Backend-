import { InterviewStatus, InterviewType } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
class InterviewService {
    // ============================================
    // CREATE INTERVIEW
    // Recruiter creates an interview
    // ============================================
    async createInterview(recruiterId, payload) {
        const application = await prisma.jobApplication.findUnique({
            where: {
                id: payload.jobApplicationId,
            },
            include: {
                candidateProfile: {
                    include: {
                        user: true,
                    },
                },
                job: true,
            },
        });
        if (!application) {
            throw new Error("Job application not found");
        }
        // Make sure the recruiter owns the job
        if (application.job.id !== recruiterId) {
            throw new Error("You are not authorized to schedule an interview for this application");
        }
        // Prevent scheduling in the past
        const scheduledAt = new Date(payload.scheduledAt);
        if (scheduledAt <= new Date()) {
            throw new Error("Interview date must be in the future");
        }
        const interview = await prisma.interview.create({
            data: {
                jobApplicationId: payload.jobApplicationId,
                scheduledById: recruiterId,
                scheduledAt,
                durationMinutes: payload.durationMinutes ?? 30,
                type: payload.type ?? InterviewType.VIDEO,
                status: InterviewStatus.SCHEDULED,
                meetingUrl: payload.meetingUrl || null,
                title: payload.title ||
                    `${application.job.title} Interview`,
                notes: payload.notes || null,
            },
            include: {
                jobApplication: {
                    include: {
                        job: true,
                        candidateProfile: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
                scheduledBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return interview;
    }
    // ============================================
    // GET CANDIDATE INTERVIEWS
    // ============================================
    async getCandidateInterviews(userId) {
        const candidateProfile = await prisma.candidateProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!candidateProfile) {
            throw new Error("Candidate profile not found");
        }
        const interviews = await prisma.interview.findMany({
            where: {
                jobApplication: {
                    candidateProfileId: candidateProfile.id,
                },
            },
            orderBy: {
                scheduledAt: "asc",
            },
            include: {
                jobApplication: {
                    include: {
                        job: {
                            include: {
                                company: true,
                            },
                        },
                    },
                },
                scheduledBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        const now = new Date();
        const upcoming = interviews.filter((interview) => interview.scheduledAt > now &&
            interview.status !==
                InterviewStatus.CANCELLED &&
            interview.status !==
                InterviewStatus.COMPLETED);
        const completed = interviews.filter((interview) => interview.status ===
            InterviewStatus.COMPLETED);
        const cancelled = interviews.filter((interview) => interview.status ===
            InterviewStatus.CANCELLED);
        return {
            interviews,
            upcoming,
            completed,
            cancelled,
            stats: {
                total: interviews.length,
                upcoming: upcoming.length,
                completed: completed.length,
                cancelled: cancelled.length,
            },
        };
    }
    // ============================================
    // GET SINGLE CANDIDATE INTERVIEW
    // ============================================
    async getCandidateInterviewById(userId, interviewId) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                jobApplication: {
                    candidateProfile: {
                        userId,
                    },
                },
            },
            include: {
                jobApplication: {
                    include: {
                        job: {
                            include: {
                                company: true,
                            },
                        },
                        candidateProfile: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
                scheduledBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!interview) {
            throw new Error("Interview not found");
        }
        return interview;
    }
    // ============================================
    // CONFIRM INTERVIEW
    // ============================================
    async confirmInterview(userId, interviewId) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                jobApplication: {
                    candidateProfile: {
                        userId,
                    },
                },
            },
        });
        if (!interview) {
            throw new Error("Interview not found");
        }
        if (interview.status ===
            InterviewStatus.CANCELLED) {
            throw new Error("Cancelled interview cannot be confirmed");
        }
        if (interview.status ===
            InterviewStatus.COMPLETED) {
            throw new Error("Completed interview cannot be confirmed");
        }
        return prisma.interview.update({
            where: {
                id: interviewId,
            },
            data: {
                status: InterviewStatus.COMPLETED,
            },
            include: {
                jobApplication: {
                    include: {
                        job: true,
                    },
                },
            },
        });
    }
    // ============================================
    // CANCEL INTERVIEW
    // ============================================
    async cancelInterview(userId, interviewId) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                jobApplication: {
                    candidateProfile: {
                        userId,
                    },
                },
            },
        });
        if (!interview) {
            throw new Error("Interview not found");
        }
        if (interview.status ===
            InterviewStatus.COMPLETED) {
            throw new Error("Completed interview cannot be cancelled");
        }
        if (interview.status ===
            InterviewStatus.CANCELLED) {
            throw new Error("Interview is already cancelled");
        }
        return prisma.interview.update({
            where: {
                id: interviewId,
            },
            data: {
                status: InterviewStatus.CANCELLED,
            },
        });
    }
    // ============================================
    // RESCHEDULE INTERVIEW
    // ============================================
    async rescheduleInterview(userId, interviewId, scheduledAt) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                jobApplication: {
                    candidateProfile: {
                        userId,
                    },
                },
            },
        });
        if (!interview) {
            throw new Error("Interview not found");
        }
        if (interview.status ===
            InterviewStatus.COMPLETED) {
            throw new Error("Completed interview cannot be rescheduled");
        }
        const newDate = new Date(scheduledAt);
        if (newDate <= new Date()) {
            throw new Error("New interview date must be in the future");
        }
        return prisma.interview.update({
            where: {
                id: interviewId,
            },
            data: {
                scheduledAt: newDate,
                status: InterviewStatus.RESCHEDULED,
            },
        });
    }
    // ============================================
    // GET RECRUITER INTERVIEWS
    // ============================================
    async getRecruiterInterviews(recruiterId) {
        return prisma.interview.findMany({
            where: {
                scheduledById: recruiterId,
            },
            orderBy: {
                scheduledAt: "asc",
            },
            include: {
                jobApplication: {
                    include: {
                        job: true,
                        candidateProfile: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    // ============================================
    // UPDATE INTERVIEW
    // Recruiter
    // ============================================
    async updateInterview(recruiterId, interviewId, payload) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                scheduledById: recruiterId,
            },
        });
        if (!interview) {
            throw new Error("Interview not found or unauthorized");
        }
        const data = {};
        if (payload.scheduledAt) {
            const newDate = new Date(payload.scheduledAt);
            if (newDate <= new Date()) {
                throw new Error("Interview date must be in the future");
            }
            data.scheduledAt = newDate;
        }
        if (payload.durationMinutes !==
            undefined) {
            data.durationMinutes =
                payload.durationMinutes;
        }
        if (payload.type) {
            data.type = payload.type;
        }
        if (payload.meetingUrl !== undefined) {
            data.meetingUrl =
                payload.meetingUrl || null;
        }
        if (payload.title !== undefined) {
            data.title =
                payload.title || null;
        }
        if (payload.notes !== undefined) {
            data.notes =
                payload.notes || null;
        }
        return prisma.interview.update({
            where: {
                id: interviewId,
            },
            data,
            include: {
                jobApplication: {
                    include: {
                        job: true,
                    },
                },
            },
        });
    }
    // ============================================
    // DELETE INTERVIEW
    // ============================================
    async deleteInterview(recruiterId, interviewId) {
        const interview = await prisma.interview.findFirst({
            where: {
                id: interviewId,
                scheduledById: recruiterId,
            },
        });
        if (!interview) {
            throw new Error("Interview not found or unauthorized");
        }
        return prisma.interview.delete({
            where: {
                id: interviewId,
            },
        });
    }
}
export default new InterviewService();
