import { InterviewStatus, InterviewType } from "../../../../generated/prisma/enums";
export interface CreateInterviewPayload {
    jobApplicationId: string;
    scheduledAt: string | Date;
    durationMinutes?: number;
    type?: InterviewType;
    meetingUrl?: string;
    title?: string;
    notes?: string;
}
export interface UpdateInterviewPayload {
    scheduledAt?: string | Date;
    durationMinutes?: number;
    type?: InterviewType;
    meetingUrl?: string;
    title?: string;
    notes?: string;
}
export interface InterviewFilters {
    status?: InterviewStatus;
    type?: InterviewType;
}
//# sourceMappingURL=interview.interface.d.ts.map