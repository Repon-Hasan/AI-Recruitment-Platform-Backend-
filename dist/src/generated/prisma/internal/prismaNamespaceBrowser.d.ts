import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Conversation: 'Conversation';
    readonly Message: 'Message';
    readonly ConversationParticipant: 'ConversationParticipant';
    readonly Notification: 'Notification';
    readonly ReviewComplaint: 'ReviewComplaint';
    readonly Penalty: 'Penalty';
    readonly ComplaintEvidence: 'ComplaintEvidence';
    readonly User: 'User';
    readonly Session: 'Session';
    readonly Account: 'Account';
    readonly Verification: 'Verification';
    readonly CandidateProfile: 'CandidateProfile';
    readonly CandidateEmbedding: 'CandidateEmbedding';
    readonly CandidateSkill: 'CandidateSkill';
    readonly CandidateEducation: 'CandidateEducation';
    readonly CandidateProject: 'CandidateProject';
    readonly CandidateCertification: 'CandidateCertification';
    readonly Company: 'Company';
    readonly Job: 'Job';
    readonly JobSkill: 'JobSkill';
    readonly JobMatch: 'JobMatch';
    readonly SkillGapAnalysis: 'SkillGapAnalysis';
    readonly JobApplication: 'JobApplication';
    readonly ApplicationStatusHistory: 'ApplicationStatusHistory';
    readonly InterviewSession: 'InterviewSession';
    readonly InterviewAnswer: 'InterviewAnswer';
    readonly Interview: 'Interview';
    readonly ApplicationAssistant: 'ApplicationAssistant';
    readonly Resume: 'Resume';
    readonly ResumeAnalysis: 'ResumeAnalysis';
    readonly ResumeChunk: 'ResumeChunk';
    readonly ResumeSummary: 'ResumeSummary';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ConversationScalarFieldEnum: {
    readonly id: 'id';
    readonly jobApplicationId: 'jobApplicationId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: 'id';
    readonly conversationId: 'conversationId';
    readonly senderId: 'senderId';
    readonly content: 'content';
    readonly isAutomatic: 'isAutomatic';
    readonly readAt: 'readAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const ConversationParticipantScalarFieldEnum: {
    readonly id: 'id';
    readonly conversationId: 'conversationId';
    readonly userId: 'userId';
    readonly joinedAt: 'joinedAt';
};
export type ConversationParticipantScalarFieldEnum = (typeof ConversationParticipantScalarFieldEnum)[keyof typeof ConversationParticipantScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly type: 'type';
    readonly channel: 'channel';
    readonly status: 'status';
    readonly title: 'title';
    readonly message: 'message';
    readonly applicationId: 'applicationId';
    readonly interviewId: 'interviewId';
    readonly readAt: 'readAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const ReviewComplaintScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateProfileId: 'candidateProfileId';
    readonly submittedById: 'submittedById';
    readonly companyId: 'companyId';
    readonly jobId: 'jobId';
    readonly jobApplicationId: 'jobApplicationId';
    readonly type: 'type';
    readonly title: 'title';
    readonly description: 'description';
    readonly status: 'status';
    readonly decision: 'decision';
    readonly adminNote: 'adminNote';
    readonly reviewedById: 'reviewedById';
    readonly reviewedAt: 'reviewedAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ReviewComplaintScalarFieldEnum = (typeof ReviewComplaintScalarFieldEnum)[keyof typeof ReviewComplaintScalarFieldEnum];
export declare const PenaltyScalarFieldEnum: {
    readonly id: 'id';
    readonly complaintId: 'complaintId';
    readonly companyId: 'companyId';
    readonly amount: 'amount';
    readonly currency: 'currency';
    readonly reason: 'reason';
    readonly status: 'status';
    readonly stripePaymentIntentId: 'stripePaymentIntentId';
    readonly dueDate: 'dueDate';
    readonly paidAt: 'paidAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PenaltyScalarFieldEnum = (typeof PenaltyScalarFieldEnum)[keyof typeof PenaltyScalarFieldEnum];
export declare const ComplaintEvidenceScalarFieldEnum: {
    readonly id: 'id';
    readonly complaintId: 'complaintId';
    readonly fileUrl: 'fileUrl';
    readonly fileName: 'fileName';
    readonly fileType: 'fileType';
    readonly createdAt: 'createdAt';
};
export type ComplaintEvidenceScalarFieldEnum = (typeof ComplaintEvidenceScalarFieldEnum)[keyof typeof ComplaintEvidenceScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly emailVerified: 'emailVerified';
    readonly image: 'image';
    readonly role: 'role';
    readonly status: 'status';
    readonly needPasswordChange: 'needPasswordChange';
    readonly isDeleted: 'isDeleted';
    readonly deletedAt: 'deletedAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: 'id';
    readonly expiresAt: 'expiresAt';
    readonly token: 'token';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly ipAddress: 'ipAddress';
    readonly userAgent: 'userAgent';
    readonly userId: 'userId';
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: 'id';
    readonly accountId: 'accountId';
    readonly providerId: 'providerId';
    readonly userId: 'userId';
    readonly accessToken: 'accessToken';
    readonly refreshToken: 'refreshToken';
    readonly idToken: 'idToken';
    readonly accessTokenExpiresAt: 'accessTokenExpiresAt';
    readonly refreshTokenExpiresAt: 'refreshTokenExpiresAt';
    readonly scope: 'scope';
    readonly password: 'password';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: 'id';
    readonly identifier: 'identifier';
    readonly value: 'value';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const CandidateProfileScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly phone: 'phone';
    readonly location: 'location';
    readonly bio: 'bio';
    readonly experience: 'experience';
    readonly linkedin: 'linkedin';
    readonly github: 'github';
    readonly portfolio: 'portfolio';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CandidateProfileScalarFieldEnum = (typeof CandidateProfileScalarFieldEnum)[keyof typeof CandidateProfileScalarFieldEnum];
export declare const CandidateEmbeddingScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateProfileId: 'candidateProfileId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CandidateEmbeddingScalarFieldEnum = (typeof CandidateEmbeddingScalarFieldEnum)[keyof typeof CandidateEmbeddingScalarFieldEnum];
export declare const CandidateSkillScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly candidateId: 'candidateId';
};
export type CandidateSkillScalarFieldEnum = (typeof CandidateSkillScalarFieldEnum)[keyof typeof CandidateSkillScalarFieldEnum];
export declare const CandidateEducationScalarFieldEnum: {
    readonly id: 'id';
    readonly institution: 'institution';
    readonly degree: 'degree';
    readonly field: 'field';
    readonly startYear: 'startYear';
    readonly endYear: 'endYear';
    readonly candidateId: 'candidateId';
};
export type CandidateEducationScalarFieldEnum = (typeof CandidateEducationScalarFieldEnum)[keyof typeof CandidateEducationScalarFieldEnum];
export declare const CandidateProjectScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly description: 'description';
    readonly technologies: 'technologies';
    readonly projectUrl: 'projectUrl';
    readonly candidateId: 'candidateId';
    readonly image: 'image';
};
export type CandidateProjectScalarFieldEnum = (typeof CandidateProjectScalarFieldEnum)[keyof typeof CandidateProjectScalarFieldEnum];
export declare const CandidateCertificationScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly issuer: 'issuer';
    readonly issueDate: 'issueDate';
    readonly credentialUrl: 'credentialUrl';
    readonly candidateId: 'candidateId';
    readonly image: 'image';
};
export type CandidateCertificationScalarFieldEnum = (typeof CandidateCertificationScalarFieldEnum)[keyof typeof CandidateCertificationScalarFieldEnum];
export declare const CompanyScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly description: 'description';
    readonly website: 'website';
    readonly userId: 'userId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const JobScalarFieldEnum: {
    readonly id: 'id';
    readonly companyId: 'companyId';
    readonly title: 'title';
    readonly description: 'description';
    readonly location: 'location';
    readonly image: 'image';
    readonly remoteType: 'remoteType';
    readonly employmentType: 'employmentType';
    readonly experienceLevel: 'experienceLevel';
    readonly salaryMin: 'salaryMin';
    readonly salaryMax: 'salaryMax';
    readonly salaryCurrency: 'salaryCurrency';
    readonly deadline: 'deadline';
    readonly status: 'status';
    readonly publishedAt: 'publishedAt';
    readonly closedAt: 'closedAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum];
