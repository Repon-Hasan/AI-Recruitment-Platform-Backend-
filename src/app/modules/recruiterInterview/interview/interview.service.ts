
import {
  ApplicationStatus,
  InterviewStatus,
} from "../../../../generated/prisma/enums";
import type { Prisma } from "../../../../generated/prisma/client";

import { prisma } from "../../../lib/prisma";

import {
  createInterviewSchema,
  rescheduleInterviewSchema,
} from "./interview.validation";

/* =========================================================
   Helpers
========================================================= */

function createMeetingUrl(applicationId: string): string {
  const room = `ai-recruitment-${applicationId}`;

  return `https://meet.jit.si/${room}`;
}

/**
 * Check whether the recruiter owns the job/application.
 *
 * Assumption:
 * Job -> Company -> User
 *
 * Company has:
 *   userId String
 *
 * If your Company model uses recruiterId/adminId/etc.,
 * change only this function.
 */
async function recruiterOwnsApplication(
  recruiterId: string,
  application: {
    job: {
      companyId: string;
    };
  },
): Promise<boolean> {
  const company = await prisma.company.findFirst({
    where: {
      id: application.job.companyId,
      userId: recruiterId,
    },
    select: {
      id: true,
    },
  });

  return Boolean(company);
}

/* =========================================================
   Create Interview
========================================================= */

export async function createInterview(
  recruiterId: string,
  input: unknown,
) {
  const data = createInterviewSchema.parse(input);

  /*
   * Find application
   */
  const application = await prisma.jobApplication.findUnique({
    where: {
      id: data.applicationId,
    },
    include: {
      candidateProfile: {
        select: {
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },

      job: {
        select: {
          id: true,
          title: true,
          companyId: true,
        },
      },
    },
  });

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  /*
   * Make sure recruiter owns this application.
   */
  const isOwner = await recruiterOwnsApplication(
    recruiterId,
    application,
  );

  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }

  /*
   * Optional but recommended:
   * Don't allow interviews for rejected/accepted applications
   * depending on your business rules.
   */
  if (
    application.status === ApplicationStatus.REJECTED
  ) {
    throw new Error("CANNOT_SCHEDULE_INTERVIEW_FOR_REJECTED_APPLICATION");
  }

  /*
   * Check whether an active interview already exists.
   */
  const existingInterview = await prisma.interview.findFirst({
    where: {
      jobApplicationId: application.id,
      status: {
        in: [
          InterviewStatus.SCHEDULED,
          InterviewStatus.STARTED,
        ],
      },
    },
    orderBy: {
      scheduledAt: "desc",
    },
  });

  if (existingInterview) {
    throw new Error("ACTIVE_INTERVIEW_ALREADY_EXISTS");
  }

  /*
   * Validate interview time.
   */
  const scheduledAt = new Date(data.scheduledAt);

  if (Number.isNaN(scheduledAt.getTime())) {
    throw new Error("INVALID_INTERVIEW_DATE");
  }

  if (scheduledAt.getTime() <= Date.now()) {
    throw new Error("INTERVIEW_TIME_MUST_BE_IN_FUTURE");
  }

  /*
   * Generate meeting URL if recruiter didn't provide one.
   */
  const meetingUrl =
    data.meetingUrl ??
    createMeetingUrl(application.id);

  /*
   * Create:
   *
   * 1. Interview
   * 2. Notification
   * 3. Conversation
   * 4. Automatic message
   *
   * inside one transaction.
   */
  const interview = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      /*
       * Create interview
       */
      const createdInterview = await tx.interview.create({
        data: {
          jobApplicationId: application.id,

          scheduledById: recruiterId,

          scheduledAt,

          durationMinutes: data.durationMinutes,

          type: data.type,

          title:
            data.title ??
            `Interview for ${application.job.title}`,

          notes: data.notes ?? null,

          meetingUrl,

          status: InterviewStatus.SCHEDULED,
        },
      });

      /*
       * Create candidate notification
       */
      await tx.notification.create({
        data: {
          userId: application.candidateProfile.userId,

          type: "INTERVIEW_SCHEDULED",

          channel: "IN_APP",

          status: "PENDING",

          title: "Interview scheduled",

          message:
            `Your interview for "${application.job.title}" ` +
            `has been scheduled.`,

          applicationId: application.id,

          interviewId: createdInterview.id,
        },
      });

      /*
       * Get or create conversation
       */
      const conversationId =
        await getOrCreateConversation(
          tx,
          application.id,
          application.candidateProfile.userId,
          recruiterId,
        );

      /*
       * Create automatic message
       */
      await tx.message.create({
        data: {
          conversationId,

          senderId: recruiterId,

          content:
            `Your interview has been scheduled for ` +
            `${scheduledAt.toLocaleString()}. ` +
            `Please check the interview details.`,

          isAutomatic: true,
        },
      });

      return createdInterview;
    },
  );

  return interview;
}

