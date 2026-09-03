export type InterviewStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED";

export type InterviewListQuery = {
  search?: string;
  status?: InterviewStatus;
  jobId?: string;
  page?: number;
  limit?: number;
};

export type InterviewEvaluation = {
  technicalAccuracy?: number;
  communication?: number;
  confidence?: number;
  completeness?: number;
  feedback?: string;
};