export declare const JobSkillScalarFieldEnum: {
    readonly id: 'id';
    readonly jobId: 'jobId';
    readonly name: 'name';
    readonly priority: 'priority';
};
export type JobSkillScalarFieldEnum = (typeof JobSkillScalarFieldEnum)[keyof typeof JobSkillScalarFieldEnum];
export declare const JobMatchScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly jobId: 'jobId';
    readonly overallScore: 'overallScore';
    readonly semanticScore: 'semanticScore';
    readonly skillsScore: 'skillsScore';
    readonly experienceScore: 'experienceScore';
    readonly educationScore: 'educationScore';
    readonly keywordScore: 'keywordScore';
    readonly missingSkills: 'missingSkills';
    readonly matchedSkills: 'matchedSkills';
    readonly recommendation: 'recommendation';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type JobMatchScalarFieldEnum = (typeof JobMatchScalarFieldEnum)[keyof typeof JobMatchScalarFieldEnum];
export declare const SkillGapAnalysisScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly jobId: 'jobId';
    readonly skillMatchPercentage: 'skillMatchPercentage';
    readonly matchedSkills: 'matchedSkills';
    readonly missingSkills: 'missingSkills';
    readonly highPriority: 'highPriority';
    readonly mediumPriority: 'mediumPriority';
    readonly lowPriority: 'lowPriority';
    readonly learningPath: 'learningPath';
    readonly createdAt: 'createdAt';
};
export type SkillGapAnalysisScalarFieldEnum = (typeof SkillGapAnalysisScalarFieldEnum)[keyof typeof SkillGapAnalysisScalarFieldEnum];
export declare const JobApplicationScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateProfileId: 'candidateProfileId';
    readonly jobId: 'jobId';
    readonly coverLetter: 'coverLetter';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type JobApplicationScalarFieldEnum = (typeof JobApplicationScalarFieldEnum)[keyof typeof JobApplicationScalarFieldEnum];