/* =========================================================
   Get or Create Conversation
========================================================= */

async function getOrCreateConversation(
  tx: Prisma.TransactionClient,
  applicationId: string,
  candidateUserId: string,
  recruiterId: string,
): Promise<string> {
  /*
   * jobApplicationId must be @unique in Conversation
   * for findUnique() to work.
   */
  const existingConversation =
    await tx.conversation.findUnique({
      where: {
        jobApplicationId: applicationId,
      },
    });

  if (existingConversation) {
    return existingConversation.id;
  }

  const conversation =
    await tx.conversation.create({
      data: {
        jobApplicationId: applicationId,

        participants: {
          create: [
            {
              userId: candidateUserId,
            },
            {
              userId: recruiterId,
            },
          ],
        },
      },
    });

  return conversation.id;
}

/* =========================================================
   Get Interview / Application Interviews
========================================================= */

export async function getInterview(
  userId: string,
  applicationId: string,
) {
  const application =
    await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        candidateProfile: {
          include: {
            user: true,
          },
        },

        job: true,

        interviews: {
          orderBy: {
            scheduledAt: "desc",
          },
        },
      },
    });

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  /*
   * Candidate ownership
   */
  const isCandidate =
    application.candidateProfile.userId === userId;

  /*
   * Recruiter ownership
   */
  const isRecruiter =
    await recruiterOwnsApplication(
      userId,
      application,
    );

  if (!isCandidate && !isRecruiter) {
    throw new Error("FORBIDDEN");
  }

  return application;
}

/* =========================================================
   Get Single Interview
========================================================= */

export async function getSingleInterview(
  userId: string,
  interviewId: string,
) {
  const interview =
    await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },

      include: {
        jobApplication: {
          include: {
            candidateProfile: {
              select: {
                userId: true,
              },
            },

            job: {
              select: {
                id: true,
                title: true,
                companyId: true,
              },
            },
          },
        },
      },
    });

  if (!interview) {
    throw new Error("INTERVIEW_NOT_FOUND");
  }

  const application =
    interview.jobApplication;

  /*
   * Candidate
   */
  const isCandidate =
    application.candidateProfile.userId === userId;

  /*
   * Recruiter
   */
  const isRecruiter =
    await recruiterOwnsApplication(
      userId,
      application,
    );

  if (!isCandidate && !isRecruiter) {
    throw new Error("FORBIDDEN");
  }

  return interview;
}

/* =========================================================
   Reschedule Interview
========================================================= */

