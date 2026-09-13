export declare const NotificationType: {
    readonly APPLICATION_SUBMITTED: 'APPLICATION_SUBMITTED';
    readonly APPLICATION_STATUS_CHANGED: 'APPLICATION_STATUS_CHANGED';
    readonly APPLICATION_SHORTLISTED: 'APPLICATION_SHORTLISTED';
    readonly APPLICATION_REJECTED: 'APPLICATION_REJECTED';
    readonly APPLICATION_ACCEPTED: 'APPLICATION_ACCEPTED';
    readonly NEW_CANDIDATE_APPLICATION: 'NEW_CANDIDATE_APPLICATION';
    readonly INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED';
    readonly INTERVIEW_RESCHEDULED: 'INTERVIEW_RESCHEDULED';
    readonly INTERVIEW_CANCELLED: 'INTERVIEW_CANCELLED';
    readonly INTERVIEW_REMINDER: 'INTERVIEW_REMINDER';
    readonly NEW_MESSAGE: 'NEW_MESSAGE';
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly IN_APP: 'IN_APP';
    readonly EMAIL: 'EMAIL';
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
export declare const NotificationStatus: {
    readonly PENDING: 'PENDING';
    readonly SENT: 'SENT';
    readonly FAILED: 'FAILED';
    readonly READ: 'READ';
};
export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus];
export declare const Role: {
    readonly CANDIDATE: 'CANDIDATE';
    readonly RECRUITER: 'RECRUITER';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly INACTIVE: 'INACTIVE';
    readonly SUSPENDED: 'SUSPENDED';
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const ApplicationStatus: {
    readonly APPLIED: 'APPLIED';
    readonly SCREENING: 'SCREENING';
    readonly SHORTLISTED: 'SHORTLISTED';
    readonly INTERVIEW: 'INTERVIEW';
    readonly OFFER: 'OFFER';
    readonly HIRED: 'HIRED';
    readonly REJECTED: 'REJECTED';
    readonly WITHDRAWN: 'WITHDRAWN';
};
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
export declare const JobStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly CLOSED: 'CLOSED';
};
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
export declare const RemoteType: {
    readonly ONSITE: 'ONSITE';
    readonly REMOTE: 'REMOTE';
    readonly HYBRID: 'HYBRID';
};
export type RemoteType = (typeof RemoteType)[keyof typeof RemoteType];
export declare const EmploymentType: {
    readonly FULL_TIME: 'FULL_TIME';
    readonly PART_TIME: 'PART_TIME';
    readonly CONTRACT: 'CONTRACT';
    readonly INTERNSHIP: 'INTERNSHIP';
    readonly FREELANCE: 'FREELANCE';
};
export type EmploymentType = (typeof EmploymentType)[keyof typeof EmploymentType];
export declare const ExperienceLevel: {
    readonly ENTRY: 'ENTRY';
    readonly JUNIOR: 'JUNIOR';
    readonly MID: 'MID';
    readonly SENIOR: 'SENIOR';
    readonly LEAD: 'LEAD';
};
export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];
export declare const ComplaintType: {
    readonly COMPANY_BEHAVIOR: 'COMPANY_BEHAVIOR';
    readonly JOB_MISMATCH: 'JOB_MISMATCH';
    readonly FAKE_JOB: 'FAKE_JOB';
    readonly SALARY_MISMATCH: 'SALARY_MISMATCH';
    readonly INTERVIEW_PROBLEM: 'INTERVIEW_PROBLEM';
    readonly HARASSMENT: 'HARASSMENT';
    readonly DISCRIMINATION: 'DISCRIMINATION';
    readonly FRAUD: 'FRAUD';
    readonly OTHER: 'OTHER';
};
export type ComplaintType = (typeof ComplaintType)[keyof typeof ComplaintType];
export declare const ComplaintStatus: {
    readonly PENDING: 'PENDING';
    readonly UNDER_REVIEW: 'UNDER_REVIEW';
    readonly NEED_MORE_INFORMATION: 'NEED_MORE_INFORMATION';
    readonly ACCEPTED: 'ACCEPTED';
    readonly REJECTED: 'REJECTED';
    readonly RESOLVED: 'RESOLVED';
};
export type ComplaintStatus = (typeof ComplaintStatus)[keyof typeof ComplaintStatus];
export declare const ComplaintDecision: {
    readonly NO_VIOLATION: 'NO_VIOLATION';
    readonly WARNING: 'WARNING';
    readonly PENALTY: 'PENALTY';
    readonly SUSPENSION: 'SUSPENSION';
    readonly JOB_REMOVAL: 'JOB_REMOVAL';
    readonly COMPANY_SUSPENSION: 'COMPANY_SUSPENSION';
};
export type ComplaintDecision = (typeof ComplaintDecision)[keyof typeof ComplaintDecision];
export declare const PenaltyStatus: {
    readonly PENDING: 'PENDING';
    readonly PAID: 'PAID';
    readonly OVERDUE: 'OVERDUE';
    readonly CANCELLED: 'CANCELLED';
};
export type PenaltyStatus = (typeof PenaltyStatus)[keyof typeof PenaltyStatus];
export declare const InterviewStatus: {
    readonly SCHEDULED: 'SCHEDULED';
    readonly STARTED: 'STARTED';
    readonly COMPLETED: 'COMPLETED';
    readonly CANCELLED: 'CANCELLED';
    readonly RESCHEDULED: 'RESCHEDULED';
};
export type InterviewStatus = (typeof InterviewStatus)[keyof typeof InterviewStatus];
export declare const InterviewType: {
    readonly VIDEO: 'VIDEO';
    readonly PHONE: 'PHONE';
    readonly IN_PERSON: 'IN_PERSON';
};
export type InterviewType = (typeof InterviewType)[keyof typeof InterviewType];
//# sourceMappingURL=enums.d.ts.map