export declare const ApplicationStatusHistoryScalarFieldEnum: {
    readonly id: 'id';
    readonly applicationId: 'applicationId';
    readonly oldStatus: 'oldStatus';
    readonly newStatus: 'newStatus';
    readonly changedById: 'changedById';
    readonly changedAt: 'changedAt';
};
export type ApplicationStatusHistoryScalarFieldEnum = (typeof ApplicationStatusHistoryScalarFieldEnum)[keyof typeof ApplicationStatusHistoryScalarFieldEnum];
export declare const InterviewSessionScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateProfileId: 'candidateProfileId';
    readonly jobId: 'jobId';
    readonly experienceLevel: 'experienceLevel';
    readonly interviewType: 'interviewType';
    readonly currentQuestion: 'currentQuestion';
    readonly status: 'status';
    readonly overallScore: 'overallScore';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type InterviewSessionScalarFieldEnum = (typeof InterviewSessionScalarFieldEnum)[keyof typeof InterviewSessionScalarFieldEnum];
export declare const InterviewAnswerScalarFieldEnum: {
    readonly id: 'id';
    readonly sessionId: 'sessionId';
    readonly question: 'question';
    readonly candidateAnswer: 'candidateAnswer';
    readonly technicalAccuracy: 'technicalAccuracy';
    readonly communication: 'communication';
    readonly confidence: 'confidence';
    readonly completeness: 'completeness';
    readonly overallScore: 'overallScore';
    readonly feedback: 'feedback';
    readonly createdAt: 'createdAt';
};
export type InterviewAnswerScalarFieldEnum = (typeof InterviewAnswerScalarFieldEnum)[keyof typeof InterviewAnswerScalarFieldEnum];
export declare const InterviewScalarFieldEnum: {
    readonly id: 'id';
    readonly jobApplicationId: 'jobApplicationId';
    readonly scheduledById: 'scheduledById';
    readonly scheduledAt: 'scheduledAt';
    readonly durationMinutes: 'durationMinutes';
    readonly type: 'type';
    readonly status: 'status';
    readonly meetingUrl: 'meetingUrl';
    readonly title: 'title';
    readonly notes: 'notes';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type InterviewScalarFieldEnum = (typeof InterviewScalarFieldEnum)[keyof typeof InterviewScalarFieldEnum];
export declare const ApplicationAssistantScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateProfileId: 'candidateProfileId';
    readonly jobId: 'jobId';
    readonly resumeId: 'resumeId';
    readonly matchScore: 'matchScore';
    readonly recommendation: 'recommendation';
    readonly missingSkills: 'missingSkills';
    readonly suggestions: 'suggestions';
    readonly applicationTips: 'applicationTips';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ApplicationAssistantScalarFieldEnum = (typeof ApplicationAssistantScalarFieldEnum)[keyof typeof ApplicationAssistantScalarFieldEnum];
export declare const ResumeScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly fileName: 'fileName';
    readonly fileUrl: 'fileUrl';
    readonly publicId: 'publicId';
    readonly fileType: 'fileType';
    readonly fileSize: 'fileSize';
    readonly rawText: 'rawText';
    readonly parsedData: 'parsedData';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum];
export declare const ResumeAnalysisScalarFieldEnum: {
    readonly id: 'id';
    readonly resumeId: 'resumeId';
    readonly overallScore: 'overallScore';
    readonly skillsScore: 'skillsScore';
    readonly experienceScore: 'experienceScore';
    readonly educationScore: 'educationScore';
    readonly projectsScore: 'projectsScore';
    readonly certificationsScore: 'certificationsScore';
    readonly strengths: 'strengths';
    readonly weaknesses: 'weaknesses';
    readonly suggestions: 'suggestions';
    readonly missingSkills: 'missingSkills';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResumeAnalysisScalarFieldEnum = (typeof ResumeAnalysisScalarFieldEnum)[keyof typeof ResumeAnalysisScalarFieldEnum];
export declare const ResumeChunkScalarFieldEnum: {
    readonly id: 'id';
    readonly resumeId: 'resumeId';
    readonly chunkText: 'chunkText';
    readonly chunkIndex: 'chunkIndex';
    readonly createdAt: 'createdAt';
};
export type ResumeChunkScalarFieldEnum = (typeof ResumeChunkScalarFieldEnum)[keyof typeof ResumeChunkScalarFieldEnum];
export declare const ResumeSummaryScalarFieldEnum: {
    readonly id: 'id';
    readonly resumeId: 'resumeId';
    readonly summary: 'summary';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResumeSummaryScalarFieldEnum = (typeof ResumeSummaryScalarFieldEnum)[keyof typeof ResumeSummaryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map