export async function rescheduleInterview(
  recruiterId: string,
  interviewId: string,
  input: unknown,
) {
  const data =
    rescheduleInterviewSchema.parse(input);

  /*
   * Find interview
   */
  const interview =
    await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },

      include: {
        jobApplication: {
          include: {
            candidateProfile: {
              select: {
                userId: true,
              },
            },

            job: {
              select: {
                id: true,
                title: true,
                companyId: true,
              },
            },
          },
        },
      },
    });

  if (!interview) {
    throw new Error("INTERVIEW_NOT_FOUND");
  }

  /*
   * Check recruiter ownership
   */
  const isOwner =
    await recruiterOwnsApplication(
      recruiterId,
      interview.jobApplication,
    );

  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }

  /*
   * Only scheduled interviews can be rescheduled.
   */
  if (
    interview.status !==
    InterviewStatus.SCHEDULED
  ) {
    throw new Error(
      "INTERVIEW_CANNOT_BE_RESCHEDULED",
    );
  }

  /*
   * Validate new date
   */
  const scheduledAt =
    new Date(data.scheduledAt);

  if (Number.isNaN(scheduledAt.getTime())) {
    throw new Error("INVALID_INTERVIEW_DATE");
  }

  if (scheduledAt.getTime() <= Date.now()) {
    throw new Error(
      "INTERVIEW_TIME_MUST_BE_IN_FUTURE",
    );
  }

  /*
   * Update interview + notification + message
   */
  const updatedInterview =
    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient,
      ) => {
        /*
         * Update interview
         */
        const updated =
          await tx.interview.update({
            where: {
              id: interviewId,
            },

            data: {
              scheduledAt,
            },
          });

        /*
         * Candidate notification
         */
        await tx.notification.create({
          data: {
            userId:
              interview.jobApplication
                .candidateProfile.userId,

            type: "INTERVIEW_RESCHEDULED",

            channel: "IN_APP",

            status: "PENDING",

            title:
              "Interview rescheduled",

            message:
              `Your interview for "${interview.jobApplication.job.title}" ` +
              `has been rescheduled to ` +
              `${scheduledAt.toLocaleString()}.`,

            applicationId:
              interview.jobApplication.id,

            interviewId:
              interview.id,
          },
        });

        /*
         * Conversation
         */
        const conversationId =
          await getOrCreateConversation(
            tx,

            interview.jobApplication.id,

            interview.jobApplication
              .candidateProfile.userId,

            recruiterId,
          );

        /*
         * Automatic message
         */
        await tx.message.create({
          data: {
            conversationId,

            senderId: recruiterId,

            content:
              `Your interview has been rescheduled to ` +
              `${scheduledAt.toLocaleString()}.`,

            isAutomatic: true,
          },
        });

        return updated;
      },
    );

  return updatedInterview;
}

/* =========================================================
   Cancel Interview
========================================================= */

export async function cancelInterview(
  recruiterId: string,
  interviewId: string,
) {
  const interview =
    await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },

      include: {
        jobApplication: {
          include: {
            candidateProfile: {
              select: {
                userId: true,
              },
            },

            job: {
              select: {
                id: true,
                title: true,
                companyId: true,
              },
            },
          },
        },
      },
    });

  if (!interview) {
    throw new Error("INTERVIEW_NOT_FOUND");
  }

  /*
   * Check recruiter ownership
   */
  const isOwner =
    await recruiterOwnsApplication(
      recruiterId,
      interview.jobApplication,
    );

  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }

  /*
   * Don't cancel an already completed/cancelled interview.
   */
  if (
    interview.status ===
      InterviewStatus.CANCELLED ||
    interview.status ===
      InterviewStatus.COMPLETED
  ) {
    throw new Error(
      "INTERVIEW_ALREADY_CLOSED",
    );
  }

  const cancelledInterview =
    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient,
      ) => {
        /*
         * Cancel interview
         */
        const updated =
          await tx.interview.update({
            where: {
              id: interviewId,
            },

            data: {
              status:
                InterviewStatus.CANCELLED,
            },
          });

        /*
         * Candidate notification
         */
        await tx.notification.create({
          data: {
            userId:
              interview.jobApplication
                .candidateProfile.userId,

            type: "INTERVIEW_CANCELLED",

            channel: "IN_APP",

            status: "PENDING",

            title:
              "Interview cancelled",

            message:
              `Your interview for "${interview.jobApplication.job.title}" ` +
              `has been cancelled.`,

            applicationId:
              interview.jobApplication.id,

            interviewId:
              interview.id,
          },
        });

        /*
         * Conversation
         */
        const conversationId =
          await getOrCreateConversation(
            tx,

            interview.jobApplication.id,

            interview.jobApplication
              .candidateProfile.userId,

            recruiterId,
          );

        /*
         * Automatic message
         */
        await tx.message.create({
          data: {
            conversationId,

            senderId: recruiterId,

            content:
              `Your interview for "${interview.jobApplication.job.title}" ` +
              `has been cancelled.`,

            isAutomatic: true,
          },
        });

        return updated;
      },
    );

  return cancelledInterview;
}


/* =========================================================
   GET ALL INTERVIEWS FOR RECRUITER
========================================================= */

export const getAll = async (
  userId: string,
) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const interviews =
    await prisma.interview.findMany({
      where: {
        jobApplication: {
          job: {
            company: {
              userId,
            },
          },
        },
      },

      include: {
        jobApplication: {
          include: {
            candidateProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },

                skills: true,
                education: true,
              },
            },

            job: {
              include: {
                company: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    website: true,
                  },
                },

                requiredSkills: true,
              },
            },
          },
        },
      },

      orderBy: {
        scheduledAt: "asc",
      },
    });

  return interviews;
};

