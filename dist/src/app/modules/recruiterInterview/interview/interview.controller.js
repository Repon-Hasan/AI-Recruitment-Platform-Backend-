import { createInterview, getInterview, rescheduleInterview, cancelInterview, getAll as getAllInterviews, } from "./interview.service";
/* =========================================================
   Create Interview
========================================================= */
export async function createInterviewController(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const interview = await createInterview(userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Interview scheduled successfully",
            data: interview,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.message) {
                case "APPLICATION_NOT_FOUND":
                    return res.status(404).json({
                        success: false,
                        message: "Application not found",
                    });
                case "FORBIDDEN":
                    return res.status(403).json({
                        success: false,
                        message: "You cannot access this application",
                    });
                case "ACTIVE_INTERVIEW_ALREADY_EXISTS":
                    return res.status(409).json({
                        success: false,
                        message: "An active interview already exists for this application",
                    });
                case "INTERVIEW_TIME_MUST_BE_IN_FUTURE":
                    return res.status(400).json({
                        success: false,
                        message: "Interview time must be in the future",
                    });
                case "INVALID_INTERVIEW_DATE":
                    return res.status(400).json({
                        success: false,
                        message: "Invalid interview date",
                    });
                case "CANNOT_SCHEDULE_INTERVIEW_FOR_REJECTED_APPLICATION":
                    return res.status(400).json({
                        success: false,
                        message: "Cannot schedule an interview for a rejected application",
                    });
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to create interview",
        });
    }
}
/* =========================================================
   Get Application Interviews
========================================================= */
export async function getApplicationInterviewController(req, res) {
    try {
        const userId = req.user?.userId;
        const applicationId = Array.isArray(req.params.applicationId)
            ? req.params.applicationId[0]
            : req.params.applicationId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!applicationId) {
            return res.status(400).json({
                success: false,
                message: "Application ID is required",
            });
        }
        const application = await getInterview(userId, applicationId);
        return res.status(200).json({
            success: true,
            data: application,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.message) {
                case "APPLICATION_NOT_FOUND":
                    return res.status(404).json({
                        success: false,
                        message: "Application not found",
                    });
                case "FORBIDDEN":
                    return res.status(403).json({
                        success: false,
                        message: "You cannot access this application",
                    });
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview",
        });
    }
}
/* =========================================================
   Reschedule Interview
========================================================= */
export async function rescheduleInterviewController(req, res) {
    try {
        const userId = req.user?.userId;
        const interviewId = Array.isArray(req.params.interviewId)
            ? req.params.interviewId[0]
            : req.params.interviewId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!interviewId) {
            return res.status(400).json({
                success: false,
                message: "Interview ID is required",
            });
        }
        const interview = await rescheduleInterview(userId, interviewId, req.body);
        return res.status(200).json({
            success: true,
            message: "Interview rescheduled successfully",
            data: interview,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.message) {
                case "INTERVIEW_NOT_FOUND":
                    return res.status(404).json({
                        success: false,
                        message: "Interview not found",
                    });
                case "FORBIDDEN":
                    return res.status(403).json({
                        success: false,
                        message: "You cannot modify this interview",
                    });
                case "INTERVIEW_CANNOT_BE_RESCHEDULED":
                    return res.status(400).json({
                        success: false,
                        message: "This interview cannot be rescheduled",
                    });
                case "INTERVIEW_TIME_MUST_BE_IN_FUTURE":
                    return res.status(400).json({
                        success: false,
                        message: "Interview time must be in the future",
                    });
                case "INVALID_INTERVIEW_DATE":
                    return res.status(400).json({
                        success: false,
                        message: "Invalid interview date",
                    });
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to reschedule interview",
        });
    }
}
/* =========================================================
   Cancel Interview
========================================================= */
export async function cancelInterviewController(req, res) {
    try {
        const userId = req.user?.userId;
        const interviewId = Array.isArray(req.params.interviewId)
            ? req.params.interviewId[0]
            : req.params.interviewId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!interviewId) {
            return res.status(400).json({
                success: false,
                message: "Interview ID is required",
            });
        }
        const interview = await cancelInterview(userId, interviewId);
        return res.status(200).json({
            success: true,
            message: "Interview cancelled successfully",
            data: interview,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.message) {
                case "INTERVIEW_NOT_FOUND":
                    return res.status(404).json({
                        success: false,
                        message: "Interview not found",
                    });
                case "FORBIDDEN":
                    return res.status(403).json({
                        success: false,
                        message: "You cannot modify this interview",
                    });
                case "INTERVIEW_ALREADY_CLOSED":
                    return res.status(400).json({
                        success: false,
                        message: "This interview is already closed",
                    });
            }
        }
        return res.status(500).json({
            success: false,
            message: "Failed to cancel interview",
        });
    }
}
/* =========================================================
   GET ALL INTERVIEWS
========================================================= */
export const getAll = async (req, res) => {
    try {
        console.log("GET ALL INTERVIEWS");
        console.log("req.user:", req.user);
        const userId = req.user?.userId;
        console.log("userId:", userId);
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const interviews = await getAllInterviews(userId);
        return res.status(200).json({
            success: true,
            message: "Interviews retrieved successfully",
            data: {
                interviews,
            },
        });
    }
    catch (error) {
        console.error("Get all interviews error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve interviews",
        });
    }
};
