
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    

// src/app.ts
import express from "express";
import cors from "cors";

// src/app/routes/index.ts
import { Router as Router23 } from "express";

// src/app/modules/Auth/auth.routes.ts
import { Router } from "express";

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/config/env.ts
import dotenv from "dotenv";
import status from "http-status";

// src/app/errorHelpers/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requireEnvVariable = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "EMAIL_SENDER_SMTP_FROM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FRONTEND_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "GROQ_API_KEY",
    "OPENROUTER_API_KEY",
    "OPENROUTER_EMBEDDING_MODEL",
    "GEMINI_API_KEY",
    "GEMINI_LLM_MODEL"
  ];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(status.INTERNAL_SERVER_ERROR, `Environment variable ${variable} is required but not set in .env file.`);
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL?.trim(),
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY?.trim(),
    OPENROUTER_EMBEDDING_MODEL: process.env.OPENROUTER_EMBEDDING_MODEL?.trim(),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_LLM_MODEL: process.env.GEMINI_LLM_MODEL
  };
};
var envVars = loadEnvVariables();

// src/app/modules/Auth/auth.controller.ts
import ms from "ms";

// src/app/modules/Auth/auth.services.ts
import status4 from "http-status";

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";

// src/generated/prisma/enums.ts
var NotificationChannel = {
  IN_APP: "IN_APP",
  EMAIL: "EMAIL"
};
var NotificationStatus = {
  PENDING: "PENDING",
  SENT: "SENT",
  FAILED: "FAILED",
  READ: "READ"
};
var Role = {
  CANDIDATE: "CANDIDATE",
  RECRUITER: "RECRUITER",
  ADMIN: "ADMIN"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};
var ApplicationStatus = {
  APPLIED: "APPLIED",
  SCREENING: "SCREENING",
  SHORTLISTED: "SHORTLISTED",
  INTERVIEW: "INTERVIEW",
  OFFER: "OFFER",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN"
};
var JobStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  CLOSED: "CLOSED"
};
var RemoteType = {
  ONSITE: "ONSITE",
  REMOTE: "REMOTE",
  HYBRID: "HYBRID"
};
var ComplaintStatus = {
  PENDING: "PENDING",
  UNDER_REVIEW: "UNDER_REVIEW",
  NEED_MORE_INFORMATION: "NEED_MORE_INFORMATION",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  RESOLVED: "RESOLVED"
};
var InterviewStatus = {
  SCHEDULED: "SCHEDULED",
  STARTED: "STARTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  RESCHEDULED: "RESCHEDULED"
};
var InterviewType = {
  VIDEO: "VIDEO",
  PHONE: "PHONE",
  IN_PERSON: "IN_PERSON"
};

// src/app/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [
    "postgresqlExtensions"
  ],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Conversation {\n  id String @id @default(uuid())\n\n  jobApplicationId String? @unique\n\n  jobApplication JobApplication? @relation(fields: [jobApplicationId], references: [id], onDelete: Cascade)\n\n  participants ConversationParticipant[]\n  messages     Message[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([jobApplicationId])\n}\n\nmodel Message {\n  id String @id @default(uuid())\n\n  conversationId String\n  senderId       String\n\n  content String\n\n  isAutomatic Boolean   @default(false)\n  readAt      DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)\n\n  sender User @relation(fields: [senderId], references: [id], onDelete: Cascade)\n\n  @@index([conversationId])\n  @@index([senderId])\n  @@index([createdAt])\n}\n\nmodel ConversationParticipant {\n  id String @id @default(uuid())\n\n  conversationId String\n  userId         String\n\n  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  joinedAt DateTime @default(now())\n\n  @@unique([conversationId, userId])\n  @@index([userId])\n}\n\nenum NotificationType {\n  // Application\n  APPLICATION_SUBMITTED\n  APPLICATION_STATUS_CHANGED\n  APPLICATION_SHORTLISTED\n  APPLICATION_REJECTED\n  APPLICATION_ACCEPTED\n  NEW_CANDIDATE_APPLICATION\n\n  // Interview\n  INTERVIEW_SCHEDULED\n  INTERVIEW_RESCHEDULED\n  INTERVIEW_CANCELLED\n  INTERVIEW_REMINDER\n\n  // Communication\n  NEW_MESSAGE\n}\n\nenum NotificationChannel {\n  IN_APP\n  EMAIL\n}\n\nenum NotificationStatus {\n  PENDING\n  SENT\n  FAILED\n  READ\n}\n\nmodel Notification {\n  id String @id @default(uuid())\n\n  userId String\n\n  type    NotificationType\n  channel NotificationChannel\n  status  NotificationStatus  @default(PENDING)\n\n  title   String\n  message String\n\n  applicationId String?\n  interviewId   String?\n\n  readAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([userId, status])\n  @@index([userId, readAt])\n  @@index([applicationId])\n  @@index([interviewId])\n  @@index([createdAt])\n}\n\nmodel ReviewComplaint {\n  id String @id @default(uuid())\n\n  candidateProfileId String?\n  submittedById      String\n\n  companyId        String\n  jobId            String?\n  jobApplicationId String?\n\n  type        ComplaintType\n  title       String\n  description String\n\n  status   ComplaintStatus    @default(PENDING)\n  decision ComplaintDecision?\n\n  adminNote String?\n\n  reviewedById String?\n  reviewedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  candidateProfile CandidateProfile? @relation(fields: [candidateProfileId], references: [id])\n\n  submittedBy User @relation(fields: [submittedById], references: [id])\n\n  company Company @relation(fields: [companyId], references: [id])\n\n  job Job? @relation(fields: [jobId], references: [id])\n\n  jobApplication JobApplication? @relation(fields: [jobApplicationId], references: [id])\n\n  evidence ComplaintEvidence[]\n\n  penalty Penalty?\n\n  @@index([candidateProfileId])\n  @@index([submittedById])\n  @@index([companyId])\n  @@index([jobId])\n  @@index([status])\n}\n\nmodel Penalty {\n  id String @id @default(uuid())\n\n  complaintId String @unique\n  companyId   String\n\n  amount   Decimal @db.Decimal(10, 2)\n  currency String  @default("USD")\n\n  reason String\n\n  status PenaltyStatus @default(PENDING)\n\n  stripePaymentIntentId String?\n\n  dueDate DateTime?\n\n  paidAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  complaint ReviewComplaint @relation(fields: [complaintId], references: [id])\n\n  company Company @relation(fields: [companyId], references: [id])\n\n  @@index([companyId])\n  @@index([status])\n}\n\nmodel ComplaintEvidence {\n  id String @id @default(uuid())\n\n  complaintId String\n\n  fileUrl  String\n  fileName String\n  fileType String\n\n  createdAt DateTime @default(now())\n\n  complaint ReviewComplaint @relation(fields: [complaintId], references: [id])\n\n  @@index([complaintId])\n}\n\nmodel User {\n  id                 String            @id\n  name               String\n  email              String            @unique\n  emailVerified      Boolean           @default(false)\n  image              String?\n  role               Role              @default(CANDIDATE)\n  status             UserStatus        @default(ACTIVE)\n  needPasswordChange Boolean           @default(false)\n  isDeleted          Boolean           @default(false)\n  deletedAt          DateTime?\n  createdAt          DateTime          @default(now())\n  updatedAt          DateTime          @updatedAt\n  accounts           Account[]\n  candidateProfile   CandidateProfile?\n  sessions           Session[]\n  company            Company?\n  reviewComplaints   ReviewComplaint[]\n  notifications      Notification[]\n\n  messages                 Message[]\n  conversationParticipants ConversationParticipant[]\n  interviews               Interview[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel CandidateProfile {\n  id                    String                   @id @default(uuid())\n  userId                String                   @unique\n  phone                 String?\n  location              String?\n  bio                   String?\n  experience            String?\n  linkedin              String?\n  github                String?\n  portfolio             String?\n  createdAt             DateTime                 @default(now())\n  updatedAt             DateTime                 @updatedAt\n  certifications        CandidateCertification[]\n  education             CandidateEducation[]\n  user                  User                     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  projects              CandidateProject[]\n  skills                CandidateSkill[]\n  resumes               Resume[]\n  skillGapAnalyses      SkillGapAnalysis[]\n  jobMatches            JobMatch[]\n  jobApplications       JobApplication[]\n  applicationAssistants ApplicationAssistant[]\n  candidateEmbeddings   CandidateEmbedding?\n  reviewComplaints      ReviewComplaint[]\n  interviewSessions     InterviewSession[]\n\n  @@map("candidate_profile")\n}\n\nmodel CandidateEmbedding {\n  id                 String @id @default(uuid())\n  candidateProfileId String @unique\n\n  candidateProfile CandidateProfile @relation(fields: [candidateProfileId], references: [id], onDelete: Cascade)\n\n  embedding Unsupported("vector(2048)")?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("candidate_embeddings")\n}\n\nmodel CandidateSkill {\n  id          String           @id @default(uuid())\n  name        String\n  candidateId String\n  candidate   CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  @@map("candidate_skill")\n}\n\nmodel CandidateEducation {\n  id          String           @id @default(uuid())\n  institution String\n  degree      String?\n  field       String?\n  startYear   Int?\n  endYear     Int?\n  candidateId String\n  candidate   CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  @@map("candidate_education")\n}\n\nmodel CandidateProject {\n  id           String           @id @default(uuid())\n  name         String\n  description  String?\n  technologies String?\n  projectUrl   String?\n  candidateId  String\n  image        String?\n  candidate    CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  @@map("candidate_project")\n}\n\nmodel CandidateCertification {\n  id            String           @id @default(uuid())\n  name          String\n  issuer        String?\n  issueDate     DateTime?\n  credentialUrl String?\n  candidateId   String\n  image         String?\n  candidate     CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  @@map("candidate_certification")\n}\n\nmodel Company {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  website     String?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  jobs Job[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  penalties Penalty[]\n\n  reviewComplaints ReviewComplaint[]\n}\n\nmodel Job {\n  id        String @id @default(uuid())\n  companyId String\n\n  title       String\n  description String\n\n  location String\n  image    String?\n\n  remoteType RemoteType @default(ONSITE)\n\n  employmentType  EmploymentType\n  experienceLevel ExperienceLevel\n\n  salaryMin      Float?\n  salaryMax      Float?\n  salaryCurrency String? @default("BDT")\n\n  deadline DateTime\n\n  status JobStatus @default(DRAFT)\n\n  publishedAt DateTime?\n  closedAt    DateTime?\n\n  requiredSkills JobSkill[]\n\n  matches JobMatch[]\n\n  company Company @relation(fields: [companyId], references: [id], onDelete: Cascade)\n\n  skillGapAnalyses SkillGapAnalysis[]\n  jobApplications  JobApplication[]\n\n  embedding Unsupported("vector(2048)")?\n\n  interviewSessions InterviewSession[]\n\n  applicationAssistants ApplicationAssistant[]\n\n  createdAt        DateTime          @default(now())\n  updatedAt        DateTime          @updatedAt\n  reviewComplaints ReviewComplaint[]\n\n  @@index([companyId])\n  @@index([status])\n  @@index([location])\n  @@index([remoteType])\n  @@index([employmentType])\n  @@index([experienceLevel])\n  @@index([deadline])\n  @@index([createdAt])\n}\n\nmodel JobSkill {\n  id       String @id @default(uuid())\n  jobId    String\n  name     String\n  priority String @default("medium")\n\n  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  @@index([jobId])\n}\n\nmodel JobMatch {\n  id String @id @default(uuid())\n\n  candidateId String\n  jobId       String\n\n  overallScore    Float\n  semanticScore   Float\n  skillsScore     Float\n  experienceScore Float\n  educationScore  Float\n  keywordScore    Float\n\n  missingSkills Json\n  matchedSkills Json\n\n  recommendation String\n\n  candidate CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([candidateId, jobId])\n  @@index([candidateId])\n  @@index([jobId])\n}\n\nmodel SkillGapAnalysis {\n  id                   String @id @default(uuid())\n  candidateId          String\n  jobId                String\n  skillMatchPercentage Int\n\n  matchedSkills  Json\n  missingSkills  Json\n  highPriority   Json\n  mediumPriority Json\n  lowPriority    Json\n  learningPath   Json\n\n  candidate CandidateProfile @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n  job       Job              @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  createdAt       DateTime         @default(now())\n  jobApplications JobApplication[]\n\n  @@unique([candidateId, jobId])\n  @@index([candidateId])\n  @@index([jobId])\n}\n\nmodel JobApplication {\n  id                 String  @id @default(uuid())\n  candidateProfileId String\n  jobId              String\n  coverLetter        String?\n\n  status ApplicationStatus @default(APPLIED)\n\n  candidateProfile CandidateProfile @relation(fields: [candidateProfileId], references: [id], onDelete: Cascade)\n\n  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  createdAt                  DateTime                   @default(now())\n  updatedAt                  DateTime                   @updatedAt\n  skillGapAnalyses           SkillGapAnalysis[]\n  applicationStatusHistories ApplicationStatusHistory[]\n  reviewComplaints           ReviewComplaint[]\n  conversations              Conversation[]\n  interviews                 Interview[]\n\n  @@unique([candidateProfileId, jobId])\n  @@index([candidateProfileId])\n  @@index([jobId])\n  @@index([status])\n}\n\nmodel ApplicationStatusHistory {\n  id String @id @default(uuid())\n\n  applicationId String\n  oldStatus     ApplicationStatus?\n  newStatus     ApplicationStatus\n\n  changedById String\n  changedAt   DateTime @default(now())\n\n  application JobApplication @relation(fields: [applicationId], references: [id], onDelete: Cascade)\n\n  @@index([applicationId])\n}\n\nenum Role {\n  CANDIDATE\n  RECRUITER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  SUSPENDED\n}\n\nenum ApplicationStatus {\n  APPLIED\n  SCREENING\n  SHORTLISTED\n  INTERVIEW\n  OFFER\n  HIRED\n  REJECTED\n  WITHDRAWN\n}\n\nenum JobStatus {\n  DRAFT\n  PUBLISHED\n  CLOSED\n}\n\nenum RemoteType {\n  ONSITE\n  REMOTE\n  HYBRID\n}\n\nenum EmploymentType {\n  FULL_TIME\n  PART_TIME\n  CONTRACT\n  INTERNSHIP\n  FREELANCE\n}\n\nenum ExperienceLevel {\n  ENTRY\n  JUNIOR\n  MID\n  SENIOR\n  LEAD\n}\n\nenum ComplaintType {\n  COMPANY_BEHAVIOR\n  JOB_MISMATCH\n  FAKE_JOB\n  SALARY_MISMATCH\n  INTERVIEW_PROBLEM\n  HARASSMENT\n  DISCRIMINATION\n  FRAUD\n  OTHER\n}\n\nenum ComplaintStatus {\n  PENDING\n  UNDER_REVIEW\n  NEED_MORE_INFORMATION\n  ACCEPTED\n  REJECTED\n  RESOLVED\n}\n\nenum ComplaintDecision {\n  NO_VIOLATION\n  WARNING\n  PENALTY\n  SUSPENSION\n  JOB_REMOVAL\n  COMPANY_SUSPENSION\n}\n\nenum PenaltyStatus {\n  PENDING\n  PAID\n  OVERDUE\n  CANCELLED\n}\n\nenum InterviewStatus {\n  SCHEDULED\n  STARTED\n  COMPLETED\n  CANCELLED\n  RESCHEDULED\n}\n\nenum InterviewType {\n  VIDEO\n  PHONE\n  IN_PERSON\n}\n\nmodel InterviewSession {\n  id                 String @id @default(uuid())\n  candidateProfileId String\n  jobId              String\n\n  experienceLevel String\n  interviewType   String\n\n  currentQuestion Int    @default(0)\n  status          String @default("IN_PROGRESS")\n\n  overallScore Float?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  candidateProfile CandidateProfile @relation(fields: [candidateProfileId], references: [id], onDelete: Cascade)\n\n  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  answers InterviewAnswer[]\n\n  @@index([candidateProfileId])\n  @@index([jobId])\n  @@index([status])\n  @@index([createdAt])\n}\n\nmodel InterviewAnswer {\n  id String @id @default(uuid())\n\n  sessionId       String\n  question        String\n  candidateAnswer String\n\n  technicalAccuracy Float?\n  communication     Float?\n  confidence        Float?\n  completeness      Float?\n  overallScore      Float?\n\n  feedback String?\n\n  createdAt DateTime @default(now())\n\n  session InterviewSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)\n\n  @@index([sessionId])\n}\n\nmodel Interview {\n  id String @id @default(uuid())\n\n  jobApplicationId String\n  scheduledById    String\n\n  scheduledAt     DateTime\n  durationMinutes Int      @default(30)\n\n  type   InterviewType   @default(VIDEO)\n  status InterviewStatus @default(SCHEDULED)\n\n  meetingUrl String?\n  title      String?\n  notes      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  jobApplication JobApplication @relation(fields: [jobApplicationId], references: [id], onDelete: Cascade)\n\n  scheduledBy User @relation(fields: [scheduledById], references: [id], onDelete: Cascade)\n\n  @@index([jobApplicationId])\n  @@index([scheduledById])\n  @@index([scheduledAt])\n  @@index([status])\n}\n\nmodel ApplicationAssistant {\n  id String @id @default(uuid())\n\n  candidateProfileId String\n  jobId              String\n  resumeId           String?\n\n  matchScore     Int\n  recommendation String\n\n  missingSkills   Json\n  suggestions     Json\n  applicationTips Json\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  candidateProfile CandidateProfile @relation(fields: [candidateProfileId], references: [id])\n\n  job Job @relation(fields: [jobId], references: [id])\n\n  @@unique([candidateProfileId, jobId])\n}\n\nmodel Resume {\n  id          String                       @id @default(uuid())\n  candidateId String\n  fileName    String\n  fileUrl     String\n  publicId    String\n  fileType    String\n  fileSize    Int?\n  rawText     String?\n  parsedData  Json?\n  createdAt   DateTime                     @default(now())\n  updatedAt   DateTime                     @updatedAt\n  summary     ResumeSummary?\n  analysis    ResumeAnalysis?\n  chunks      ResumeChunk[]\n  candidate   CandidateProfile             @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n  embedding   Unsupported("vector(2048)")?\n\n  @@map("resumes")\n}\n\nmodel ResumeAnalysis {\n  id                  String   @id @default(uuid())\n  resumeId            String   @unique\n  overallScore        Int\n  skillsScore         Int\n  experienceScore     Int\n  educationScore      Int\n  projectsScore       Int\n  certificationsScore Int\n  strengths           Json\n  weaknesses          Json\n  suggestions         Json\n  missingSkills       Json\n  createdAt           DateTime @default(now())\n  updatedAt           DateTime @updatedAt\n  resume              Resume   @relation(fields: [resumeId], references: [id], onDelete: Cascade)\n\n  @@map("resume_analysis")\n}\n\nmodel ResumeChunk {\n  id         String @id @default(uuid())\n  resumeId   String\n  chunkText  String\n  chunkIndex Int\n\n  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)\n\n  embedding Unsupported("vector(2048)")?\n\n  createdAt DateTime @default(now())\n\n  @@index([resumeId])\n  @@map("resume_chunks")\n}\n\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../../src/generated/prisma"\n  previewFeatures = ["postgresqlExtensions"]\n}\n\ndatasource db {\n  provider   = "postgresql"\n  extensions = [vector]\n}\n\nmodel ResumeSummary {\n  id        String   @id @default(uuid())\n  resumeId  String   @unique\n  summary   String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  resume    Resume   @relation(fields: [resumeId], references: [id], onDelete: Cascade)\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Conversation":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"jobApplicationId","kind":"scalar","type":"String"},{"name":"jobApplication","kind":"object","type":"JobApplication","relationName":"ConversationToJobApplication"},{"name":"participants","kind":"object","type":"ConversationParticipant","relationName":"ConversationToConversationParticipant"},{"name":"messages","kind":"object","type":"Message","relationName":"ConversationToMessage"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Message":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"conversationId","kind":"scalar","type":"String"},{"name":"senderId","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"isAutomatic","kind":"scalar","type":"Boolean"},{"name":"readAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"conversation","kind":"object","type":"Conversation","relationName":"ConversationToMessage"},{"name":"sender","kind":"object","type":"User","relationName":"MessageToUser"}],"dbName":null},"ConversationParticipant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"conversationId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"conversation","kind":"object","type":"Conversation","relationName":"ConversationToConversationParticipant"},{"name":"user","kind":"object","type":"User","relationName":"ConversationParticipantToUser"},{"name":"joinedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Notification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"NotificationType"},{"name":"channel","kind":"enum","type":"NotificationChannel"},{"name":"status","kind":"enum","type":"NotificationStatus"},{"name":"title","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"applicationId","kind":"scalar","type":"String"},{"name":"interviewId","kind":"scalar","type":"String"},{"name":"readAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"NotificationToUser"}],"dbName":null},"ReviewComplaint":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateProfileId","kind":"scalar","type":"String"},{"name":"submittedById","kind":"scalar","type":"String"},{"name":"companyId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"jobApplicationId","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"ComplaintType"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ComplaintStatus"},{"name":"decision","kind":"enum","type":"ComplaintDecision"},{"name":"adminNote","kind":"scalar","type":"String"},{"name":"reviewedById","kind":"scalar","type":"String"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToReviewComplaint"},{"name":"submittedBy","kind":"object","type":"User","relationName":"ReviewComplaintToUser"},{"name":"company","kind":"object","type":"Company","relationName":"CompanyToReviewComplaint"},{"name":"job","kind":"object","type":"Job","relationName":"JobToReviewComplaint"},{"name":"jobApplication","kind":"object","type":"JobApplication","relationName":"JobApplicationToReviewComplaint"},{"name":"evidence","kind":"object","type":"ComplaintEvidence","relationName":"ComplaintEvidenceToReviewComplaint"},{"name":"penalty","kind":"object","type":"Penalty","relationName":"PenaltyToReviewComplaint"}],"dbName":null},"Penalty":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"complaintId","kind":"scalar","type":"String"},{"name":"companyId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"reason","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PenaltyStatus"},{"name":"stripePaymentIntentId","kind":"scalar","type":"String"},{"name":"dueDate","kind":"scalar","type":"DateTime"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"complaint","kind":"object","type":"ReviewComplaint","relationName":"PenaltyToReviewComplaint"},{"name":"company","kind":"object","type":"Company","relationName":"CompanyToPenalty"}],"dbName":null},"ComplaintEvidence":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"complaintId","kind":"scalar","type":"String"},{"name":"fileUrl","kind":"scalar","type":"String"},{"name":"fileName","kind":"scalar","type":"String"},{"name":"fileType","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"complaint","kind":"object","type":"ReviewComplaint","relationName":"ComplaintEvidenceToReviewComplaint"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"company","kind":"object","type":"Company","relationName":"CompanyToUser"},{"name":"reviewComplaints","kind":"object","type":"ReviewComplaint","relationName":"ReviewComplaintToUser"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToUser"},{"name":"messages","kind":"object","type":"Message","relationName":"MessageToUser"},{"name":"conversationParticipants","kind":"object","type":"ConversationParticipant","relationName":"ConversationParticipantToUser"},{"name":"interviews","kind":"object","type":"Interview","relationName":"InterviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"CandidateProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"String"},{"name":"linkedin","kind":"scalar","type":"String"},{"name":"github","kind":"scalar","type":"String"},{"name":"portfolio","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"certifications","kind":"object","type":"CandidateCertification","relationName":"CandidateCertificationToCandidateProfile"},{"name":"education","kind":"object","type":"CandidateEducation","relationName":"CandidateEducationToCandidateProfile"},{"name":"user","kind":"object","type":"User","relationName":"CandidateProfileToUser"},{"name":"projects","kind":"object","type":"CandidateProject","relationName":"CandidateProfileToCandidateProject"},{"name":"skills","kind":"object","type":"CandidateSkill","relationName":"CandidateProfileToCandidateSkill"},{"name":"resumes","kind":"object","type":"Resume","relationName":"CandidateProfileToResume"},{"name":"skillGapAnalyses","kind":"object","type":"SkillGapAnalysis","relationName":"CandidateProfileToSkillGapAnalysis"},{"name":"jobMatches","kind":"object","type":"JobMatch","relationName":"CandidateProfileToJobMatch"},{"name":"jobApplications","kind":"object","type":"JobApplication","relationName":"CandidateProfileToJobApplication"},{"name":"applicationAssistants","kind":"object","type":"ApplicationAssistant","relationName":"ApplicationAssistantToCandidateProfile"},{"name":"candidateEmbeddings","kind":"object","type":"CandidateEmbedding","relationName":"CandidateEmbeddingToCandidateProfile"},{"name":"reviewComplaints","kind":"object","type":"ReviewComplaint","relationName":"CandidateProfileToReviewComplaint"},{"name":"interviewSessions","kind":"object","type":"InterviewSession","relationName":"CandidateProfileToInterviewSession"}],"dbName":"candidate_profile"},"CandidateEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateProfileId","kind":"scalar","type":"String"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"CandidateEmbeddingToCandidateProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"candidate_embeddings"},"CandidateSkill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToCandidateSkill"}],"dbName":"candidate_skill"},"CandidateEducation":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"institution","kind":"scalar","type":"String"},{"name":"degree","kind":"scalar","type":"String"},{"name":"field","kind":"scalar","type":"String"},{"name":"startYear","kind":"scalar","type":"Int"},{"name":"endYear","kind":"scalar","type":"Int"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateEducationToCandidateProfile"}],"dbName":"candidate_education"},"CandidateProject":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"technologies","kind":"scalar","type":"String"},{"name":"projectUrl","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToCandidateProject"}],"dbName":"candidate_project"},"CandidateCertification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"issuer","kind":"scalar","type":"String"},{"name":"issueDate","kind":"scalar","type":"DateTime"},{"name":"credentialUrl","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateCertificationToCandidateProfile"}],"dbName":"candidate_certification"},"Company":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"website","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CompanyToUser"},{"name":"jobs","kind":"object","type":"Job","relationName":"CompanyToJob"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"penalties","kind":"object","type":"Penalty","relationName":"CompanyToPenalty"},{"name":"reviewComplaints","kind":"object","type":"ReviewComplaint","relationName":"CompanyToReviewComplaint"}],"dbName":null},"Job":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"companyId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"remoteType","kind":"enum","type":"RemoteType"},{"name":"employmentType","kind":"enum","type":"EmploymentType"},{"name":"experienceLevel","kind":"enum","type":"ExperienceLevel"},{"name":"salaryMin","kind":"scalar","type":"Float"},{"name":"salaryMax","kind":"scalar","type":"Float"},{"name":"salaryCurrency","kind":"scalar","type":"String"},{"name":"deadline","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"JobStatus"},{"name":"publishedAt","kind":"scalar","type":"DateTime"},{"name":"closedAt","kind":"scalar","type":"DateTime"},{"name":"requiredSkills","kind":"object","type":"JobSkill","relationName":"JobToJobSkill"},{"name":"matches","kind":"object","type":"JobMatch","relationName":"JobToJobMatch"},{"name":"company","kind":"object","type":"Company","relationName":"CompanyToJob"},{"name":"skillGapAnalyses","kind":"object","type":"SkillGapAnalysis","relationName":"JobToSkillGapAnalysis"},{"name":"jobApplications","kind":"object","type":"JobApplication","relationName":"JobToJobApplication"},{"name":"interviewSessions","kind":"object","type":"InterviewSession","relationName":"InterviewSessionToJob"},{"name":"applicationAssistants","kind":"object","type":"ApplicationAssistant","relationName":"ApplicationAssistantToJob"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"reviewComplaints","kind":"object","type":"ReviewComplaint","relationName":"JobToReviewComplaint"}],"dbName":null},"JobSkill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"priority","kind":"scalar","type":"String"},{"name":"job","kind":"object","type":"Job","relationName":"JobToJobSkill"}],"dbName":null},"JobMatch":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"overallScore","kind":"scalar","type":"Float"},{"name":"semanticScore","kind":"scalar","type":"Float"},{"name":"skillsScore","kind":"scalar","type":"Float"},{"name":"experienceScore","kind":"scalar","type":"Float"},{"name":"educationScore","kind":"scalar","type":"Float"},{"name":"keywordScore","kind":"scalar","type":"Float"},{"name":"missingSkills","kind":"scalar","type":"Json"},{"name":"matchedSkills","kind":"scalar","type":"Json"},{"name":"recommendation","kind":"scalar","type":"String"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToJobMatch"},{"name":"job","kind":"object","type":"Job","relationName":"JobToJobMatch"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"SkillGapAnalysis":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"skillMatchPercentage","kind":"scalar","type":"Int"},{"name":"matchedSkills","kind":"scalar","type":"Json"},{"name":"missingSkills","kind":"scalar","type":"Json"},{"name":"highPriority","kind":"scalar","type":"Json"},{"name":"mediumPriority","kind":"scalar","type":"Json"},{"name":"lowPriority","kind":"scalar","type":"Json"},{"name":"learningPath","kind":"scalar","type":"Json"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToSkillGapAnalysis"},{"name":"job","kind":"object","type":"Job","relationName":"JobToSkillGapAnalysis"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"jobApplications","kind":"object","type":"JobApplication","relationName":"JobApplicationToSkillGapAnalysis"}],"dbName":null},"JobApplication":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateProfileId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"coverLetter","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ApplicationStatus"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToJobApplication"},{"name":"job","kind":"object","type":"Job","relationName":"JobToJobApplication"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"skillGapAnalyses","kind":"object","type":"SkillGapAnalysis","relationName":"JobApplicationToSkillGapAnalysis"},{"name":"applicationStatusHistories","kind":"object","type":"ApplicationStatusHistory","relationName":"ApplicationStatusHistoryToJobApplication"},{"name":"reviewComplaints","kind":"object","type":"ReviewComplaint","relationName":"JobApplicationToReviewComplaint"},{"name":"conversations","kind":"object","type":"Conversation","relationName":"ConversationToJobApplication"},{"name":"interviews","kind":"object","type":"Interview","relationName":"InterviewToJobApplication"}],"dbName":null},"ApplicationStatusHistory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"applicationId","kind":"scalar","type":"String"},{"name":"oldStatus","kind":"enum","type":"ApplicationStatus"},{"name":"newStatus","kind":"enum","type":"ApplicationStatus"},{"name":"changedById","kind":"scalar","type":"String"},{"name":"changedAt","kind":"scalar","type":"DateTime"},{"name":"application","kind":"object","type":"JobApplication","relationName":"ApplicationStatusHistoryToJobApplication"}],"dbName":null},"InterviewSession":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateProfileId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"experienceLevel","kind":"scalar","type":"String"},{"name":"interviewType","kind":"scalar","type":"String"},{"name":"currentQuestion","kind":"scalar","type":"Int"},{"name":"status","kind":"scalar","type":"String"},{"name":"overallScore","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToInterviewSession"},{"name":"job","kind":"object","type":"Job","relationName":"InterviewSessionToJob"},{"name":"answers","kind":"object","type":"InterviewAnswer","relationName":"InterviewAnswerToInterviewSession"}],"dbName":null},"InterviewAnswer":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionId","kind":"scalar","type":"String"},{"name":"question","kind":"scalar","type":"String"},{"name":"candidateAnswer","kind":"scalar","type":"String"},{"name":"technicalAccuracy","kind":"scalar","type":"Float"},{"name":"communication","kind":"scalar","type":"Float"},{"name":"confidence","kind":"scalar","type":"Float"},{"name":"completeness","kind":"scalar","type":"Float"},{"name":"overallScore","kind":"scalar","type":"Float"},{"name":"feedback","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"session","kind":"object","type":"InterviewSession","relationName":"InterviewAnswerToInterviewSession"}],"dbName":null},"Interview":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"jobApplicationId","kind":"scalar","type":"String"},{"name":"scheduledById","kind":"scalar","type":"String"},{"name":"scheduledAt","kind":"scalar","type":"DateTime"},{"name":"durationMinutes","kind":"scalar","type":"Int"},{"name":"type","kind":"enum","type":"InterviewType"},{"name":"status","kind":"enum","type":"InterviewStatus"},{"name":"meetingUrl","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"jobApplication","kind":"object","type":"JobApplication","relationName":"InterviewToJobApplication"},{"name":"scheduledBy","kind":"object","type":"User","relationName":"InterviewToUser"}],"dbName":null},"ApplicationAssistant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateProfileId","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"resumeId","kind":"scalar","type":"String"},{"name":"matchScore","kind":"scalar","type":"Int"},{"name":"recommendation","kind":"scalar","type":"String"},{"name":"missingSkills","kind":"scalar","type":"Json"},{"name":"suggestions","kind":"scalar","type":"Json"},{"name":"applicationTips","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"candidateProfile","kind":"object","type":"CandidateProfile","relationName":"ApplicationAssistantToCandidateProfile"},{"name":"job","kind":"object","type":"Job","relationName":"ApplicationAssistantToJob"}],"dbName":null},"Resume":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"candidateId","kind":"scalar","type":"String"},{"name":"fileName","kind":"scalar","type":"String"},{"name":"fileUrl","kind":"scalar","type":"String"},{"name":"publicId","kind":"scalar","type":"String"},{"name":"fileType","kind":"scalar","type":"String"},{"name":"fileSize","kind":"scalar","type":"Int"},{"name":"rawText","kind":"scalar","type":"String"},{"name":"parsedData","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"summary","kind":"object","type":"ResumeSummary","relationName":"ResumeToResumeSummary"},{"name":"analysis","kind":"object","type":"ResumeAnalysis","relationName":"ResumeToResumeAnalysis"},{"name":"chunks","kind":"object","type":"ResumeChunk","relationName":"ResumeToResumeChunk"},{"name":"candidate","kind":"object","type":"CandidateProfile","relationName":"CandidateProfileToResume"}],"dbName":"resumes"},"ResumeAnalysis":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"resumeId","kind":"scalar","type":"String"},{"name":"overallScore","kind":"scalar","type":"Int"},{"name":"skillsScore","kind":"scalar","type":"Int"},{"name":"experienceScore","kind":"scalar","type":"Int"},{"name":"educationScore","kind":"scalar","type":"Int"},{"name":"projectsScore","kind":"scalar","type":"Int"},{"name":"certificationsScore","kind":"scalar","type":"Int"},{"name":"strengths","kind":"scalar","type":"Json"},{"name":"weaknesses","kind":"scalar","type":"Json"},{"name":"suggestions","kind":"scalar","type":"Json"},{"name":"missingSkills","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"resume","kind":"object","type":"Resume","relationName":"ResumeToResumeAnalysis"}],"dbName":"resume_analysis"},"ResumeChunk":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"resumeId","kind":"scalar","type":"String"},{"name":"chunkText","kind":"scalar","type":"String"},{"name":"chunkIndex","kind":"scalar","type":"Int"},{"name":"resume","kind":"object","type":"Resume","relationName":"ResumeToResumeChunk"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"resume_chunks"},"ResumeSummary":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"resumeId","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"resume","kind":"object","type":"Resume","relationName":"ResumeToResumeSummary"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","candidate","certifications","education","user","accounts","candidateProfile","sessions","job","requiredSkills","matches","company","jobApplications","_count","skillGapAnalyses","session","answers","interviewSessions","applicationAssistants","submittedBy","jobApplication","complaint","evidence","penalty","reviewComplaints","jobs","penalties","notifications","conversation","sender","messages","conversationParticipants","scheduledBy","interviews","projects","skills","resume","summary","analysis","chunks","resumes","jobMatches","candidateEmbeddings","application","applicationStatusHistories","conversations","participants","Conversation.findUnique","Conversation.findUniqueOrThrow","Conversation.findFirst","Conversation.findFirstOrThrow","Conversation.findMany","data","Conversation.createOne","Conversation.createMany","Conversation.createManyAndReturn","Conversation.updateOne","Conversation.updateMany","Conversation.updateManyAndReturn","create","update","Conversation.upsertOne","Conversation.deleteOne","Conversation.deleteMany","having","_min","_max","Conversation.groupBy","Conversation.aggregate","Message.findUnique","Message.findUniqueOrThrow","Message.findFirst","Message.findFirstOrThrow","Message.findMany","Message.createOne","Message.createMany","Message.createManyAndReturn","Message.updateOne","Message.updateMany","Message.updateManyAndReturn","Message.upsertOne","Message.deleteOne","Message.deleteMany","Message.groupBy","Message.aggregate","ConversationParticipant.findUnique","ConversationParticipant.findUniqueOrThrow","ConversationParticipant.findFirst","ConversationParticipant.findFirstOrThrow","ConversationParticipant.findMany","ConversationParticipant.createOne","ConversationParticipant.createMany","ConversationParticipant.createManyAndReturn","ConversationParticipant.updateOne","ConversationParticipant.updateMany","ConversationParticipant.updateManyAndReturn","ConversationParticipant.upsertOne","ConversationParticipant.deleteOne","ConversationParticipant.deleteMany","ConversationParticipant.groupBy","ConversationParticipant.aggregate","Notification.findUnique","Notification.findUniqueOrThrow","Notification.findFirst","Notification.findFirstOrThrow","Notification.findMany","Notification.createOne","Notification.createMany","Notification.createManyAndReturn","Notification.updateOne","Notification.updateMany","Notification.updateManyAndReturn","Notification.upsertOne","Notification.deleteOne","Notification.deleteMany","Notification.groupBy","Notification.aggregate","ReviewComplaint.findUnique","ReviewComplaint.findUniqueOrThrow","ReviewComplaint.findFirst","ReviewComplaint.findFirstOrThrow","ReviewComplaint.findMany","ReviewComplaint.createOne","ReviewComplaint.createMany","ReviewComplaint.createManyAndReturn","ReviewComplaint.updateOne","ReviewComplaint.updateMany","ReviewComplaint.updateManyAndReturn","ReviewComplaint.upsertOne","ReviewComplaint.deleteOne","ReviewComplaint.deleteMany","ReviewComplaint.groupBy","ReviewComplaint.aggregate","Penalty.findUnique","Penalty.findUniqueOrThrow","Penalty.findFirst","Penalty.findFirstOrThrow","Penalty.findMany","Penalty.createOne","Penalty.createMany","Penalty.createManyAndReturn","Penalty.updateOne","Penalty.updateMany","Penalty.updateManyAndReturn","Penalty.upsertOne","Penalty.deleteOne","Penalty.deleteMany","_avg","_sum","Penalty.groupBy","Penalty.aggregate","ComplaintEvidence.findUnique","ComplaintEvidence.findUniqueOrThrow","ComplaintEvidence.findFirst","ComplaintEvidence.findFirstOrThrow","ComplaintEvidence.findMany","ComplaintEvidence.createOne","ComplaintEvidence.createMany","ComplaintEvidence.createManyAndReturn","ComplaintEvidence.updateOne","ComplaintEvidence.updateMany","ComplaintEvidence.updateManyAndReturn","ComplaintEvidence.upsertOne","ComplaintEvidence.deleteOne","ComplaintEvidence.deleteMany","ComplaintEvidence.groupBy","ComplaintEvidence.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","CandidateProfile.findUnique","CandidateProfile.findUniqueOrThrow","CandidateProfile.findFirst","CandidateProfile.findFirstOrThrow","CandidateProfile.findMany","CandidateProfile.createOne","CandidateProfile.createMany","CandidateProfile.createManyAndReturn","CandidateProfile.updateOne","CandidateProfile.updateMany","CandidateProfile.updateManyAndReturn","CandidateProfile.upsertOne","CandidateProfile.deleteOne","CandidateProfile.deleteMany","CandidateProfile.groupBy","CandidateProfile.aggregate","CandidateEmbedding.findUnique","CandidateEmbedding.findUniqueOrThrow","CandidateEmbedding.findFirst","CandidateEmbedding.findFirstOrThrow","CandidateEmbedding.findMany","CandidateEmbedding.createOne","CandidateEmbedding.createMany","CandidateEmbedding.createManyAndReturn","CandidateEmbedding.updateOne","CandidateEmbedding.updateMany","CandidateEmbedding.updateManyAndReturn","CandidateEmbedding.upsertOne","CandidateEmbedding.deleteOne","CandidateEmbedding.deleteMany","CandidateEmbedding.groupBy","CandidateEmbedding.aggregate","CandidateSkill.findUnique","CandidateSkill.findUniqueOrThrow","CandidateSkill.findFirst","CandidateSkill.findFirstOrThrow","CandidateSkill.findMany","CandidateSkill.createOne","CandidateSkill.createMany","CandidateSkill.createManyAndReturn","CandidateSkill.updateOne","CandidateSkill.updateMany","CandidateSkill.updateManyAndReturn","CandidateSkill.upsertOne","CandidateSkill.deleteOne","CandidateSkill.deleteMany","CandidateSkill.groupBy","CandidateSkill.aggregate","CandidateEducation.findUnique","CandidateEducation.findUniqueOrThrow","CandidateEducation.findFirst","CandidateEducation.findFirstOrThrow","CandidateEducation.findMany","CandidateEducation.createOne","CandidateEducation.createMany","CandidateEducation.createManyAndReturn","CandidateEducation.updateOne","CandidateEducation.updateMany","CandidateEducation.updateManyAndReturn","CandidateEducation.upsertOne","CandidateEducation.deleteOne","CandidateEducation.deleteMany","CandidateEducation.groupBy","CandidateEducation.aggregate","CandidateProject.findUnique","CandidateProject.findUniqueOrThrow","CandidateProject.findFirst","CandidateProject.findFirstOrThrow","CandidateProject.findMany","CandidateProject.createOne","CandidateProject.createMany","CandidateProject.createManyAndReturn","CandidateProject.updateOne","CandidateProject.updateMany","CandidateProject.updateManyAndReturn","CandidateProject.upsertOne","CandidateProject.deleteOne","CandidateProject.deleteMany","CandidateProject.groupBy","CandidateProject.aggregate","CandidateCertification.findUnique","CandidateCertification.findUniqueOrThrow","CandidateCertification.findFirst","CandidateCertification.findFirstOrThrow","CandidateCertification.findMany","CandidateCertification.createOne","CandidateCertification.createMany","CandidateCertification.createManyAndReturn","CandidateCertification.updateOne","CandidateCertification.updateMany","CandidateCertification.updateManyAndReturn","CandidateCertification.upsertOne","CandidateCertification.deleteOne","CandidateCertification.deleteMany","CandidateCertification.groupBy","CandidateCertification.aggregate","Company.findUnique","Company.findUniqueOrThrow","Company.findFirst","Company.findFirstOrThrow","Company.findMany","Company.createOne","Company.createMany","Company.createManyAndReturn","Company.updateOne","Company.updateMany","Company.updateManyAndReturn","Company.upsertOne","Company.deleteOne","Company.deleteMany","Company.groupBy","Company.aggregate","Job.findUnique","Job.findUniqueOrThrow","Job.findFirst","Job.findFirstOrThrow","Job.findMany","Job.createOne","Job.createMany","Job.createManyAndReturn","Job.updateOne","Job.updateMany","Job.updateManyAndReturn","Job.upsertOne","Job.deleteOne","Job.deleteMany","Job.groupBy","Job.aggregate","JobSkill.findUnique","JobSkill.findUniqueOrThrow","JobSkill.findFirst","JobSkill.findFirstOrThrow","JobSkill.findMany","JobSkill.createOne","JobSkill.createMany","JobSkill.createManyAndReturn","JobSkill.updateOne","JobSkill.updateMany","JobSkill.updateManyAndReturn","JobSkill.upsertOne","JobSkill.deleteOne","JobSkill.deleteMany","JobSkill.groupBy","JobSkill.aggregate","JobMatch.findUnique","JobMatch.findUniqueOrThrow","JobMatch.findFirst","JobMatch.findFirstOrThrow","JobMatch.findMany","JobMatch.createOne","JobMatch.createMany","JobMatch.createManyAndReturn","JobMatch.updateOne","JobMatch.updateMany","JobMatch.updateManyAndReturn","JobMatch.upsertOne","JobMatch.deleteOne","JobMatch.deleteMany","JobMatch.groupBy","JobMatch.aggregate","SkillGapAnalysis.findUnique","SkillGapAnalysis.findUniqueOrThrow","SkillGapAnalysis.findFirst","SkillGapAnalysis.findFirstOrThrow","SkillGapAnalysis.findMany","SkillGapAnalysis.createOne","SkillGapAnalysis.createMany","SkillGapAnalysis.createManyAndReturn","SkillGapAnalysis.updateOne","SkillGapAnalysis.updateMany","SkillGapAnalysis.updateManyAndReturn","SkillGapAnalysis.upsertOne","SkillGapAnalysis.deleteOne","SkillGapAnalysis.deleteMany","SkillGapAnalysis.groupBy","SkillGapAnalysis.aggregate","JobApplication.findUnique","JobApplication.findUniqueOrThrow","JobApplication.findFirst","JobApplication.findFirstOrThrow","JobApplication.findMany","JobApplication.createOne","JobApplication.createMany","JobApplication.createManyAndReturn","JobApplication.updateOne","JobApplication.updateMany","JobApplication.updateManyAndReturn","JobApplication.upsertOne","JobApplication.deleteOne","JobApplication.deleteMany","JobApplication.groupBy","JobApplication.aggregate","ApplicationStatusHistory.findUnique","ApplicationStatusHistory.findUniqueOrThrow","ApplicationStatusHistory.findFirst","ApplicationStatusHistory.findFirstOrThrow","ApplicationStatusHistory.findMany","ApplicationStatusHistory.createOne","ApplicationStatusHistory.createMany","ApplicationStatusHistory.createManyAndReturn","ApplicationStatusHistory.updateOne","ApplicationStatusHistory.updateMany","ApplicationStatusHistory.updateManyAndReturn","ApplicationStatusHistory.upsertOne","ApplicationStatusHistory.deleteOne","ApplicationStatusHistory.deleteMany","ApplicationStatusHistory.groupBy","ApplicationStatusHistory.aggregate","InterviewSession.findUnique","InterviewSession.findUniqueOrThrow","InterviewSession.findFirst","InterviewSession.findFirstOrThrow","InterviewSession.findMany","InterviewSession.createOne","InterviewSession.createMany","InterviewSession.createManyAndReturn","InterviewSession.updateOne","InterviewSession.updateMany","InterviewSession.updateManyAndReturn","InterviewSession.upsertOne","InterviewSession.deleteOne","InterviewSession.deleteMany","InterviewSession.groupBy","InterviewSession.aggregate","InterviewAnswer.findUnique","InterviewAnswer.findUniqueOrThrow","InterviewAnswer.findFirst","InterviewAnswer.findFirstOrThrow","InterviewAnswer.findMany","InterviewAnswer.createOne","InterviewAnswer.createMany","InterviewAnswer.createManyAndReturn","InterviewAnswer.updateOne","InterviewAnswer.updateMany","InterviewAnswer.updateManyAndReturn","InterviewAnswer.upsertOne","InterviewAnswer.deleteOne","InterviewAnswer.deleteMany","InterviewAnswer.groupBy","InterviewAnswer.aggregate","Interview.findUnique","Interview.findUniqueOrThrow","Interview.findFirst","Interview.findFirstOrThrow","Interview.findMany","Interview.createOne","Interview.createMany","Interview.createManyAndReturn","Interview.updateOne","Interview.updateMany","Interview.updateManyAndReturn","Interview.upsertOne","Interview.deleteOne","Interview.deleteMany","Interview.groupBy","Interview.aggregate","ApplicationAssistant.findUnique","ApplicationAssistant.findUniqueOrThrow","ApplicationAssistant.findFirst","ApplicationAssistant.findFirstOrThrow","ApplicationAssistant.findMany","ApplicationAssistant.createOne","ApplicationAssistant.createMany","ApplicationAssistant.createManyAndReturn","ApplicationAssistant.updateOne","ApplicationAssistant.updateMany","ApplicationAssistant.updateManyAndReturn","ApplicationAssistant.upsertOne","ApplicationAssistant.deleteOne","ApplicationAssistant.deleteMany","ApplicationAssistant.groupBy","ApplicationAssistant.aggregate","Resume.findUnique","Resume.findUniqueOrThrow","Resume.findFirst","Resume.findFirstOrThrow","Resume.findMany","Resume.createOne","Resume.createMany","Resume.createManyAndReturn","Resume.updateOne","Resume.updateMany","Resume.updateManyAndReturn","Resume.upsertOne","Resume.deleteOne","Resume.deleteMany","Resume.groupBy","Resume.aggregate","ResumeAnalysis.findUnique","ResumeAnalysis.findUniqueOrThrow","ResumeAnalysis.findFirst","ResumeAnalysis.findFirstOrThrow","ResumeAnalysis.findMany","ResumeAnalysis.createOne","ResumeAnalysis.createMany","ResumeAnalysis.createManyAndReturn","ResumeAnalysis.updateOne","ResumeAnalysis.updateMany","ResumeAnalysis.updateManyAndReturn","ResumeAnalysis.upsertOne","ResumeAnalysis.deleteOne","ResumeAnalysis.deleteMany","ResumeAnalysis.groupBy","ResumeAnalysis.aggregate","ResumeChunk.findUnique","ResumeChunk.findUniqueOrThrow","ResumeChunk.findFirst","ResumeChunk.findFirstOrThrow","ResumeChunk.findMany","ResumeChunk.createOne","ResumeChunk.createMany","ResumeChunk.createManyAndReturn","ResumeChunk.updateOne","ResumeChunk.updateMany","ResumeChunk.updateManyAndReturn","ResumeChunk.upsertOne","ResumeChunk.deleteOne","ResumeChunk.deleteMany","ResumeChunk.groupBy","ResumeChunk.aggregate","ResumeSummary.findUnique","ResumeSummary.findUniqueOrThrow","ResumeSummary.findFirst","ResumeSummary.findFirstOrThrow","ResumeSummary.findMany","ResumeSummary.createOne","ResumeSummary.createMany","ResumeSummary.createManyAndReturn","ResumeSummary.updateOne","ResumeSummary.updateMany","ResumeSummary.updateManyAndReturn","ResumeSummary.upsertOne","ResumeSummary.deleteOne","ResumeSummary.deleteMany","ResumeSummary.groupBy","ResumeSummary.aggregate","AND","OR","NOT","id","resumeId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","chunkText","chunkIndex","overallScore","skillsScore","experienceScore","educationScore","projectsScore","certificationsScore","strengths","weaknesses","suggestions","missingSkills","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","candidateId","fileName","fileUrl","publicId","fileType","fileSize","rawText","parsedData","candidateProfileId","jobId","matchScore","recommendation","applicationTips","jobApplicationId","scheduledById","scheduledAt","durationMinutes","InterviewType","type","InterviewStatus","status","meetingUrl","title","notes","sessionId","question","candidateAnswer","technicalAccuracy","communication","confidence","completeness","feedback","experienceLevel","interviewType","currentQuestion","applicationId","ApplicationStatus","oldStatus","newStatus","changedById","changedAt","coverLetter","skillMatchPercentage","matchedSkills","highPriority","mediumPriority","lowPriority","learningPath","semanticScore","keywordScore","name","priority","companyId","description","location","image","RemoteType","remoteType","EmploymentType","employmentType","ExperienceLevel","salaryMin","salaryMax","salaryCurrency","deadline","JobStatus","publishedAt","closedAt","website","userId","every","some","none","issuer","issueDate","credentialUrl","technologies","projectUrl","institution","degree","field","startYear","endYear","phone","bio","experience","linkedin","github","portfolio","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","email","emailVerified","Role","role","UserStatus","needPasswordChange","isDeleted","deletedAt","complaintId","amount","currency","reason","PenaltyStatus","stripePaymentIntentId","dueDate","paidAt","submittedById","ComplaintType","ComplaintStatus","ComplaintDecision","decision","adminNote","reviewedById","reviewedAt","NotificationType","NotificationChannel","channel","NotificationStatus","message","interviewId","readAt","conversationId","joinedAt","senderId","content","isAutomatic","conversationId_userId","candidateProfileId_jobId","candidateId_jobId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "jRGjAoAEChYAAKAIACAgAAD9BwAgMAAA_gcAILkEAACfCAAwugQAAJ0BABC7BAAAnwgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh6gQBAAAAAQEAAAABACARCAAA1wcAIAoAAMgIACAQAADfBwAgGgAA0AcAICMAAP8HACAuAADQCAAgLwAA0QgAILkEAADPCAAwugQAAAMAELsEAADPCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAhAQAAAAMAIAsDAADXBwAguQQAAOEIADC6BAAABQAQuwQAAOEIADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACGUBQEAzAcAIaYFAQDMBwAhpwVAAPcHACGoBQEAzAcAIQUDAADDDAAglAUAAPkIACCmBQAA-QgAIKcFAAD5CAAgqAUAAPkIACALAwAA1wcAILkEAADhCAAwugQAAAUAELsEAADhCAAwvAQBAAAAAd0EAQCKBwAhjwUBAIoHACGUBQEAzAcAIaYFAQDMBwAhpwVAAPcHACGoBQEAzAcAIQMAAAAFACABAAAGADACAAAHACALAwAA1wcAILkEAADgCAAwugQAAAkAELsEAADgCAAwvAQBAIoHACHdBAEAigcAIasFAQCKBwAhrAUBAMwHACGtBQEAzAcAIa4FAgCnCAAhrwUCAKcIACEFAwAAwwwAIKwFAAD5CAAgrQUAAPkIACCuBQAA-QgAIK8FAAD5CAAgCwMAANcHACC5BAAA4AgAMLoEAAAJABC7BAAA4AgAMLwEAQAAAAHdBAEAigcAIasFAQCKBwAhrAUBAMwHACGtBQEAzAcAIa4FAgCnCAAhrwUCAKcIACEDAAAACQAgAQAACgAwAgAACwAgEQYAAM0HACC5BAAA3wgAMLoEAAANABC7BAAA3wgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIaIFAQCKBwAhuQUBAIoHACG6BQEAigcAIbsFAQDMBwAhvAUBAMwHACG9BQEAzAcAIb4FQAD3BwAhvwVAAPcHACHABQEAzAcAIcEFAQDMBwAhCAYAAKQMACC7BQAA-QgAILwFAAD5CAAgvQUAAPkIACC-BQAA-QgAIL8FAAD5CAAgwAUAAPkIACDBBQAA-QgAIBEGAADNBwAguQQAAN8IADC6BAAADQAQuwQAAN8IADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIaIFAQCKBwAhuQUBAIoHACG6BQEAigcAIbsFAQDMBwAhvAUBAMwHACG9BQEAzAcAIb4FQAD3BwAhvwVAAPcHACHABQEAzAcAIcEFAQDMBwAhAwAAAA0AIAEAAA4AMAIAAA8AIBsEAADaBwAgBQAA2wcAIAYAAM0HACAOAADhBwAgEAAA3wcAIBMAAOQHACAUAADiBwAgGgAA0AcAICQAANwHACAlAADdBwAgKgAA3gcAICsAAOAHACAsAADjBwAguQQAANkHADC6BAAAEQAQuwQAANkHADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGTBQEAzAcAIaIFAQCKBwAhsAUBAMwHACGxBQEAzAcAIbIFAQDMBwAhswUBAMwHACG0BQEAzAcAIbUFAQDMBwAhAQAAABEAIAwGAADNBwAguQQAAN4IADC6BAAAEwAQuwQAAN4IADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGiBQEAigcAIbgFQACLBwAhwgUBAIoHACHDBQEAzAcAIcQFAQDMBwAhAwYAAKQMACDDBQAA-QgAIMQFAAD5CAAgDAYAAM0HACC5BAAA3ggAMLoEAAATABC7BAAA3ggAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG4BUAAiwcAIcIFAQAAAAHDBQEAzAcAIcQFAQDMBwAhAwAAABMAIAEAABQAMAIAABUAIA4GAADNBwAgGgAA0AcAIBsAAM4HACAcAADPBwAguQQAAMsHADC6BAAAFwAQuwQAAMsHADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGPBQEAigcAIZIFAQDMBwAhoQUBAMwHACGiBQEAigcAIQEAAAAXACAdCwAA3QgAIAwAAOAHACANAAC9CAAgDgAA4QcAIBAAAN8HACATAADkBwAgFAAA4gcAIBoAANAHACC5BAAA2AgAMLoEAAAZABC7BAAA2AgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIfEEAADcCJ8FIvMEAQCKBwAh_QQAANsImgUikQUBAIoHACGSBQEAigcAIZMFAQCKBwAhlAUBAMwHACGWBQAA2QiWBSKYBQAA2giYBSKaBQgAyggAIZsFCADKCAAhnAUBAMwHACGdBUAAiwcAIZ8FQAD3BwAhoAVAAPcHACEOCwAAkQ8AIAwAAN4NACANAADiDgAgDgAA3w0AIBAAAN0NACATAADiDQAgFAAA4A0AIBoAAKcMACCUBQAA-QgAIJoFAAD5CAAgmwUAAPkIACCcBQAA-QgAIJ8FAAD5CAAgoAUAAPkIACAdCwAA3QgAIAwAAOAHACANAAC9CAAgDgAA4QcAIBAAAN8HACATAADkBwAgFAAA4gcAIBoAANAHACC5BAAA2AgAMLoEAAAZABC7BAAA2AgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh8QQAANwInwUi8wQBAIoHACH9BAAA2wiaBSKRBQEAigcAIZIFAQCKBwAhkwUBAIoHACGUBQEAzAcAIZYFAADZCJYFIpgFAADaCJgFIpoFCADKCAAhmwUIAMoIACGcBQEAzAcAIZ0FQACLBwAhnwVAAPcHACGgBUAA9wcAIQMAAAAZACABAAAaADACAAAbACAICgAAyAgAILkEAADXCAAwugQAAB0AELsEAADXCAAwvAQBAIoHACHmBAEAigcAIY8FAQCKBwAhkAUBAIoHACEBCgAAig8AIAgKAADICAAguQQAANcIADC6BAAAHQAQuwQAANcIADC8BAEAAAAB5gQBAIoHACGPBQEAigcAIZAFAQCKBwAhAwAAAB0AIAEAAB4AMAIAAB8AIBMDAADXBwAgCgAAyAgAILkEAADVCAAwugQAACEAELsEAADVCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhzQQIANYIACHOBAgA1ggAIc8ECADWCAAh0AQIANYIACHWBAAAlgcAIN0EAQCKBwAh5gQBAIoHACHoBAEAigcAIYgFAACWBwAgjQUIANYIACGOBQgA1ggAIQIDAADDDAAgCgAAig8AIBQDAADXBwAgCgAAyAgAILkEAADVCAAwugQAACEAELsEAADVCAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHNBAgA1ggAIc4ECADWCAAhzwQIANYIACHQBAgA1ggAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIegEAQCKBwAhiAUAAJYHACCNBQgA1ggAIY4FCADWCAAh6wUAANQIACADAAAAIQAgAQAAIgAwAgAAIwAgEQMAANcHACAKAADICAAgDgAA4QcAILkEAADTCAAwugQAACUAELsEAADTCAAwvAQBAIoHACG-BEAAiwcAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIYcFAgCVBwAhiAUAAJYHACCJBQAAlgcAIIoFAACWBwAgiwUAAJYHACCMBQAAlgcAIAMDAADDDAAgCgAAig8AIA4AAN8NACASAwAA1wcAIAoAAMgIACAOAADhBwAguQQAANMIADC6BAAAJQAQuwQAANMIADC8BAEAAAABvgRAAIsHACHWBAAAlgcAIN0EAQCKBwAh5gQBAIoHACGHBQIAlQcAIYgFAACWBwAgiQUAAJYHACCKBQAAlgcAIIsFAACWBwAgjAUAAJYHACDrBQAA0ggAIAMAAAAlACABAAAmADACAAAnACAICAAAwwwAIAoAAIoPACAQAADdDQAgGgAApwwAICMAAOYOACAuAACPDwAgLwAAkA8AIIYFAAD5CAAgEggAANcHACAKAADICAAgEAAA3wcAIBoAANAHACAjAAD_BwAgLgAA0AgAIC8AANEIACC5BAAAzwgAMLoEAAADABC7BAAAzwgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAh6gUAAM4IACADAAAAAwAgAQAAKQAwAgAAKgAgAQAAAAMAIAMAAAADACABAAApADACAAAqACAQCAAA1wcAIAoAAMgIACASAADNCAAguQQAAMwIADC6BAAALgAQuwQAAMwIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHNBAgAyggAIeUEAQCKBwAh5gQBAIoHACHxBAEAigcAIf0EAQCKBwAh_gQBAIoHACH_BAIAlQcAIQQIAADDDAAgCgAAig8AIBIAAI4PACDNBAAA-QgAIBAIAADXBwAgCgAAyAgAIBIAAM0IACC5BAAAzAgAMLoEAAAuABC7BAAAzAgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAhzQQIAMoIACHlBAEAigcAIeYEAQCKBwAh8QQBAIoHACH9BAEAigcAIf4EAQCKBwAh_wQCAJUHACEDAAAALgAgAQAALwAwAgAAMAAgDxEAAMsIACC5BAAAyQgAMLoEAAAyABC7BAAAyQgAMLwEAQCKBwAhvgRAAIsHACHNBAgAyggAIfUEAQCKBwAh9gQBAIoHACH3BAEAigcAIfgECADKCAAh-QQIAMoIACH6BAgAyggAIfsECADKCAAh_AQBAMwHACEHEQAAjQ8AIM0EAAD5CAAg-AQAAPkIACD5BAAA-QgAIPoEAAD5CAAg-wQAAPkIACD8BAAA-QgAIA8RAADLCAAguQQAAMkIADC6BAAAMgAQuwQAAMkIADC8BAEAAAABvgRAAIsHACHNBAgAyggAIfUEAQCKBwAh9gQBAIoHACH3BAEAigcAIfgECADKCAAh-QQIAMoIACH6BAgAyggAIfsECADKCAAh_AQBAMwHACEDAAAAMgAgAQAAMwAwAgAANAAgAQAAADIAIBAIAADXBwAgCgAAyAgAILkEAADHCAAwugQAADcAELsEAADHCAAwvAQBAIoHACG9BAEAzAcAIb4EQACLBwAhvwRAAIsHACHVBAAAlgcAINYEAACWBwAg5QQBAIoHACHmBAEAigcAIecEAgCVBwAh6AQBAIoHACHpBAAAlgcAIAMIAADDDAAgCgAAig8AIL0EAAD5CAAgEQgAANcHACAKAADICAAguQQAAMcIADC6BAAANwAQuwQAAMcIADC8BAEAAAABvQQBAMwHACG-BEAAiwcAIb8EQACLBwAh1QQAAJYHACDWBAAAlgcAIOUEAQCKBwAh5gQBAIoHACHnBAIAlQcAIegEAQCKBwAh6QQAAJYHACDqBQAAxggAIAMAAAA3ACABAAA4ADACAAA5ACAaCAAA-QcAIAoAAMMIACANAAC9CAAgFQAAzQcAIBYAAKAIACAYAADECAAgGQAAxQgAILkEAAC_CAAwugQAADsAELsEAAC_CAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAMwHACHmBAEAzAcAIeoEAQDMBwAh7wQAAMAI1wUi8QQAAMEI2AUi8wQBAIoHACGRBQEAigcAIZIFAQCKBwAh1QUBAIoHACHZBQAAwgjZBSPaBQEAzAcAIdsFAQDMBwAh3AVAAPcHACEOCAAAwwwAIAoAAIoPACANAADiDgAgFQAApAwAIBYAAIQPACAYAACLDwAgGQAAjA8AIOUEAAD5CAAg5gQAAPkIACDqBAAA-QgAINkFAAD5CAAg2gUAAPkIACDbBQAA-QgAINwFAAD5CAAgGggAAPkHACAKAADDCAAgDQAAvQgAIBUAAM0HACAWAACgCAAgGAAAxAgAIBkAAMUIACC5BAAAvwgAMLoEAAA7ABC7BAAAvwgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh5QQBAMwHACHmBAEAzAcAIeoEAQDMBwAh7wQAAMAI1wUi8QQAAMEI2AUi8wQBAIoHACGRBQEAigcAIZIFAQCKBwAh1QUBAIoHACHZBQAAwgjZBSPaBQEAzAcAIdsFAQDMBwAh3AVAAPcHACEDAAAAOwAgAQAAPAAwAgAAPQAgAQAAABEAIAEAAAAZACABAAAAAwAgChcAALwIACC5BAAAvggAMLoEAABCABC7BAAAvggAMLwEAQCKBwAhvgRAAIsHACHeBAEAigcAId8EAQCKBwAh4QQBAIoHACHNBQEAigcAIQEXAACJDwAgChcAALwIACC5BAAAvggAMLoEAABCABC7BAAAvggAMLwEAQAAAAG-BEAAiwcAId4EAQCKBwAh3wQBAIoHACHhBAEAigcAIc0FAQCKBwAhAwAAAEIAIAEAAEMAMAIAAEQAIBENAAC9CAAgFwAAvAgAILkEAAC5CAAwugQAAEYAELsEAAC5CAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAALsI0gUikQUBAIoHACHNBQEAigcAIc4FEAC6CAAhzwUBAIoHACHQBQEAigcAIdIFAQDMBwAh0wVAAPcHACHUBUAA9wcAIQEAAABGACABAAAAQgAgAQAAAB0AIAEAAAAhACABAAAAJQAgAQAAAAMAIAEAAAAuACABAAAANwAgAQAAADsAIAUNAADiDgAgFwAAiQ8AINIFAAD5CAAg0wUAAPkIACDUBQAA-QgAIBENAAC9CAAgFwAAvAgAILkEAAC5CAAwugQAAEYAELsEAAC5CAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHxBAAAuwjSBSKRBQEAigcAIc0FAQAAAAHOBRAAuggAIc8FAQCKBwAh0AUBAIoHACHSBQEAzAcAIdMFQAD3BwAh1AVAAPcHACEDAAAARgAgAQAAUAAwAgAAUQAgAwAAADsAIAEAADwAMAIAAD0AIAEAAAAZACABAAAARgAgAQAAADsAIAMAAAA7ACABAAA8ADACAAA9ACAQBgAAzQcAILkEAAC1CAAwugQAAFgAELsEAAC1CAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh7wQAALYI3gUi8QQAALgI4QUi8wQBAIoHACGABQEAzAcAIaIFAQCKBwAh3wUAALcI3wUi4QUBAIoHACHiBQEAzAcAIeMFQAD3BwAhBAYAAKQMACCABQAA-QgAIOIFAAD5CAAg4wUAAPkIACAQBgAAzQcAILkEAAC1CAAwugQAAFgAELsEAAC1CAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHvBAAAtgjeBSLxBAAAuAjhBSLzBAEAigcAIYAFAQDMBwAhogUBAIoHACHfBQAAtwjfBSLhBQEAigcAIeIFAQDMBwAh4wVAAPcHACEDAAAAWAAgAQAAWQAwAgAAWgAgDR4AALMIACAfAADNBwAguQQAALQIADC6BAAAXAAQuwQAALQIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHjBUAA9wcAIeQFAQCKBwAh5gUBAIoHACHnBQEAigcAIegFIAD0BwAhAx4AAIgPACAfAACkDAAg4wUAAPkIACANHgAAswgAIB8AAM0HACC5BAAAtAgAMLoEAABcABC7BAAAtAgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh4wVAAPcHACHkBQEAigcAIeYFAQCKBwAh5wUBAIoHACHoBSAA9AcAIQMAAABcACABAABdADACAABeACAJBgAAzQcAIB4AALMIACC5BAAAsggAMLoEAABgABC7BAAAsggAMLwEAQCKBwAhogUBAIoHACHkBQEAigcAIeUFQACLBwAhAgYAAKQMACAeAACIDwAgCgYAAM0HACAeAACzCAAguQQAALIIADC6BAAAYAAQuwQAALIIADC8BAEAAAABogUBAIoHACHkBQEAigcAIeUFQACLBwAh6QUAALEIACADAAAAYAAgAQAAYQAwAgAAYgAgERYAAKQIACAiAADNBwAguQQAAK4IADC6BAAAZAAQuwQAAK4IADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHqBAEAigcAIesEAQCKBwAh7ARAAIsHACHtBAIAlQcAIe8EAACvCO8EIvEEAACwCPEEIvIEAQDMBwAh8wQBAMwHACH0BAEAzAcAIQUWAACEDwAgIgAApAwAIPIEAAD5CAAg8wQAAPkIACD0BAAA-QgAIBEWAACkCAAgIgAAzQcAILkEAACuCAAwugQAAGQAELsEAACuCAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHqBAEAigcAIesEAQCKBwAh7ARAAIsHACHtBAIAlQcAIe8EAACvCO8EIvEEAACwCPEEIvIEAQDMBwAh8wQBAMwHACH0BAEAzAcAIQMAAABkACABAABlADACAABmACABAAAADQAgAQAAABMAIAEAAAA7ACABAAAAWAAgAQAAAFwAIAEAAABgACABAAAAZAAgCwMAANcHACC5BAAArQgAMLoEAABvABC7BAAArQgAMLwEAQCKBwAh3QQBAIoHACGPBQEAigcAIZIFAQDMBwAhlAUBAMwHACGpBQEAzAcAIaoFAQDMBwAhBQMAAMMMACCSBQAA-QgAIJQFAAD5CAAgqQUAAPkIACCqBQAA-QgAIAsDAADXBwAguQQAAK0IADC6BAAAbwAQuwQAAK0IADC8BAEAAAAB3QQBAIoHACGPBQEAigcAIZIFAQDMBwAhlAUBAMwHACGpBQEAzAcAIaoFAQDMBwAhAwAAAG8AIAEAAHAAMAIAAHEAIAcDAADXBwAguQQAAKwIADC6BAAAcwAQuwQAAKwIADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACEBAwAAwwwAIAcDAADXBwAguQQAAKwIADC6BAAAcwAQuwQAAKwIADC8BAEAAAAB3QQBAIoHACGPBQEAigcAIQMAAABzACABAAB0ADACAAB1ACASAwAA1wcAICcAAKkIACAoAACqCAAgKQAAqwgAILkEAACmCAAwugQAAHcAELsEAACmCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh3QQBAIoHACHeBAEAigcAId8EAQCKBwAh4AQBAIoHACHhBAEAigcAIeIEAgCnCAAh4wQBAMwHACHkBAAAqAgAIAcDAADDDAAgJwAAhQ8AICgAAIYPACApAACHDwAg4gQAAPkIACDjBAAA-QgAIOQEAAD5CAAgEgMAANcHACAnAACpCAAgKAAAqggAICkAAKsIACC5BAAApggAMLoEAAB3ABC7BAAApggAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh3QQBAIoHACHeBAEAigcAId8EAQCKBwAh4AQBAIoHACHhBAEAigcAIeIEAgCnCAAh4wQBAMwHACHkBAAAqAgAIAMAAAB3ACABAAB4ADACAAB5ACAJJgAAjAcAICcBAIoHACG5BAAAiQcAMLoEAAB7ABC7BAAAiQcAMLwEAQCKBwAhvQQBAIoHACG-BEAAiwcAIb8EQACLBwAhAQAAAHsAIBImAACMBwAguQQAAJQHADC6BAAAfQAQuwQAAJQHADC8BAEAigcAIb0EAQCKBwAhvgRAAIsHACG_BEAAiwcAIc0EAgCVBwAhzgQCAJUHACHPBAIAlQcAIdAEAgCVBwAh0QQCAJUHACHSBAIAlQcAIdMEAACWBwAg1AQAAJYHACDVBAAAlgcAINYEAACWBwAgAQAAAH0AIAkmAACMBwAguQQAAKUIADC6BAAAfwAQuwQAAKUIADC8BAEAigcAIb0EAQCKBwAhvgRAAIsHACHLBAEAigcAIcwEAgCVBwAhASYAAOkIACAJJgAAjAcAILkEAAClCAAwugQAAH8AELsEAAClCAAwvAQBAAAAAb0EAQCKBwAhvgRAAIsHACHLBAEAigcAIcwEAgCVBwAhAwAAAH8AIAEAAIABADACAACBAQAgAQAAAH8AIAMAAAAlACABAAAmADACAAAnACADAAAAIQAgAQAAIgAwAgAAIwAgAwAAAAMAIAEAACkAMAIAACoAIAMAAAA3ACABAAA4ADACAAA5ACAICAAA1wcAILkEAADWBwAwugQAAIgBABC7BAAA1gcAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeUEAQCKBwAhAQAAAIgBACADAAAAOwAgAQAAPAAwAgAAPQAgAwAAAC4AIAEAAC8AMAIAADAAIAEAAAAFACABAAAACQAgAQAAAG8AIAEAAABzACABAAAAdwAgAQAAACUAIAEAAAAhACABAAAAAwAgAQAAADcAIAEAAAA7ACABAAAALgAgAwAAACUAIAEAACYAMAIAACcAIAotAACkCAAguQQAAKEIADC6BAAAmAEAELsEAAChCAAwvAQBAIoHACGABQEAigcAIYIFAACiCIIFI4MFAACjCIIFIoQFAQCKBwAhhQVAAIsHACECLQAAhA8AIIIFAAD5CAAgCi0AAKQIACC5BAAAoQgAMLoEAACYAQAQuwQAAKEIADC8BAEAAAABgAUBAIoHACGCBQAAogiCBSODBQAAowiCBSKEBQEAigcAIYUFQACLBwAhAwAAAJgBACABAACZAQAwAgAAmgEAIAMAAAA7ACABAAA8ADACAAA9ACAKFgAAoAgAICAAAP0HACAwAAD-BwAguQQAAJ8IADC6BAAAnQEAELsEAACfCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh6gQBAMwHACEEFgAAhA8AICAAAOQOACAwAADlDgAg6gQAAPkIACADAAAAnQEAIAEAAJ4BADACAAABACADAAAAZAAgAQAAZQAwAgAAZgAgAQAAACUAIAEAAACYAQAgAQAAADsAIAEAAACdAQAgAQAAAGQAIAMAAABgACABAABhADACAABiACADAAAAXAAgAQAAXQAwAgAAXgAgAQAAAGAAIAEAAABcACABAAAAAQAgAwAAAJ0BACABAACeAQAwAgAAAQAgAwAAAJ0BACABAACeAQAwAgAAAQAgAwAAAJ0BACABAACeAQAwAgAAAQAgBxYAAIMPACAgAACcCgAgMAAAmwoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeoEAQAAAAEBNgAArgEAIAS8BAEAAAABvgRAAAAAAb8EQAAAAAHqBAEAAAABATYAALABADABNgAAsAEAMAEAAAADACAHFgAAgg8AICAAAPsJACAwAAD6CQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6gQBAIAJACECAAAAAQAgNgAAtAEAIAS8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHqBAEAgAkAIQIAAACdAQAgNgAAtgEAIAIAAACdAQAgNgAAtgEAIAEAAAADACADAAAAAQAgPQAArgEAID4AALQBACABAAAAAQAgAQAAAJ0BACAEDwAA_w4AIEMAAIEPACBEAACADwAg6gQAAPkIACAHuQQAAJ4IADC6BAAAvgEAELsEAACeCAAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh6gQBAJkHACEDAAAAnQEAIAEAAL0BADBCAAC-AQAgAwAAAJ0BACABAACeAQAwAgAAAQAgAQAAAF4AIAEAAABeACADAAAAXAAgAQAAXQAwAgAAXgAgAwAAAFwAIAEAAF0AMAIAAF4AIAMAAABcACABAABdADACAABeACAKHgAAnA4AIB8AAIsKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHjBUAAAAAB5AUBAAAAAeYFAQAAAAHnBQEAAAAB6AUgAAAAAQE2AADGAQAgCLwEAQAAAAG-BEAAAAABvwRAAAAAAeMFQAAAAAHkBQEAAAAB5gUBAAAAAecFAQAAAAHoBSAAAAABATYAAMgBADABNgAAyAEAMAoeAACaDgAgHwAAiQoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeMFQACHCgAh5AUBAOUIACHmBQEA5QgAIecFAQDlCAAh6AUgAIYKACECAAAAXgAgNgAAywEAIAi8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHjBUAAhwoAIeQFAQDlCAAh5gUBAOUIACHnBQEA5QgAIegFIACGCgAhAgAAAFwAIDYAAM0BACACAAAAXAAgNgAAzQEAIAMAAABeACA9AADGAQAgPgAAywEAIAEAAABeACABAAAAXAAgBA8AAPwOACBDAAD-DgAgRAAA_Q4AIOMFAAD5CAAgC7kEAACdCAAwugQAANQBABC7BAAAnQgAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIeMFQAC_BwAh5AUBAIIHACHmBQEAggcAIecFAQCCBwAh6AUgAOoHACEDAAAAXAAgAQAA0wEAMEIAANQBACADAAAAXAAgAQAAXQAwAgAAXgAgAQAAAGIAIAEAAABiACADAAAAYAAgAQAAYQAwAgAAYgAgAwAAAGAAIAEAAGEAMAIAAGIAIAMAAABgACABAABhADACAABiACAGBgAAmQoAIB4AAJEOACC8BAEAAAABogUBAAAAAeQFAQAAAAHlBUAAAAABATYAANwBACAEvAQBAAAAAaIFAQAAAAHkBQEAAAAB5QVAAAAAAQE2AADeAQAwATYAAN4BADAGBgAAlwoAIB4AAI8OACC8BAEA5QgAIaIFAQDlCAAh5AUBAOUIACHlBUAA5ggAIQIAAABiACA2AADhAQAgBLwEAQDlCAAhogUBAOUIACHkBQEA5QgAIeUFQADmCAAhAgAAAGAAIDYAAOMBACACAAAAYAAgNgAA4wEAIAMAAABiACA9AADcAQAgPgAA4QEAIAEAAABiACABAAAAYAAgAw8AAPkOACBDAAD7DgAgRAAA-g4AIAe5BAAAnAgAMLoEAADqAQAQuwQAAJwIADC8BAEAggcAIaIFAQCCBwAh5AUBAIIHACHlBUAAgwcAIQMAAABgACABAADpAQAwQgAA6gEAIAMAAABgACABAABhADACAABiACABAAAAWgAgAQAAAFoAIAMAAABYACABAABZADACAABaACADAAAAWAAgAQAAWQAwAgAAWgAgAwAAAFgAIAEAAFkAMAIAAFoAIA0GAAD4DgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB7wQAAADeBQLxBAAAAOEFAvMEAQAAAAGABQEAAAABogUBAAAAAd8FAAAA3wUC4QUBAAAAAeIFAQAAAAHjBUAAAAABATYAAPIBACAMvAQBAAAAAb4EQAAAAAG_BEAAAAAB7wQAAADeBQLxBAAAAOEFAvMEAQAAAAGABQEAAAABogUBAAAAAd8FAAAA3wUC4QUBAAAAAeIFAQAAAAHjBUAAAAABATYAAPQBADABNgAA9AEAMA0GAAD3DgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh7wQAAKcO3gUi8QQAAKkO4QUi8wQBAOUIACGABQEAgAkAIaIFAQDlCAAh3wUAAKgO3wUi4QUBAOUIACHiBQEAgAkAIeMFQACHCgAhAgAAAFoAIDYAAPcBACAMvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh7wQAAKcO3gUi8QQAAKkO4QUi8wQBAOUIACGABQEAgAkAIaIFAQDlCAAh3wUAAKgO3wUi4QUBAOUIACHiBQEAgAkAIeMFQACHCgAhAgAAAFgAIDYAAPkBACACAAAAWAAgNgAA-QEAIAMAAABaACA9AADyAQAgPgAA9wEAIAEAAABaACABAAAAWAAgBg8AAPQOACBDAAD2DgAgRAAA9Q4AIIAFAAD5CAAg4gUAAPkIACDjBQAA-QgAIA-5BAAAkggAMLoEAACAAgAQuwQAAJIIADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHvBAAAkwjeBSLxBAAAlQjhBSLzBAEAggcAIYAFAQCZBwAhogUBAIIHACHfBQAAlAjfBSLhBQEAggcAIeIFAQCZBwAh4wVAAL8HACEDAAAAWAAgAQAA_wEAMEIAAIACACADAAAAWAAgAQAAWQAwAgAAWgAgAQAAAD0AIAEAAAA9ACADAAAAOwAgAQAAPAAwAgAAPQAgAwAAADsAIAEAADwAMAIAAD0AIAMAAAA7ACABAAA8ADACAAA9ACAXCAAAxwoAIAoAAMoKACANAADJCgAgFQAAyAoAIBYAAKsLACAYAADLCgAgGQAAzAoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEBNgAAiAIAIBC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAeoEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZEFAQAAAAGSBQEAAAAB1QUBAAAAAdkFAAAA2QUD2gUBAAAAAdsFAQAAAAHcBUAAAAABATYAAIoCADABNgAAigIAMAEAAAARACABAAAAGQAgAQAAAAMAIBcIAACrCgAgCgAArgoAIA0AAK0KACAVAACsCgAgFgAAqQsAIBgAAK8KACAZAACwCgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGRBQEA5QgAIZIFAQDlCAAh1QUBAOUIACHZBQAAqQrZBSPaBQEAgAkAIdsFAQCACQAh3AVAAIcKACECAAAAPQAgNgAAkAIAIBC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEAgAkAIeYEAQCACQAh6gQBAIAJACHvBAAApwrXBSLxBAAAqArYBSLzBAEA5QgAIZEFAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIQIAAAA7ACA2AACSAgAgAgAAADsAIDYAAJICACABAAAAEQAgAQAAABkAIAEAAAADACADAAAAPQAgPQAAiAIAID4AAJACACABAAAAPQAgAQAAADsAIAoPAADxDgAgQwAA8w4AIEQAAPIOACDlBAAA-QgAIOYEAAD5CAAg6gQAAPkIACDZBQAA-QgAINoFAAD5CAAg2wUAAPkIACDcBQAA-QgAIBO5BAAAiAgAMLoEAACcAgAQuwQAAIgIADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHlBAEAmQcAIeYEAQCZBwAh6gQBAJkHACHvBAAAiQjXBSLxBAAAigjYBSLzBAEAggcAIZEFAQCCBwAhkgUBAIIHACHVBQEAggcAIdkFAACLCNkFI9oFAQCZBwAh2wUBAJkHACHcBUAAvwcAIQMAAAA7ACABAACbAgAwQgAAnAIAIAMAAAA7ACABAAA8ADACAAA9ACABAAAAUQAgAQAAAFEAIAMAAABGACABAABQADACAABRACADAAAARgAgAQAAUAAwAgAAUQAgAwAAAEYAIAEAAFAAMAIAAFEAIA4NAAC5CgAgFwAAkwwAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAA0gUCkQUBAAAAAc0FAQAAAAHOBRAAAAABzwUBAAAAAdAFAQAAAAHSBQEAAAAB0wVAAAAAAdQFQAAAAAEBNgAApAIAIAy8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAANIFApEFAQAAAAHNBQEAAAABzgUQAAAAAc8FAQAAAAHQBQEAAAAB0gUBAAAAAdMFQAAAAAHUBUAAAAABATYAAKYCADABNgAApgIAMA4NAAC4CgAgFwAAkQwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAC3CtIFIpEFAQDlCAAhzQUBAOUIACHOBRAAtgoAIc8FAQDlCAAh0AUBAOUIACHSBQEAgAkAIdMFQACHCgAh1AVAAIcKACECAAAAUQAgNgAAqQIAIAy8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAAtwrSBSKRBQEA5QgAIc0FAQDlCAAhzgUQALYKACHPBQEA5QgAIdAFAQDlCAAh0gUBAIAJACHTBUAAhwoAIdQFQACHCgAhAgAAAEYAIDYAAKsCACACAAAARgAgNgAAqwIAIAMAAABRACA9AACkAgAgPgAAqQIAIAEAAABRACABAAAARgAgCA8AAOwOACBDAADvDgAgRAAA7g4AIJUBAADtDgAglgEAAPAOACDSBQAA-QgAINMFAAD5CAAg1AUAAPkIACAPuQQAAIEIADC6BAAAsgIAELsEAACBCAAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh8QQAAIMI0gUikQUBAIIHACHNBQEAggcAIc4FEACCCAAhzwUBAIIHACHQBQEAggcAIdIFAQCZBwAh0wVAAL8HACHUBUAAvwcAIQMAAABGACABAACxAgAwQgAAsgIAIAMAAABGACABAABQADACAABRACABAAAARAAgAQAAAEQAIAMAAABCACABAABDADACAABEACADAAAAQgAgAQAAQwAwAgAARAAgAwAAAEIAIAEAAEMAMAIAAEQAIAcXAADrDgAgvAQBAAAAAb4EQAAAAAHeBAEAAAAB3wQBAAAAAeEEAQAAAAHNBQEAAAABATYAALoCACAGvAQBAAAAAb4EQAAAAAHeBAEAAAAB3wQBAAAAAeEEAQAAAAHNBQEAAAABATYAALwCADABNgAAvAIAMAcXAADqDgAgvAQBAOUIACG-BEAA5ggAId4EAQDlCAAh3wQBAOUIACHhBAEA5QgAIc0FAQDlCAAhAgAAAEQAIDYAAL8CACAGvAQBAOUIACG-BEAA5ggAId4EAQDlCAAh3wQBAOUIACHhBAEA5QgAIc0FAQDlCAAhAgAAAEIAIDYAAMECACACAAAAQgAgNgAAwQIAIAMAAABEACA9AAC6AgAgPgAAvwIAIAEAAABEACABAAAAQgAgAw8AAOcOACBDAADpDgAgRAAA6A4AIAm5BAAAgAgAMLoEAADIAgAQuwQAAIAIADC8BAEAggcAIb4EQACDBwAh3gQBAIIHACHfBAEAggcAIeEEAQCCBwAhzQUBAIIHACEDAAAAQgAgAQAAxwIAMEIAAMgCACADAAAAQgAgAQAAQwAwAgAARAAgGAcAAPgHACAIAAD5BwAgCQAA-gcAIA0AAPsHACAaAADQBwAgHQAA_AcAICAAAP0HACAhAAD-BwAgIwAA_wcAILkEAADzBwAwugQAAM4CABC7BAAA8wcAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh8QQAAPYHygUijwUBAIoHACGUBQEAzAcAIcUFAQAAAAHGBSAA9AcAIcgFAAD1B8gFIsoFIAD0BwAhywUgAPQHACHMBUAA9wcAIQEAAADLAgAgAQAAAMsCACAYBwAA-AcAIAgAAPkHACAJAAD6BwAgDQAA-wcAIBoAANAHACAdAAD8BwAgIAAA_QcAICEAAP4HACAjAAD_BwAguQQAAPMHADC6BAAAzgIAELsEAADzBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAAPYHygUijwUBAIoHACGUBQEAzAcAIcUFAQCKBwAhxgUgAPQHACHIBQAA9QfIBSLKBSAA9AcAIcsFIAD0BwAhzAVAAPcHACELBwAA4A4AIAgAAMMMACAJAADhDgAgDQAA4g4AIBoAAKcMACAdAADjDgAgIAAA5A4AICEAAOUOACAjAADmDgAglAUAAPkIACDMBQAA-QgAIAMAAADOAgAgAQAAzwIAMAIAAMsCACADAAAAzgIAIAEAAM8CADACAADLAgAgAwAAAM4CACABAADPAgAwAgAAywIAIBUHAADXDgAgCAAA2A4AIAkAANkOACANAADaDgAgGgAA2w4AIB0AANwOACAgAADdDgAgIQAA3g4AICMAAN8OACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAMoFAo8FAQAAAAGUBQEAAAABxQUBAAAAAcYFIAAAAAHIBQAAAMgFAsoFIAAAAAHLBSAAAAABzAVAAAAAAQE2AADTAgAgDLwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAygUCjwUBAAAAAZQFAQAAAAHFBQEAAAABxgUgAAAAAcgFAAAAyAUCygUgAAAAAcsFIAAAAAHMBUAAAAABATYAANUCADABNgAA1QIAMBUHAAD1DQAgCAAA9g0AIAkAAPcNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIQIAAADLAgAgNgAA2AIAIAy8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIQIAAADOAgAgNgAA2gIAIAIAAADOAgAgNgAA2gIAIAMAAADLAgAgPQAA0wIAID4AANgCACABAAAAywIAIAEAAADOAgAgBQ8AAPANACBDAADyDQAgRAAA8Q0AIJQFAAD5CAAgzAUAAPkIACAPuQQAAOkHADC6BAAA4QIAELsEAADpBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh8QQAAOwHygUijwUBAIIHACGUBQEAmQcAIcUFAQCCBwAhxgUgAOoHACHIBQAA6wfIBSLKBSAA6gcAIcsFIADqBwAhzAVAAL8HACEDAAAAzgIAIAEAAOACADBCAADhAgAgAwAAAM4CACABAADPAgAwAgAAywIAIAEAAAAVACABAAAAFQAgAwAAABMAIAEAABQAMAIAABUAIAMAAAATACABAAAUADACAAAVACADAAAAEwAgAQAAFAAwAgAAFQAgCQYAAO8NACC8BAEAAAABvgRAAAAAAb8EQAAAAAGiBQEAAAABuAVAAAAAAcIFAQAAAAHDBQEAAAABxAUBAAAAAQE2AADpAgAgCLwEAQAAAAG-BEAAAAABvwRAAAAAAaIFAQAAAAG4BUAAAAABwgUBAAAAAcMFAQAAAAHEBQEAAAABATYAAOsCADABNgAA6wIAMAkGAADuDQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhogUBAOUIACG4BUAA5ggAIcIFAQDlCAAhwwUBAIAJACHEBQEAgAkAIQIAAAAVACA2AADuAgAgCLwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIaIFAQDlCAAhuAVAAOYIACHCBQEA5QgAIcMFAQCACQAhxAUBAIAJACECAAAAEwAgNgAA8AIAIAIAAAATACA2AADwAgAgAwAAABUAID0AAOkCACA-AADuAgAgAQAAABUAIAEAAAATACAFDwAA6w0AIEMAAO0NACBEAADsDQAgwwUAAPkIACDEBQAA-QgAIAu5BAAA6AcAMLoEAAD3AgAQuwQAAOgHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACGiBQEAggcAIbgFQACDBwAhwgUBAIIHACHDBQEAmQcAIcQFAQCZBwAhAwAAABMAIAEAAPYCADBCAAD3AgAgAwAAABMAIAEAABQAMAIAABUAIAEAAAAPACABAAAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIAMAAAANACABAAAOADACAAAPACADAAAADQAgAQAADgAwAgAADwAgDgYAAOoNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGiBQEAAAABuQUBAAAAAboFAQAAAAG7BQEAAAABvAUBAAAAAb0FAQAAAAG-BUAAAAABvwVAAAAAAcAFAQAAAAHBBQEAAAABATYAAP8CACANvAQBAAAAAb4EQAAAAAG_BEAAAAABogUBAAAAAbkFAQAAAAG6BQEAAAABuwUBAAAAAbwFAQAAAAG9BQEAAAABvgVAAAAAAb8FQAAAAAHABQEAAAABwQUBAAAAAQE2AACBAwAwATYAAIEDADAOBgAA6Q0AILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIaIFAQDlCAAhuQUBAOUIACG6BQEA5QgAIbsFAQCACQAhvAUBAIAJACG9BQEAgAkAIb4FQACHCgAhvwVAAIcKACHABQEAgAkAIcEFAQCACQAhAgAAAA8AIDYAAIQDACANvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhogUBAOUIACG5BQEA5QgAIboFAQDlCAAhuwUBAIAJACG8BQEAgAkAIb0FAQCACQAhvgVAAIcKACG_BUAAhwoAIcAFAQCACQAhwQUBAIAJACECAAAADQAgNgAAhgMAIAIAAAANACA2AACGAwAgAwAAAA8AID0AAP8CACA-AACEAwAgAQAAAA8AIAEAAAANACAKDwAA5g0AIEMAAOgNACBEAADnDQAguwUAAPkIACC8BQAA-QgAIL0FAAD5CAAgvgUAAPkIACC_BQAA-QgAIMAFAAD5CAAgwQUAAPkIACAQuQQAAOcHADC6BAAAjQMAELsEAADnBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhogUBAIIHACG5BQEAggcAIboFAQCCBwAhuwUBAJkHACG8BQEAmQcAIb0FAQCZBwAhvgVAAL8HACG_BUAAvwcAIcAFAQCZBwAhwQUBAJkHACEDAAAADQAgAQAAjAMAMEIAAI0DACADAAAADQAgAQAADgAwAgAADwAgCbkEAADmBwAwugQAAJMDABC7BAAA5gcAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAhtgUBAIoHACG3BQEAigcAIbgFQACLBwAhAQAAAJADACABAAAAkAMAIAm5BAAA5gcAMLoEAACTAwAQuwQAAOYHADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACG2BQEAigcAIbcFAQCKBwAhuAVAAIsHACEAAwAAAJMDACABAACUAwAwAgAAkAMAIAMAAACTAwAgAQAAlAMAMAIAAJADACADAAAAkwMAIAEAAJQDADACAACQAwAgBrwEAQAAAAG-BEAAAAABvwRAAAAAAbYFAQAAAAG3BQEAAAABuAVAAAAAAQE2AACYAwAgBrwEAQAAAAG-BEAAAAABvwRAAAAAAbYFAQAAAAG3BQEAAAABuAVAAAAAAQE2AACaAwAwATYAAJoDADAGvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhtgUBAOUIACG3BQEA5QgAIbgFQADmCAAhAgAAAJADACA2AACdAwAgBrwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIbYFAQDlCAAhtwUBAOUIACG4BUAA5ggAIQIAAACTAwAgNgAAnwMAIAIAAACTAwAgNgAAnwMAIAMAAACQAwAgPQAAmAMAID4AAJ0DACABAAAAkAMAIAEAAACTAwAgAw8AAOMNACBDAADlDQAgRAAA5A0AIAm5BAAA5QcAMLoEAACmAwAQuwQAAOUHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACG2BQEAggcAIbcFAQCCBwAhuAVAAIMHACEDAAAAkwMAIAEAAKUDADBCAACmAwAgAwAAAJMDACABAACUAwAwAgAAkAMAIBsEAADaBwAgBQAA2wcAIAYAAM0HACAOAADhBwAgEAAA3wcAIBMAAOQHACAUAADiBwAgGgAA0AcAICQAANwHACAlAADdBwAgKgAA3gcAICsAAOAHACAsAADjBwAguQQAANkHADC6BAAAEQAQuwQAANkHADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIZMFAQDMBwAhogUBAAAAAbAFAQDMBwAhsQUBAMwHACGyBQEAzAcAIbMFAQDMBwAhtAUBAMwHACG1BQEAzAcAIQEAAACpAwAgAQAAAKkDACAUBAAA2A0AIAUAANkNACAGAACkDAAgDgAA3w0AIBAAAN0NACATAADiDQAgFAAA4A0AIBoAAKcMACAkAADaDQAgJQAA2w0AICoAANwNACArAADeDQAgLAAA4Q0AIJMFAAD5CAAgsAUAAPkIACCxBQAA-QgAILIFAAD5CAAgswUAAPkIACC0BQAA-QgAILUFAAD5CAAgAwAAABEAIAEAAKwDADACAACpAwAgAwAAABEAIAEAAKwDADACAACpAwAgAwAAABEAIAEAAKwDADACAACpAwAgGAQAAMsNACAFAADMDQAgBgAAzQ0AIA4AANMNACAQAADRDQAgEwAA1w0AIBQAANQNACAaAADWDQAgJAAAzg0AICUAAM8NACAqAADQDQAgKwAA0g0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQE2AACwAwAgC7wEAQAAAAG-BEAAAAABvwRAAAAAAZMFAQAAAAGiBQEAAAABsAUBAAAAAbEFAQAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABATYAALIDADABNgAAsgMAMBgEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIQIAAACpAwAgNgAAtQMAIAu8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhAgAAABEAIDYAALcDACACAAAAEQAgNgAAtwMAIAMAAACpAwAgPQAAsAMAID4AALUDACABAAAAqQMAIAEAAAARACAKDwAAxAwAIEMAAMYMACBEAADFDAAgkwUAAPkIACCwBQAA-QgAILEFAAD5CAAgsgUAAPkIACCzBQAA-QgAILQFAAD5CAAgtQUAAPkIACAOuQQAANgHADC6BAAAvgMAELsEAADYBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhkwUBAJkHACGiBQEAggcAIbAFAQCZBwAhsQUBAJkHACGyBQEAmQcAIbMFAQCZBwAhtAUBAJkHACG1BQEAmQcAIQMAAAARACABAAC9AwAwQgAAvgMAIAMAAAARACABAACsAwAwAgAAqQMAIAgIAADXBwAguQQAANYHADC6BAAAiAEAELsEAADWBwAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHlBAEAAAABAQAAAMEDACABAAAAwQMAIAEIAADDDAAgAwAAAIgBACABAADEAwAwAgAAwQMAIAMAAACIAQAgAQAAxAMAMAIAAMEDACADAAAAiAEAIAEAAMQDADACAADBAwAgBQgAAMIMACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAABATYAAMgDACAEvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAQE2AADKAwAwATYAAMoDADAFCAAAwQwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQDlCAAhAgAAAMEDACA2AADNAwAgBLwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQDlCAAhAgAAAIgBACA2AADPAwAgAgAAAIgBACA2AADPAwAgAwAAAMEDACA9AADIAwAgPgAAzQMAIAEAAADBAwAgAQAAAIgBACADDwAAvgwAIEMAAMAMACBEAAC_DAAgB7kEAADVBwAwugQAANYDABC7BAAA1QcAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIeUEAQCCBwAhAwAAAIgBACABAADVAwAwQgAA1gMAIAMAAACIAQAgAQAAxAMAMAIAAMEDACABAAAAdQAgAQAAAHUAIAMAAABzACABAAB0ADACAAB1ACADAAAAcwAgAQAAdAAwAgAAdQAgAwAAAHMAIAEAAHQAMAIAAHUAIAQDAAC9DAAgvAQBAAAAAd0EAQAAAAGPBQEAAAABATYAAN4DACADvAQBAAAAAd0EAQAAAAGPBQEAAAABATYAAOADADABNgAA4AMAMAQDAAC8DAAgvAQBAOUIACHdBAEA5QgAIY8FAQDlCAAhAgAAAHUAIDYAAOMDACADvAQBAOUIACHdBAEA5QgAIY8FAQDlCAAhAgAAAHMAIDYAAOUDACACAAAAcwAgNgAA5QMAIAMAAAB1ACA9AADeAwAgPgAA4wMAIAEAAAB1ACABAAAAcwAgAw8AALkMACBDAAC7DAAgRAAAugwAIAa5BAAA1AcAMLoEAADsAwAQuwQAANQHADC8BAEAggcAId0EAQCCBwAhjwUBAIIHACEDAAAAcwAgAQAA6wMAMEIAAOwDACADAAAAcwAgAQAAdAAwAgAAdQAgAQAAAAsAIAEAAAALACADAAAACQAgAQAACgAwAgAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAAJACABAAAKADACAAALACAIAwAAuAwAILwEAQAAAAHdBAEAAAABqwUBAAAAAawFAQAAAAGtBQEAAAABrgUCAAAAAa8FAgAAAAEBNgAA9AMAIAe8BAEAAAAB3QQBAAAAAasFAQAAAAGsBQEAAAABrQUBAAAAAa4FAgAAAAGvBQIAAAABATYAAPYDADABNgAA9gMAMAgDAAC3DAAgvAQBAOUIACHdBAEA5QgAIasFAQDlCAAhrAUBAIAJACGtBQEAgAkAIa4FAgD_CAAhrwUCAP8IACECAAAACwAgNgAA-QMAIAe8BAEA5QgAId0EAQDlCAAhqwUBAOUIACGsBQEAgAkAIa0FAQCACQAhrgUCAP8IACGvBQIA_wgAIQIAAAAJACA2AAD7AwAgAgAAAAkAIDYAAPsDACADAAAACwAgPQAA9AMAID4AAPkDACABAAAACwAgAQAAAAkAIAkPAACyDAAgQwAAtQwAIEQAALQMACCVAQAAswwAIJYBAAC2DAAgrAUAAPkIACCtBQAA-QgAIK4FAAD5CAAgrwUAAPkIACAKuQQAANMHADC6BAAAggQAELsEAADTBwAwvAQBAIIHACHdBAEAggcAIasFAQCCBwAhrAUBAJkHACGtBQEAmQcAIa4FAgCYBwAhrwUCAJgHACEDAAAACQAgAQAAgQQAMEIAAIIEACADAAAACQAgAQAACgAwAgAACwAgAQAAAHEAIAEAAABxACADAAAAbwAgAQAAcAAwAgAAcQAgAwAAAG8AIAEAAHAAMAIAAHEAIAMAAABvACABAABwADACAABxACAIAwAAsQwAILwEAQAAAAHdBAEAAAABjwUBAAAAAZIFAQAAAAGUBQEAAAABqQUBAAAAAaoFAQAAAAEBNgAAigQAIAe8BAEAAAAB3QQBAAAAAY8FAQAAAAGSBQEAAAABlAUBAAAAAakFAQAAAAGqBQEAAAABATYAAIwEADABNgAAjAQAMAgDAACwDAAgvAQBAOUIACHdBAEA5QgAIY8FAQDlCAAhkgUBAIAJACGUBQEAgAkAIakFAQCACQAhqgUBAIAJACECAAAAcQAgNgAAjwQAIAe8BAEA5QgAId0EAQDlCAAhjwUBAOUIACGSBQEAgAkAIZQFAQCACQAhqQUBAIAJACGqBQEAgAkAIQIAAABvACA2AACRBAAgAgAAAG8AIDYAAJEEACADAAAAcQAgPQAAigQAID4AAI8EACABAAAAcQAgAQAAAG8AIAcPAACtDAAgQwAArwwAIEQAAK4MACCSBQAA-QgAIJQFAAD5CAAgqQUAAPkIACCqBQAA-QgAIAq5BAAA0gcAMLoEAACYBAAQuwQAANIHADC8BAEAggcAId0EAQCCBwAhjwUBAIIHACGSBQEAmQcAIZQFAQCZBwAhqQUBAJkHACGqBQEAmQcAIQMAAABvACABAACXBAAwQgAAmAQAIAMAAABvACABAABwADACAABxACABAAAABwAgAQAAAAcAIAMAAAAFACABAAAGADACAAAHACADAAAABQAgAQAABgAwAgAABwAgAwAAAAUAIAEAAAYAMAIAAAcAIAgDAACsDAAgvAQBAAAAAd0EAQAAAAGPBQEAAAABlAUBAAAAAaYFAQAAAAGnBUAAAAABqAUBAAAAAQE2AACgBAAgB7wEAQAAAAHdBAEAAAABjwUBAAAAAZQFAQAAAAGmBQEAAAABpwVAAAAAAagFAQAAAAEBNgAAogQAMAE2AACiBAAwCAMAAKsMACC8BAEA5QgAId0EAQDlCAAhjwUBAOUIACGUBQEAgAkAIaYFAQCACQAhpwVAAIcKACGoBQEAgAkAIQIAAAAHACA2AAClBAAgB7wEAQDlCAAh3QQBAOUIACGPBQEA5QgAIZQFAQCACQAhpgUBAIAJACGnBUAAhwoAIagFAQCACQAhAgAAAAUAIDYAAKcEACACAAAABQAgNgAApwQAIAMAAAAHACA9AACgBAAgPgAApQQAIAEAAAAHACABAAAABQAgBw8AAKgMACBDAACqDAAgRAAAqQwAIJQFAAD5CAAgpgUAAPkIACCnBQAA-QgAIKgFAAD5CAAgCrkEAADRBwAwugQAAK4EABC7BAAA0QcAMLwEAQCCBwAh3QQBAIIHACGPBQEAggcAIZQFAQCZBwAhpgUBAJkHACGnBUAAvwcAIagFAQCZBwAhAwAAAAUAIAEAAK0EADBCAACuBAAgAwAAAAUAIAEAAAYAMAIAAAcAIA4GAADNBwAgGgAA0AcAIBsAAM4HACAcAADPBwAguQQAAMsHADC6BAAAFwAQuwQAAMsHADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIY8FAQCKBwAhkgUBAMwHACGhBQEAzAcAIaIFAQAAAAEBAAAAsQQAIAEAAACxBAAgBgYAAKQMACAaAACnDAAgGwAApQwAIBwAAKYMACCSBQAA-QgAIKEFAAD5CAAgAwAAABcAIAEAALQEADACAACxBAAgAwAAABcAIAEAALQEADACAACxBAAgAwAAABcAIAEAALQEADACAACxBAAgCwYAAKAMACAaAACjDAAgGwAAoQwAIBwAAKIMACC8BAEAAAABvgRAAAAAAb8EQAAAAAGPBQEAAAABkgUBAAAAAaEFAQAAAAGiBQEAAAABATYAALgEACAHvAQBAAAAAb4EQAAAAAG_BEAAAAABjwUBAAAAAZIFAQAAAAGhBQEAAAABogUBAAAAAQE2AAC6BAAwATYAALoEADALBgAA-QsAIBoAAPwLACAbAAD6CwAgHAAA-wsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIY8FAQDlCAAhkgUBAIAJACGhBQEAgAkAIaIFAQDlCAAhAgAAALEEACA2AAC9BAAgB7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIY8FAQDlCAAhkgUBAIAJACGhBQEAgAkAIaIFAQDlCAAhAgAAABcAIDYAAL8EACACAAAAFwAgNgAAvwQAIAMAAACxBAAgPQAAuAQAID4AAL0EACABAAAAsQQAIAEAAAAXACAFDwAA9gsAIEMAAPgLACBEAAD3CwAgkgUAAPkIACChBQAA-QgAIAq5BAAAygcAMLoEAADGBAAQuwQAAMoHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACGPBQEAggcAIZIFAQCZBwAhoQUBAJkHACGiBQEAggcAIQMAAAAXACABAADFBAAwQgAAxgQAIAMAAAAXACABAAC0BAAwAgAAsQQAIAEAAAAbACABAAAAGwAgAwAAABkAIAEAABoAMAIAABsAIAMAAAAZACABAAAaADACAAAbACADAAAAGQAgAQAAGgAwAgAAGwAgGgsAAO4LACAMAADvCwAgDQAA8AsAIA4AAPILACAQAADxCwAgEwAA8wsAIBQAAPQLACAaAAD1CwAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAACfBQLzBAEAAAAB_QQAAACaBQKRBQEAAAABkgUBAAAAAZMFAQAAAAGUBQEAAAABlgUAAACWBQKYBQAAAJgFApoFCAAAAAGbBQgAAAABnAUBAAAAAZ0FQAAAAAGfBUAAAAABoAVAAAAAAQE2AADOBAAgErwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAnwUC8wQBAAAAAf0EAAAAmgUCkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFAAAAlgUCmAUAAACYBQKaBQgAAAABmwUIAAAAAZwFAQAAAAGdBUAAAAABnwVAAAAAAaAFQAAAAAEBNgAA0AQAMAE2AADQBAAwGgsAAJkLACAMAACaCwAgDQAAmwsAIA4AAJ0LACAQAACcCwAgEwAAngsAIBQAAJ8LACAaAACgCwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAJgLnwUi8wQBAOUIACH9BAAAlwuaBSKRBQEA5QgAIZIFAQDlCAAhkwUBAOUIACGUBQEAgAkAIZYFAACVC5YFIpgFAACWC5gFIpoFCAC4CQAhmwUIALgJACGcBQEAgAkAIZ0FQADmCAAhnwVAAIcKACGgBUAAhwoAIQIAAAAbACA2AADTBAAgErwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACECAAAAGQAgNgAA1QQAIAIAAAAZACA2AADVBAAgAwAAABsAID0AAM4EACA-AADTBAAgAQAAABsAIAEAAAAZACALDwAAkAsAIEMAAJMLACBEAACSCwAglQEAAJELACCWAQAAlAsAIJQFAAD5CAAgmgUAAPkIACCbBQAA-QgAIJwFAAD5CAAgnwUAAPkIACCgBQAA-QgAIBW5BAAAugcAMLoEAADcBAAQuwQAALoHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHxBAAAvgefBSLzBAEAggcAIf0EAAC9B5oFIpEFAQCCBwAhkgUBAIIHACGTBQEAggcAIZQFAQCZBwAhlgUAALsHlgUimAUAALwHmAUimgUIAKoHACGbBQgAqgcAIZwFAQCZBwAhnQVAAIMHACGfBUAAvwcAIaAFQAC_BwAhAwAAABkAIAEAANsEADBCAADcBAAgAwAAABkAIAEAABoAMAIAABsAIAEAAAAfACABAAAAHwAgAwAAAB0AIAEAAB4AMAIAAB8AIAMAAAAdACABAAAeADACAAAfACADAAAAHQAgAQAAHgAwAgAAHwAgBQoAAI8LACC8BAEAAAAB5gQBAAAAAY8FAQAAAAGQBQEAAAABATYAAOQEACAEvAQBAAAAAeYEAQAAAAGPBQEAAAABkAUBAAAAAQE2AADmBAAwATYAAOYEADAFCgAAjgsAILwEAQDlCAAh5gQBAOUIACGPBQEA5QgAIZAFAQDlCAAhAgAAAB8AIDYAAOkEACAEvAQBAOUIACHmBAEA5QgAIY8FAQDlCAAhkAUBAOUIACECAAAAHQAgNgAA6wQAIAIAAAAdACA2AADrBAAgAwAAAB8AID0AAOQEACA-AADpBAAgAQAAAB8AIAEAAAAdACADDwAAiwsAIEMAAI0LACBEAACMCwAgB7kEAAC5BwAwugQAAPIEABC7BAAAuQcAMLwEAQCCBwAh5gQBAIIHACGPBQEAggcAIZAFAQCCBwAhAwAAAB0AIAEAAPEEADBCAADyBAAgAwAAAB0AIAEAAB4AMAIAAB8AIAEAAAAjACABAAAAIwAgAwAAACEAIAEAACIAMAIAACMAIAMAAAAhACABAAAiADACAAAjACADAAAAIQAgAQAAIgAwAgAAIwAgEAMAAIkLACAKAACKCwAgvAQBAAAAAb4EQAAAAAG_BEAAAAABzQQIAAAAAc4ECAAAAAHPBAgAAAAB0AQIAAAAAdYEgAAAAAHdBAEAAAAB5gQBAAAAAegEAQAAAAGIBYAAAAABjQUIAAAAAY4FCAAAAAEBNgAA-gQAIA68BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAABzgQIAAAAAc8ECAAAAAHQBAgAAAAB1gSAAAAAAd0EAQAAAAHmBAEAAAAB6AQBAAAAAYgFgAAAAAGNBQgAAAABjgUIAAAAAQE2AAD8BAAwATYAAPwEADAQAwAAhwsAIAoAAIgLACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHNBAgAhgsAIc4ECACGCwAhzwQIAIYLACHQBAgAhgsAIdYEgAAAAAHdBAEA5QgAIeYEAQDlCAAh6AQBAOUIACGIBYAAAAABjQUIAIYLACGOBQgAhgsAIQIAAAAjACA2AAD_BAAgDrwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0ECACGCwAhzgQIAIYLACHPBAgAhgsAIdAECACGCwAh1gSAAAAAAd0EAQDlCAAh5gQBAOUIACHoBAEA5QgAIYgFgAAAAAGNBQgAhgsAIY4FCACGCwAhAgAAACEAIDYAAIEFACACAAAAIQAgNgAAgQUAIAMAAAAjACA9AAD6BAAgPgAA_wQAIAEAAAAjACABAAAAIQAgBQ8AAIELACBDAACECwAgRAAAgwsAIJUBAACCCwAglgEAAIULACARuQQAALYHADC6BAAAiAUAELsEAAC2BwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQIALcHACHOBAgAtwcAIc8ECAC3BwAh0AQIALcHACHWBAAAkgcAIN0EAQCCBwAh5gQBAIIHACHoBAEAggcAIYgFAACSBwAgjQUIALcHACGOBQgAtwcAIQMAAAAhACABAACHBQAwQgAAiAUAIAMAAAAhACABAAAiADACAAAjACABAAAAJwAgAQAAACcAIAMAAAAlACABAAAmADACAAAnACADAAAAJQAgAQAAJgAwAgAAJwAgAwAAACUAIAEAACYAMAIAACcAIA4DAADmCgAgCgAA5woAIA4AAIALACC8BAEAAAABvgRAAAAAAdYEgAAAAAHdBAEAAAAB5gQBAAAAAYcFAgAAAAGIBYAAAAABiQWAAAAAAYoFgAAAAAGLBYAAAAABjAWAAAAAAQE2AACQBQAgC7wEAQAAAAG-BEAAAAAB1gSAAAAAAd0EAQAAAAHmBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABATYAAJIFADABNgAAkgUAMA4DAADjCgAgCgAA5AoAIA4AAPQKACC8BAEA5QgAIb4EQADmCAAh1gSAAAAAAd0EAQDlCAAh5gQBAOUIACGHBQIA7wgAIYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABAgAAACcAIDYAAJUFACALvAQBAOUIACG-BEAA5ggAIdYEgAAAAAHdBAEA5QgAIeYEAQDlCAAhhwUCAO8IACGIBYAAAAABiQWAAAAAAYoFgAAAAAGLBYAAAAABjAWAAAAAAQIAAAAlACA2AACXBQAgAgAAACUAIDYAAJcFACADAAAAJwAgPQAAkAUAID4AAJUFACABAAAAJwAgAQAAACUAIAUPAADvCgAgQwAA8goAIEQAAPEKACCVAQAA8AoAIJYBAADzCgAgDrkEAAC1BwAwugQAAJ4FABC7BAAAtQcAMLwEAQCCBwAhvgRAAIMHACHWBAAAkgcAIN0EAQCCBwAh5gQBAIIHACGHBQIAjgcAIYgFAACSBwAgiQUAAJIHACCKBQAAkgcAIIsFAACSBwAgjAUAAJIHACADAAAAJQAgAQAAnQUAMEIAAJ4FACADAAAAJQAgAQAAJgAwAgAAJwAgAQAAACoAIAEAAAAqACADAAAAAwAgAQAAKQAwAgAAKgAgAwAAAAMAIAEAACkAMAIAACoAIAMAAAADACABAAApADACAAAqACAOCAAA6AoAIAoAAOkKACAQAADqCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB8QQAAACCBQKGBQEAAAABATYAAKYFACAHvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAEBNgAAqAUAMAE2AACoBQAwDggAANwJACAKAADdCQAgEAAA3gkAIBoAAOAJACAjAADiCQAgLgAA3wkAIC8AAOEJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACECAAAAKgAgNgAAqwUAIAe8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACECAAAAAwAgNgAArQUAIAIAAAADACA2AACtBQAgAwAAACoAID0AAKYFACA-AACrBQAgAQAAACoAIAEAAAADACAEDwAA2QkAIEMAANsJACBEAADaCQAghgUAAPkIACAKuQQAALQHADC6BAAAtAUAELsEAAC0BwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh5QQBAIIHACHmBAEAggcAIfEEAACvB4IFIoYFAQCZBwAhAwAAAAMAIAEAALMFADBCAAC0BQAgAwAAAAMAIAEAACkAMAIAACoAIAEAAACaAQAgAQAAAJoBACADAAAAmAEAIAEAAJkBADACAACaAQAgAwAAAJgBACABAACZAQAwAgAAmgEAIAMAAACYAQAgAQAAmQEAMAIAAJoBACAHLQAA2AkAILwEAQAAAAGABQEAAAABggUAAACCBQODBQAAAIIFAoQFAQAAAAGFBUAAAAABATYAALwFACAGvAQBAAAAAYAFAQAAAAGCBQAAAIIFA4MFAAAAggUChAUBAAAAAYUFQAAAAAEBNgAAvgUAMAE2AAC-BQAwBy0AANcJACC8BAEA5QgAIYAFAQDlCAAhggUAANUJggUjgwUAANYJggUihAUBAOUIACGFBUAA5ggAIQIAAACaAQAgNgAAwQUAIAa8BAEA5QgAIYAFAQDlCAAhggUAANUJggUjgwUAANYJggUihAUBAOUIACGFBUAA5ggAIQIAAACYAQAgNgAAwwUAIAIAAACYAQAgNgAAwwUAIAMAAACaAQAgPQAAvAUAID4AAMEFACABAAAAmgEAIAEAAACYAQAgBA8AANIJACBDAADUCQAgRAAA0wkAIIIFAAD5CAAgCbkEAACtBwAwugQAAMoFABC7BAAArQcAMLwEAQCCBwAhgAUBAIIHACGCBQAArgeCBSODBQAArweCBSKEBQEAggcAIYUFQACDBwAhAwAAAJgBACABAADJBQAwQgAAygUAIAMAAACYAQAgAQAAmQEAMAIAAJoBACABAAAAMAAgAQAAADAAIAMAAAAuACABAAAvADACAAAwACADAAAALgAgAQAALwAwAgAAMAAgAwAAAC4AIAEAAC8AMAIAADAAIA0IAADPCQAgCgAA0AkAIBIAANEJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAAB5QQBAAAAAeYEAQAAAAHxBAEAAAAB_QQBAAAAAf4EAQAAAAH_BAIAAAABATYAANIFACAKvAQBAAAAAb4EQAAAAAG_BEAAAAABzQQIAAAAAeUEAQAAAAHmBAEAAAAB8QQBAAAAAf0EAQAAAAH-BAEAAAAB_wQCAAAAAQE2AADUBQAwATYAANQFADANCAAAwAkAIAoAAMEJACASAADCCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQIALgJACHlBAEA5QgAIeYEAQDlCAAh8QQBAOUIACH9BAEA5QgAIf4EAQDlCAAh_wQCAO8IACECAAAAMAAgNgAA1wUAIAq8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHNBAgAuAkAIeUEAQDlCAAh5gQBAOUIACHxBAEA5QgAIf0EAQDlCAAh_gQBAOUIACH_BAIA7wgAIQIAAAAuACA2AADZBQAgAgAAAC4AIDYAANkFACADAAAAMAAgPQAA0gUAID4AANcFACABAAAAMAAgAQAAAC4AIAYPAAC7CQAgQwAAvgkAIEQAAL0JACCVAQAAvAkAIJYBAAC_CQAgzQQAAPkIACANuQQAAKwHADC6BAAA4AUAELsEAACsBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQIAKoHACHlBAEAggcAIeYEAQCCBwAh8QQBAIIHACH9BAEAggcAIf4EAQCCBwAh_wQCAI4HACEDAAAALgAgAQAA3wUAMEIAAOAFACADAAAALgAgAQAALwAwAgAAMAAgAQAAADQAIAEAAAA0ACADAAAAMgAgAQAAMwAwAgAANAAgAwAAADIAIAEAADMAMAIAADQAIAMAAAAyACABAAAzADACAAA0ACAMEQAAugkAILwEAQAAAAG-BEAAAAABzQQIAAAAAfUEAQAAAAH2BAEAAAAB9wQBAAAAAfgECAAAAAH5BAgAAAAB-gQIAAAAAfsECAAAAAH8BAEAAAABATYAAOgFACALvAQBAAAAAb4EQAAAAAHNBAgAAAAB9QQBAAAAAfYEAQAAAAH3BAEAAAAB-AQIAAAAAfkECAAAAAH6BAgAAAAB-wQIAAAAAfwEAQAAAAEBNgAA6gUAMAE2AADqBQAwDBEAALkJACC8BAEA5QgAIb4EQADmCAAhzQQIALgJACH1BAEA5QgAIfYEAQDlCAAh9wQBAOUIACH4BAgAuAkAIfkECAC4CQAh-gQIALgJACH7BAgAuAkAIfwEAQCACQAhAgAAADQAIDYAAO0FACALvAQBAOUIACG-BEAA5ggAIc0ECAC4CQAh9QQBAOUIACH2BAEA5QgAIfcEAQDlCAAh-AQIALgJACH5BAgAuAkAIfoECAC4CQAh-wQIALgJACH8BAEAgAkAIQIAAAAyACA2AADvBQAgAgAAADIAIDYAAO8FACADAAAANAAgPQAA6AUAID4AAO0FACABAAAANAAgAQAAADIAIAsPAACzCQAgQwAAtgkAIEQAALUJACCVAQAAtAkAIJYBAAC3CQAgzQQAAPkIACD4BAAA-QgAIPkEAAD5CAAg-gQAAPkIACD7BAAA-QgAIPwEAAD5CAAgDrkEAACpBwAwugQAAPYFABC7BAAAqQcAMLwEAQCCBwAhvgRAAIMHACHNBAgAqgcAIfUEAQCCBwAh9gQBAIIHACH3BAEAggcAIfgECACqBwAh-QQIAKoHACH6BAgAqgcAIfsECACqBwAh_AQBAJkHACEDAAAAMgAgAQAA9QUAMEIAAPYFACADAAAAMgAgAQAAMwAwAgAANAAgAQAAAGYAIAEAAABmACADAAAAZAAgAQAAZQAwAgAAZgAgAwAAAGQAIAEAAGUAMAIAAGYAIAMAAABkACABAABlADACAABmACAOFgAAsQkAICIAALIJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHqBAEAAAAB6wQBAAAAAewEQAAAAAHtBAIAAAAB7wQAAADvBALxBAAAAPEEAvIEAQAAAAHzBAEAAAAB9AQBAAAAAQE2AAD-BQAgDLwEAQAAAAG-BEAAAAABvwRAAAAAAeoEAQAAAAHrBAEAAAAB7ARAAAAAAe0EAgAAAAHvBAAAAO8EAvEEAAAA8QQC8gQBAAAAAfMEAQAAAAH0BAEAAAABATYAAIAGADABNgAAgAYAMA4WAACvCQAgIgAAsAkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeoEAQDlCAAh6wQBAOUIACHsBEAA5ggAIe0EAgDvCAAh7wQAAK0J7wQi8QQAAK4J8QQi8gQBAIAJACHzBAEAgAkAIfQEAQCACQAhAgAAAGYAIDYAAIMGACAMvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6gQBAOUIACHrBAEA5QgAIewEQADmCAAh7QQCAO8IACHvBAAArQnvBCLxBAAArgnxBCLyBAEAgAkAIfMEAQCACQAh9AQBAIAJACECAAAAZAAgNgAAhQYAIAIAAABkACA2AACFBgAgAwAAAGYAID0AAP4FACA-AACDBgAgAQAAAGYAIAEAAABkACAIDwAAqAkAIEMAAKsJACBEAACqCQAglQEAAKkJACCWAQAArAkAIPIEAAD5CAAg8wQAAPkIACD0BAAA-QgAIA-5BAAAogcAMLoEAACMBgAQuwQAAKIHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHqBAEAggcAIesEAQCCBwAh7ARAAIMHACHtBAIAjgcAIe8EAACjB-8EIvEEAACkB_EEIvIEAQCZBwAh8wQBAJkHACH0BAEAmQcAIQMAAABkACABAACLBgAwQgAAjAYAIAMAAABkACABAABlADACAABmACABAAAAOQAgAQAAADkAIAMAAAA3ACABAAA4ADACAAA5ACADAAAANwAgAQAAOAAwAgAAOQAgAwAAADcAIAEAADgAMAIAADkAIA0IAACmCQAgCgAApwkAILwEAQAAAAG9BAEAAAABvgRAAAAAAb8EQAAAAAHVBIAAAAAB1gSAAAAAAeUEAQAAAAHmBAEAAAAB5wQCAAAAAegEAQAAAAHpBIAAAAABATYAAJQGACALvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAdUEgAAAAAHWBIAAAAAB5QQBAAAAAeYEAQAAAAHnBAIAAAAB6AQBAAAAAekEgAAAAAEBNgAAlgYAMAE2AACWBgAwDQgAAKQJACAKAAClCQAgvAQBAOUIACG9BAEAgAkAIb4EQADmCAAhvwRAAOYIACHVBIAAAAAB1gSAAAAAAeUEAQDlCAAh5gQBAOUIACHnBAIA7wgAIegEAQDlCAAh6QSAAAAAAQIAAAA5ACA2AACZBgAgC7wEAQDlCAAhvQQBAIAJACG-BEAA5ggAIb8EQADmCAAh1QSAAAAAAdYEgAAAAAHlBAEA5QgAIeYEAQDlCAAh5wQCAO8IACHoBAEA5QgAIekEgAAAAAECAAAANwAgNgAAmwYAIAIAAAA3ACA2AACbBgAgAwAAADkAID0AAJQGACA-AACZBgAgAQAAADkAIAEAAAA3ACAGDwAAnwkAIEMAAKIJACBEAAChCQAglQEAAKAJACCWAQAAowkAIL0EAAD5CAAgDrkEAAChBwAwugQAAKIGABC7BAAAoQcAMLwEAQCCBwAhvQQBAJkHACG-BEAAgwcAIb8EQACDBwAh1QQAAJIHACDWBAAAkgcAIOUEAQCCBwAh5gQBAIIHACHnBAIAjgcAIegEAQCCBwAh6QQAAJIHACADAAAANwAgAQAAoQYAMEIAAKIGACADAAAANwAgAQAAOAAwAgAAOQAgAQAAAHkAIAEAAAB5ACADAAAAdwAgAQAAeAAwAgAAeQAgAwAAAHcAIAEAAHgAMAIAAHkAIAMAAAB3ACABAAB4ADACAAB5ACAPAwAAngkAICcAAJsJACAoAACcCQAgKQAAnQkAILwEAQAAAAG-BEAAAAABvwRAAAAAAd0EAQAAAAHeBAEAAAAB3wQBAAAAAeAEAQAAAAHhBAEAAAAB4gQCAAAAAeMEAQAAAAHkBIAAAAABATYAAKoGACALvAQBAAAAAb4EQAAAAAG_BEAAAAAB3QQBAAAAAd4EAQAAAAHfBAEAAAAB4AQBAAAAAeEEAQAAAAHiBAIAAAAB4wQBAAAAAeQEgAAAAAEBNgAArAYAMAE2AACsBgAwDwMAAIQJACAnAACBCQAgKAAAggkAICkAAIMJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHdBAEA5QgAId4EAQDlCAAh3wQBAOUIACHgBAEA5QgAIeEEAQDlCAAh4gQCAP8IACHjBAEAgAkAIeQEgAAAAAECAAAAeQAgNgAArwYAIAu8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHdBAEA5QgAId4EAQDlCAAh3wQBAOUIACHgBAEA5QgAIeEEAQDlCAAh4gQCAP8IACHjBAEAgAkAIeQEgAAAAAECAAAAdwAgNgAAsQYAIAIAAAB3ACA2AACxBgAgAwAAAHkAID0AAKoGACA-AACvBgAgAQAAAHkAIAEAAAB3ACAIDwAA-ggAIEMAAP0IACBEAAD8CAAglQEAAPsIACCWAQAA_ggAIOIEAAD5CAAg4wQAAPkIACDkBAAA-QgAIA65BAAAlwcAMLoEAAC4BgAQuwQAAJcHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHdBAEAggcAId4EAQCCBwAh3wQBAIIHACHgBAEAggcAIeEEAQCCBwAh4gQCAJgHACHjBAEAmQcAIeQEAACaBwAgAwAAAHcAIAEAALcGADBCAAC4BgAgAwAAAHcAIAEAAHgAMAIAAHkAIBImAACMBwAguQQAAJQHADC6BAAAfQAQuwQAAJQHADC8BAEAAAABvQQBAAAAAb4EQACLBwAhvwRAAIsHACHNBAIAlQcAIc4EAgCVBwAhzwQCAJUHACHQBAIAlQcAIdEEAgCVBwAh0gQCAJUHACHTBAAAlgcAINQEAACWBwAg1QQAAJYHACDWBAAAlgcAIAEAAAC7BgAgAQAAALsGACABJgAA6QgAIAMAAAB9ACABAAC-BgAwAgAAuwYAIAMAAAB9ACABAAC-BgAwAgAAuwYAIAMAAAB9ACABAAC-BgAwAgAAuwYAIA8mAAD4CAAgvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAc0EAgAAAAHOBAIAAAABzwQCAAAAAdAEAgAAAAHRBAIAAAAB0gQCAAAAAdMEgAAAAAHUBIAAAAAB1QSAAAAAAdYEgAAAAAEBNgAAwgYAIA68BAEAAAABvQQBAAAAAb4EQAAAAAG_BEAAAAABzQQCAAAAAc4EAgAAAAHPBAIAAAAB0AQCAAAAAdEEAgAAAAHSBAIAAAAB0wSAAAAAAdQEgAAAAAHVBIAAAAAB1gSAAAAAAQE2AADEBgAwATYAAMQGADAPJgAA9wgAILwEAQDlCAAhvQQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQCAO8IACHOBAIA7wgAIc8EAgDvCAAh0AQCAO8IACHRBAIA7wgAIdIEAgDvCAAh0wSAAAAAAdQEgAAAAAHVBIAAAAAB1gSAAAAAAQIAAAC7BgAgNgAAxwYAIA68BAEA5QgAIb0EAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0EAgDvCAAhzgQCAO8IACHPBAIA7wgAIdAEAgDvCAAh0QQCAO8IACHSBAIA7wgAIdMEgAAAAAHUBIAAAAAB1QSAAAAAAdYEgAAAAAECAAAAfQAgNgAAyQYAIAIAAAB9ACA2AADJBgAgAwAAALsGACA9AADCBgAgPgAAxwYAIAEAAAC7BgAgAQAAAH0AIAUPAADyCAAgQwAA9QgAIEQAAPQIACCVAQAA8wgAIJYBAAD2CAAgEbkEAACRBwAwugQAANAGABC7BAAAkQcAMLwEAQCCBwAhvQQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQCAI4HACHOBAIAjgcAIc8EAgCOBwAh0AQCAI4HACHRBAIAjgcAIdIEAgCOBwAh0wQAAJIHACDUBAAAkgcAINUEAACSBwAg1gQAAJIHACADAAAAfQAgAQAAzwYAMEIAANAGACADAAAAfQAgAQAAvgYAMAIAALsGACABAAAAgQEAIAEAAACBAQAgAwAAAH8AIAEAAIABADACAACBAQAgAwAAAH8AIAEAAIABADACAACBAQAgAwAAAH8AIAEAAIABADACAACBAQAgBiYAAPEIACC8BAEAAAABvQQBAAAAAb4EQAAAAAHLBAEAAAABzAQCAAAAAQE2AADYBgAgBbwEAQAAAAG9BAEAAAABvgRAAAAAAcsEAQAAAAHMBAIAAAABATYAANoGADABNgAA2gYAMAYmAADwCAAgvAQBAOUIACG9BAEA5QgAIb4EQADmCAAhywQBAOUIACHMBAIA7wgAIQIAAACBAQAgNgAA3QYAIAW8BAEA5QgAIb0EAQDlCAAhvgRAAOYIACHLBAEA5QgAIcwEAgDvCAAhAgAAAH8AIDYAAN8GACACAAAAfwAgNgAA3wYAIAMAAACBAQAgPQAA2AYAID4AAN0GACABAAAAgQEAIAEAAAB_ACAFDwAA6ggAIEMAAO0IACBEAADsCAAglQEAAOsIACCWAQAA7ggAIAi5BAAAjQcAMLoEAADmBgAQuwQAAI0HADC8BAEAggcAIb0EAQCCBwAhvgRAAIMHACHLBAEAggcAIcwEAgCOBwAhAwAAAH8AIAEAAOUGADBCAADmBgAgAwAAAH8AIAEAAIABADACAACBAQAgCSYAAIwHACAnAQCKBwAhuQQAAIkHADC6BAAAewAQuwQAAIkHADC8BAEAAAABvQQBAAAAAb4EQACLBwAhvwRAAIsHACEBAAAA6QYAIAEAAADpBgAgASYAAOkIACADAAAAewAgAQAA7AYAMAIAAOkGACADAAAAewAgAQAA7AYAMAIAAOkGACADAAAAewAgAQAA7AYAMAIAAOkGACAGJgAA6AgAICcBAAAAAbwEAQAAAAG9BAEAAAABvgRAAAAAAb8EQAAAAAEBNgAA8AYAIAUnAQAAAAG8BAEAAAABvQQBAAAAAb4EQAAAAAG_BEAAAAABATYAAPIGADABNgAA8gYAMAYmAADnCAAgJwEA5QgAIbwEAQDlCAAhvQQBAOUIACG-BEAA5ggAIb8EQADmCAAhAgAAAOkGACA2AAD1BgAgBScBAOUIACG8BAEA5QgAIb0EAQDlCAAhvgRAAOYIACG_BEAA5ggAIQIAAAB7ACA2AAD3BgAgAgAAAHsAIDYAAPcGACADAAAA6QYAID0AAPAGACA-AAD1BgAgAQAAAOkGACABAAAAewAgAw8AAOIIACBDAADkCAAgRAAA4wgAIAgnAQCCBwAhuQQAAIEHADC6BAAA_gYAELsEAACBBwAwvAQBAIIHACG9BAEAggcAIb4EQACDBwAhvwRAAIMHACEDAAAAewAgAQAA_QYAMEIAAP4GACADAAAAewAgAQAA7AYAMAIAAOkGACAIJwEAggcAIbkEAACBBwAwugQAAP4GABC7BAAAgQcAMLwEAQCCBwAhvQQBAIIHACG-BEAAgwcAIb8EQACDBwAhDg8AAIUHACBDAACIBwAgRAAAiAcAIMAEAQAAAAHBBAEAAAAEwgQBAAAABMMEAQAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHHBAEAhwcAIcgEAQAAAAHJBAEAAAABygQBAAAAAQsPAACFBwAgQwAAhgcAIEQAAIYHACDABEAAAAABwQRAAAAABMIEQAAAAATDBEAAAAABxARAAAAAAcUEQAAAAAHGBEAAAAABxwRAAIQHACELDwAAhQcAIEMAAIYHACBEAACGBwAgwARAAAAAAcEEQAAAAATCBEAAAAAEwwRAAAAAAcQEQAAAAAHFBEAAAAABxgRAAAAAAccEQACEBwAhCMAEAgAAAAHBBAIAAAAEwgQCAAAABMMEAgAAAAHEBAIAAAABxQQCAAAAAcYEAgAAAAHHBAIAhQcAIQjABEAAAAABwQRAAAAABMIEQAAAAATDBEAAAAABxARAAAAAAcUEQAAAAAHGBEAAAAABxwRAAIYHACEODwAAhQcAIEMAAIgHACBEAACIBwAgwAQBAAAAAcEEAQAAAATCBAEAAAAEwwQBAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAccEAQCHBwAhyAQBAAAAAckEAQAAAAHKBAEAAAABC8AEAQAAAAHBBAEAAAAEwgQBAAAABMMEAQAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHHBAEAiAcAIcgEAQAAAAHJBAEAAAABygQBAAAAAQkmAACMBwAgJwEAigcAIbkEAACJBwAwugQAAHsAELsEAACJBwAwvAQBAIoHACG9BAEAigcAIb4EQACLBwAhvwRAAIsHACELwAQBAAAAAcEEAQAAAATCBAEAAAAEwwQBAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAccEAQCIBwAhyAQBAAAAAckEAQAAAAHKBAEAAAABCMAEQAAAAAHBBEAAAAAEwgRAAAAABMMEQAAAAAHEBEAAAAABxQRAAAAAAcYEQAAAAAHHBEAAhgcAIRQDAADXBwAgJwAAqQgAICgAAKoIACApAACrCAAguQQAAKYIADC6BAAAdwAQuwQAAKYIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHdBAEAigcAId4EAQCKBwAh3wQBAIoHACHgBAEAigcAIeEEAQCKBwAh4gQCAKcIACHjBAEAzAcAIeQEAACoCAAg7AUAAHcAIO0FAAB3ACAIuQQAAI0HADC6BAAA5gYAELsEAACNBwAwvAQBAIIHACG9BAEAggcAIb4EQACDBwAhywQBAIIHACHMBAIAjgcAIQ0PAACFBwAgQwAAhQcAIEQAAIUHACCVAQAAkAcAIJYBAACFBwAgwAQCAAAAAcEEAgAAAATCBAIAAAAEwwQCAAAAAcQEAgAAAAHFBAIAAAABxgQCAAAAAccEAgCPBwAhDQ8AAIUHACBDAACFBwAgRAAAhQcAIJUBAACQBwAglgEAAIUHACDABAIAAAABwQQCAAAABMIEAgAAAATDBAIAAAABxAQCAAAAAcUEAgAAAAHGBAIAAAABxwQCAI8HACEIwAQIAAAAAcEECAAAAATCBAgAAAAEwwQIAAAAAcQECAAAAAHFBAgAAAABxgQIAAAAAccECACQBwAhEbkEAACRBwAwugQAANAGABC7BAAAkQcAMLwEAQCCBwAhvQQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQCAI4HACHOBAIAjgcAIc8EAgCOBwAh0AQCAI4HACHRBAIAjgcAIdIEAgCOBwAh0wQAAJIHACDUBAAAkgcAINUEAACSBwAg1gQAAJIHACAPDwAAhQcAIEMAAJMHACBEAACTBwAgwASAAAAAAcMEgAAAAAHEBIAAAAABxQSAAAAAAcYEgAAAAAHHBIAAAAAB1wQBAAAAAdgEAQAAAAHZBAEAAAAB2gSAAAAAAdsEgAAAAAHcBIAAAAABDMAEgAAAAAHDBIAAAAABxASAAAAAAcUEgAAAAAHGBIAAAAABxwSAAAAAAdcEAQAAAAHYBAEAAAAB2QQBAAAAAdoEgAAAAAHbBIAAAAAB3ASAAAAAARImAACMBwAguQQAAJQHADC6BAAAfQAQuwQAAJQHADC8BAEAigcAIb0EAQCKBwAhvgRAAIsHACG_BEAAiwcAIc0EAgCVBwAhzgQCAJUHACHPBAIAlQcAIdAEAgCVBwAh0QQCAJUHACHSBAIAlQcAIdMEAACWBwAg1AQAAJYHACDVBAAAlgcAINYEAACWBwAgCMAEAgAAAAHBBAIAAAAEwgQCAAAABMMEAgAAAAHEBAIAAAABxQQCAAAAAcYEAgAAAAHHBAIAhQcAIQzABIAAAAABwwSAAAAAAcQEgAAAAAHFBIAAAAABxgSAAAAAAccEgAAAAAHXBAEAAAAB2AQBAAAAAdkEAQAAAAHaBIAAAAAB2wSAAAAAAdwEgAAAAAEOuQQAAJcHADC6BAAAuAYAELsEAACXBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh3QQBAIIHACHeBAEAggcAId8EAQCCBwAh4AQBAIIHACHhBAEAggcAIeIEAgCYBwAh4wQBAJkHACHkBAAAmgcAIA0PAACbBwAgQwAAmwcAIEQAAJsHACCVAQAAoAcAIJYBAACbBwAgwAQCAAAAAcEEAgAAAAXCBAIAAAAFwwQCAAAAAcQEAgAAAAHFBAIAAAABxgQCAAAAAccEAgCfBwAhDg8AAJsHACBDAACeBwAgRAAAngcAIMAEAQAAAAHBBAEAAAAFwgQBAAAABcMEAQAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHHBAEAnQcAIcgEAQAAAAHJBAEAAAABygQBAAAAAQ8PAACbBwAgQwAAnAcAIEQAAJwHACDABIAAAAABwwSAAAAAAcQEgAAAAAHFBIAAAAABxgSAAAAAAccEgAAAAAHXBAEAAAAB2AQBAAAAAdkEAQAAAAHaBIAAAAAB2wSAAAAAAdwEgAAAAAEIwAQCAAAAAcEEAgAAAAXCBAIAAAAFwwQCAAAAAcQEAgAAAAHFBAIAAAABxgQCAAAAAccEAgCbBwAhDMAEgAAAAAHDBIAAAAABxASAAAAAAcUEgAAAAAHGBIAAAAABxwSAAAAAAdcEAQAAAAHYBAEAAAAB2QQBAAAAAdoEgAAAAAHbBIAAAAAB3ASAAAAAAQ4PAACbBwAgQwAAngcAIEQAAJ4HACDABAEAAAABwQQBAAAABcIEAQAAAAXDBAEAAAABxAQBAAAAAcUEAQAAAAHGBAEAAAABxwQBAJ0HACHIBAEAAAAByQQBAAAAAcoEAQAAAAELwAQBAAAAAcEEAQAAAAXCBAEAAAAFwwQBAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAccEAQCeBwAhyAQBAAAAAckEAQAAAAHKBAEAAAABDQ8AAJsHACBDAACbBwAgRAAAmwcAIJUBAACgBwAglgEAAJsHACDABAIAAAABwQQCAAAABcIEAgAAAAXDBAIAAAABxAQCAAAAAcUEAgAAAAHGBAIAAAABxwQCAJ8HACEIwAQIAAAAAcEECAAAAAXCBAgAAAAFwwQIAAAAAcQECAAAAAHFBAgAAAABxgQIAAAAAccECACgBwAhDrkEAAChBwAwugQAAKIGABC7BAAAoQcAMLwEAQCCBwAhvQQBAJkHACG-BEAAgwcAIb8EQACDBwAh1QQAAJIHACDWBAAAkgcAIOUEAQCCBwAh5gQBAIIHACHnBAIAjgcAIegEAQCCBwAh6QQAAJIHACAPuQQAAKIHADC6BAAAjAYAELsEAACiBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh6gQBAIIHACHrBAEAggcAIewEQACDBwAh7QQCAI4HACHvBAAAowfvBCLxBAAApAfxBCLyBAEAmQcAIfMEAQCZBwAh9AQBAJkHACEHDwAAhQcAIEMAAKgHACBEAACoBwAgwAQAAADvBALBBAAAAO8ECMIEAAAA7wQIxwQAAKcH7wQiBw8AAIUHACBDAACmBwAgRAAApgcAIMAEAAAA8QQCwQQAAADxBAjCBAAAAPEECMcEAAClB_EEIgcPAACFBwAgQwAApgcAIEQAAKYHACDABAAAAPEEAsEEAAAA8QQIwgQAAADxBAjHBAAApQfxBCIEwAQAAADxBALBBAAAAPEECMIEAAAA8QQIxwQAAKYH8QQiBw8AAIUHACBDAACoBwAgRAAAqAcAIMAEAAAA7wQCwQQAAADvBAjCBAAAAO8ECMcEAACnB-8EIgTABAAAAO8EAsEEAAAA7wQIwgQAAADvBAjHBAAAqAfvBCIOuQQAAKkHADC6BAAA9gUAELsEAACpBwAwvAQBAIIHACG-BEAAgwcAIc0ECACqBwAh9QQBAIIHACH2BAEAggcAIfcEAQCCBwAh-AQIAKoHACH5BAgAqgcAIfoECACqBwAh-wQIAKoHACH8BAEAmQcAIQ0PAACbBwAgQwAAoAcAIEQAAKAHACCVAQAAoAcAIJYBAACgBwAgwAQIAAAAAcEECAAAAAXCBAgAAAAFwwQIAAAAAcQECAAAAAHFBAgAAAABxgQIAAAAAccECACrBwAhDQ8AAJsHACBDAACgBwAgRAAAoAcAIJUBAACgBwAglgEAAKAHACDABAgAAAABwQQIAAAABcIECAAAAAXDBAgAAAABxAQIAAAAAcUECAAAAAHGBAgAAAABxwQIAKsHACENuQQAAKwHADC6BAAA4AUAELsEAACsBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQIAKoHACHlBAEAggcAIeYEAQCCBwAh8QQBAIIHACH9BAEAggcAIf4EAQCCBwAh_wQCAI4HACEJuQQAAK0HADC6BAAAygUAELsEAACtBwAwvAQBAIIHACGABQEAggcAIYIFAACuB4IFI4MFAACvB4IFIoQFAQCCBwAhhQVAAIMHACEHDwAAmwcAIEMAALMHACBEAACzBwAgwAQAAACCBQPBBAAAAIIFCcIEAAAAggUJxwQAALIHggUjBw8AAIUHACBDAACxBwAgRAAAsQcAIMAEAAAAggUCwQQAAACCBQjCBAAAAIIFCMcEAACwB4IFIgcPAACFBwAgQwAAsQcAIEQAALEHACDABAAAAIIFAsEEAAAAggUIwgQAAACCBQjHBAAAsAeCBSIEwAQAAACCBQLBBAAAAIIFCMIEAAAAggUIxwQAALEHggUiBw8AAJsHACBDAACzBwAgRAAAswcAIMAEAAAAggUDwQQAAACCBQnCBAAAAIIFCccEAACyB4IFIwTABAAAAIIFA8EEAAAAggUJwgQAAACCBQnHBAAAsweCBSMKuQQAALQHADC6BAAAtAUAELsEAAC0BwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh5QQBAIIHACHmBAEAggcAIfEEAACvB4IFIoYFAQCZBwAhDrkEAAC1BwAwugQAAJ4FABC7BAAAtQcAMLwEAQCCBwAhvgRAAIMHACHWBAAAkgcAIN0EAQCCBwAh5gQBAIIHACGHBQIAjgcAIYgFAACSBwAgiQUAAJIHACCKBQAAkgcAIIsFAACSBwAgjAUAAJIHACARuQQAALYHADC6BAAAiAUAELsEAAC2BwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAhzQQIALcHACHOBAgAtwcAIc8ECAC3BwAh0AQIALcHACHWBAAAkgcAIN0EAQCCBwAh5gQBAIIHACHoBAEAggcAIYgFAACSBwAgjQUIALcHACGOBQgAtwcAIQ0PAACFBwAgQwAAkAcAIEQAAJAHACCVAQAAkAcAIJYBAACQBwAgwAQIAAAAAcEECAAAAATCBAgAAAAEwwQIAAAAAcQECAAAAAHFBAgAAAABxgQIAAAAAccECAC4BwAhDQ8AAIUHACBDAACQBwAgRAAAkAcAIJUBAACQBwAglgEAAJAHACDABAgAAAABwQQIAAAABMIECAAAAATDBAgAAAABxAQIAAAAAcUECAAAAAHGBAgAAAABxwQIALgHACEHuQQAALkHADC6BAAA8gQAELsEAAC5BwAwvAQBAIIHACHmBAEAggcAIY8FAQCCBwAhkAUBAIIHACEVuQQAALoHADC6BAAA3AQAELsEAAC6BwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh8QQAAL4HnwUi8wQBAIIHACH9BAAAvQeaBSKRBQEAggcAIZIFAQCCBwAhkwUBAIIHACGUBQEAmQcAIZYFAAC7B5YFIpgFAAC8B5gFIpoFCACqBwAhmwUIAKoHACGcBQEAmQcAIZ0FQACDBwAhnwVAAL8HACGgBUAAvwcAIQcPAACFBwAgQwAAyQcAIEQAAMkHACDABAAAAJYFAsEEAAAAlgUIwgQAAACWBQjHBAAAyAeWBSIHDwAAhQcAIEMAAMcHACBEAADHBwAgwAQAAACYBQLBBAAAAJgFCMIEAAAAmAUIxwQAAMYHmAUiBw8AAIUHACBDAADFBwAgRAAAxQcAIMAEAAAAmgUCwQQAAACaBQjCBAAAAJoFCMcEAADEB5oFIgcPAACFBwAgQwAAwwcAIEQAAMMHACDABAAAAJ8FAsEEAAAAnwUIwgQAAACfBQjHBAAAwgefBSILDwAAmwcAIEMAAMEHACBEAADBBwAgwARAAAAAAcEEQAAAAAXCBEAAAAAFwwRAAAAAAcQEQAAAAAHFBEAAAAABxgRAAAAAAccEQADABwAhCw8AAJsHACBDAADBBwAgRAAAwQcAIMAEQAAAAAHBBEAAAAAFwgRAAAAABcMEQAAAAAHEBEAAAAABxQRAAAAAAcYEQAAAAAHHBEAAwAcAIQjABEAAAAABwQRAAAAABcIEQAAAAAXDBEAAAAABxARAAAAAAcUEQAAAAAHGBEAAAAABxwRAAMEHACEHDwAAhQcAIEMAAMMHACBEAADDBwAgwAQAAACfBQLBBAAAAJ8FCMIEAAAAnwUIxwQAAMIHnwUiBMAEAAAAnwUCwQQAAACfBQjCBAAAAJ8FCMcEAADDB58FIgcPAACFBwAgQwAAxQcAIEQAAMUHACDABAAAAJoFAsEEAAAAmgUIwgQAAACaBQjHBAAAxAeaBSIEwAQAAACaBQLBBAAAAJoFCMIEAAAAmgUIxwQAAMUHmgUiBw8AAIUHACBDAADHBwAgRAAAxwcAIMAEAAAAmAUCwQQAAACYBQjCBAAAAJgFCMcEAADGB5gFIgTABAAAAJgFAsEEAAAAmAUIwgQAAACYBQjHBAAAxweYBSIHDwAAhQcAIEMAAMkHACBEAADJBwAgwAQAAACWBQLBBAAAAJYFCMIEAAAAlgUIxwQAAMgHlgUiBMAEAAAAlgUCwQQAAACWBQjCBAAAAJYFCMcEAADJB5YFIgq5BAAAygcAMLoEAADGBAAQuwQAAMoHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACGPBQEAggcAIZIFAQCZBwAhoQUBAJkHACGiBQEAggcAIQ4GAADNBwAgGgAA0AcAIBsAAM4HACAcAADPBwAguQQAAMsHADC6BAAAFwAQuwQAAMsHADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGPBQEAigcAIZIFAQDMBwAhoQUBAMwHACGiBQEAigcAIQvABAEAAAABwQQBAAAABcIEAQAAAAXDBAEAAAABxAQBAAAAAcUEAQAAAAHGBAEAAAABxwQBAJ4HACHIBAEAAAAByQQBAAAAAcoEAQAAAAEaBwAA-AcAIAgAAPkHACAJAAD6BwAgDQAA-wcAIBoAANAHACAdAAD8BwAgIAAA_QcAICEAAP4HACAjAAD_BwAguQQAAPMHADC6BAAAzgIAELsEAADzBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAAPYHygUijwUBAIoHACGUBQEAzAcAIcUFAQCKBwAhxgUgAPQHACHIBQAA9QfIBSLKBSAA9AcAIcsFIAD0BwAhzAVAAPcHACHsBQAAzgIAIO0FAADOAgAgA6MFAAAZACCkBQAAGQAgpQUAABkAIAOjBQAARgAgpAUAAEYAIKUFAABGACADowUAADsAIKQFAAA7ACClBQAAOwAgCrkEAADRBwAwugQAAK4EABC7BAAA0QcAMLwEAQCCBwAh3QQBAIIHACGPBQEAggcAIZQFAQCZBwAhpgUBAJkHACGnBUAAvwcAIagFAQCZBwAhCrkEAADSBwAwugQAAJgEABC7BAAA0gcAMLwEAQCCBwAh3QQBAIIHACGPBQEAggcAIZIFAQCZBwAhlAUBAJkHACGpBQEAmQcAIaoFAQCZBwAhCrkEAADTBwAwugQAAIIEABC7BAAA0wcAMLwEAQCCBwAh3QQBAIIHACGrBQEAggcAIawFAQCZBwAhrQUBAJkHACGuBQIAmAcAIa8FAgCYBwAhBrkEAADUBwAwugQAAOwDABC7BAAA1AcAMLwEAQCCBwAh3QQBAIIHACGPBQEAggcAIQe5BAAA1QcAMLoEAADWAwAQuwQAANUHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHlBAEAggcAIQgIAADXBwAguQQAANYHADC6BAAAiAEAELsEAADWBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACEdBAAA2gcAIAUAANsHACAGAADNBwAgDgAA4QcAIBAAAN8HACATAADkBwAgFAAA4gcAIBoAANAHACAkAADcBwAgJQAA3QcAICoAAN4HACArAADgBwAgLAAA4wcAILkEAADZBwAwugQAABEAELsEAADZBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhkwUBAMwHACGiBQEAigcAIbAFAQDMBwAhsQUBAMwHACGyBQEAzAcAIbMFAQDMBwAhtAUBAMwHACG1BQEAzAcAIewFAAARACDtBQAAEQAgDrkEAADYBwAwugQAAL4DABC7BAAA2AcAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIZMFAQCZBwAhogUBAIIHACGwBQEAmQcAIbEFAQCZBwAhsgUBAJkHACGzBQEAmQcAIbQFAQCZBwAhtQUBAJkHACEbBAAA2gcAIAUAANsHACAGAADNBwAgDgAA4QcAIBAAAN8HACATAADkBwAgFAAA4gcAIBoAANAHACAkAADcBwAgJQAA3QcAICoAAN4HACArAADgBwAgLAAA4wcAILkEAADZBwAwugQAABEAELsEAADZBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhkwUBAMwHACGiBQEAigcAIbAFAQDMBwAhsQUBAMwHACGyBQEAzAcAIbMFAQDMBwAhtAUBAMwHACG1BQEAzAcAIQOjBQAABQAgpAUAAAUAIKUFAAAFACADowUAAAkAIKQFAAAJACClBQAACQAgA6MFAABvACCkBQAAbwAgpQUAAG8AIAOjBQAAcwAgpAUAAHMAIKUFAABzACADowUAAHcAIKQFAAB3ACClBQAAdwAgA6MFAAAlACCkBQAAJQAgpQUAACUAIAOjBQAAIQAgpAUAACEAIKUFAAAhACADowUAAAMAIKQFAAADACClBQAAAwAgA6MFAAA3ACCkBQAANwAgpQUAADcAIAoIAADXBwAguQQAANYHADC6BAAAiAEAELsEAADWBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHsBQAAiAEAIO0FAACIAQAgA6MFAAAuACCkBQAALgAgpQUAAC4AIAm5BAAA5QcAMLoEAACmAwAQuwQAAOUHADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACG2BQEAggcAIbcFAQCCBwAhuAVAAIMHACEJuQQAAOYHADC6BAAAkwMAELsEAADmBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhtgUBAIoHACG3BQEAigcAIbgFQACLBwAhELkEAADnBwAwugQAAI0DABC7BAAA5wcAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIaIFAQCCBwAhuQUBAIIHACG6BQEAggcAIbsFAQCZBwAhvAUBAJkHACG9BQEAmQcAIb4FQAC_BwAhvwVAAL8HACHABQEAmQcAIcEFAQCZBwAhC7kEAADoBwAwugQAAPcCABC7BAAA6AcAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIaIFAQCCBwAhuAVAAIMHACHCBQEAggcAIcMFAQCZBwAhxAUBAJkHACEPuQQAAOkHADC6BAAA4QIAELsEAADpBwAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh8QQAAOwHygUijwUBAIIHACGUBQEAmQcAIcUFAQCCBwAhxgUgAOoHACHIBQAA6wfIBSLKBSAA6gcAIcsFIADqBwAhzAVAAL8HACEFDwAAhQcAIEMAAPIHACBEAADyBwAgwAQgAAAAAccEIADxBwAhBw8AAIUHACBDAADwBwAgRAAA8AcAIMAEAAAAyAUCwQQAAADIBQjCBAAAAMgFCMcEAADvB8gFIgcPAACFBwAgQwAA7gcAIEQAAO4HACDABAAAAMoFAsEEAAAAygUIwgQAAADKBQjHBAAA7QfKBSIHDwAAhQcAIEMAAO4HACBEAADuBwAgwAQAAADKBQLBBAAAAMoFCMIEAAAAygUIxwQAAO0HygUiBMAEAAAAygUCwQQAAADKBQjCBAAAAMoFCMcEAADuB8oFIgcPAACFBwAgQwAA8AcAIEQAAPAHACDABAAAAMgFAsEEAAAAyAUIwgQAAADIBQjHBAAA7wfIBSIEwAQAAADIBQLBBAAAAMgFCMIEAAAAyAUIxwQAAPAHyAUiBQ8AAIUHACBDAADyBwAgRAAA8gcAIMAEIAAAAAHHBCAA8QcAIQLABCAAAAABxwQgAPIHACEYBwAA-AcAIAgAAPkHACAJAAD6BwAgDQAA-wcAIBoAANAHACAdAAD8BwAgIAAA_QcAICEAAP4HACAjAAD_BwAguQQAAPMHADC6BAAAzgIAELsEAADzBwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAAPYHygUijwUBAIoHACGUBQEAzAcAIcUFAQCKBwAhxgUgAPQHACHIBQAA9QfIBSLKBSAA9AcAIcsFIAD0BwAhzAVAAPcHACECwAQgAAAAAccEIADyBwAhBMAEAAAAyAUCwQQAAADIBQjCBAAAAMgFCMcEAADwB8gFIgTABAAAAMoFAsEEAAAAygUIwgQAAADKBQjHBAAA7gfKBSIIwARAAAAAAcEEQAAAAAXCBEAAAAAFwwRAAAAAAcQEQAAAAAHFBEAAAAABxgRAAAAAAccEQADBBwAhA6MFAAANACCkBQAADQAgpQUAAA0AIB0EAADaBwAgBQAA2wcAIAYAAM0HACAOAADhBwAgEAAA3wcAIBMAAOQHACAUAADiBwAgGgAA0AcAICQAANwHACAlAADdBwAgKgAA3gcAICsAAOAHACAsAADjBwAguQQAANkHADC6BAAAEQAQuwQAANkHADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGTBQEAzAcAIaIFAQCKBwAhsAUBAMwHACGxBQEAzAcAIbIFAQDMBwAhswUBAMwHACG0BQEAzAcAIbUFAQDMBwAh7AUAABEAIO0FAAARACADowUAABMAIKQFAAATACClBQAAEwAgEAYAAM0HACAaAADQBwAgGwAAzgcAIBwAAM8HACC5BAAAywcAMLoEAAAXABC7BAAAywcAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIY8FAQCKBwAhkgUBAMwHACGhBQEAzAcAIaIFAQCKBwAh7AUAABcAIO0FAAAXACADowUAAFgAIKQFAABYACClBQAAWAAgA6MFAABcACCkBQAAXAAgpQUAAFwAIAOjBQAAYAAgpAUAAGAAIKUFAABgACADowUAAGQAIKQFAABkACClBQAAZAAgCbkEAACACAAwugQAAMgCABC7BAAAgAgAMLwEAQCCBwAhvgRAAIMHACHeBAEAggcAId8EAQCCBwAh4QQBAIIHACHNBQEAggcAIQ-5BAAAgQgAMLoEAACyAgAQuwQAAIEIADC8BAEAggcAIb4EQACDBwAhvwRAAIMHACHxBAAAgwjSBSKRBQEAggcAIc0FAQCCBwAhzgUQAIIIACHPBQEAggcAIdAFAQCCBwAh0gUBAJkHACHTBUAAvwcAIdQFQAC_BwAhDQ8AAIUHACBDAACHCAAgRAAAhwgAIJUBAACHCAAglgEAAIcIACDABBAAAAABwQQQAAAABMIEEAAAAATDBBAAAAABxAQQAAAAAcUEEAAAAAHGBBAAAAABxwQQAIYIACEHDwAAhQcAIEMAAIUIACBEAACFCAAgwAQAAADSBQLBBAAAANIFCMIEAAAA0gUIxwQAAIQI0gUiBw8AAIUHACBDAACFCAAgRAAAhQgAIMAEAAAA0gUCwQQAAADSBQjCBAAAANIFCMcEAACECNIFIgTABAAAANIFAsEEAAAA0gUIwgQAAADSBQjHBAAAhQjSBSINDwAAhQcAIEMAAIcIACBEAACHCAAglQEAAIcIACCWAQAAhwgAIMAEEAAAAAHBBBAAAAAEwgQQAAAABMMEEAAAAAHEBBAAAAABxQQQAAAAAcYEEAAAAAHHBBAAhggAIQjABBAAAAABwQQQAAAABMIEEAAAAATDBBAAAAABxAQQAAAAAcUEEAAAAAHGBBAAAAABxwQQAIcIACETuQQAAIgIADC6BAAAnAIAELsEAACICAAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh5QQBAJkHACHmBAEAmQcAIeoEAQCZBwAh7wQAAIkI1wUi8QQAAIoI2AUi8wQBAIIHACGRBQEAggcAIZIFAQCCBwAh1QUBAIIHACHZBQAAiwjZBSPaBQEAmQcAIdsFAQCZBwAh3AVAAL8HACEHDwAAhQcAIEMAAJEIACBEAACRCAAgwAQAAADXBQLBBAAAANcFCMIEAAAA1wUIxwQAAJAI1wUiBw8AAIUHACBDAACPCAAgRAAAjwgAIMAEAAAA2AUCwQQAAADYBQjCBAAAANgFCMcEAACOCNgFIgcPAACbBwAgQwAAjQgAIEQAAI0IACDABAAAANkFA8EEAAAA2QUJwgQAAADZBQnHBAAAjAjZBSMHDwAAmwcAIEMAAI0IACBEAACNCAAgwAQAAADZBQPBBAAAANkFCcIEAAAA2QUJxwQAAIwI2QUjBMAEAAAA2QUDwQQAAADZBQnCBAAAANkFCccEAACNCNkFIwcPAACFBwAgQwAAjwgAIEQAAI8IACDABAAAANgFAsEEAAAA2AUIwgQAAADYBQjHBAAAjgjYBSIEwAQAAADYBQLBBAAAANgFCMIEAAAA2AUIxwQAAI8I2AUiBw8AAIUHACBDAACRCAAgRAAAkQgAIMAEAAAA1wUCwQQAAADXBQjCBAAAANcFCMcEAACQCNcFIgTABAAAANcFAsEEAAAA1wUIwgQAAADXBQjHBAAAkQjXBSIPuQQAAJIIADC6BAAAgAIAELsEAACSCAAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh7wQAAJMI3gUi8QQAAJUI4QUi8wQBAIIHACGABQEAmQcAIaIFAQCCBwAh3wUAAJQI3wUi4QUBAIIHACHiBQEAmQcAIeMFQAC_BwAhBw8AAIUHACBDAACbCAAgRAAAmwgAIMAEAAAA3gUCwQQAAADeBQjCBAAAAN4FCMcEAACaCN4FIgcPAACFBwAgQwAAmQgAIEQAAJkIACDABAAAAN8FAsEEAAAA3wUIwgQAAADfBQjHBAAAmAjfBSIHDwAAhQcAIEMAAJcIACBEAACXCAAgwAQAAADhBQLBBAAAAOEFCMIEAAAA4QUIxwQAAJYI4QUiBw8AAIUHACBDAACXCAAgRAAAlwgAIMAEAAAA4QUCwQQAAADhBQjCBAAAAOEFCMcEAACWCOEFIgTABAAAAOEFAsEEAAAA4QUIwgQAAADhBQjHBAAAlwjhBSIHDwAAhQcAIEMAAJkIACBEAACZCAAgwAQAAADfBQLBBAAAAN8FCMIEAAAA3wUIxwQAAJgI3wUiBMAEAAAA3wUCwQQAAADfBQjCBAAAAN8FCMcEAACZCN8FIgcPAACFBwAgQwAAmwgAIEQAAJsIACDABAAAAN4FAsEEAAAA3gUIwgQAAADeBQjHBAAAmgjeBSIEwAQAAADeBQLBBAAAAN4FCMIEAAAA3gUIxwQAAJsI3gUiB7kEAACcCAAwugQAAOoBABC7BAAAnAgAMLwEAQCCBwAhogUBAIIHACHkBQEAggcAIeUFQACDBwAhC7kEAACdCAAwugQAANQBABC7BAAAnQgAMLwEAQCCBwAhvgRAAIMHACG_BEAAgwcAIeMFQAC_BwAh5AUBAIIHACHmBQEAggcAIecFAQCCBwAh6AUgAOoHACEHuQQAAJ4IADC6BAAAvgEAELsEAACeCAAwvAQBAIIHACG-BEAAgwcAIb8EQACDBwAh6gQBAJkHACEKFgAAoAgAICAAAP0HACAwAAD-BwAguQQAAJ8IADC6BAAAnQEAELsEAACfCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh6gQBAMwHACETCAAA1wcAIAoAAMgIACAQAADfBwAgGgAA0AcAICMAAP8HACAuAADQCAAgLwAA0QgAILkEAADPCAAwugQAAAMAELsEAADPCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAh7AUAAAMAIO0FAAADACAKLQAApAgAILkEAAChCAAwugQAAJgBABC7BAAAoQgAMLwEAQCKBwAhgAUBAIoHACGCBQAAogiCBSODBQAAowiCBSKEBQEAigcAIYUFQACLBwAhBMAEAAAAggUDwQQAAACCBQnCBAAAAIIFCccEAACzB4IFIwTABAAAAIIFAsEEAAAAggUIwgQAAACCBQjHBAAAsQeCBSITCAAA1wcAIAoAAMgIACAQAADfBwAgGgAA0AcAICMAAP8HACAuAADQCAAgLwAA0QgAILkEAADPCAAwugQAAAMAELsEAADPCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAh7AUAAAMAIO0FAAADACAJJgAAjAcAILkEAAClCAAwugQAAH8AELsEAAClCAAwvAQBAIoHACG9BAEAigcAIb4EQACLBwAhywQBAIoHACHMBAIAlQcAIRIDAADXBwAgJwAAqQgAICgAAKoIACApAACrCAAguQQAAKYIADC6BAAAdwAQuwQAAKYIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHdBAEAigcAId4EAQCKBwAh3wQBAIoHACHgBAEAigcAIeEEAQCKBwAh4gQCAKcIACHjBAEAzAcAIeQEAACoCAAgCMAEAgAAAAHBBAIAAAAFwgQCAAAABcMEAgAAAAHEBAIAAAABxQQCAAAAAcYEAgAAAAHHBAIAmwcAIQzABIAAAAABwwSAAAAAAcQEgAAAAAHFBIAAAAABxgSAAAAAAccEgAAAAAHXBAEAAAAB2AQBAAAAAdkEAQAAAAHaBIAAAAAB2wSAAAAAAdwEgAAAAAELJgAAjAcAICcBAIoHACG5BAAAiQcAMLoEAAB7ABC7BAAAiQcAMLwEAQCKBwAhvQQBAIoHACG-BEAAiwcAIb8EQACLBwAh7AUAAHsAIO0FAAB7ACAUJgAAjAcAILkEAACUBwAwugQAAH0AELsEAACUBwAwvAQBAIoHACG9BAEAigcAIb4EQACLBwAhvwRAAIsHACHNBAIAlQcAIc4EAgCVBwAhzwQCAJUHACHQBAIAlQcAIdEEAgCVBwAh0gQCAJUHACHTBAAAlgcAINQEAACWBwAg1QQAAJYHACDWBAAAlgcAIOwFAAB9ACDtBQAAfQAgA6MFAAB_ACCkBQAAfwAgpQUAAH8AIAcDAADXBwAguQQAAKwIADC6BAAAcwAQuwQAAKwIADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACELAwAA1wcAILkEAACtCAAwugQAAG8AELsEAACtCAAwvAQBAIoHACHdBAEAigcAIY8FAQCKBwAhkgUBAMwHACGUBQEAzAcAIakFAQDMBwAhqgUBAMwHACERFgAApAgAICIAAM0HACC5BAAArggAMLoEAABkABC7BAAArggAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeoEAQCKBwAh6wQBAIoHACHsBEAAiwcAIe0EAgCVBwAh7wQAAK8I7wQi8QQAALAI8QQi8gQBAMwHACHzBAEAzAcAIfQEAQDMBwAhBMAEAAAA7wQCwQQAAADvBAjCBAAAAO8ECMcEAACoB-8EIgTABAAAAPEEAsEEAAAA8QQIwgQAAADxBAjHBAAApgfxBCICogUBAAAAAeQFAQAAAAEJBgAAzQcAIB4AALMIACC5BAAAsggAMLoEAABgABC7BAAAsggAMLwEAQCKBwAhogUBAIoHACHkBQEAigcAIeUFQACLBwAhDBYAAKAIACAgAAD9BwAgMAAA_gcAILkEAACfCAAwugQAAJ0BABC7BAAAnwgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeoEAQDMBwAh7AUAAJ0BACDtBQAAnQEAIA0eAACzCAAgHwAAzQcAILkEAAC0CAAwugQAAFwAELsEAAC0CAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh4wVAAPcHACHkBQEAigcAIeYFAQCKBwAh5wUBAIoHACHoBSAA9AcAIRAGAADNBwAguQQAALUIADC6BAAAWAAQuwQAALUIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHvBAAAtgjeBSLxBAAAuAjhBSLzBAEAigcAIYAFAQDMBwAhogUBAIoHACHfBQAAtwjfBSLhBQEAigcAIeIFAQDMBwAh4wVAAPcHACEEwAQAAADeBQLBBAAAAN4FCMIEAAAA3gUIxwQAAJsI3gUiBMAEAAAA3wUCwQQAAADfBQjCBAAAAN8FCMcEAACZCN8FIgTABAAAAOEFAsEEAAAA4QUIwgQAAADhBQjHBAAAlwjhBSIRDQAAvQgAIBcAALwIACC5BAAAuQgAMLoEAABGABC7BAAAuQgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIfEEAAC7CNIFIpEFAQCKBwAhzQUBAIoHACHOBRAAuggAIc8FAQCKBwAh0AUBAIoHACHSBQEAzAcAIdMFQAD3BwAh1AVAAPcHACEIwAQQAAAAAcEEEAAAAATCBBAAAAAEwwQQAAAAAcQEEAAAAAHFBBAAAAABxgQQAAAAAccEEACHCAAhBMAEAAAA0gUCwQQAAADSBQjCBAAAANIFCMcEAACFCNIFIhwIAAD5BwAgCgAAwwgAIA0AAL0IACAVAADNBwAgFgAAoAgAIBgAAMQIACAZAADFCAAguQQAAL8IADC6BAAAOwAQuwQAAL8IADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHlBAEAzAcAIeYEAQDMBwAh6gQBAMwHACHvBAAAwAjXBSLxBAAAwQjYBSLzBAEAigcAIZEFAQCKBwAhkgUBAIoHACHVBQEAigcAIdkFAADCCNkFI9oFAQDMBwAh2wUBAMwHACHcBUAA9wcAIewFAAA7ACDtBQAAOwAgEAYAAM0HACAaAADQBwAgGwAAzgcAIBwAAM8HACC5BAAAywcAMLoEAAAXABC7BAAAywcAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIY8FAQCKBwAhkgUBAMwHACGhBQEAzAcAIaIFAQCKBwAh7AUAABcAIO0FAAAXACAKFwAAvAgAILkEAAC-CAAwugQAAEIAELsEAAC-CAAwvAQBAIoHACG-BEAAiwcAId4EAQCKBwAh3wQBAIoHACHhBAEAigcAIc0FAQCKBwAhGggAAPkHACAKAADDCAAgDQAAvQgAIBUAAM0HACAWAACgCAAgGAAAxAgAIBkAAMUIACC5BAAAvwgAMLoEAAA7ABC7BAAAvwgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeUEAQDMBwAh5gQBAMwHACHqBAEAzAcAIe8EAADACNcFIvEEAADBCNgFIvMEAQCKBwAhkQUBAIoHACGSBQEAigcAIdUFAQCKBwAh2QUAAMII2QUj2gUBAMwHACHbBQEAzAcAIdwFQAD3BwAhBMAEAAAA1wUCwQQAAADXBQjCBAAAANcFCMcEAACRCNcFIgTABAAAANgFAsEEAAAA2AUIwgQAAADYBQjHBAAAjwjYBSIEwAQAAADZBQPBBAAAANkFCcIEAAAA2QUJxwQAAI0I2QUjHwsAAN0IACAMAADgBwAgDQAAvQgAIA4AAOEHACAQAADfBwAgEwAA5AcAIBQAAOIHACAaAADQBwAguQQAANgIADC6BAAAGQAQuwQAANgIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHxBAAA3AifBSLzBAEAigcAIf0EAADbCJoFIpEFAQCKBwAhkgUBAIoHACGTBQEAigcAIZQFAQDMBwAhlgUAANkIlgUimAUAANoImAUimgUIAMoIACGbBQgAyggAIZwFAQDMBwAhnQVAAIsHACGfBUAA9wcAIaAFQAD3BwAh7AUAABkAIO0FAAAZACADowUAAEIAIKQFAABCACClBQAAQgAgEw0AAL0IACAXAAC8CAAguQQAALkIADC6BAAARgAQuwQAALkIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHxBAAAuwjSBSKRBQEAigcAIc0FAQCKBwAhzgUQALoIACHPBQEAigcAIdAFAQCKBwAh0gUBAMwHACHTBUAA9wcAIdQFQAD3BwAh7AUAAEYAIO0FAABGACAC5QQBAAAAAeYEAQAAAAEQCAAA1wcAIAoAAMgIACC5BAAAxwgAMLoEAAA3ABC7BAAAxwgAMLwEAQCKBwAhvQQBAMwHACG-BEAAiwcAIb8EQACLBwAh1QQAAJYHACDWBAAAlgcAIOUEAQCKBwAh5gQBAIoHACHnBAIAlQcAIegEAQCKBwAh6QQAAJYHACAfCwAA3QgAIAwAAOAHACANAAC9CAAgDgAA4QcAIBAAAN8HACATAADkBwAgFAAA4gcAIBoAANAHACC5BAAA2AgAMLoEAAAZABC7BAAA2AgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIfEEAADcCJ8FIvMEAQCKBwAh_QQAANsImgUikQUBAIoHACGSBQEAigcAIZMFAQCKBwAhlAUBAMwHACGWBQAA2QiWBSKYBQAA2giYBSKaBQgAyggAIZsFCADKCAAhnAUBAMwHACGdBUAAiwcAIZ8FQAD3BwAhoAVAAPcHACHsBQAAGQAg7QUAABkAIA8RAADLCAAguQQAAMkIADC6BAAAMgAQuwQAAMkIADC8BAEAigcAIb4EQACLBwAhzQQIAMoIACH1BAEAigcAIfYEAQCKBwAh9wQBAIoHACH4BAgAyggAIfkECADKCAAh-gQIAMoIACH7BAgAyggAIfwEAQDMBwAhCMAECAAAAAHBBAgAAAAFwgQIAAAABcMECAAAAAHEBAgAAAABxQQIAAAAAcYECAAAAAHHBAgAoAcAIRIIAADXBwAgCgAAyAgAIBIAAM0IACC5BAAAzAgAMLoEAAAuABC7BAAAzAgAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIc0ECADKCAAh5QQBAIoHACHmBAEAigcAIfEEAQCKBwAh_QQBAIoHACH-BAEAigcAIf8EAgCVBwAh7AUAAC4AIO0FAAAuACAQCAAA1wcAIAoAAMgIACASAADNCAAguQQAAMwIADC6BAAALgAQuwQAAMwIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHNBAgAyggAIeUEAQCKBwAh5gQBAIoHACHxBAEAigcAIf0EAQCKBwAh_gQBAIoHACH_BAIAlQcAIQOjBQAAMgAgpAUAADIAIKUFAAAyACAC5QQBAAAAAeYEAQAAAAERCAAA1wcAIAoAAMgIACAQAADfBwAgGgAA0AcAICMAAP8HACAuAADQCAAgLwAA0QgAILkEAADPCAAwugQAAAMAELsEAADPCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAhA6MFAACYAQAgpAUAAJgBACClBQAAmAEAIAOjBQAAnQEAIKQFAACdAQAgpQUAAJ0BACAC3QQBAAAAAeYEAQAAAAERAwAA1wcAIAoAAMgIACAOAADhBwAguQQAANMIADC6BAAAJQAQuwQAANMIADC8BAEAigcAIb4EQACLBwAh1gQAAJYHACDdBAEAigcAIeYEAQCKBwAhhwUCAJUHACGIBQAAlgcAIIkFAACWBwAgigUAAJYHACCLBQAAlgcAIIwFAACWBwAgAt0EAQAAAAHmBAEAAAABEwMAANcHACAKAADICAAguQQAANUIADC6BAAAIQAQuwQAANUIADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHNBAgA1ggAIc4ECADWCAAhzwQIANYIACHQBAgA1ggAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIegEAQCKBwAhiAUAAJYHACCNBQgA1ggAIY4FCADWCAAhCMAECAAAAAHBBAgAAAAEwgQIAAAABMMECAAAAAHEBAgAAAABxQQIAAAAAcYECAAAAAHHBAgAkAcAIQgKAADICAAguQQAANcIADC6BAAAHQAQuwQAANcIADC8BAEAigcAIeYEAQCKBwAhjwUBAIoHACGQBQEAigcAIR0LAADdCAAgDAAA4AcAIA0AAL0IACAOAADhBwAgEAAA3wcAIBMAAOQHACAUAADiBwAgGgAA0AcAILkEAADYCAAwugQAABkAELsEAADYCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAANwInwUi8wQBAIoHACH9BAAA2wiaBSKRBQEAigcAIZIFAQCKBwAhkwUBAIoHACGUBQEAzAcAIZYFAADZCJYFIpgFAADaCJgFIpoFCADKCAAhmwUIAMoIACGcBQEAzAcAIZ0FQACLBwAhnwVAAPcHACGgBUAA9wcAIQTABAAAAJYFAsEEAAAAlgUIwgQAAACWBQjHBAAAyQeWBSIEwAQAAACYBQLBBAAAAJgFCMIEAAAAmAUIxwQAAMcHmAUiBMAEAAAAmgUCwQQAAACaBQjCBAAAAJoFCMcEAADFB5oFIgTABAAAAJ8FAsEEAAAAnwUIwgQAAACfBQjHBAAAwwefBSIDowUAAB0AIKQFAAAdACClBQAAHQAgDAYAAM0HACC5BAAA3ggAMLoEAAATABC7BAAA3ggAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIaIFAQCKBwAhuAVAAIsHACHCBQEAigcAIcMFAQDMBwAhxAUBAMwHACERBgAAzQcAILkEAADfCAAwugQAAA0AELsEAADfCAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG5BQEAigcAIboFAQCKBwAhuwUBAMwHACG8BQEAzAcAIb0FAQDMBwAhvgVAAPcHACG_BUAA9wcAIcAFAQDMBwAhwQUBAMwHACELAwAA1wcAILkEAADgCAAwugQAAAkAELsEAADgCAAwvAQBAIoHACHdBAEAigcAIasFAQCKBwAhrAUBAMwHACGtBQEAzAcAIa4FAgCnCAAhrwUCAKcIACELAwAA1wcAILkEAADhCAAwugQAAAUAELsEAADhCAAwvAQBAIoHACHdBAEAigcAIY8FAQCKBwAhlAUBAMwHACGmBQEAzAcAIacFQAD3BwAhqAUBAMwHACEAAAAB8QUBAAAAAQHxBUAAAAABBT0AAIkRACA-AACMEQAg7gUAAIoRACDvBQAAixEAIPQFAAB5ACADPQAAiREAIO4FAACKEQAg9AUAAHkAIAcDAADDDAAgJwAAhQ8AICgAAIYPACApAACHDwAg4gQAAPkIACDjBAAA-QgAIOQEAAD5CAAgAAAAAAAF8QUCAAAAAfcFAgAAAAH4BQIAAAAB-QUCAAAAAfoFAgAAAAEFPQAAhBEAID4AAIcRACDuBQAAhREAIO8FAACGEQAg9AUAAHkAIAM9AACEEQAg7gUAAIURACD0BQAAeQAgAAAAAAAFPQAA_xAAID4AAIIRACDuBQAAgBEAIO8FAACBEQAg9AUAAHkAIAM9AAD_EAAg7gUAAIARACD0BQAAeQAgAAAAAAAABfEFAgAAAAH3BQIAAAAB-AUCAAAAAfkFAgAAAAH6BQIAAAABAfEFAQAAAAEHPQAAlgkAID4AAJkJACDuBQAAlwkAIO8FAACYCQAg8gUAAHsAIPMFAAB7ACD0BQAA6QYAIAc9AACRCQAgPgAAlAkAIO4FAACSCQAg7wUAAJMJACDyBQAAfQAg8wUAAH0AIPQFAAC7BgAgCz0AAIUJADA-AACKCQAw7gUAAIYJADDvBQAAhwkAMPAFAACICQAg8QUAAIkJADDyBQAAiQkAMPMFAACJCQAw9AUAAIkJADD1BQAAiwkAMPYFAACMCQAwBT0AAPkQACA-AAD9EAAg7gUAAPoQACDvBQAA_BAAIPQFAACpAwAgBLwEAQAAAAG-BEAAAAABywQBAAAAAcwEAgAAAAECAAAAgQEAID0AAJAJACADAAAAgQEAID0AAJAJACA-AACPCQAgATYAAPsQADAJJgAAjAcAILkEAAClCAAwugQAAH8AELsEAAClCAAwvAQBAAAAAb0EAQCKBwAhvgRAAIsHACHLBAEAigcAIcwEAgCVBwAhAgAAAIEBACA2AACPCQAgAgAAAI0JACA2AACOCQAgCLkEAACMCQAwugQAAI0JABC7BAAAjAkAMLwEAQCKBwAhvQQBAIoHACG-BEAAiwcAIcsEAQCKBwAhzAQCAJUHACEIuQQAAIwJADC6BAAAjQkAELsEAACMCQAwvAQBAIoHACG9BAEAigcAIb4EQACLBwAhywQBAIoHACHMBAIAlQcAIQS8BAEA5QgAIb4EQADmCAAhywQBAOUIACHMBAIA7wgAIQS8BAEA5QgAIb4EQADmCAAhywQBAOUIACHMBAIA7wgAIQS8BAEAAAABvgRAAAAAAcsEAQAAAAHMBAIAAAABDbwEAQAAAAG-BEAAAAABvwRAAAAAAc0EAgAAAAHOBAIAAAABzwQCAAAAAdAEAgAAAAHRBAIAAAAB0gQCAAAAAdMEgAAAAAHUBIAAAAAB1QSAAAAAAdYEgAAAAAECAAAAuwYAID0AAJEJACADAAAAfQAgPQAAkQkAID4AAJUJACAPAAAAfQAgNgAAlQkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0EAgDvCAAhzgQCAO8IACHPBAIA7wgAIdAEAgDvCAAh0QQCAO8IACHSBAIA7wgAIdMEgAAAAAHUBIAAAAAB1QSAAAAAAdYEgAAAAAENvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQCAO8IACHOBAIA7wgAIc8EAgDvCAAh0AQCAO8IACHRBAIA7wgAIdIEAgDvCAAh0wSAAAAAAdQEgAAAAAHVBIAAAAAB1gSAAAAAAQQnAQAAAAG8BAEAAAABvgRAAAAAAb8EQAAAAAECAAAA6QYAID0AAJYJACADAAAAewAgPQAAlgkAID4AAJoJACAGAAAAewAgJwEA5QgAITYAAJoJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACEEJwEA5QgAIbwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIQM9AACWCQAg7gUAAJcJACD0BQAA6QYAIAM9AACRCQAg7gUAAJIJACD0BQAAuwYAIAQ9AACFCQAw7gUAAIYJADDwBQAAiAkAIPQFAACJCQAwAz0AAPkQACDuBQAA-hAAIPQFAACpAwAgAAAAAAAFPQAA8RAAID4AAPcQACDuBQAA8hAAIO8FAAD2EAAg9AUAAKkDACAFPQAA7xAAID4AAPQQACDuBQAA8BAAIO8FAADzEAAg9AUAABsAIAM9AADxEAAg7gUAAPIQACD0BQAAqQMAIAM9AADvEAAg7gUAAPAQACD0BQAAGwAgAAAAAAAB8QUAAADvBAIB8QUAAADxBAIFPQAA5xAAID4AAO0QACDuBQAA6BAAIO8FAADsEAAg9AUAACoAIAU9AADlEAAgPgAA6hAAIO4FAADmEAAg7wUAAOkQACD0BQAAywIAIAM9AADnEAAg7gUAAOgQACD0BQAAKgAgAz0AAOUQACDuBQAA5hAAIPQFAADLAgAgAAAAAAAF8QUIAAAAAfcFCAAAAAH4BQgAAAAB-QUIAAAAAfoFCAAAAAEFPQAA4BAAID4AAOMQACDuBQAA4RAAIO8FAADiEAAg9AUAADAAIAM9AADgEAAg7gUAAOEQACD0BQAAMAAgAAAAAAAFPQAA1xAAID4AAN4QACDuBQAA2BAAIO8FAADdEAAg9AUAAKkDACAFPQAA1RAAID4AANsQACDuBQAA1hAAIO8FAADaEAAg9AUAABsAIAs9AADDCQAwPgAAyAkAMO4FAADECQAw7wUAAMUJADDwBQAAxgkAIPEFAADHCQAw8gUAAMcJADDzBQAAxwkAMPQFAADHCQAw9QUAAMkJADD2BQAAygkAMAq8BAEAAAABvgRAAAAAAc0ECAAAAAH2BAEAAAAB9wQBAAAAAfgECAAAAAH5BAgAAAAB-gQIAAAAAfsECAAAAAH8BAEAAAABAgAAADQAID0AAM4JACADAAAANAAgPQAAzgkAID4AAM0JACABNgAA2RAAMA8RAADLCAAguQQAAMkIADC6BAAAMgAQuwQAAMkIADC8BAEAAAABvgRAAIsHACHNBAgAyggAIfUEAQCKBwAh9gQBAIoHACH3BAEAigcAIfgECADKCAAh-QQIAMoIACH6BAgAyggAIfsECADKCAAh_AQBAMwHACECAAAANAAgNgAAzQkAIAIAAADLCQAgNgAAzAkAIA65BAAAygkAMLoEAADLCQAQuwQAAMoJADC8BAEAigcAIb4EQACLBwAhzQQIAMoIACH1BAEAigcAIfYEAQCKBwAh9wQBAIoHACH4BAgAyggAIfkECADKCAAh-gQIAMoIACH7BAgAyggAIfwEAQDMBwAhDrkEAADKCQAwugQAAMsJABC7BAAAygkAMLwEAQCKBwAhvgRAAIsHACHNBAgAyggAIfUEAQCKBwAh9gQBAIoHACH3BAEAigcAIfgECADKCAAh-QQIAMoIACH6BAgAyggAIfsECADKCAAh_AQBAMwHACEKvAQBAOUIACG-BEAA5ggAIc0ECAC4CQAh9gQBAOUIACH3BAEA5QgAIfgECAC4CQAh-QQIALgJACH6BAgAuAkAIfsECAC4CQAh_AQBAIAJACEKvAQBAOUIACG-BEAA5ggAIc0ECAC4CQAh9gQBAOUIACH3BAEA5QgAIfgECAC4CQAh-QQIALgJACH6BAgAuAkAIfsECAC4CQAh_AQBAIAJACEKvAQBAAAAAb4EQAAAAAHNBAgAAAAB9gQBAAAAAfcEAQAAAAH4BAgAAAAB-QQIAAAAAfoECAAAAAH7BAgAAAAB_AQBAAAAAQM9AADXEAAg7gUAANgQACD0BQAAqQMAIAM9AADVEAAg7gUAANYQACD0BQAAGwAgBD0AAMMJADDuBQAAxAkAMPAFAADGCQAg9AUAAMcJADAAAAAB8QUAAACCBQMB8QUAAACCBQIFPQAA0BAAID4AANMQACDuBQAA0RAAIO8FAADSEAAg9AUAACoAIAM9AADQEAAg7gUAANEQACD0BQAAKgAgAAAABT0AAJQQACA-AADOEAAg7gUAAJUQACDvBQAAzRAAIPQFAACpAwAgBT0AAJIQACA-AADLEAAg7gUAAJMQACDvBQAAyhAAIPQFAAAbACAKPQAA2QoAMD4AAN0KADDuBQAA2goAMO8FAADbCgAw8QUAANwKADDyBQAA3AoAMPMFAADcCgAw9AUAANwKADD1BQAA3goAMPYFAADfCgAwCz0AAM0KADA-AADSCgAw7gUAAM4KADDvBQAAzwoAMPAFAADQCgAg8QUAANEKADDyBQAA0QoAMPMFAADRCgAw9AUAANEKADD1BQAA0woAMPYFAADUCgAwCz0AAJ0KADA-AACiCgAw7gUAAJ4KADDvBQAAnwoAMPAFAACgCgAg8QUAAKEKADDyBQAAoQoAMPMFAAChCgAw9AUAAKEKADD1BQAAowoAMPYFAACkCgAwCz0AAO8JADA-AAD0CQAw7gUAAPAJADDvBQAA8QkAMPAFAADyCQAg8QUAAPMJADDyBQAA8wkAMPMFAADzCQAw9AUAAPMJADD1BQAA9QkAMPYFAAD2CQAwCz0AAOMJADA-AADoCQAw7gUAAOQJADDvBQAA5QkAMPAFAADmCQAg8QUAAOcJADDyBQAA5wkAMPMFAADnCQAw9AUAAOcJADD1BQAA6QkAMPYFAADqCQAwDCIAALIJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHrBAEAAAAB7ARAAAAAAe0EAgAAAAHvBAAAAO8EAvEEAAAA8QQC8gQBAAAAAfMEAQAAAAH0BAEAAAABAgAAAGYAID0AAO4JACADAAAAZgAgPQAA7gkAID4AAO0JACABNgAAyRAAMBEWAACkCAAgIgAAzQcAILkEAACuCAAwugQAAGQAELsEAACuCAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHqBAEAigcAIesEAQCKBwAh7ARAAIsHACHtBAIAlQcAIe8EAACvCO8EIvEEAACwCPEEIvIEAQDMBwAh8wQBAMwHACH0BAEAzAcAIQIAAABmACA2AADtCQAgAgAAAOsJACA2AADsCQAgD7kEAADqCQAwugQAAOsJABC7BAAA6gkAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeoEAQCKBwAh6wQBAIoHACHsBEAAiwcAIe0EAgCVBwAh7wQAAK8I7wQi8QQAALAI8QQi8gQBAMwHACHzBAEAzAcAIfQEAQDMBwAhD7kEAADqCQAwugQAAOsJABC7BAAA6gkAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeoEAQCKBwAh6wQBAIoHACHsBEAAiwcAIe0EAgCVBwAh7wQAAK8I7wQi8QQAALAI8QQi8gQBAMwHACHzBAEAzAcAIfQEAQDMBwAhC7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIesEAQDlCAAh7ARAAOYIACHtBAIA7wgAIe8EAACtCe8EIvEEAACuCfEEIvIEAQCACQAh8wQBAIAJACH0BAEAgAkAIQwiAACwCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6wQBAOUIACHsBEAA5ggAIe0EAgDvCAAh7wQAAK0J7wQi8QQAAK4J8QQi8gQBAIAJACHzBAEAgAkAIfQEAQCACQAhDCIAALIJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHrBAEAAAAB7ARAAAAAAe0EAgAAAAHvBAAAAO8EAvEEAAAA8QQC8gQBAAAAAfMEAQAAAAH0BAEAAAABBSAAAJwKACAwAACbCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAABAgAAAAEAID0AAJoKACADAAAAAQAgPQAAmgoAID4AAPkJACABNgAAyBAAMAoWAACgCAAgIAAA_QcAIDAAAP4HACC5BAAAnwgAMLoEAACdAQAQuwQAAJ8IADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIeoEAQAAAAECAAAAAQAgNgAA-QkAIAIAAAD3CQAgNgAA-AkAIAe5BAAA9gkAMLoEAAD3CQAQuwQAAPYJADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHqBAEAzAcAIQe5BAAA9gkAMLoEAAD3CQAQuwQAAPYJADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHqBAEAzAcAIQO8BAEA5QgAIb4EQADmCAAhvwRAAOYIACEFIAAA-wkAIDAAAPoJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACELPQAAjAoAMD4AAJEKADDuBQAAjQoAMO8FAACOCgAw8AUAAI8KACDxBQAAkAoAMPIFAACQCgAw8wUAAJAKADD0BQAAkAoAMPUFAACSCgAw9gUAAJMKADALPQAA_AkAMD4AAIEKADDuBQAA_QkAMO8FAAD-CQAw8AUAAP8JACDxBQAAgAoAMPIFAACACgAw8wUAAIAKADD0BQAAgAoAMPUFAACCCgAw9gUAAIMKADAIHwAAiwoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeMFQAAAAAHmBQEAAAAB5wUBAAAAAegFIAAAAAECAAAAXgAgPQAAigoAIAMAAABeACA9AACKCgAgPgAAiAoAIAE2AADHEAAwDR4AALMIACAfAADNBwAguQQAALQIADC6BAAAXAAQuwQAALQIADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIeMFQAD3BwAh5AUBAIoHACHmBQEAigcAIecFAQCKBwAh6AUgAPQHACECAAAAXgAgNgAAiAoAIAIAAACECgAgNgAAhQoAIAu5BAAAgwoAMLoEAACECgAQuwQAAIMKADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHjBUAA9wcAIeQFAQCKBwAh5gUBAIoHACHnBQEAigcAIegFIAD0BwAhC7kEAACDCgAwugQAAIQKABC7BAAAgwoAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeMFQAD3BwAh5AUBAIoHACHmBQEAigcAIecFAQCKBwAh6AUgAPQHACEHvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh4wVAAIcKACHmBQEA5QgAIecFAQDlCAAh6AUgAIYKACEB8QUgAAAAAQHxBUAAAAABCB8AAIkKACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHjBUAAhwoAIeYFAQDlCAAh5wUBAOUIACHoBSAAhgoAIQU9AADCEAAgPgAAxRAAIO4FAADDEAAg7wUAAMQQACD0BQAAywIAIAgfAACLCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB4wVAAAAAAeYFAQAAAAHnBQEAAAAB6AUgAAAAAQM9AADCEAAg7gUAAMMQACD0BQAAywIAIAQGAACZCgAgvAQBAAAAAaIFAQAAAAHlBUAAAAABAgAAAGIAID0AAJgKACADAAAAYgAgPQAAmAoAID4AAJYKACABNgAAwRAAMAoGAADNBwAgHgAAswgAILkEAACyCAAwugQAAGAAELsEAACyCAAwvAQBAAAAAaIFAQCKBwAh5AUBAIoHACHlBUAAiwcAIekFAACxCAAgAgAAAGIAIDYAAJYKACACAAAAlAoAIDYAAJUKACAHuQQAAJMKADC6BAAAlAoAELsEAACTCgAwvAQBAIoHACGiBQEAigcAIeQFAQCKBwAh5QVAAIsHACEHuQQAAJMKADC6BAAAlAoAELsEAACTCgAwvAQBAIoHACGiBQEAigcAIeQFAQCKBwAh5QVAAIsHACEDvAQBAOUIACGiBQEA5QgAIeUFQADmCAAhBAYAAJcKACC8BAEA5QgAIaIFAQDlCAAh5QVAAOYIACEFPQAAvBAAID4AAL8QACDuBQAAvRAAIO8FAAC-EAAg9AUAAMsCACAEBgAAmQoAILwEAQAAAAGiBQEAAAAB5QVAAAAAAQM9AAC8EAAg7gUAAL0QACD0BQAAywIAIAUgAACcCgAgMAAAmwoAILwEAQAAAAG-BEAAAAABvwRAAAAAAQQ9AACMCgAw7gUAAI0KADDwBQAAjwoAIPQFAACQCgAwBD0AAPwJADDuBQAA_QkAMPAFAAD_CQAg9AUAAIAKADAVCAAAxwoAIAoAAMoKACANAADJCgAgFQAAyAoAIBgAAMsKACAZAADMCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZEFAQAAAAGSBQEAAAAB1QUBAAAAAdkFAAAA2QUD2gUBAAAAAdsFAQAAAAHcBUAAAAABAgAAAD0AID0AAMYKACADAAAAPQAgPQAAxgoAID4AAKoKACABNgAAuxAAMBoIAAD5BwAgCgAAwwgAIA0AAL0IACAVAADNBwAgFgAAoAgAIBgAAMQIACAZAADFCAAguQQAAL8IADC6BAAAOwAQuwQAAL8IADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIeUEAQDMBwAh5gQBAMwHACHqBAEAzAcAIe8EAADACNcFIvEEAADBCNgFIvMEAQCKBwAhkQUBAIoHACGSBQEAigcAIdUFAQCKBwAh2QUAAMII2QUj2gUBAMwHACHbBQEAzAcAIdwFQAD3BwAhAgAAAD0AIDYAAKoKACACAAAApQoAIDYAAKYKACATuQQAAKQKADC6BAAApQoAELsEAACkCgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAMwHACHmBAEAzAcAIeoEAQDMBwAh7wQAAMAI1wUi8QQAAMEI2AUi8wQBAIoHACGRBQEAigcAIZIFAQCKBwAh1QUBAIoHACHZBQAAwgjZBSPaBQEAzAcAIdsFAQDMBwAh3AVAAPcHACETuQQAAKQKADC6BAAApQoAELsEAACkCgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAMwHACHmBAEAzAcAIeoEAQDMBwAh7wQAAMAI1wUi8QQAAMEI2AUi8wQBAIoHACGRBQEAigcAIZIFAQCKBwAh1QUBAIoHACHZBQAAwgjZBSPaBQEAzAcAIdsFAQDMBwAh3AVAAPcHACEPvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIe8EAACnCtcFIvEEAACoCtgFIvMEAQDlCAAhkQUBAOUIACGSBQEA5QgAIdUFAQDlCAAh2QUAAKkK2QUj2gUBAIAJACHbBQEAgAkAIdwFQACHCgAhAfEFAAAA1wUCAfEFAAAA2AUCAfEFAAAA2QUDFQgAAKsKACAKAACuCgAgDQAArQoAIBUAAKwKACAYAACvCgAgGQAAsAoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQCACQAh5gQBAIAJACHvBAAApwrXBSLxBAAAqArYBSLzBAEA5QgAIZEFAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIQc9AACnEAAgPgAAuRAAIO4FAACoEAAg7wUAALgQACDyBQAAEQAg8wUAABEAIPQFAACpAwAgBT0AAKUQACA-AAC2EAAg7gUAAKYQACDvBQAAtRAAIPQFAADLAgAgBT0AAKMQACA-AACzEAAg7gUAAKQQACDvBQAAshAAIPQFAACxBAAgBz0AAKEQACA-AACwEAAg7gUAAKIQACDvBQAArxAAIPIFAAAZACDzBQAAGQAg9AUAABsAIAs9AAC6CgAwPgAAvwoAMO4FAAC7CgAw7wUAALwKADDwBQAAvQoAIPEFAAC-CgAw8gUAAL4KADDzBQAAvgoAMPQFAAC-CgAw9QUAAMAKADD2BQAAwQoAMAc9AACxCgAgPgAAtAoAIO4FAACyCgAg7wUAALMKACDyBQAARgAg8wUAAEYAIPQFAABRACAMDQAAuQoAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAA0gUCkQUBAAAAAc4FEAAAAAHPBQEAAAAB0AUBAAAAAdIFAQAAAAHTBUAAAAAB1AVAAAAAAQIAAABRACA9AACxCgAgAwAAAEYAID0AALEKACA-AAC1CgAgDgAAAEYAIA0AALgKACA2AAC1CgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAALcK0gUikQUBAOUIACHOBRAAtgoAIc8FAQDlCAAh0AUBAOUIACHSBQEAgAkAIdMFQACHCgAh1AVAAIcKACEMDQAAuAoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAC3CtIFIpEFAQDlCAAhzgUQALYKACHPBQEA5QgAIdAFAQDlCAAh0gUBAIAJACHTBUAAhwoAIdQFQACHCgAhBfEFEAAAAAH3BRAAAAAB-AUQAAAAAfkFEAAAAAH6BRAAAAABAfEFAAAA0gUCBT0AAKoQACA-AACtEAAg7gUAAKsQACDvBQAArBAAIPQFAACxBAAgAz0AAKoQACDuBQAAqxAAIPQFAACxBAAgBbwEAQAAAAG-BEAAAAAB3gQBAAAAAd8EAQAAAAHhBAEAAAABAgAAAEQAID0AAMUKACADAAAARAAgPQAAxQoAID4AAMQKACABNgAAqRAAMAoXAAC8CAAguQQAAL4IADC6BAAAQgAQuwQAAL4IADC8BAEAAAABvgRAAIsHACHeBAEAigcAId8EAQCKBwAh4QQBAIoHACHNBQEAigcAIQIAAABEACA2AADECgAgAgAAAMIKACA2AADDCgAgCbkEAADBCgAwugQAAMIKABC7BAAAwQoAMLwEAQCKBwAhvgRAAIsHACHeBAEAigcAId8EAQCKBwAh4QQBAIoHACHNBQEAigcAIQm5BAAAwQoAMLoEAADCCgAQuwQAAMEKADC8BAEAigcAIb4EQACLBwAh3gQBAIoHACHfBAEAigcAIeEEAQCKBwAhzQUBAIoHACEFvAQBAOUIACG-BEAA5ggAId4EAQDlCAAh3wQBAOUIACHhBAEA5QgAIQW8BAEA5QgAIb4EQADmCAAh3gQBAOUIACHfBAEA5QgAIeEEAQDlCAAhBbwEAQAAAAG-BEAAAAAB3gQBAAAAAd8EAQAAAAHhBAEAAAABFQgAAMcKACAKAADKCgAgDQAAyQoAIBUAAMgKACAYAADLCgAgGQAAzAoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdUFAQAAAAHZBQAAANkFA9oFAQAAAAHbBQEAAAAB3AVAAAAAAQM9AACnEAAg7gUAAKgQACD0BQAAqQMAIAM9AAClEAAg7gUAAKYQACD0BQAAywIAIAM9AACjEAAg7gUAAKQQACD0BQAAsQQAIAM9AAChEAAg7gUAAKIQACD0BQAAGwAgBD0AALoKADDuBQAAuwoAMPAFAAC9CgAg9AUAAL4KADADPQAAsQoAIO4FAACyCgAg9AUAAFEAIAW8BAEAAAABggUAAACCBQODBQAAAIIFAoQFAQAAAAGFBUAAAAABAgAAAJoBACA9AADYCgAgAwAAAJoBACA9AADYCgAgPgAA1woAIAE2AACgEAAwCi0AAKQIACC5BAAAoQgAMLoEAACYAQAQuwQAAKEIADC8BAEAAAABgAUBAIoHACGCBQAAogiCBSODBQAAowiCBSKEBQEAigcAIYUFQACLBwAhAgAAAJoBACA2AADXCgAgAgAAANUKACA2AADWCgAgCbkEAADUCgAwugQAANUKABC7BAAA1AoAMLwEAQCKBwAhgAUBAIoHACGCBQAAogiCBSODBQAAowiCBSKEBQEAigcAIYUFQACLBwAhCbkEAADUCgAwugQAANUKABC7BAAA1AoAMLwEAQCKBwAhgAUBAIoHACGCBQAAogiCBSODBQAAowiCBSKEBQEAigcAIYUFQACLBwAhBbwEAQDlCAAhggUAANUJggUjgwUAANYJggUihAUBAOUIACGFBUAA5ggAIQW8BAEA5QgAIYIFAADVCYIFI4MFAADWCYIFIoQFAQDlCAAhhQVAAOYIACEFvAQBAAAAAYIFAAAAggUDgwUAAACCBQKEBQEAAAABhQVAAAAAAQ0DAADmCgAgCgAA5woAILwEAQAAAAG-BEAAAAAB1gSAAAAAAd0EAQAAAAHmBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABAgAAACcAID0AAOUKACADAAAAJwAgPQAA5QoAID4AAOIKACASAwAA1wcAIAoAAMgIACAOAADhBwAguQQAANMIADC6BAAAJQAQuwQAANMIADC8BAEAAAABvgRAAIsHACHWBAAAlgcAIN0EAQCKBwAh5gQBAIoHACGHBQIAlQcAIYgFAACWBwAgiQUAAJYHACCKBQAAlgcAIIsFAACWBwAgjAUAAJYHACDrBQAA0ggAIAIAAAAnACA2AADiCgAgAgAAAOAKACA2AADhCgAgDrkEAADfCgAwugQAAOAKABC7BAAA3woAMLwEAQCKBwAhvgRAAIsHACHWBAAAlgcAIN0EAQCKBwAh5gQBAIoHACGHBQIAlQcAIYgFAACWBwAgiQUAAJYHACCKBQAAlgcAIIsFAACWBwAgjAUAAJYHACAOuQQAAN8KADC6BAAA4AoAELsEAADfCgAwvAQBAIoHACG-BEAAiwcAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIYcFAgCVBwAhiAUAAJYHACCJBQAAlgcAIIoFAACWBwAgiwUAAJYHACCMBQAAlgcAIAu8BAEA5QgAIb4EQADmCAAh1gSAAAAAAd0EAQDlCAAh5gQBAOUIACGHBQIA7wgAIYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABDQMAAOMKACAKAADkCgAgvAQBAOUIACG-BEAA5ggAIdYEgAAAAAHdBAEA5QgAIeYEAQDlCAAhhwUCAO8IACGIBYAAAAABiQWAAAAAAYoFgAAAAAGLBYAAAAABjAWAAAAAAQU9AACYEAAgPgAAnhAAIO4FAACZEAAg7wUAAJ0QACD0BQAAqQMAIAU9AACWEAAgPgAAmxAAIO4FAACXEAAg7wUAAJoQACD0BQAAGwAgDQMAAOYKACAKAADnCgAgvAQBAAAAAb4EQAAAAAHWBIAAAAAB3QQBAAAAAeYEAQAAAAGHBQIAAAABiAWAAAAAAYkFgAAAAAGKBYAAAAABiwWAAAAAAYwFgAAAAAEDPQAAmBAAIO4FAACZEAAg9AUAAKkDACADPQAAlhAAIO4FAACXEAAg9AUAABsAIAM9AACUEAAg7gUAAJUQACD0BQAAqQMAIAM9AACSEAAg7gUAAJMQACD0BQAAGwAgAz0AANkKADDuBQAA2goAMPQFAADcCgAwBD0AAM0KADDuBQAAzgoAMPAFAADQCgAg9AUAANEKADAEPQAAnQoAMO4FAACeCgAw8AUAAKAKACD0BQAAoQoAMAQ9AADvCQAw7gUAAPAJADDwBQAA8gkAIPQFAADzCQAwBD0AAOMJADDuBQAA5AkAMPAFAADmCQAg9AUAAOcJADAAAAAAAAo9AAD1CgAwPgAA-QoAMO4FAAD2CgAw7wUAAPcKADDxBQAA-AoAMPIFAAD4CgAw8wUAAPgKADD0BQAA-AoAMPUFAAD6CgAw9gUAAPsKADANCAAA6AoAIAoAAOkKACAaAADsCgAgIwAA7goAIC4AAOsKACAvAADtCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAECAAAAKgAgPQAA_woAIAMAAAAqACA9AAD_CgAgPgAA_goAIBIIAADXBwAgCgAAyAgAIBAAAN8HACAaAADQBwAgIwAA_wcAIC4AANAIACAvAADRCAAguQQAAM8IADC6BAAAAwAQuwQAAM8IADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIeUEAQCKBwAh5gQBAIoHACHxBAAAowiCBSKGBQEAzAcAIeoFAADOCAAgAgAAACoAIDYAAP4KACACAAAA_AoAIDYAAP0KACAKuQQAAPsKADC6BAAA_AoAELsEAAD7CgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh5QQBAIoHACHmBAEAigcAIfEEAACjCIIFIoYFAQDMBwAhCrkEAAD7CgAwugQAAPwKABC7BAAA-woAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIeUEAQCKBwAh5gQBAIoHACHxBAAAowiCBSKGBQEAzAcAIQe8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACENCAAA3AkAIAoAAN0JACAaAADgCQAgIwAA4gkAIC4AAN8JACAvAADhCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAOUIACHmBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhDQgAAOgKACAKAADpCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB8QQAAACCBQKGBQEAAAABAz0AAPUKADDuBQAA9goAMPQFAAD4CgAwAAAAAAAF8QUIAAAAAfcFCAAAAAH4BQgAAAAB-QUIAAAAAfoFCAAAAAEFPQAAihAAID4AAJAQACDuBQAAixAAIO8FAACPEAAg9AUAAKkDACAFPQAAiBAAID4AAI0QACDuBQAAiRAAIO8FAACMEAAg9AUAABsAIAM9AACKEAAg7gUAAIsQACD0BQAAqQMAIAM9AACIEAAg7gUAAIkQACD0BQAAGwAgAAAABT0AAIMQACA-AACGEAAg7gUAAIQQACDvBQAAhRAAIPQFAAAbACADPQAAgxAAIO4FAACEEAAg9AUAABsAIAAAAAAAAfEFAAAAlgUCAfEFAAAAmAUCAfEFAAAAmgUCAfEFAAAAnwUCCz0AAOILADA-AADnCwAw7gUAAOMLADDvBQAA5AsAMPAFAADlCwAg8QUAAOYLADDyBQAA5gsAMPMFAADmCwAw9AUAAOYLADD1BQAA6AsAMPYFAADpCwAwCz0AANYLADA-AADbCwAw7gUAANcLADDvBQAA2AsAMPAFAADZCwAg8QUAANoLADDyBQAA2gsAMPMFAADaCwAw9AUAANoLADD1BQAA3AsAMPYFAADdCwAwBT0AAPIPACA-AACBEAAg7gUAAPMPACDvBQAAgBAAIPQFAACxBAAgCz0AAM0LADA-AADRCwAw7gUAAM4LADDvBQAAzwsAMPAFAADQCwAg8QUAANwKADDyBQAA3AoAMPMFAADcCgAw9AUAANwKADD1BQAA0gsAMPYFAADfCgAwCz0AAMQLADA-AADICwAw7gUAAMULADDvBQAAxgsAMPAFAADHCwAg8QUAAPgKADDyBQAA-AoAMPMFAAD4CgAw9AUAAPgKADD1BQAAyQsAMPYFAAD7CgAwCz0AALgLADA-AAC9CwAw7gUAALkLADDvBQAAugsAMPAFAAC7CwAg8QUAALwLADDyBQAAvAsAMPMFAAC8CwAw9AUAALwLADD1BQAAvgsAMPYFAAC_CwAwCz0AAKwLADA-AACxCwAw7gUAAK0LADDvBQAArgsAMPAFAACvCwAg8QUAALALADDyBQAAsAsAMPMFAACwCwAw9AUAALALADD1BQAAsgsAMPYFAACzCwAwCz0AAKELADA-AAClCwAw7gUAAKILADDvBQAAowsAMPAFAACkCwAg8QUAAKEKADDyBQAAoQoAMPMFAAChCgAw9AUAAKEKADD1BQAApgsAMPYFAACkCgAwFQgAAMcKACANAADJCgAgFQAAyAoAIBYAAKsLACAYAADLCgAgGQAAzAoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHqBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdUFAQAAAAHZBQAAANkFA9oFAQAAAAHbBQEAAAAB3AVAAAAAAQIAAAA9ACA9AACqCwAgAwAAAD0AID0AAKoLACA-AACoCwAgATYAAP8PADACAAAAPQAgNgAAqAsAIAIAAAClCgAgNgAApwsAIA-8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGRBQEA5QgAIZIFAQDlCAAh1QUBAOUIACHZBQAAqQrZBSPaBQEAgAkAIdsFAQCACQAh3AVAAIcKACEVCAAAqwoAIA0AAK0KACAVAACsCgAgFgAAqQsAIBgAAK8KACAZAACwCgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHqBAEAgAkAIe8EAACnCtcFIvEEAACoCtgFIvMEAQDlCAAhkQUBAOUIACGSBQEA5QgAIdUFAQDlCAAh2QUAAKkK2QUj2gUBAIAJACHbBQEAgAkAIdwFQACHCgAhBz0AAPoPACA-AAD9DwAg7gUAAPsPACDvBQAA_A8AIPIFAAADACDzBQAAAwAg9AUAACoAIBUIAADHCgAgDQAAyQoAIBUAAMgKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEDPQAA-g8AIO4FAAD7DwAg9AUAACoAIAsIAACmCQAgvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAdUEgAAAAAHWBIAAAAAB5QQBAAAAAecEAgAAAAHoBAEAAAAB6QSAAAAAAQIAAAA5ACA9AAC3CwAgAwAAADkAID0AALcLACA-AAC2CwAgATYAAPkPADARCAAA1wcAIAoAAMgIACC5BAAAxwgAMLoEAAA3ABC7BAAAxwgAMLwEAQAAAAG9BAEAzAcAIb4EQACLBwAhvwRAAIsHACHVBAAAlgcAINYEAACWBwAg5QQBAIoHACHmBAEAigcAIecEAgCVBwAh6AQBAIoHACHpBAAAlgcAIOoFAADGCAAgAgAAADkAIDYAALYLACACAAAAtAsAIDYAALULACAOuQQAALMLADC6BAAAtAsAELsEAACzCwAwvAQBAIoHACG9BAEAzAcAIb4EQACLBwAhvwRAAIsHACHVBAAAlgcAINYEAACWBwAg5QQBAIoHACHmBAEAigcAIecEAgCVBwAh6AQBAIoHACHpBAAAlgcAIA65BAAAswsAMLoEAAC0CwAQuwQAALMLADC8BAEAigcAIb0EAQDMBwAhvgRAAIsHACG_BEAAiwcAIdUEAACWBwAg1gQAAJYHACDlBAEAigcAIeYEAQCKBwAh5wQCAJUHACHoBAEAigcAIekEAACWBwAgCrwEAQDlCAAhvQQBAIAJACG-BEAA5ggAIb8EQADmCAAh1QSAAAAAAdYEgAAAAAHlBAEA5QgAIecEAgDvCAAh6AQBAOUIACHpBIAAAAABCwgAAKQJACC8BAEA5QgAIb0EAQCACQAhvgRAAOYIACG_BEAA5ggAIdUEgAAAAAHWBIAAAAAB5QQBAOUIACHnBAIA7wgAIegEAQDlCAAh6QSAAAAAAQsIAACmCQAgvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAdUEgAAAAAHWBIAAAAAB5QQBAAAAAecEAgAAAAHoBAEAAAAB6QSAAAAAAQsIAADPCQAgEgAA0QkAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHlBAEAAAAB8QQBAAAAAf0EAQAAAAH-BAEAAAAB_wQCAAAAAQIAAAAwACA9AADDCwAgAwAAADAAID0AAMMLACA-AADCCwAgATYAAPgPADAQCAAA1wcAIAoAAMgIACASAADNCAAguQQAAMwIADC6BAAALgAQuwQAAMwIADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIc0ECADKCAAh5QQBAIoHACHmBAEAigcAIfEEAQCKBwAh_QQBAIoHACH-BAEAigcAIf8EAgCVBwAhAgAAADAAIDYAAMILACACAAAAwAsAIDYAAMELACANuQQAAL8LADC6BAAAwAsAELsEAAC_CwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhzQQIAMoIACHlBAEAigcAIeYEAQCKBwAh8QQBAIoHACH9BAEAigcAIf4EAQCKBwAh_wQCAJUHACENuQQAAL8LADC6BAAAwAsAELsEAAC_CwAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhzQQIAMoIACHlBAEAigcAIeYEAQCKBwAh8QQBAIoHACH9BAEAigcAIf4EAQCKBwAh_wQCAJUHACEJvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQIALgJACHlBAEA5QgAIfEEAQDlCAAh_QQBAOUIACH-BAEA5QgAIf8EAgDvCAAhCwgAAMAJACASAADCCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQIALgJACHlBAEA5QgAIfEEAQDlCAAh_QQBAOUIACH-BAEA5QgAIf8EAgDvCAAhCwgAAM8JACASAADRCQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABzQQIAAAAAeUEAQAAAAHxBAEAAAAB_QQBAAAAAf4EAQAAAAH_BAIAAAABDAgAAOgKACAQAADqCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHxBAAAAIIFAoYFAQAAAAECAAAAKgAgPQAAzAsAIAMAAAAqACA9AADMCwAgPgAAywsAIAE2AAD3DwAwAgAAACoAIDYAAMsLACACAAAA_AoAIDYAAMoLACAGvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAOUIACHxBAAA1gmCBSKGBQEAgAkAIQwIAADcCQAgEAAA3gkAIBoAAOAJACAjAADiCQAgLgAA3wkAIC8AAOEJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhDAgAAOgKACAQAADqCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHxBAAAAIIFAoYFAQAAAAEMAwAA5goAIA4AAIALACC8BAEAAAABvgRAAAAAAdYEgAAAAAHdBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABAgAAACcAID0AANULACADAAAAJwAgPQAA1QsAID4AANQLACABNgAA9g8AMAIAAAAnACA2AADUCwAgAgAAAOAKACA2AADTCwAgCrwEAQDlCAAhvgRAAOYIACHWBIAAAAAB3QQBAOUIACGHBQIA7wgAIYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABDAMAAOMKACAOAAD0CgAgvAQBAOUIACG-BEAA5ggAIdYEgAAAAAHdBAEA5QgAIYcFAgDvCAAhiAWAAAAAAYkFgAAAAAGKBYAAAAABiwWAAAAAAYwFgAAAAAEMAwAA5goAIA4AAIALACC8BAEAAAABvgRAAAAAAdYEgAAAAAHdBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABDgMAAIkLACC8BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAABzgQIAAAAAc8ECAAAAAHQBAgAAAAB1gSAAAAAAd0EAQAAAAHoBAEAAAABiAWAAAAAAY0FCAAAAAGOBQgAAAABAgAAACMAID0AAOELACADAAAAIwAgPQAA4QsAID4AAOALACABNgAA9Q8AMBQDAADXBwAgCgAAyAgAILkEAADVCAAwugQAACEAELsEAADVCAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHNBAgA1ggAIc4ECADWCAAhzwQIANYIACHQBAgA1ggAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIegEAQCKBwAhiAUAAJYHACCNBQgA1ggAIY4FCADWCAAh6wUAANQIACACAAAAIwAgNgAA4AsAIAIAAADeCwAgNgAA3wsAIBG5BAAA3QsAMLoEAADeCwAQuwQAAN0LADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHNBAgA1ggAIc4ECADWCAAhzwQIANYIACHQBAgA1ggAIdYEAACWBwAg3QQBAIoHACHmBAEAigcAIegEAQCKBwAhiAUAAJYHACCNBQgA1ggAIY4FCADWCAAhEbkEAADdCwAwugQAAN4LABC7BAAA3QsAMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAIc0ECADWCAAhzgQIANYIACHPBAgA1ggAIdAECADWCAAh1gQAAJYHACDdBAEAigcAIeYEAQCKBwAh6AQBAIoHACGIBQAAlgcAII0FCADWCAAhjgUIANYIACENvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQIAIYLACHOBAgAhgsAIc8ECACGCwAh0AQIAIYLACHWBIAAAAAB3QQBAOUIACHoBAEA5QgAIYgFgAAAAAGNBQgAhgsAIY4FCACGCwAhDgMAAIcLACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHNBAgAhgsAIc4ECACGCwAhzwQIAIYLACHQBAgAhgsAIdYEgAAAAAHdBAEA5QgAIegEAQDlCAAhiAWAAAAAAY0FCACGCwAhjgUIAIYLACEOAwAAiQsAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHOBAgAAAABzwQIAAAAAdAECAAAAAHWBIAAAAAB3QQBAAAAAegEAQAAAAGIBYAAAAABjQUIAAAAAY4FCAAAAAEDvAQBAAAAAY8FAQAAAAGQBQEAAAABAgAAAB8AID0AAO0LACADAAAAHwAgPQAA7QsAID4AAOwLACABNgAA9A8AMAgKAADICAAguQQAANcIADC6BAAAHQAQuwQAANcIADC8BAEAAAAB5gQBAIoHACGPBQEAigcAIZAFAQCKBwAhAgAAAB8AIDYAAOwLACACAAAA6gsAIDYAAOsLACAHuQQAAOkLADC6BAAA6gsAELsEAADpCwAwvAQBAIoHACHmBAEAigcAIY8FAQCKBwAhkAUBAIoHACEHuQQAAOkLADC6BAAA6gsAELsEAADpCwAwvAQBAIoHACHmBAEAigcAIY8FAQCKBwAhkAUBAIoHACEDvAQBAOUIACGPBQEA5QgAIZAFAQDlCAAhA7wEAQDlCAAhjwUBAOUIACGQBQEA5QgAIQO8BAEAAAABjwUBAAAAAZAFAQAAAAEEPQAA4gsAMO4FAADjCwAw8AUAAOULACD0BQAA5gsAMAQ9AADWCwAw7gUAANcLADDwBQAA2QsAIPQFAADaCwAwAz0AAPIPACDuBQAA8w8AIPQFAACxBAAgBD0AAM0LADDuBQAAzgsAMPAFAADQCwAg9AUAANwKADAEPQAAxAsAMO4FAADFCwAw8AUAAMcLACD0BQAA-AoAMAQ9AAC4CwAw7gUAALkLADDwBQAAuwsAIPQFAAC8CwAwBD0AAKwLADDuBQAArQsAMPAFAACvCwAg9AUAALALADAEPQAAoQsAMO4FAACiCwAw8AUAAKQLACD0BQAAoQoAMAAAAAU9AADlDwAgPgAA8A8AIO4FAADmDwAg7wUAAO8PACD0BQAAywIAIAs9AACUDAAwPgAAmQwAMO4FAACVDAAw7wUAAJYMADDwBQAAlwwAIPEFAACYDAAw8gUAAJgMADDzBQAAmAwAMPQFAACYDAAw9QUAAJoMADD2BQAAmwwAMAs9AACGDAAwPgAAiwwAMO4FAACHDAAw7wUAAIgMADDwBQAAiQwAIPEFAACKDAAw8gUAAIoMADDzBQAAigwAMPQFAACKDAAw9QUAAIwMADD2BQAAjQwAMAs9AAD9CwAwPgAAgQwAMO4FAAD-CwAw7wUAAP8LADDwBQAAgAwAIPEFAAChCgAw8gUAAKEKADDzBQAAoQoAMPQFAAChCgAw9QUAAIIMADD2BQAApAoAMBUIAADHCgAgCgAAygoAIBUAAMgKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAeoEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAECAAAAPQAgPQAAhQwAIAMAAAA9ACA9AACFDAAgPgAAhAwAIAE2AADuDwAwAgAAAD0AIDYAAIQMACACAAAApQoAIDYAAIMMACAPvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGSBQEA5QgAIdUFAQDlCAAh2QUAAKkK2QUj2gUBAIAJACHbBQEAgAkAIdwFQACHCgAhFQgAAKsKACAKAACuCgAgFQAArAoAIBYAAKkLACAYAACvCgAgGQAAsAoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQCACQAh5gQBAIAJACHqBAEAgAkAIe8EAACnCtcFIvEEAACoCtgFIvMEAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIRUIAADHCgAgCgAAygoAIBUAAMgKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAeoEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEMFwAAkwwAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAA0gUCzQUBAAAAAc4FEAAAAAHPBQEAAAAB0AUBAAAAAdIFAQAAAAHTBUAAAAAB1AVAAAAAAQIAAABRACA9AACSDAAgAwAAAFEAID0AAJIMACA-AACQDAAgATYAAO0PADARDQAAvQgAIBcAALwIACC5BAAAuQgAMLoEAABGABC7BAAAuQgAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh8QQAALsI0gUikQUBAIoHACHNBQEAAAABzgUQALoIACHPBQEAigcAIdAFAQCKBwAh0gUBAMwHACHTBUAA9wcAIdQFQAD3BwAhAgAAAFEAIDYAAJAMACACAAAAjgwAIDYAAI8MACAPuQQAAI0MADC6BAAAjgwAELsEAACNDAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAALsI0gUikQUBAIoHACHNBQEAigcAIc4FEAC6CAAhzwUBAIoHACHQBQEAigcAIdIFAQDMBwAh0wVAAPcHACHUBUAA9wcAIQ-5BAAAjQwAMLoEAACODAAQuwQAAI0MADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHxBAAAuwjSBSKRBQEAigcAIc0FAQCKBwAhzgUQALoIACHPBQEAigcAIdAFAQCKBwAh0gUBAMwHACHTBUAA9wcAIdQFQAD3BwAhC7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAC3CtIFIs0FAQDlCAAhzgUQALYKACHPBQEA5QgAIdAFAQDlCAAh0gUBAIAJACHTBUAAhwoAIdQFQACHCgAhDBcAAJEMACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAAtwrSBSLNBQEA5QgAIc4FEAC2CgAhzwUBAOUIACHQBQEA5QgAIdIFAQCACQAh0wVAAIcKACHUBUAAhwoAIQU9AADoDwAgPgAA6w8AIO4FAADpDwAg7wUAAOoPACD0BQAAPQAgDBcAAJMMACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAANIFAs0FAQAAAAHOBRAAAAABzwUBAAAAAdAFAQAAAAHSBQEAAAAB0wVAAAAAAdQFQAAAAAEDPQAA6A8AIO4FAADpDwAg9AUAAD0AIBgLAADuCwAgDAAA7wsAIA4AAPILACAQAADxCwAgEwAA8wsAIBQAAPQLACAaAAD1CwAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAACfBQLzBAEAAAAB_QQAAACaBQKSBQEAAAABkwUBAAAAAZQFAQAAAAGWBQAAAJYFApgFAAAAmAUCmgUIAAAAAZsFCAAAAAGcBQEAAAABnQVAAAAAAZ8FQAAAAAGgBUAAAAABAgAAABsAID0AAJ8MACADAAAAGwAgPQAAnwwAID4AAJ4MACABNgAA5w8AMB0LAADdCAAgDAAA4AcAIA0AAL0IACAOAADhBwAgEAAA3wcAIBMAAOQHACAUAADiBwAgGgAA0AcAILkEAADYCAAwugQAABkAELsEAADYCAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHxBAAA3AifBSLzBAEAigcAIf0EAADbCJoFIpEFAQCKBwAhkgUBAIoHACGTBQEAigcAIZQFAQDMBwAhlgUAANkIlgUimAUAANoImAUimgUIAMoIACGbBQgAyggAIZwFAQDMBwAhnQVAAIsHACGfBUAA9wcAIaAFQAD3BwAhAgAAABsAIDYAAJ4MACACAAAAnAwAIDYAAJ0MACAVuQQAAJsMADC6BAAAnAwAELsEAACbDAAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh8QQAANwInwUi8wQBAIoHACH9BAAA2wiaBSKRBQEAigcAIZIFAQCKBwAhkwUBAIoHACGUBQEAzAcAIZYFAADZCJYFIpgFAADaCJgFIpoFCADKCAAhmwUIAMoIACGcBQEAzAcAIZ0FQACLBwAhnwVAAPcHACGgBUAA9wcAIRW5BAAAmwwAMLoEAACcDAAQuwQAAJsMADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHxBAAA3AifBSLzBAEAigcAIf0EAADbCJoFIpEFAQCKBwAhkgUBAIoHACGTBQEAigcAIZQFAQDMBwAhlgUAANkIlgUimAUAANoImAUimgUIAMoIACGbBQgAyggAIZwFAQDMBwAhnQVAAIsHACGfBUAA9wcAIaAFQAD3BwAhEbwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikgUBAOUIACGTBQEA5QgAIZQFAQCACQAhlgUAAJULlgUimAUAAJYLmAUimgUIALgJACGbBQgAuAkAIZwFAQCACQAhnQVAAOYIACGfBUAAhwoAIaAFQACHCgAhGAsAAJkLACAMAACaCwAgDgAAnQsAIBAAAJwLACATAACeCwAgFAAAnwsAIBoAAKALACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAAmAufBSLzBAEA5QgAIf0EAACXC5oFIpIFAQDlCAAhkwUBAOUIACGUBQEAgAkAIZYFAACVC5YFIpgFAACWC5gFIpoFCAC4CQAhmwUIALgJACGcBQEAgAkAIZ0FQADmCAAhnwVAAIcKACGgBUAAhwoAIRgLAADuCwAgDAAA7wsAIA4AAPILACAQAADxCwAgEwAA8wsAIBQAAPQLACAaAAD1CwAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAACfBQLzBAEAAAAB_QQAAACaBQKSBQEAAAABkwUBAAAAAZQFAQAAAAGWBQAAAJYFApgFAAAAmAUCmgUIAAAAAZsFCAAAAAGcBQEAAAABnQVAAAAAAZ8FQAAAAAGgBUAAAAABAz0AAOUPACDuBQAA5g8AIPQFAADLAgAgBD0AAJQMADDuBQAAlQwAMPAFAACXDAAg9AUAAJgMADAEPQAAhgwAMO4FAACHDAAw8AUAAIkMACD0BQAAigwAMAQ9AAD9CwAw7gUAAP4LADDwBQAAgAwAIPQFAAChCgAwCwcAAOAOACAIAADDDAAgCQAA4Q4AIA0AAOIOACAaAACnDAAgHQAA4w4AICAAAOQOACAhAADlDgAgIwAA5g4AIJQFAAD5CAAgzAUAAPkIACAAAAAAAAAFPQAA4A8AID4AAOMPACDuBQAA4Q8AIO8FAADiDwAg9AUAAKkDACADPQAA4A8AIO4FAADhDwAg9AUAAKkDACAAAAAFPQAA2w8AID4AAN4PACDuBQAA3A8AIO8FAADdDwAg9AUAAKkDACADPQAA2w8AIO4FAADcDwAg9AUAAKkDACAAAAAAAAU9AADWDwAgPgAA2Q8AIO4FAADXDwAg7wUAANgPACD0BQAAqQMAIAM9AADWDwAg7gUAANcPACD0BQAAqQMAIAAAAAU9AADRDwAgPgAA1A8AIO4FAADSDwAg7wUAANMPACD0BQAAqQMAIAM9AADRDwAg7gUAANIPACD0BQAAqQMAIAAAAAU9AADMDwAgPgAAzw8AIO4FAADNDwAg7wUAAM4PACD0BQAAqQMAIAM9AADMDwAg7gUAAM0PACD0BQAAqQMAIBQEAADYDQAgBQAA2Q0AIAYAAKQMACAOAADfDQAgEAAA3Q0AIBMAAOINACAUAADgDQAgGgAApwwAICQAANoNACAlAADbDQAgKgAA3A0AICsAAN4NACAsAADhDQAgkwUAAPkIACCwBQAA-QgAILEFAAD5CAAgsgUAAPkIACCzBQAA-QgAILQFAAD5CAAgtQUAAPkIACAAAAALPQAAvw0AMD4AAMQNADDuBQAAwA0AMO8FAADBDQAw8AUAAMINACDxBQAAww0AMPIFAADDDQAw8wUAAMMNADD0BQAAww0AMPUFAADFDQAw9gUAAMYNADALPQAAsw0AMD4AALgNADDuBQAAtA0AMO8FAAC1DQAw8AUAALYNACDxBQAAtw0AMPIFAAC3DQAw8wUAALcNADD0BQAAtw0AMPUFAAC5DQAw9gUAALoNADAFPQAAvA8AID4AAMoPACDuBQAAvQ8AIO8FAADJDwAg9AUAAMsCACALPQAApw0AMD4AAKwNADDuBQAAqA0AMO8FAACpDQAw8AUAAKoNACDxBQAAqw0AMPIFAACrDQAw8wUAAKsNADD0BQAAqw0AMPUFAACtDQAw9gUAAK4NADALPQAAmw0AMD4AAKANADDuBQAAnA0AMO8FAACdDQAw8AUAAJ4NACDxBQAAnw0AMPIFAACfDQAw8wUAAJ8NADD0BQAAnw0AMPUFAAChDQAw9gUAAKINADALPQAAjw0AMD4AAJQNADDuBQAAkA0AMO8FAACRDQAw8AUAAJINACDxBQAAkw0AMPIFAACTDQAw8wUAAJMNADD0BQAAkw0AMPUFAACVDQAw9gUAAJYNADALPQAAhg0AMD4AAIoNADDuBQAAhw0AMO8FAACIDQAw8AUAAIkNACDxBQAA3AoAMPIFAADcCgAw8wUAANwKADD0BQAA3AoAMPUFAACLDQAw9gUAAN8KADALPQAA_QwAMD4AAIENADDuBQAA_gwAMO8FAAD_DAAw8AUAAIANACDxBQAA2gsAMPIFAADaCwAw8wUAANoLADD0BQAA2gsAMPUFAACCDQAw9gUAAN0LADALPQAA9AwAMD4AAPgMADDuBQAA9QwAMO8FAAD2DAAw8AUAAPcMACDxBQAA-AoAMPIFAAD4CgAw8wUAAPgKADD0BQAA-AoAMPUFAAD5DAAw9gUAAPsKADALPQAA6wwAMD4AAO8MADDuBQAA7AwAMO8FAADtDAAw8AUAAO4MACDxBQAAsAsAMPIFAACwCwAw8wUAALALADD0BQAAsAsAMPUFAADwDAAw9gUAALMLADAHPQAA5gwAID4AAOkMACDuBQAA5wwAIO8FAADoDAAg8gUAAIgBACDzBQAAiAEAIPQFAADBAwAgCz0AAN0MADA-AADhDAAw7gUAAN4MADDvBQAA3wwAMPAFAADgDAAg8QUAAKEKADDyBQAAoQoAMPMFAAChCgAw9AUAAKEKADD1BQAA4gwAMPYFAACkCgAwCz0AANQMADA-AADYDAAw7gUAANUMADDvBQAA1gwAMPAFAADXDAAg8QUAALwLADDyBQAAvAsAMPMFAAC8CwAw9AUAALwLADD1BQAA2QwAMPYFAAC_CwAwCwoAANAJACASAADRCQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABzQQIAAAAAeYEAQAAAAHxBAEAAAAB_QQBAAAAAf4EAQAAAAH_BAIAAAABAgAAADAAID0AANwMACADAAAAMAAgPQAA3AwAID4AANsMACABNgAAyA8AMAIAAAAwACA2AADbDAAgAgAAAMALACA2AADaDAAgCbwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0ECAC4CQAh5gQBAOUIACHxBAEA5QgAIf0EAQDlCAAh_gQBAOUIACH_BAIA7wgAIQsKAADBCQAgEgAAwgkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0ECAC4CQAh5gQBAOUIACHxBAEA5QgAIf0EAQDlCAAh_gQBAOUIACH_BAIA7wgAIQsKAADQCQAgEgAA0QkAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHmBAEAAAAB8QQBAAAAAf0EAQAAAAH-BAEAAAAB_wQCAAAAARUKAADKCgAgDQAAyQoAIBUAAMgKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHmBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAECAAAAPQAgPQAA5QwAIAMAAAA9ACA9AADlDAAgPgAA5AwAIAE2AADHDwAwAgAAAD0AIDYAAOQMACACAAAApQoAIDYAAOMMACAPvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5gQBAIAJACHqBAEAgAkAIe8EAACnCtcFIvEEAACoCtgFIvMEAQDlCAAhkQUBAOUIACGSBQEA5QgAIdUFAQDlCAAh2QUAAKkK2QUj2gUBAIAJACHbBQEAgAkAIdwFQACHCgAhFQoAAK4KACANAACtCgAgFQAArAoAIBYAAKkLACAYAACvCgAgGQAAsAoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeYEAQCACQAh6gQBAIAJACHvBAAApwrXBSLxBAAAqArYBSLzBAEA5QgAIZEFAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIRUKAADKCgAgDQAAyQoAIBUAAMgKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHmBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEDvAQBAAAAAb4EQAAAAAG_BEAAAAABAgAAAMEDACA9AADmDAAgAwAAAIgBACA9AADmDAAgPgAA6gwAIAUAAACIAQAgNgAA6gwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIQO8BAEA5QgAIb4EQADmCAAhvwRAAOYIACELCgAApwkAILwEAQAAAAG9BAEAAAABvgRAAAAAAb8EQAAAAAHVBIAAAAAB1gSAAAAAAeYEAQAAAAHnBAIAAAAB6AQBAAAAAekEgAAAAAECAAAAOQAgPQAA8wwAIAMAAAA5ACA9AADzDAAgPgAA8gwAIAE2AADGDwAwAgAAADkAIDYAAPIMACACAAAAtAsAIDYAAPEMACAKvAQBAOUIACG9BAEAgAkAIb4EQADmCAAhvwRAAOYIACHVBIAAAAAB1gSAAAAAAeYEAQDlCAAh5wQCAO8IACHoBAEA5QgAIekEgAAAAAELCgAApQkAILwEAQDlCAAhvQQBAIAJACG-BEAA5ggAIb8EQADmCAAh1QSAAAAAAdYEgAAAAAHmBAEA5QgAIecEAgDvCAAh6AQBAOUIACHpBIAAAAABCwoAAKcJACC8BAEAAAABvQQBAAAAAb4EQAAAAAG_BEAAAAAB1QSAAAAAAdYEgAAAAAHmBAEAAAAB5wQCAAAAAegEAQAAAAHpBIAAAAABDAoAAOkKACAQAADqCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAECAAAAKgAgPQAA_AwAIAMAAAAqACA9AAD8DAAgPgAA-wwAIAE2AADFDwAwAgAAACoAIDYAAPsMACACAAAA_AoAIDYAAPoMACAGvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5gQBAOUIACHxBAAA1gmCBSKGBQEAgAkAIQwKAADdCQAgEAAA3gkAIBoAAOAJACAjAADiCQAgLgAA3wkAIC8AAOEJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHmBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhDAoAAOkKACAQAADqCgAgGgAA7AoAICMAAO4KACAuAADrCgAgLwAA7QoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAEOCgAAigsAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHOBAgAAAABzwQIAAAAAdAECAAAAAHWBIAAAAAB5gQBAAAAAegEAQAAAAGIBYAAAAABjQUIAAAAAY4FCAAAAAECAAAAIwAgPQAAhQ0AIAMAAAAjACA9AACFDQAgPgAAhA0AIAE2AADEDwAwAgAAACMAIDYAAIQNACACAAAA3gsAIDYAAIMNACANvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhzQQIAIYLACHOBAgAhgsAIc8ECACGCwAh0AQIAIYLACHWBIAAAAAB5gQBAOUIACHoBAEA5QgAIYgFgAAAAAGNBQgAhgsAIY4FCACGCwAhDgoAAIgLACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHNBAgAhgsAIc4ECACGCwAhzwQIAIYLACHQBAgAhgsAIdYEgAAAAAHmBAEA5QgAIegEAQDlCAAhiAWAAAAAAY0FCACGCwAhjgUIAIYLACEOCgAAigsAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHOBAgAAAABzwQIAAAAAdAECAAAAAHWBIAAAAAB5gQBAAAAAegEAQAAAAGIBYAAAAABjQUIAAAAAY4FCAAAAAEMCgAA5woAIA4AAIALACC8BAEAAAABvgRAAAAAAdYEgAAAAAHmBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABAgAAACcAID0AAI4NACADAAAAJwAgPQAAjg0AID4AAI0NACABNgAAww8AMAIAAAAnACA2AACNDQAgAgAAAOAKACA2AACMDQAgCrwEAQDlCAAhvgRAAOYIACHWBIAAAAAB5gQBAOUIACGHBQIA7wgAIYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABDAoAAOQKACAOAAD0CgAgvAQBAOUIACG-BEAA5ggAIdYEgAAAAAHmBAEA5QgAIYcFAgDvCAAhiAWAAAAAAYkFgAAAAAGKBYAAAAABiwWAAAAAAYwFgAAAAAEMCgAA5woAIA4AAIALACC8BAEAAAABvgRAAAAAAdYEgAAAAAHmBAEAAAABhwUCAAAAAYgFgAAAAAGJBYAAAAABigWAAAAAAYsFgAAAAAGMBYAAAAABDScAAJsJACAoAACcCQAgKQAAnQkAILwEAQAAAAG-BEAAAAABvwRAAAAAAd4EAQAAAAHfBAEAAAAB4AQBAAAAAeEEAQAAAAHiBAIAAAAB4wQBAAAAAeQEgAAAAAECAAAAeQAgPQAAmg0AIAMAAAB5ACA9AACaDQAgPgAAmQ0AIAE2AADCDwAwEgMAANcHACAnAACpCAAgKAAAqggAICkAAKsIACC5BAAApggAMLoEAAB3ABC7BAAApggAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAh3QQBAIoHACHeBAEAigcAId8EAQCKBwAh4AQBAIoHACHhBAEAigcAIeIEAgCnCAAh4wQBAMwHACHkBAAAqAgAIAIAAAB5ACA2AACZDQAgAgAAAJcNACA2AACYDQAgDrkEAACWDQAwugQAAJcNABC7BAAAlg0AMLwEAQCKBwAhvgRAAIsHACG_BEAAiwcAId0EAQCKBwAh3gQBAIoHACHfBAEAigcAIeAEAQCKBwAh4QQBAIoHACHiBAIApwgAIeMEAQDMBwAh5AQAAKgIACAOuQQAAJYNADC6BAAAlw0AELsEAACWDQAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh3QQBAIoHACHeBAEAigcAId8EAQCKBwAh4AQBAIoHACHhBAEAigcAIeIEAgCnCAAh4wQBAMwHACHkBAAAqAgAIAq8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHeBAEA5QgAId8EAQDlCAAh4AQBAOUIACHhBAEA5QgAIeIEAgD_CAAh4wQBAIAJACHkBIAAAAABDScAAIEJACAoAACCCQAgKQAAgwkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAId4EAQDlCAAh3wQBAOUIACHgBAEA5QgAIeEEAQDlCAAh4gQCAP8IACHjBAEAgAkAIeQEgAAAAAENJwAAmwkAICgAAJwJACApAACdCQAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB3gQBAAAAAd8EAQAAAAHgBAEAAAAB4QQBAAAAAeIEAgAAAAHjBAEAAAAB5ASAAAAAAQK8BAEAAAABjwUBAAAAAQIAAAB1ACA9AACmDQAgAwAAAHUAID0AAKYNACA-AAClDQAgATYAAMEPADAHAwAA1wcAILkEAACsCAAwugQAAHMAELsEAACsCAAwvAQBAAAAAd0EAQCKBwAhjwUBAIoHACECAAAAdQAgNgAApQ0AIAIAAACjDQAgNgAApA0AIAa5BAAAog0AMLoEAACjDQAQuwQAAKINADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACEGuQQAAKINADC6BAAAow0AELsEAACiDQAwvAQBAIoHACHdBAEAigcAIY8FAQCKBwAhArwEAQDlCAAhjwUBAOUIACECvAQBAOUIACGPBQEA5QgAIQK8BAEAAAABjwUBAAAAAQa8BAEAAAABjwUBAAAAAZIFAQAAAAGUBQEAAAABqQUBAAAAAaoFAQAAAAECAAAAcQAgPQAAsg0AIAMAAABxACA9AACyDQAgPgAAsQ0AIAE2AADADwAwCwMAANcHACC5BAAArQgAMLoEAABvABC7BAAArQgAMLwEAQAAAAHdBAEAigcAIY8FAQCKBwAhkgUBAMwHACGUBQEAzAcAIakFAQDMBwAhqgUBAMwHACECAAAAcQAgNgAAsQ0AIAIAAACvDQAgNgAAsA0AIAq5BAAArg0AMLoEAACvDQAQuwQAAK4NADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACGSBQEAzAcAIZQFAQDMBwAhqQUBAMwHACGqBQEAzAcAIQq5BAAArg0AMLoEAACvDQAQuwQAAK4NADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACGSBQEAzAcAIZQFAQDMBwAhqQUBAMwHACGqBQEAzAcAIQa8BAEA5QgAIY8FAQDlCAAhkgUBAIAJACGUBQEAgAkAIakFAQCACQAhqgUBAIAJACEGvAQBAOUIACGPBQEA5QgAIZIFAQCACQAhlAUBAIAJACGpBQEAgAkAIaoFAQCACQAhBrwEAQAAAAGPBQEAAAABkgUBAAAAAZQFAQAAAAGpBQEAAAABqgUBAAAAAQa8BAEAAAABqwUBAAAAAawFAQAAAAGtBQEAAAABrgUCAAAAAa8FAgAAAAECAAAACwAgPQAAvg0AIAMAAAALACA9AAC-DQAgPgAAvQ0AIAE2AAC_DwAwCwMAANcHACC5BAAA4AgAMLoEAAAJABC7BAAA4AgAMLwEAQAAAAHdBAEAigcAIasFAQCKBwAhrAUBAMwHACGtBQEAzAcAIa4FAgCnCAAhrwUCAKcIACECAAAACwAgNgAAvQ0AIAIAAAC7DQAgNgAAvA0AIAq5BAAAug0AMLoEAAC7DQAQuwQAALoNADC8BAEAigcAId0EAQCKBwAhqwUBAIoHACGsBQEAzAcAIa0FAQDMBwAhrgUCAKcIACGvBQIApwgAIQq5BAAAug0AMLoEAAC7DQAQuwQAALoNADC8BAEAigcAId0EAQCKBwAhqwUBAIoHACGsBQEAzAcAIa0FAQDMBwAhrgUCAKcIACGvBQIApwgAIQa8BAEA5QgAIasFAQDlCAAhrAUBAIAJACGtBQEAgAkAIa4FAgD_CAAhrwUCAP8IACEGvAQBAOUIACGrBQEA5QgAIawFAQCACQAhrQUBAIAJACGuBQIA_wgAIa8FAgD_CAAhBrwEAQAAAAGrBQEAAAABrAUBAAAAAa0FAQAAAAGuBQIAAAABrwUCAAAAAQa8BAEAAAABjwUBAAAAAZQFAQAAAAGmBQEAAAABpwVAAAAAAagFAQAAAAECAAAABwAgPQAAyg0AIAMAAAAHACA9AADKDQAgPgAAyQ0AIAE2AAC-DwAwCwMAANcHACC5BAAA4QgAMLoEAAAFABC7BAAA4QgAMLwEAQAAAAHdBAEAigcAIY8FAQCKBwAhlAUBAMwHACGmBQEAzAcAIacFQAD3BwAhqAUBAMwHACECAAAABwAgNgAAyQ0AIAIAAADHDQAgNgAAyA0AIAq5BAAAxg0AMLoEAADHDQAQuwQAAMYNADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACGUBQEAzAcAIaYFAQDMBwAhpwVAAPcHACGoBQEAzAcAIQq5BAAAxg0AMLoEAADHDQAQuwQAAMYNADC8BAEAigcAId0EAQCKBwAhjwUBAIoHACGUBQEAzAcAIaYFAQDMBwAhpwVAAPcHACGoBQEAzAcAIQa8BAEA5QgAIY8FAQDlCAAhlAUBAIAJACGmBQEAgAkAIacFQACHCgAhqAUBAIAJACEGvAQBAOUIACGPBQEA5QgAIZQFAQCACQAhpgUBAIAJACGnBUAAhwoAIagFAQCACQAhBrwEAQAAAAGPBQEAAAABlAUBAAAAAaYFAQAAAAGnBUAAAAABqAUBAAAAAQQ9AAC_DQAw7gUAAMANADDwBQAAwg0AIPQFAADDDQAwBD0AALMNADDuBQAAtA0AMPAFAAC2DQAg9AUAALcNADADPQAAvA8AIO4FAAC9DwAg9AUAAMsCACAEPQAApw0AMO4FAACoDQAw8AUAAKoNACD0BQAAqw0AMAQ9AACbDQAw7gUAAJwNADDwBQAAng0AIPQFAACfDQAwBD0AAI8NADDuBQAAkA0AMPAFAACSDQAg9AUAAJMNADAEPQAAhg0AMO4FAACHDQAw8AUAAIkNACD0BQAA3AoAMAQ9AAD9DAAw7gUAAP4MADDwBQAAgA0AIPQFAADaCwAwBD0AAPQMADDuBQAA9QwAMPAFAAD3DAAg9AUAAPgKADAEPQAA6wwAMO4FAADsDAAw8AUAAO4MACD0BQAAsAsAMAM9AADmDAAg7gUAAOcMACD0BQAAwQMAIAQ9AADdDAAw7gUAAN4MADDwBQAA4AwAIPQFAAChCgAwBD0AANQMADDuBQAA1QwAMPAFAADXDAAg9AUAALwLADAAAAAAAAAAAAABCAAAwwwAIAAAAAAAAAAFPQAAtw8AID4AALoPACDuBQAAuA8AIO8FAAC5DwAg9AUAAMsCACADPQAAtw8AIO4FAAC4DwAg9AUAAMsCACAAAAAFPQAAsg8AID4AALUPACDuBQAAsw8AIO8FAAC0DwAg9AUAAMsCACADPQAAsg8AIO4FAACzDwAg9AUAAMsCACAAAAAB8QUAAADIBQIB8QUAAADKBQILPQAAyw4AMD4AANAOADDuBQAAzA4AMO8FAADNDgAw8AUAAM4OACDxBQAAzw4AMPIFAADPDgAw8wUAAM8OADD0BQAAzw4AMPUFAADRDgAw9gUAANIOADAHPQAAxg4AID4AAMkOACDuBQAAxw4AIO8FAADIDgAg8gUAABEAIPMFAAARACD0BQAAqQMAIAs9AAC6DgAwPgAAvw4AMO4FAAC7DgAw7wUAALwOADDwBQAAvQ4AIPEFAAC-DgAw8gUAAL4OADDzBQAAvg4AMPQFAAC-DgAw9QUAAMAOADD2BQAAwQ4AMAc9AAC1DgAgPgAAuA4AIO4FAAC2DgAg7wUAALcOACDyBQAAFwAg8wUAABcAIPQFAACxBAAgCz0AAKwOADA-AACwDgAw7gUAAK0OADDvBQAArg4AMPAFAACvDgAg8QUAAKEKADDyBQAAoQoAMPMFAAChCgAw9AUAAKEKADD1BQAAsQ4AMPYFAACkCgAwCz0AAJ0OADA-AACiDgAw7gUAAJ4OADDvBQAAnw4AMPAFAACgDgAg8QUAAKEOADDyBQAAoQ4AMPMFAAChDgAw9AUAAKEOADD1BQAAow4AMPYFAACkDgAwCz0AAJIOADA-AACWDgAw7gUAAJMOADDvBQAAlA4AMPAFAACVDgAg8QUAAIAKADDyBQAAgAoAMPMFAACACgAw9AUAAIAKADD1BQAAlw4AMPYFAACDCgAwCz0AAIcOADA-AACLDgAw7gUAAIgOADDvBQAAiQ4AMPAFAACKDgAg8QUAAJAKADDyBQAAkAoAMPMFAACQCgAw9AUAAJAKADD1BQAAjA4AMPYFAACTCgAwCz0AAP4NADA-AACCDgAw7gUAAP8NADDvBQAAgA4AMPAFAACBDgAg8QUAAOcJADDyBQAA5wkAMPMFAADnCQAw9AUAAOcJADD1BQAAgw4AMPYFAADqCQAwDBYAALEJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHqBAEAAAAB7ARAAAAAAe0EAgAAAAHvBAAAAO8EAvEEAAAA8QQC8gQBAAAAAfMEAQAAAAH0BAEAAAABAgAAAGYAID0AAIYOACADAAAAZgAgPQAAhg4AID4AAIUOACABNgAAsQ8AMAIAAABmACA2AACFDgAgAgAAAOsJACA2AACEDgAgC7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeoEAQDlCAAh7ARAAOYIACHtBAIA7wgAIe8EAACtCe8EIvEEAACuCfEEIvIEAQCACQAh8wQBAIAJACH0BAEAgAkAIQwWAACvCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6gQBAOUIACHsBEAA5ggAIe0EAgDvCAAh7wQAAK0J7wQi8QQAAK4J8QQi8gQBAIAJACHzBAEAgAkAIfQEAQCACQAhDBYAALEJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHqBAEAAAAB7ARAAAAAAe0EAgAAAAHvBAAAAO8EAvEEAAAA8QQC8gQBAAAAAfMEAQAAAAH0BAEAAAABBB4AAJEOACC8BAEAAAAB5AUBAAAAAeUFQAAAAAECAAAAYgAgPQAAkA4AIAMAAABiACA9AACQDgAgPgAAjg4AIAE2AACwDwAwAgAAAGIAIDYAAI4OACACAAAAlAoAIDYAAI0OACADvAQBAOUIACHkBQEA5QgAIeUFQADmCAAhBB4AAI8OACC8BAEA5QgAIeQFAQDlCAAh5QVAAOYIACEFPQAAqw8AID4AAK4PACDuBQAArA8AIO8FAACtDwAg9AUAAAEAIAQeAACRDgAgvAQBAAAAAeQFAQAAAAHlBUAAAAABAz0AAKsPACDuBQAArA8AIPQFAAABACAIHgAAnA4AILwEAQAAAAG-BEAAAAABvwRAAAAAAeMFQAAAAAHkBQEAAAAB5wUBAAAAAegFIAAAAAECAAAAXgAgPQAAmw4AIAMAAABeACA9AACbDgAgPgAAmQ4AIAE2AACqDwAwAgAAAF4AIDYAAJkOACACAAAAhAoAIDYAAJgOACAHvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh4wVAAIcKACHkBQEA5QgAIecFAQDlCAAh6AUgAIYKACEIHgAAmg4AILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeMFQACHCgAh5AUBAOUIACHnBQEA5QgAIegFIACGCgAhBT0AAKUPACA-AACoDwAg7gUAAKYPACDvBQAApw8AIPQFAAABACAIHgAAnA4AILwEAQAAAAG-BEAAAAABvwRAAAAAAeMFQAAAAAHkBQEAAAAB5wUBAAAAAegFIAAAAAEDPQAApQ8AIO4FAACmDwAg9AUAAAEAIAu8BAEAAAABvgRAAAAAAb8EQAAAAAHvBAAAAN4FAvEEAAAA4QUC8wQBAAAAAYAFAQAAAAHfBQAAAN8FAuEFAQAAAAHiBQEAAAAB4wVAAAAAAQIAAABaACA9AACrDgAgAwAAAFoAID0AAKsOACA-AACqDgAgATYAAKQPADAQBgAAzQcAILkEAAC1CAAwugQAAFgAELsEAAC1CAAwvAQBAAAAAb4EQACLBwAhvwRAAIsHACHvBAAAtgjeBSLxBAAAuAjhBSLzBAEAigcAIYAFAQDMBwAhogUBAIoHACHfBQAAtwjfBSLhBQEAigcAIeIFAQDMBwAh4wVAAPcHACECAAAAWgAgNgAAqg4AIAIAAAClDgAgNgAApg4AIA-5BAAApA4AMLoEAAClDgAQuwQAAKQOADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACHvBAAAtgjeBSLxBAAAuAjhBSLzBAEAigcAIYAFAQDMBwAhogUBAIoHACHfBQAAtwjfBSLhBQEAigcAIeIFAQDMBwAh4wVAAPcHACEPuQQAAKQOADC6BAAApQ4AELsEAACkDgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAh7wQAALYI3gUi8QQAALgI4QUi8wQBAIoHACGABQEAzAcAIaIFAQCKBwAh3wUAALcI3wUi4QUBAIoHACHiBQEAzAcAIeMFQAD3BwAhC7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIe8EAACnDt4FIvEEAACpDuEFIvMEAQDlCAAhgAUBAIAJACHfBQAAqA7fBSLhBQEA5QgAIeIFAQCACQAh4wVAAIcKACEB8QUAAADeBQIB8QUAAADfBQIB8QUAAADhBQILvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh7wQAAKcO3gUi8QQAAKkO4QUi8wQBAOUIACGABQEAgAkAId8FAACoDt8FIuEFAQDlCAAh4gUBAIAJACHjBUAAhwoAIQu8BAEAAAABvgRAAAAAAb8EQAAAAAHvBAAAAN4FAvEEAAAA4QUC8wQBAAAAAYAFAQAAAAHfBQAAAN8FAuEFAQAAAAHiBQEAAAAB4wVAAAAAARUIAADHCgAgCgAAygoAIA0AAMkKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAeoEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZEFAQAAAAGSBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAECAAAAPQAgPQAAtA4AIAMAAAA9ACA9AAC0DgAgPgAAsw4AIAE2AACjDwAwAgAAAD0AIDYAALMOACACAAAApQoAIDYAALIOACAPvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGRBQEA5QgAIZIFAQDlCAAh2QUAAKkK2QUj2gUBAIAJACHbBQEAgAkAIdwFQACHCgAhFQgAAKsKACAKAACuCgAgDQAArQoAIBYAAKkLACAYAACvCgAgGQAAsAoAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQCACQAh5gQBAIAJACHqBAEAgAkAIe8EAACnCtcFIvEEAACoCtgFIvMEAQDlCAAhkQUBAOUIACGSBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIRUIAADHCgAgCgAAygoAIA0AAMkKACAWAACrCwAgGAAAywoAIBkAAMwKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAeoEAQAAAAHvBAAAANcFAvEEAAAA2AUC8wQBAAAAAZEFAQAAAAGSBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEJGgAAowwAIBsAAKEMACAcAACiDAAgvAQBAAAAAb4EQAAAAAG_BEAAAAABjwUBAAAAAZIFAQAAAAGhBQEAAAABAgAAALEEACA9AAC1DgAgAwAAABcAID0AALUOACA-AAC5DgAgCwAAABcAIBoAAPwLACAbAAD6CwAgHAAA-wsAIDYAALkOACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGPBQEA5QgAIZIFAQCACQAhoQUBAIAJACEJGgAA_AsAIBsAAPoLACAcAAD7CwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhjwUBAOUIACGSBQEAgAkAIaEFAQCACQAhB7wEAQAAAAG-BEAAAAABvwRAAAAAAbgFQAAAAAHCBQEAAAABwwUBAAAAAcQFAQAAAAECAAAAFQAgPQAAxQ4AIAMAAAAVACA9AADFDgAgPgAAxA4AIAE2AACiDwAwDAYAAM0HACC5BAAA3ggAMLoEAAATABC7BAAA3ggAMLwEAQAAAAG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG4BUAAiwcAIcIFAQAAAAHDBQEAzAcAIcQFAQDMBwAhAgAAABUAIDYAAMQOACACAAAAwg4AIDYAAMMOACALuQQAAMEOADC6BAAAwg4AELsEAADBDgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG4BUAAiwcAIcIFAQCKBwAhwwUBAMwHACHEBQEAzAcAIQu5BAAAwQ4AMLoEAADCDgAQuwQAAMEOADC8BAEAigcAIb4EQACLBwAhvwRAAIsHACGiBQEAigcAIbgFQACLBwAhwgUBAIoHACHDBQEAzAcAIcQFAQDMBwAhB7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIbgFQADmCAAhwgUBAOUIACHDBQEAgAkAIcQFAQCACQAhB7wEAQDlCAAhvgRAAOYIACG_BEAA5ggAIbgFQADmCAAhwgUBAOUIACHDBQEAgAkAIcQFAQCACQAhB7wEAQAAAAG-BEAAAAABvwRAAAAAAbgFQAAAAAHCBQEAAAABwwUBAAAAAcQFAQAAAAEWBAAAyw0AIAUAAMwNACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICsAANINACAsAADVDQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABkwUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAAxg4AIAMAAAARACA9AADGDgAgPgAAyg4AIBgAAAARACAEAADHDAAgBQAAyAwAIA4AAM8MACAQAADNDAAgEwAA0wwAIBQAANAMACAaAADSDAAgJAAAygwAICUAAMsMACAqAADMDAAgKwAAzgwAICwAANEMACA2AADKDgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEWBAAAxwwAIAUAAMgMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEMvAQBAAAAAb4EQAAAAAG_BEAAAAABuQUBAAAAAboFAQAAAAG7BQEAAAABvAUBAAAAAb0FAQAAAAG-BUAAAAABvwVAAAAAAcAFAQAAAAHBBQEAAAABAgAAAA8AID0AANYOACADAAAADwAgPQAA1g4AID4AANUOACABNgAAoQ8AMBEGAADNBwAguQQAAN8IADC6BAAADQAQuwQAAN8IADC8BAEAAAABvgRAAIsHACG_BEAAiwcAIaIFAQCKBwAhuQUBAIoHACG6BQEAigcAIbsFAQDMBwAhvAUBAMwHACG9BQEAzAcAIb4FQAD3BwAhvwVAAPcHACHABQEAzAcAIcEFAQDMBwAhAgAAAA8AIDYAANUOACACAAAA0w4AIDYAANQOACAQuQQAANIOADC6BAAA0w4AELsEAADSDgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG5BQEAigcAIboFAQCKBwAhuwUBAMwHACG8BQEAzAcAIb0FAQDMBwAhvgVAAPcHACG_BUAA9wcAIcAFAQDMBwAhwQUBAMwHACEQuQQAANIOADC6BAAA0w4AELsEAADSDgAwvAQBAIoHACG-BEAAiwcAIb8EQACLBwAhogUBAIoHACG5BQEAigcAIboFAQCKBwAhuwUBAMwHACG8BQEAzAcAIb0FAQDMBwAhvgVAAPcHACG_BUAA9wcAIcAFAQDMBwAhwQUBAMwHACEMvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhuQUBAOUIACG6BQEA5QgAIbsFAQCACQAhvAUBAIAJACG9BQEAgAkAIb4FQACHCgAhvwVAAIcKACHABQEAgAkAIcEFAQCACQAhDLwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIbkFAQDlCAAhugUBAOUIACG7BQEAgAkAIbwFAQCACQAhvQUBAIAJACG-BUAAhwoAIb8FQACHCgAhwAUBAIAJACHBBQEAgAkAIQy8BAEAAAABvgRAAAAAAb8EQAAAAAG5BQEAAAABugUBAAAAAbsFAQAAAAG8BQEAAAABvQUBAAAAAb4FQAAAAAG_BUAAAAABwAUBAAAAAcEFAQAAAAEEPQAAyw4AMO4FAADMDgAw8AUAAM4OACD0BQAAzw4AMAM9AADGDgAg7gUAAMcOACD0BQAAqQMAIAQ9AAC6DgAw7gUAALsOADDwBQAAvQ4AIPQFAAC-DgAwAz0AALUOACDuBQAAtg4AIPQFAACxBAAgBD0AAKwOADDuBQAArQ4AMPAFAACvDgAg9AUAAKEKADAEPQAAnQ4AMO4FAACeDgAw8AUAAKAOACD0BQAAoQ4AMAQ9AACSDgAw7gUAAJMOADDwBQAAlQ4AIPQFAACACgAwBD0AAIcOADDuBQAAiA4AMPAFAACKDgAg9AUAAJAKADAEPQAA_g0AMO4FAAD_DQAw8AUAAIEOACD0BQAA5wkAMAAABgYAAKQMACAaAACnDAAgGwAApQwAIBwAAKYMACCSBQAA-QgAIKEFAAD5CAAgAAAAAAAAAAU9AACcDwAgPgAAnw8AIO4FAACdDwAg7wUAAJ4PACD0BQAAPQAgAz0AAJwPACDuBQAAnQ8AIPQFAAA9ACAAAAAAAAAAAAAAAAU9AACXDwAgPgAAmg8AIO4FAACYDwAg7wUAAJkPACD0BQAAywIAIAM9AACXDwAg7gUAAJgPACD0BQAAywIAIAAAAAAAAAAAAAc9AACSDwAgPgAAlQ8AIO4FAACTDwAg7wUAAJQPACDyBQAAAwAg8wUAAAMAIPQFAAAqACADPQAAkg8AIO4FAACTDwAg9AUAACoAIAgIAADDDAAgCgAAig8AIBAAAN0NACAaAACnDAAgIwAA5g4AIC4AAI8PACAvAACQDwAghgUAAPkIACABJgAA6QgAIAEmAADpCAAgAAQWAACEDwAgIAAA5A4AIDAAAOUOACDqBAAA-QgAIA4IAADDDAAgCgAAig8AIA0AAOIOACAVAACkDAAgFgAAhA8AIBgAAIsPACAZAACMDwAg5QQAAPkIACDmBAAA-QgAIOoEAAD5CAAg2QUAAPkIACDaBQAA-QgAINsFAAD5CAAg3AUAAPkIACAOCwAAkQ8AIAwAAN4NACANAADiDgAgDgAA3w0AIBAAAN0NACATAADiDQAgFAAA4A0AIBoAAKcMACCUBQAA-QgAIJoFAAD5CAAgmwUAAPkIACCcBQAA-QgAIJ8FAAD5CAAgoAUAAPkIACAABQ0AAOIOACAXAACJDwAg0gUAAPkIACDTBQAA-QgAINQFAAD5CAAgBAgAAMMMACAKAACKDwAgEgAAjg8AIM0EAAD5CAAgAAAAAA0IAADoCgAgCgAA6QoAIBAAAOoKACAaAADsCgAgIwAA7goAIC4AAOsKACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAfEEAAAAggUChgUBAAAAAQIAAAAqACA9AACSDwAgAwAAAAMAID0AAJIPACA-AACWDwAgDwAAAAMAIAgAANwJACAKAADdCQAgEAAA3gkAIBoAAOAJACAjAADiCQAgLgAA3wkAIDYAAJYPACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACENCAAA3AkAIAoAAN0JACAQAADeCQAgGgAA4AkAICMAAOIJACAuAADfCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAOUIACHmBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhFAcAANcOACAIAADYDgAgCQAA2Q4AIA0AANoOACAaAADbDgAgIAAA3Q4AICEAAN4OACAjAADfDgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAADKBQKPBQEAAAABlAUBAAAAAcUFAQAAAAHGBSAAAAAByAUAAADIBQLKBSAAAAABywUgAAAAAcwFQAAAAAECAAAAywIAID0AAJcPACADAAAAzgIAID0AAJcPACA-AACbDwAgFgAAAM4CACAHAAD1DQAgCAAA9g0AIAkAAPcNACANAAD4DQAgGgAA-Q0AICAAAPsNACAhAAD8DQAgIwAA_Q0AIDYAAJsPACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIRQHAAD1DQAgCAAA9g0AIAkAAPcNACANAAD4DQAgGgAA-Q0AICAAAPsNACAhAAD8DQAgIwAA_Q0AILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAD0DcoFIo8FAQDlCAAhlAUBAIAJACHFBQEA5QgAIcYFIACGCgAhyAUAAPMNyAUiygUgAIYKACHLBSAAhgoAIcwFQACHCgAhFggAAMcKACAKAADKCgAgDQAAyQoAIBUAAMgKACAWAACrCwAgGQAAzAoAILwEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAECAAAAPQAgPQAAnA8AIAMAAAA7ACA9AACcDwAgPgAAoA8AIBgAAAA7ACAIAACrCgAgCgAArgoAIA0AAK0KACAVAACsCgAgFgAAqQsAIBkAALAKACA2AACgDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGRBQEA5QgAIZIFAQDlCAAh1QUBAOUIACHZBQAAqQrZBSPaBQEAgAkAIdsFAQCACQAh3AVAAIcKACEWCAAAqwoAIAoAAK4KACANAACtCgAgFQAArAoAIBYAAKkLACAZAACwCgAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAIAJACHmBAEAgAkAIeoEAQCACQAh7wQAAKcK1wUi8QQAAKgK2AUi8wQBAOUIACGRBQEA5QgAIZIFAQDlCAAh1QUBAOUIACHZBQAAqQrZBSPaBQEAgAkAIdsFAQCACQAh3AVAAIcKACEMvAQBAAAAAb4EQAAAAAG_BEAAAAABuQUBAAAAAboFAQAAAAG7BQEAAAABvAUBAAAAAb0FAQAAAAG-BUAAAAABvwVAAAAAAcAFAQAAAAHBBQEAAAABB7wEAQAAAAG-BEAAAAABvwRAAAAAAbgFQAAAAAHCBQEAAAABwwUBAAAAAcQFAQAAAAEPvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHqBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdkFAAAA2QUD2gUBAAAAAdsFAQAAAAHcBUAAAAABC7wEAQAAAAG-BEAAAAABvwRAAAAAAe8EAAAA3gUC8QQAAADhBQLzBAEAAAABgAUBAAAAAd8FAAAA3wUC4QUBAAAAAeIFAQAAAAHjBUAAAAABBhYAAIMPACAwAACbCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB6gQBAAAAAQIAAAABACA9AAClDwAgAwAAAJ0BACA9AAClDwAgPgAAqQ8AIAgAAACdAQAgFgAAgg8AIDAAAPoJACA2AACpDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6gQBAIAJACEGFgAAgg8AIDAAAPoJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHqBAEAgAkAIQe8BAEAAAABvgRAAAAAAb8EQAAAAAHjBUAAAAAB5AUBAAAAAecFAQAAAAHoBSAAAAABBhYAAIMPACAgAACcCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB6gQBAAAAAQIAAAABACA9AACrDwAgAwAAAJ0BACA9AACrDwAgPgAArw8AIAgAAACdAQAgFgAAgg8AICAAAPsJACA2AACvDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh6gQBAIAJACEGFgAAgg8AICAAAPsJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHqBAEAgAkAIQO8BAEAAAAB5AUBAAAAAeUFQAAAAAELvAQBAAAAAb4EQAAAAAG_BEAAAAAB6gQBAAAAAewEQAAAAAHtBAIAAAAB7wQAAADvBALxBAAAAPEEAvIEAQAAAAHzBAEAAAAB9AQBAAAAARQHAADXDgAgCAAA2A4AIA0AANoOACAaAADbDgAgHQAA3A4AICAAAN0OACAhAADeDgAgIwAA3w4AILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAygUCjwUBAAAAAZQFAQAAAAHFBQEAAAABxgUgAAAAAcgFAAAAyAUCygUgAAAAAcsFIAAAAAHMBUAAAAABAgAAAMsCACA9AACyDwAgAwAAAM4CACA9AACyDwAgPgAAtg8AIBYAAADOAgAgBwAA9Q0AIAgAAPYNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACA2AAC2DwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUBwAA9Q0AIAgAAPYNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIRQIAADYDgAgCQAA2Q4AIA0AANoOACAaAADbDgAgHQAA3A4AICAAAN0OACAhAADeDgAgIwAA3w4AILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAygUCjwUBAAAAAZQFAQAAAAHFBQEAAAABxgUgAAAAAcgFAAAAyAUCygUgAAAAAcsFIAAAAAHMBUAAAAABAgAAAMsCACA9AAC3DwAgAwAAAM4CACA9AAC3DwAgPgAAuw8AIBYAAADOAgAgCAAA9g0AIAkAAPcNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACA2AAC7DwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUCAAA9g0AIAkAAPcNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIRQHAADXDgAgCQAA2Q4AIA0AANoOACAaAADbDgAgHQAA3A4AICAAAN0OACAhAADeDgAgIwAA3w4AILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAygUCjwUBAAAAAZQFAQAAAAHFBQEAAAABxgUgAAAAAcgFAAAAyAUCygUgAAAAAcsFIAAAAAHMBUAAAAABAgAAAMsCACA9AAC8DwAgBrwEAQAAAAGPBQEAAAABlAUBAAAAAaYFAQAAAAGnBUAAAAABqAUBAAAAAQa8BAEAAAABqwUBAAAAAawFAQAAAAGtBQEAAAABrgUCAAAAAa8FAgAAAAEGvAQBAAAAAY8FAQAAAAGSBQEAAAABlAUBAAAAAakFAQAAAAGqBQEAAAABArwEAQAAAAGPBQEAAAABCrwEAQAAAAG-BEAAAAABvwRAAAAAAd4EAQAAAAHfBAEAAAAB4AQBAAAAAeEEAQAAAAHiBAIAAAAB4wQBAAAAAeQEgAAAAAEKvAQBAAAAAb4EQAAAAAHWBIAAAAAB5gQBAAAAAYcFAgAAAAGIBYAAAAABiQWAAAAAAYoFgAAAAAGLBYAAAAABjAWAAAAAAQ28BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAABzgQIAAAAAc8ECAAAAAHQBAgAAAAB1gSAAAAAAeYEAQAAAAHoBAEAAAABiAWAAAAAAY0FCAAAAAGOBQgAAAABBrwEAQAAAAG-BEAAAAABvwRAAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAEKvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAdUEgAAAAAHWBIAAAAAB5gQBAAAAAecEAgAAAAHoBAEAAAAB6QSAAAAAAQ-8BAEAAAABvgRAAAAAAb8EQAAAAAHmBAEAAAAB6gQBAAAAAe8EAAAA1wUC8QQAAADYBQLzBAEAAAABkQUBAAAAAZIFAQAAAAHVBQEAAAAB2QUAAADZBQPaBQEAAAAB2wUBAAAAAdwFQAAAAAEJvAQBAAAAAb4EQAAAAAG_BEAAAAABzQQIAAAAAeYEAQAAAAHxBAEAAAAB_QQBAAAAAf4EAQAAAAH_BAIAAAABAwAAAM4CACA9AAC8DwAgPgAAyw8AIBYAAADOAgAgBwAA9Q0AIAkAAPcNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACA2AADLDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUBwAA9Q0AIAkAAPcNACANAAD4DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIRcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICsAANINACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAAzA8AIAMAAAARACA9AADMDwAgPgAA0A8AIBkAAAARACAEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACA2AADQDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRcEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwQAAMsNACAFAADMDQAgBgAAzQ0AIA4AANMNACAQAADRDQAgEwAA1w0AIBQAANQNACAaAADWDQAgJAAAzg0AICoAANANACArAADSDQAgLAAA1Q0AILwEAQAAAAG-BEAAAAABvwRAAAAAAZMFAQAAAAGiBQEAAAABsAUBAAAAAbEFAQAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABAgAAAKkDACA9AADRDwAgAwAAABEAID0AANEPACA-AADVDwAgGQAAABEAIAQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACAQAADNDAAgEwAA0wwAIBQAANAMACAaAADSDAAgJAAAygwAICoAAMwMACArAADODAAgLAAA0QwAIDYAANUPACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACAQAADNDAAgEwAA0wwAIBQAANAMACAaAADSDAAgJAAAygwAICoAAMwMACArAADODAAgLAAA0QwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAyw0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICsAANINACAsAADVDQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABkwUBAAAAAaIFAQAAAAGwBQEAAAABsQUBAAAAAbIFAQAAAAGzBQEAAAABtAUBAAAAAbUFAQAAAAECAAAAqQMAID0AANYPACADAAAAEQAgPQAA1g8AID4AANoPACAZAAAAEQAgBAAAxwwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgNgAA2g8AILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAxwwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICUAAM8NACAqAADQDQAgKwAA0g0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAA2w8AIAMAAAARACA9AADbDwAgPgAA3w8AIBkAAAARACAEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICUAAMsMACAqAADMDAAgKwAAzgwAICwAANEMACA2AADfDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRcEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICUAAMsMACAqAADMDAAgKwAAzgwAICwAANEMACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwUAAMwNACAGAADNDQAgDgAA0w0AIBAAANENACATAADXDQAgFAAA1A0AIBoAANYNACAkAADODQAgJQAAzw0AICoAANANACArAADSDQAgLAAA1Q0AILwEAQAAAAG-BEAAAAABvwRAAAAAAZMFAQAAAAGiBQEAAAABsAUBAAAAAbEFAQAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABAgAAAKkDACA9AADgDwAgAwAAABEAID0AAOAPACA-AADkDwAgGQAAABEAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACArAADODAAgLAAA0QwAIDYAAOQPACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACArAADODAAgLAAA0QwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEUBwAA1w4AIAgAANgOACAJAADZDgAgGgAA2w4AIB0AANwOACAgAADdDgAgIQAA3g4AICMAAN8OACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAMoFAo8FAQAAAAGUBQEAAAABxQUBAAAAAcYFIAAAAAHIBQAAAMgFAsoFIAAAAAHLBSAAAAABzAVAAAAAAQIAAADLAgAgPQAA5Q8AIBG8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAJ8FAvMEAQAAAAH9BAAAAJoFApIFAQAAAAGTBQEAAAABlAUBAAAAAZYFAAAAlgUCmAUAAACYBQKaBQgAAAABmwUIAAAAAZwFAQAAAAGdBUAAAAABnwVAAAAAAaAFQAAAAAEWCAAAxwoAIAoAAMoKACANAADJCgAgFQAAyAoAIBYAAKsLACAYAADLCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHqBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdUFAQAAAAHZBQAAANkFA9oFAQAAAAHbBQEAAAAB3AVAAAAAAQIAAAA9ACA9AADoDwAgAwAAADsAID0AAOgPACA-AADsDwAgGAAAADsAIAgAAKsKACAKAACuCgAgDQAArQoAIBUAAKwKACAWAACpCwAgGAAArwoAIDYAAOwPACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEAgAkAIeYEAQCACQAh6gQBAIAJACHvBAAApwrXBSLxBAAAqArYBSLzBAEA5QgAIZEFAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIRYIAACrCgAgCgAArgoAIA0AAK0KACAVAACsCgAgFgAAqQsAIBgAAK8KACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEAgAkAIeYEAQCACQAh6gQBAIAJACHvBAAApwrXBSLxBAAAqArYBSLzBAEA5QgAIZEFAQDlCAAhkgUBAOUIACHVBQEA5QgAIdkFAACpCtkFI9oFAQCACQAh2wUBAIAJACHcBUAAhwoAIQu8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAANIFAs0FAQAAAAHOBRAAAAABzwUBAAAAAdAFAQAAAAHSBQEAAAAB0wVAAAAAAdQFQAAAAAEPvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHqBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGSBQEAAAAB1QUBAAAAAdkFAAAA2QUD2gUBAAAAAdsFAQAAAAHcBUAAAAABAwAAAM4CACA9AADlDwAgPgAA8Q8AIBYAAADOAgAgBwAA9Q0AIAgAAPYNACAJAAD3DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACA2AADxDwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUBwAA9Q0AIAgAAPYNACAJAAD3DQAgGgAA-Q0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIQoGAACgDAAgGgAAowwAIBwAAKIMACC8BAEAAAABvgRAAAAAAb8EQAAAAAGPBQEAAAABkgUBAAAAAaEFAQAAAAGiBQEAAAABAgAAALEEACA9AADyDwAgA7wEAQAAAAGPBQEAAAABkAUBAAAAAQ28BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAABzgQIAAAAAc8ECAAAAAHQBAgAAAAB1gSAAAAAAd0EAQAAAAHoBAEAAAABiAWAAAAAAY0FCAAAAAGOBQgAAAABCrwEAQAAAAG-BEAAAAAB1gSAAAAAAd0EAQAAAAGHBQIAAAABiAWAAAAAAYkFgAAAAAGKBYAAAAABiwWAAAAAAYwFgAAAAAEGvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAfEEAAAAggUChgUBAAAAAQm8BAEAAAABvgRAAAAAAb8EQAAAAAHNBAgAAAAB5QQBAAAAAfEEAQAAAAH9BAEAAAAB_gQBAAAAAf8EAgAAAAEKvAQBAAAAAb0EAQAAAAG-BEAAAAABvwRAAAAAAdUEgAAAAAHWBIAAAAAB5QQBAAAAAecEAgAAAAHoBAEAAAAB6QSAAAAAAQ0IAADoCgAgCgAA6QoAIBAAAOoKACAjAADuCgAgLgAA6woAIC8AAO0KACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAfEEAAAAggUChgUBAAAAAQIAAAAqACA9AAD6DwAgAwAAAAMAID0AAPoPACA-AAD-DwAgDwAAAAMAIAgAANwJACAKAADdCQAgEAAA3gkAICMAAOIJACAuAADfCQAgLwAA4QkAIDYAAP4PACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACENCAAA3AkAIAoAAN0JACAQAADeCQAgIwAA4gkAIC4AAN8JACAvAADhCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAOUIACHmBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhD7wEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHqBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdUFAQAAAAHZBQAAANkFA9oFAQAAAAHbBQEAAAAB3AVAAAAAAQMAAAAXACA9AADyDwAgPgAAghAAIAwAAAAXACAGAAD5CwAgGgAA_AsAIBwAAPsLACA2AACCEAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhjwUBAOUIACGSBQEAgAkAIaEFAQCACQAhogUBAOUIACEKBgAA-QsAIBoAAPwLACAcAAD7CwAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhjwUBAOUIACGSBQEAgAkAIaEFAQCACQAhogUBAOUIACEZDAAA7wsAIA0AAPALACAOAADyCwAgEAAA8QsAIBMAAPMLACAUAAD0CwAgGgAA9QsAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAnwUC8wQBAAAAAf0EAAAAmgUCkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFAAAAlgUCmAUAAACYBQKaBQgAAAABmwUIAAAAAZwFAQAAAAGdBUAAAAABnwVAAAAAAaAFQAAAAAECAAAAGwAgPQAAgxAAIAMAAAAZACA9AACDEAAgPgAAhxAAIBsAAAAZACAMAACaCwAgDQAAmwsAIA4AAJ0LACAQAACcCwAgEwAAngsAIBQAAJ8LACAaAACgCwAgNgAAhxAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZDAAAmgsAIA0AAJsLACAOAACdCwAgEAAAnAsAIBMAAJ4LACAUAACfCwAgGgAAoAsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAA7gsAIA0AAPALACAOAADyCwAgEAAA8QsAIBMAAPMLACAUAAD0CwAgGgAA9QsAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAnwUC8wQBAAAAAf0EAAAAmgUCkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFAAAAlgUCmAUAAACYBQKaBQgAAAABmwUIAAAAAZwFAQAAAAGdBUAAAAABnwVAAAAAAaAFQAAAAAECAAAAGwAgPQAAiBAAIBcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAAihAAIAMAAAAZACA9AACIEAAgPgAAjhAAIBsAAAAZACALAACZCwAgDQAAmwsAIA4AAJ0LACAQAACcCwAgEwAAngsAIBQAAJ8LACAaAACgCwAgNgAAjhAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAAmQsAIA0AAJsLACAOAACdCwAgEAAAnAsAIBMAAJ4LACAUAACfCwAgGgAAoAsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEDAAAAEQAgPQAAihAAID4AAJEQACAZAAAAEQAgBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACAsAADRDAAgNgAAkRAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRkLAADuCwAgDAAA7wsAIA0AAPALACAQAADxCwAgEwAA8wsAIBQAAPQLACAaAAD1CwAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAACfBQLzBAEAAAAB_QQAAACaBQKRBQEAAAABkgUBAAAAAZMFAQAAAAGUBQEAAAABlgUAAACWBQKYBQAAAJgFApoFCAAAAAGbBQgAAAABnAUBAAAAAZ0FQAAAAAGfBUAAAAABoAVAAAAAAQIAAAAbACA9AACSEAAgFwQAAMsNACAFAADMDQAgBgAAzQ0AIBAAANENACATAADXDQAgFAAA1A0AIBoAANYNACAkAADODQAgJQAAzw0AICoAANANACArAADSDQAgLAAA1Q0AILwEAQAAAAG-BEAAAAABvwRAAAAAAZMFAQAAAAGiBQEAAAABsAUBAAAAAbEFAQAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABAgAAAKkDACA9AACUEAAgGQsAAO4LACAMAADvCwAgDQAA8AsAIA4AAPILACATAADzCwAgFAAA9AsAIBoAAPULACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAJ8FAvMEAQAAAAH9BAAAAJoFApEFAQAAAAGSBQEAAAABkwUBAAAAAZQFAQAAAAGWBQAAAJYFApgFAAAAmAUCmgUIAAAAAZsFCAAAAAGcBQEAAAABnQVAAAAAAZ8FQAAAAAGgBUAAAAABAgAAABsAID0AAJYQACAXBAAAyw0AIAUAAMwNACAGAADNDQAgDgAA0w0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICsAANINACAsAADVDQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABkwUBAAAAAaIFAQAAAAGwBQEAAAABsQUBAAAAAbIFAQAAAAGzBQEAAAABtAUBAAAAAbUFAQAAAAECAAAAqQMAID0AAJgQACADAAAAGQAgPQAAlhAAID4AAJwQACAbAAAAGQAgCwAAmQsAIAwAAJoLACANAACbCwAgDgAAnQsAIBMAAJ4LACAUAACfCwAgGgAAoAsAIDYAAJwQACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAAmAufBSLzBAEA5QgAIf0EAACXC5oFIpEFAQDlCAAhkgUBAOUIACGTBQEA5QgAIZQFAQCACQAhlgUAAJULlgUimAUAAJYLmAUimgUIALgJACGbBQgAuAkAIZwFAQCACQAhnQVAAOYIACGfBUAAhwoAIaAFQACHCgAhGQsAAJkLACAMAACaCwAgDQAAmwsAIA4AAJ0LACATAACeCwAgFAAAnwsAIBoAAKALACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAAmAufBSLzBAEA5QgAIf0EAACXC5oFIpEFAQDlCAAhkgUBAOUIACGTBQEA5QgAIZQFAQCACQAhlgUAAJULlgUimAUAAJYLmAUimgUIALgJACGbBQgAuAkAIZwFAQCACQAhnQVAAOYIACGfBUAAhwoAIaAFQACHCgAhAwAAABEAID0AAJgQACA-AACfEAAgGQAAABEAIAQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACArAADODAAgLAAA0QwAIDYAAJ8QACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACATAADTDAAgFAAA0AwAIBoAANIMACAkAADKDAAgJQAAywwAICoAAMwMACArAADODAAgLAAA0QwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEFvAQBAAAAAYIFAAAAggUDgwUAAACCBQKEBQEAAAABhQVAAAAAARkLAADuCwAgDAAA7wsAIA0AAPALACAOAADyCwAgEAAA8QsAIBMAAPMLACAUAAD0CwAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAACfBQLzBAEAAAAB_QQAAACaBQKRBQEAAAABkgUBAAAAAZMFAQAAAAGUBQEAAAABlgUAAACWBQKYBQAAAJgFApoFCAAAAAGbBQgAAAABnAUBAAAAAZ0FQAAAAAGfBUAAAAABoAVAAAAAAQIAAAAbACA9AAChEAAgCgYAAKAMACAbAAChDAAgHAAAogwAILwEAQAAAAG-BEAAAAABvwRAAAAAAY8FAQAAAAGSBQEAAAABoQUBAAAAAaIFAQAAAAECAAAAsQQAID0AAKMQACAUBwAA1w4AIAgAANgOACAJAADZDgAgDQAA2g4AIB0AANwOACAgAADdDgAgIQAA3g4AICMAAN8OACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAMoFAo8FAQAAAAGUBQEAAAABxQUBAAAAAcYFIAAAAAHIBQAAAMgFAsoFIAAAAAHLBSAAAAABzAVAAAAAAQIAAADLAgAgPQAApRAAIBcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgJAAAzg0AICUAAM8NACAqAADQDQAgKwAA0g0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAApxAAIAW8BAEAAAABvgRAAAAAAd4EAQAAAAHfBAEAAAAB4QQBAAAAAQoGAACgDAAgGgAAowwAIBsAAKEMACC8BAEAAAABvgRAAAAAAb8EQAAAAAGPBQEAAAABkgUBAAAAAaEFAQAAAAGiBQEAAAABAgAAALEEACA9AACqEAAgAwAAABcAID0AAKoQACA-AACuEAAgDAAAABcAIAYAAPkLACAaAAD8CwAgGwAA-gsAIDYAAK4QACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGPBQEA5QgAIZIFAQCACQAhoQUBAIAJACGiBQEA5QgAIQoGAAD5CwAgGgAA_AsAIBsAAPoLACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGPBQEA5QgAIZIFAQCACQAhoQUBAIAJACGiBQEA5QgAIQMAAAAZACA9AAChEAAgPgAAsRAAIBsAAAAZACALAACZCwAgDAAAmgsAIA0AAJsLACAOAACdCwAgEAAAnAsAIBMAAJ4LACAUAACfCwAgNgAAsRAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAAmQsAIAwAAJoLACANAACbCwAgDgAAnQsAIBAAAJwLACATAACeCwAgFAAAnwsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEDAAAAFwAgPQAAoxAAID4AALQQACAMAAAAFwAgBgAA-QsAIBsAAPoLACAcAAD7CwAgNgAAtBAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIY8FAQDlCAAhkgUBAIAJACGhBQEAgAkAIaIFAQDlCAAhCgYAAPkLACAbAAD6CwAgHAAA-wsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIY8FAQDlCAAhkgUBAIAJACGhBQEAgAkAIaIFAQDlCAAhAwAAAM4CACA9AAClEAAgPgAAtxAAIBYAAADOAgAgBwAA9Q0AIAgAAPYNACAJAAD3DQAgDQAA-A0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACA2AAC3EAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUBwAA9Q0AIAgAAPYNACAJAAD3DQAgDQAA-A0AIB0AAPoNACAgAAD7DQAgIQAA_A0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIQMAAAARACA9AACnEAAgPgAAuhAAIBkAAAARACAEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgJAAAygwAICUAAMsMACAqAADMDAAgKwAAzgwAICwAANEMACA2AAC6EAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRcEAADHDAAgBQAAyAwAIAYAAMkMACAOAADPDAAgEAAAzQwAIBMAANMMACAUAADQDAAgJAAAygwAICUAAMsMACAqAADMDAAgKwAAzgwAICwAANEMACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhD7wEAQAAAAG-BEAAAAABvwRAAAAAAeUEAQAAAAHmBAEAAAAB7wQAAADXBQLxBAAAANgFAvMEAQAAAAGRBQEAAAABkgUBAAAAAdUFAQAAAAHZBQAAANkFA9oFAQAAAAHbBQEAAAAB3AVAAAAAARQHAADXDgAgCAAA2A4AIAkAANkOACANAADaDgAgGgAA2w4AIB0AANwOACAgAADdDgAgIwAA3w4AILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAygUCjwUBAAAAAZQFAQAAAAHFBQEAAAABxgUgAAAAAcgFAAAAyAUCygUgAAAAAcsFIAAAAAHMBUAAAAABAgAAAMsCACA9AAC8EAAgAwAAAM4CACA9AAC8EAAgPgAAwBAAIBYAAADOAgAgBwAA9Q0AIAgAAPYNACAJAAD3DQAgDQAA-A0AIBoAAPkNACAdAAD6DQAgIAAA-w0AICMAAP0NACA2AADAEAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEUBwAA9Q0AIAgAAPYNACAJAAD3DQAgDQAA-A0AIBoAAPkNACAdAAD6DQAgIAAA-w0AICMAAP0NACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHxBAAA9A3KBSKPBQEA5QgAIZQFAQCACQAhxQUBAOUIACHGBSAAhgoAIcgFAADzDcgFIsoFIACGCgAhywUgAIYKACHMBUAAhwoAIQO8BAEAAAABogUBAAAAAeUFQAAAAAEUBwAA1w4AIAgAANgOACAJAADZDgAgDQAA2g4AIBoAANsOACAdAADcDgAgIQAA3g4AICMAAN8OACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAMoFAo8FAQAAAAGUBQEAAAABxQUBAAAAAcYFIAAAAAHIBQAAAMgFAsoFIAAAAAHLBSAAAAABzAVAAAAAAQIAAADLAgAgPQAAwhAAIAMAAADOAgAgPQAAwhAAID4AAMYQACAWAAAAzgIAIAcAAPUNACAIAAD2DQAgCQAA9w0AIA0AAPgNACAaAAD5DQAgHQAA-g0AICEAAPwNACAjAAD9DQAgNgAAxhAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAD0DcoFIo8FAQDlCAAhlAUBAIAJACHFBQEA5QgAIcYFIACGCgAhyAUAAPMNyAUiygUgAIYKACHLBSAAhgoAIcwFQACHCgAhFAcAAPUNACAIAAD2DQAgCQAA9w0AIA0AAPgNACAaAAD5DQAgHQAA-g0AICEAAPwNACAjAAD9DQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEHvAQBAAAAAb4EQAAAAAG_BEAAAAAB4wVAAAAAAeYFAQAAAAHnBQEAAAAB6AUgAAAAAQO8BAEAAAABvgRAAAAAAb8EQAAAAAELvAQBAAAAAb4EQAAAAAG_BEAAAAAB6wQBAAAAAewEQAAAAAHtBAIAAAAB7wQAAADvBALxBAAAAPEEAvIEAQAAAAHzBAEAAAAB9AQBAAAAAQMAAAAZACA9AACSEAAgPgAAzBAAIBsAAAAZACALAACZCwAgDAAAmgsAIA0AAJsLACAQAACcCwAgEwAAngsAIBQAAJ8LACAaAACgCwAgNgAAzBAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAAmQsAIAwAAJoLACANAACbCwAgEAAAnAsAIBMAAJ4LACAUAACfCwAgGgAAoAsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEDAAAAEQAgPQAAlBAAID4AAM8QACAZAAAAEQAgBAAAxwwAIAUAAMgMACAGAADJDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgNgAAzxAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAxwwAIAUAAMgMACAGAADJDAAgEAAAzQwAIBMAANMMACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIQ0IAADoCgAgCgAA6QoAIBAAAOoKACAaAADsCgAgIwAA7goAIC8AAO0KACC8BAEAAAABvgRAAAAAAb8EQAAAAAHlBAEAAAAB5gQBAAAAAfEEAAAAggUChgUBAAAAAQIAAAAqACA9AADQEAAgAwAAAAMAID0AANAQACA-AADUEAAgDwAAAAMAIAgAANwJACAKAADdCQAgEAAA3gkAIBoAAOAJACAjAADiCQAgLwAA4QkAIDYAANQQACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACENCAAA3AkAIAoAAN0JACAQAADeCQAgGgAA4AkAICMAAOIJACAvAADhCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh5QQBAOUIACHmBAEA5QgAIfEEAADWCYIFIoYFAQCACQAhGQsAAO4LACAMAADvCwAgDQAA8AsAIA4AAPILACAQAADxCwAgFAAA9AsAIBoAAPULACC8BAEAAAABvgRAAAAAAb8EQAAAAAHxBAAAAJ8FAvMEAQAAAAH9BAAAAJoFApEFAQAAAAGSBQEAAAABkwUBAAAAAZQFAQAAAAGWBQAAAJYFApgFAAAAmAUCmgUIAAAAAZsFCAAAAAGcBQEAAAABnQVAAAAAAZ8FQAAAAAGgBUAAAAABAgAAABsAID0AANUQACAXBAAAyw0AIAUAAMwNACAGAADNDQAgDgAA0w0AIBAAANENACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKgAA0A0AICsAANINACAsAADVDQAgvAQBAAAAAb4EQAAAAAG_BEAAAAABkwUBAAAAAaIFAQAAAAGwBQEAAAABsQUBAAAAAbIFAQAAAAGzBQEAAAABtAUBAAAAAbUFAQAAAAECAAAAqQMAID0AANcQACAKvAQBAAAAAb4EQAAAAAHNBAgAAAAB9gQBAAAAAfcEAQAAAAH4BAgAAAAB-QQIAAAAAfoECAAAAAH7BAgAAAAB_AQBAAAAAQMAAAAZACA9AADVEAAgPgAA3BAAIBsAAAAZACALAACZCwAgDAAAmgsAIA0AAJsLACAOAACdCwAgEAAAnAsAIBQAAJ8LACAaAACgCwAgNgAA3BAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAAmQsAIAwAAJoLACANAACbCwAgDgAAnQsAIBAAAJwLACAUAACfCwAgGgAAoAsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEDAAAAEQAgPQAA1xAAID4AAN8QACAZAAAAEQAgBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgNgAA3xAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACAUAADQDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIQwIAADPCQAgCgAA0AkAILwEAQAAAAG-BEAAAAABvwRAAAAAAc0ECAAAAAHlBAEAAAAB5gQBAAAAAfEEAQAAAAH9BAEAAAAB_gQBAAAAAf8EAgAAAAECAAAAMAAgPQAA4BAAIAMAAAAuACA9AADgEAAgPgAA5BAAIA4AAAAuACAIAADACQAgCgAAwQkAIDYAAOQQACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHNBAgAuAkAIeUEAQDlCAAh5gQBAOUIACHxBAEA5QgAIf0EAQDlCAAh_gQBAOUIACH_BAIA7wgAIQwIAADACQAgCgAAwQkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIc0ECAC4CQAh5QQBAOUIACHmBAEA5QgAIfEEAQDlCAAh_QQBAOUIACH-BAEA5QgAIf8EAgDvCAAhFAcAANcOACAIAADYDgAgCQAA2Q4AIA0AANoOACAaAADbDgAgHQAA3A4AICAAAN0OACAhAADeDgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB8QQAAADKBQKPBQEAAAABlAUBAAAAAcUFAQAAAAHGBSAAAAAByAUAAADIBQLKBSAAAAABywUgAAAAAcwFQAAAAAECAAAAywIAID0AAOUQACANCAAA6AoAIAoAAOkKACAQAADqCgAgGgAA7AoAIC4AAOsKACAvAADtCgAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB5QQBAAAAAeYEAQAAAAHxBAAAAIIFAoYFAQAAAAECAAAAKgAgPQAA5xAAIAMAAADOAgAgPQAA5RAAID4AAOsQACAWAAAAzgIAIAcAAPUNACAIAAD2DQAgCQAA9w0AIA0AAPgNACAaAAD5DQAgHQAA-g0AICAAAPsNACAhAAD8DQAgNgAA6xAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAAD0DcoFIo8FAQDlCAAhlAUBAIAJACHFBQEA5QgAIcYFIACGCgAhyAUAAPMNyAUiygUgAIYKACHLBSAAhgoAIcwFQACHCgAhFAcAAPUNACAIAAD2DQAgCQAA9w0AIA0AAPgNACAaAAD5DQAgHQAA-g0AICAAAPsNACAhAAD8DQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh8QQAAPQNygUijwUBAOUIACGUBQEAgAkAIcUFAQDlCAAhxgUgAIYKACHIBQAA8w3IBSLKBSAAhgoAIcsFIACGCgAhzAVAAIcKACEDAAAAAwAgPQAA5xAAID4AAO4QACAPAAAAAwAgCAAA3AkAIAoAAN0JACAQAADeCQAgGgAA4AkAIC4AAN8JACAvAADhCQAgNgAA7hAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIeUEAQDlCAAh5gQBAOUIACHxBAAA1gmCBSKGBQEAgAkAIQ0IAADcCQAgCgAA3QkAIBAAAN4JACAaAADgCQAgLgAA3wkAIC8AAOEJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHlBAEA5QgAIeYEAQDlCAAh8QQAANYJggUihgUBAIAJACEZCwAA7gsAIAwAAO8LACANAADwCwAgDgAA8gsAIBAAAPELACATAADzCwAgGgAA9QsAILwEAQAAAAG-BEAAAAABvwRAAAAAAfEEAAAAnwUC8wQBAAAAAf0EAAAAmgUCkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFAAAAlgUCmAUAAACYBQKaBQgAAAABmwUIAAAAAZwFAQAAAAGdBUAAAAABnwVAAAAAAaAFQAAAAAECAAAAGwAgPQAA7xAAIBcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAaAADWDQAgJAAAzg0AICUAAM8NACAqAADQDQAgKwAA0g0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAA8RAAIAMAAAAZACA9AADvEAAgPgAA9RAAIBsAAAAZACALAACZCwAgDAAAmgsAIA0AAJsLACAOAACdCwAgEAAAnAsAIBMAAJ4LACAaAACgCwAgNgAA9RAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEZCwAAmQsAIAwAAJoLACANAACbCwAgDgAAnQsAIBAAAJwLACATAACeCwAgGgAAoAsAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIfEEAACYC58FIvMEAQDlCAAh_QQAAJcLmgUikQUBAOUIACGSBQEA5QgAIZMFAQDlCAAhlAUBAIAJACGWBQAAlQuWBSKYBQAAlguYBSKaBQgAuAkAIZsFCAC4CQAhnAUBAIAJACGdBUAA5ggAIZ8FQACHCgAhoAVAAIcKACEDAAAAEQAgPQAA8RAAID4AAPgQACAZAAAAEQAgBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgNgAA-BAAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEXBAAAxwwAIAUAAMgMACAGAADJDAAgDgAAzwwAIBAAAM0MACATAADTDAAgGgAA0gwAICQAAMoMACAlAADLDAAgKgAAzAwAICsAAM4MACAsAADRDAAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAhkwUBAIAJACGiBQEA5QgAIbAFAQCACQAhsQUBAIAJACGyBQEAgAkAIbMFAQCACQAhtAUBAIAJACG1BQEAgAkAIRcEAADLDQAgBQAAzA0AIAYAAM0NACAOAADTDQAgEAAA0Q0AIBMAANcNACAUAADUDQAgGgAA1g0AICQAAM4NACAlAADPDQAgKwAA0g0AICwAANUNACC8BAEAAAABvgRAAAAAAb8EQAAAAAGTBQEAAAABogUBAAAAAbAFAQAAAAGxBQEAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAQIAAACpAwAgPQAA-RAAIAS8BAEAAAABvgRAAAAAAcsEAQAAAAHMBAIAAAABAwAAABEAID0AAPkQACA-AAD-EAAgGQAAABEAIAQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACAQAADNDAAgEwAA0wwAIBQAANAMACAaAADSDAAgJAAAygwAICUAAMsMACArAADODAAgLAAA0QwAIDYAAP4QACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACGTBQEAgAkAIaIFAQDlCAAhsAUBAIAJACGxBQEAgAkAIbIFAQCACQAhswUBAIAJACG0BQEAgAkAIbUFAQCACQAhFwQAAMcMACAFAADIDAAgBgAAyQwAIA4AAM8MACAQAADNDAAgEwAA0wwAIBQAANAMACAaAADSDAAgJAAAygwAICUAAMsMACArAADODAAgLAAA0QwAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAIZMFAQCACQAhogUBAOUIACGwBQEAgAkAIbEFAQCACQAhsgUBAIAJACGzBQEAgAkAIbQFAQCACQAhtQUBAIAJACEOAwAAngkAICcAAJsJACApAACdCQAgvAQBAAAAAb4EQAAAAAG_BEAAAAAB3QQBAAAAAd4EAQAAAAHfBAEAAAAB4AQBAAAAAeEEAQAAAAHiBAIAAAAB4wQBAAAAAeQEgAAAAAECAAAAeQAgPQAA_xAAIAMAAAB3ACA9AAD_EAAgPgAAgxEAIBAAAAB3ACADAACECQAgJwAAgQkAICkAAIMJACA2AACDEQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh3QQBAOUIACHeBAEA5QgAId8EAQDlCAAh4AQBAOUIACHhBAEA5QgAIeIEAgD_CAAh4wQBAIAJACHkBIAAAAABDgMAAIQJACAnAACBCQAgKQAAgwkAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAId0EAQDlCAAh3gQBAOUIACHfBAEA5QgAIeAEAQDlCAAh4QQBAOUIACHiBAIA_wgAIeMEAQCACQAh5ASAAAAAAQ4DAACeCQAgJwAAmwkAICgAAJwJACC8BAEAAAABvgRAAAAAAb8EQAAAAAHdBAEAAAAB3gQBAAAAAd8EAQAAAAHgBAEAAAAB4QQBAAAAAeIEAgAAAAHjBAEAAAAB5ASAAAAAAQIAAAB5ACA9AACEEQAgAwAAAHcAID0AAIQRACA-AACIEQAgEAAAAHcAIAMAAIQJACAnAACBCQAgKAAAggkAIDYAAIgRACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHdBAEA5QgAId4EAQDlCAAh3wQBAOUIACHgBAEA5QgAIeEEAQDlCAAh4gQCAP8IACHjBAEAgAkAIeQEgAAAAAEOAwAAhAkAICcAAIEJACAoAACCCQAgvAQBAOUIACG-BEAA5ggAIb8EQADmCAAh3QQBAOUIACHeBAEA5QgAId8EAQDlCAAh4AQBAOUIACHhBAEA5QgAIeIEAgD_CAAh4wQBAIAJACHkBIAAAAABDgMAAJ4JACAoAACcCQAgKQAAnQkAILwEAQAAAAG-BEAAAAABvwRAAAAAAd0EAQAAAAHeBAEAAAAB3wQBAAAAAeAEAQAAAAHhBAEAAAAB4gQCAAAAAeMEAQAAAAHkBIAAAAABAgAAAHkAID0AAIkRACADAAAAdwAgPQAAiREAID4AAI0RACAQAAAAdwAgAwAAhAkAICgAAIIJACApAACDCQAgNgAAjREAILwEAQDlCAAhvgRAAOYIACG_BEAA5ggAId0EAQDlCAAh3gQBAOUIACHfBAEA5QgAIeAEAQDlCAAh4QQBAOUIACHiBAIA_wgAIeMEAQCACQAh5ASAAAAAAQ4DAACECQAgKAAAggkAICkAAIMJACC8BAEA5QgAIb4EQADmCAAhvwRAAOYIACHdBAEA5QgAId4EAQDlCAAh3wQBAOUIACHgBAEA5QgAIeEEAQDlCAAh4gQCAP8IACHjBAEAgAkAIeQEgAAAAAEEDwApFgQCIKcBGjCmARsICAADCgAKDwAoEJcBDRqcARMjoAEcLpsBJy-fAQEOBAgEBQwFBgAGDoYBAg8AJhCEAQ0TiwEPFIcBEhqKARMkch4ldh8qeiArhQEMLIkBJQEDAAMBAwADCgcQBwgSAwkWCA0YCQ8AHRpXEx1bGSBfGiFjGyNnHAEGAAYBBgAGBQYABg8AGBpTExscChxSFQkLIAsMJAwNAAkOLQIPABcQKA0TMQ8UOhIaPhMBCgAKAgMAAwoACgQDAAMKAAoOKwIPAA4BDiwABAgAAwoACg8AERI1EAERAA8BEjYAAggAAwoACggIPwMKQAoNAAkPABYVAAYWQQIYRRQZRxUBFwATAg0ACRcAEwEYSAAHC0kADEoADkwAEEsAE00AFE4AGk8AAxpWABtUABxVAAEGAAYCHgABHwAGAgYABh4AAQIWAAIiAAYHB2gACWkAGmoAHWsAIGwAIW0AI24AAQMAAwEDAAMFAwADDwAkJ3whKH4iKYIBIwEmACABJgAgASYAIAEpgwEAAQgAAwsEjAEABY0BAA6TAQAQkQEAE5YBABSUAQAalQEAJI4BACWPAQAqkAEAK5IBAAEtAAIFEKEBABqjAQAjpQEALqIBAC-kAQACIKkBADCoAQAAARazAQIBFrkBAgMPAC5DAC9EADAAAAADDwAuQwAvRAAwAh4AAR8ABgIeAAEfAAYDDwA1QwA2RAA3AAAAAw8ANUMANkQANwIGAAYeAAECBgAGHgABAw8APEMAPUQAPgAAAAMPADxDAD1EAD4BBgAGAQYABgMPAENDAEREAEUAAAADDwBDQwBERABFBQiNAgMKjgIKDQAJFQAGFo8CAgUIlQIDCpYCCg0ACRUABhaXAgIDDwBKQwBLRABMAAAAAw8ASkMAS0QATAINAAkXABMCDQAJFwATBQ8AUUMAVEQAVZUBAFKWAQBTAAAAAAAFDwBRQwBURABVlQEAUpYBAFMBFwATARcAEwMPAFpDAFtEAFwAAAADDwBaQwBbRABcAAADDwBhQwBiRABjAAAAAw8AYUMAYkQAYwEGAAYBBgAGAw8AaEMAaUQAagAAAAMPAGhDAGlEAGoBBgAGAQYABgMPAG9DAHBEAHEAAAADDwBvQwBwRABxAAAAAw8Ad0MAeEQAeQAAAAMPAHdDAHhEAHkBBgAGAQYABgMPAH5DAH9EAIABAAAAAw8AfkMAf0QAgAEBCAADAQgAAwMPAIUBQwCGAUQAhwEAAAADDwCFAUMAhgFEAIcBAQMAAwEDAAMDDwCMAUMAjQFEAI4BAAAAAw8AjAFDAI0BRACOAQEDAAMBAwADBQ8AkwFDAJYBRACXAZUBAJQBlgEAlQEAAAAAAAUPAJMBQwCWAUQAlwGVAQCUAZYBAJUBAQMAAwEDAAMDDwCcAUMAnQFEAJ4BAAAAAw8AnAFDAJ0BRACeAQEDAAMBAwADAw8AowFDAKQBRAClAQAAAAMPAKMBQwCkAUQApQEBBgAGAQYABgMPAKoBQwCrAUQArAEAAAADDwCqAUMAqwFEAKwBAQ0ACQENAAkFDwCxAUMAtAFEALUBlQEAsgGWAQCzAQAAAAAABQ8AsQFDALQBRAC1AZUBALIBlgEAswEBCgAKAQoACgMPALoBQwC7AUQAvAEAAAADDwC6AUMAuwFEALwBAgMAAwoACgIDAAMKAAoFDwDBAUMAxAFEAMUBlQEAwgGWAQDDAQAAAAAABQ8AwQFDAMQBRADFAZUBAMIBlgEAwwECAwADCgAKAgMAAwoACgUPAMoBQwDNAUQAzgGVAQDLAZYBAMwBAAAAAAAFDwDKAUMAzQFEAM4BlQEAywGWAQDMAQIIAAMKAAoCCAADCgAKAw8A0wFDANQBRADVAQAAAAMPANMBQwDUAUQA1QEBLQACAS0AAgMPANoBQwDbAUQA3AEAAAADDwDaAUMA2wFEANwBAggAAwoACgIIAAMKAAoFDwDhAUMA5AFEAOUBlQEA4gGWAQDjAQAAAAAABQ8A4QFDAOQBRADlAZUBAOIBlgEA4wEBEQAPAREADwUPAOoBQwDtAUQA7gGVAQDrAZYBAOwBAAAAAAAFDwDqAUMA7QFEAO4BlQEA6wGWAQDsAQIWAAIiAAYCFgACIgAGBQ8A8wFDAPYBRAD3AZUBAPQBlgEA9QEAAAAAAAUPAPMBQwD2AUQA9wGVAQD0AZYBAPUBAggAAwoACgIIAAMKAAoFDwD8AUMA_wFEAIAClQEA_QGWAQD-AQAAAAAABQ8A_AFDAP8BRACAApUBAP0BlgEA_gEBAwADAQMAAwUPAIUCQwCIAkQAiQKVAQCGApYBAIcCAAAAAAAFDwCFAkMAiAJEAIkClQEAhgKWAQCHAgEmACABJgAgBQ8AjgJDAJECRACSApUBAI8ClgEAkAIAAAAAAAUPAI4CQwCRAkQAkgKVAQCPApYBAJACASYAIAEmACAFDwCXAkMAmgJEAJsClQEAmAKWAQCZAgAAAAAABQ8AlwJDAJoCRACbApUBAJgClgEAmQIBJgAgASYAIAMPAKACQwChAkQAogIAAAADDwCgAkMAoQJEAKICMQIBMqoBATOrAQE0rAEBNa0BATevAQE4sQEqObIBKzq1AQE7twEqPLgBLD-6AQFAuwEBQbwBKkW_AS1GwAExR8EBGkjCARpJwwEaSsQBGkvFARpMxwEaTckBKk7KATJPzAEaUM4BKlHPATNS0AEaU9EBGlTSASpV1QE0VtYBOFfXARtY2AEbWdkBG1raARtb2wEbXN0BG13fASpe4AE5X-IBG2DkASph5QE6YuYBG2PnARtk6AEqZesBO2bsAT9n7QEZaO4BGWnvARlq8AEZa_EBGWzzARlt9QEqbvYBQG_4ARlw-gEqcfsBQXL8ARlz_QEZdP4BKnWBAkJ2ggJGd4MCE3iEAhN5hQITeoYCE3uHAhN8iQITfYsCKn6MAkd_kQITgAGTAiqBAZQCSIIBmAITgwGZAhOEAZoCKoUBnQJJhgGeAk2HAZ8CFYgBoAIViQGhAhWKAaICFYsBowIVjAGlAhWNAacCKo4BqAJOjwGqAhWQAawCKpEBrQJPkgGuAhWTAa8CFZQBsAIqlwGzAlCYAbQCVpkBtQIUmgG2AhSbAbcCFJwBuAIUnQG5AhSeAbsCFJ8BvQIqoAG-AlehAcACFKIBwgIqowHDAlikAcQCFKUBxQIUpgHGAiqnAckCWagBygJdqQHMAgaqAc0CBqsB0AIGrAHRAgatAdICBq4B1AIGrwHWAiqwAdcCXrEB2QIGsgHbAiqzAdwCX7QB3QIGtQHeAga2Ad8CKrcB4gJguAHjAmS5AeQCCLoB5QIIuwHmAgi8AecCCL0B6AIIvgHqAgi_AewCKsAB7QJlwQHvAgjCAfECKsMB8gJmxAHzAgjFAfQCCMYB9QIqxwH4AmfIAfkCa8kB-gIHygH7AgfLAfwCB8wB_QIHzQH-AgfOAYADB88BggMq0AGDA2zRAYUDB9IBhwMq0wGIA23UAYkDB9UBigMH1gGLAyrXAY4DbtgBjwNy2QGRA3PaAZIDc9sBlQNz3AGWA3PdAZcDc94BmQNz3wGbAyrgAZwDdOEBngNz4gGgAyrjAaEDdeQBogNz5QGjA3PmAaQDKucBpwN26AGoA3rpAaoDA-oBqwMD6wGtAwPsAa4DA-0BrwMD7gGxAwPvAbMDKvABtAN78QG2AwPyAbgDKvMBuQN89AG6AwP1AbsDA_YBvAMq9wG_A334AcADgQH5AcIDJfoBwwMl-wHFAyX8AcYDJf0BxwMl_gHJAyX_AcsDKoACzAOCAYECzgMlggLQAyqDAtEDgwGEAtIDJYUC0wMlhgLUAyqHAtcDhAGIAtgDiAGJAtkDH4oC2gMfiwLbAx-MAtwDH40C3QMfjgLfAx-PAuEDKpAC4gOJAZEC5AMfkgLmAyqTAucDigGUAugDH5UC6QMflgLqAyqXAu0DiwGYAu4DjwGZAu8DBZoC8AMFmwLxAwWcAvIDBZ0C8wMFngL1AwWfAvcDKqAC-AOQAaEC-gMFogL8AyqjAv0DkQGkAv4DBaUC_wMFpgKABCqnAoMEkgGoAoQEmAGpAoUEHqoChgQeqwKHBB6sAogEHq0CiQQergKLBB6vAo0EKrACjgSZAbECkAQesgKSBCqzApMEmgG0ApQEHrUClQQetgKWBCq3ApkEmwG4ApoEnwG5ApsEBLoCnAQEuwKdBAS8Ap4EBL0CnwQEvgKhBAS_AqMEKsACpASgAcECpgQEwgKoBCrDAqkEoQHEAqoEBMUCqwQExgKsBCrHAq8EogHIArAEpgHJArIECcoCswQJywK1BAnMArYECc0CtwQJzgK5BAnPArsEKtACvASnAdECvgQJ0gLABCrTAsEEqAHUAsIECdUCwwQJ1gLEBCrXAscEqQHYAsgErQHZAskECtoCygQK2wLLBArcAswECt0CzQQK3gLPBArfAtEEKuAC0gSuAeEC1AQK4gLWBCrjAtcErwHkAtgECuUC2QQK5gLaBCrnAt0EsAHoAt4EtgHpAt8EC-oC4AQL6wLhBAvsAuIEC-0C4wQL7gLlBAvvAucEKvAC6AS3AfEC6gQL8gLsBCrzAu0EuAH0Au4EC_UC7wQL9gLwBCr3AvMEuQH4AvQEvQH5AvUEDPoC9gQM-wL3BAz8AvgEDP0C-QQM_gL7BAz_Av0EKoAD_gS-AYEDgAUMggOCBSqDA4MFvwGEA4QFDIUDhQUMhgOGBSqHA4kFwAGIA4oFxgGJA4sFDYoDjAUNiwONBQ2MA44FDY0DjwUNjgORBQ2PA5MFKpADlAXHAZEDlgUNkgOYBSqTA5kFyAGUA5oFDZUDmwUNlgOcBSqXA58FyQGYA6AFzwGZA6EFApoDogUCmwOjBQKcA6QFAp0DpQUCngOnBQKfA6kFKqADqgXQAaEDrAUCogOuBSqjA68F0QGkA7AFAqUDsQUCpgOyBSqnA7UF0gGoA7YF1gGpA7cFJ6oDuAUnqwO5BSesA7oFJ60DuwUnrgO9BSevA78FKrADwAXXAbEDwgUnsgPEBSqzA8UF2AG0A8YFJ7UDxwUntgPIBSq3A8sF2QG4A8wF3QG5A80FD7oDzgUPuwPPBQ-8A9AFD70D0QUPvgPTBQ-_A9UFKsAD1gXeAcED2AUPwgPaBSrDA9sF3wHEA9wFD8UD3QUPxgPeBSrHA-EF4AHIA-IF5gHJA-MFEMoD5AUQywPlBRDMA-YFEM0D5wUQzgPpBRDPA-sFKtAD7AXnAdED7gUQ0gPwBSrTA_EF6AHUA_IFENUD8wUQ1gP0BSrXA_cF6QHYA_gF7wHZA_kFHNoD-gUc2wP7BRzcA_wFHN0D_QUc3gP_BRzfA4EGKuADggbwAeEDhAYc4gOGBirjA4cG8QHkA4gGHOUDiQYc5gOKBirnA40G8gHoA44G-AHpA48GEuoDkAYS6wORBhLsA5IGEu0DkwYS7gOVBhLvA5cGKvADmAb5AfEDmgYS8gOcBirzA50G-gH0A54GEvUDnwYS9gOgBir3A6MG-wH4A6QGgQL5A6UGIPoDpgYg-wOnBiD8A6gGIP0DqQYg_gOrBiD_A60GKoAErgaCAoEEsAYgggSyBiqDBLMGgwKEBLQGIIUEtQYghgS2BiqHBLkGhAKIBLoGigKJBLwGIooEvQYiiwS_BiKMBMAGIo0EwQYijgTDBiKPBMUGKpAExgaLApEEyAYikgTKBiqTBMsGjAKUBMwGIpUEzQYilgTOBiqXBNEGjQKYBNIGkwKZBNMGI5oE1AYjmwTVBiOcBNYGI50E1wYjngTZBiOfBNsGKqAE3AaUAqEE3gYjogTgBiqjBOEGlQKkBOIGI6UE4wYjpgTkBiqnBOcGlgKoBOgGnAKpBOoGIaoE6wYhqwTtBiGsBO4GIa0E7wYhrgTxBiGvBPMGKrAE9AadArEE9gYhsgT4BiqzBPkGngK0BPoGIbUE-wYhtgT8Biq3BP8GnwK4BIAHowI"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = envVars.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/utlis/email.ts
import ejs from "ejs";
import status2 from "http-status";
import nodemailer from "nodemailer";
import path2 from "path";
var transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
  // true for port 465, false for 587
  secure: Number(envVars.EMAIL_SENDER.SMTP_PORT) === 465,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  }
});
var sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments
}) => {
  try {
    const templatePath = path2.resolve(
      process.cwd(),
      `src/app/templates/${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      ...attachments?.length && {
        attachments: attachments.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType
        }))
      }
    });
    console.log(`\u2705 Email sent successfully`);
    console.log(`\u{1F4E7} To: ${to}`);
    console.log(`\u{1F194} Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("\u274C Email Sending Error:", error);
    throw new AppError_default(
      status2.INTERNAL_SERVER_ERROR,
      "Failed to send email"
    );
  }
};

// src/app/lib/auth.ts
var auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      // callbackUrl: envVars.GOOGLE_CALLBACK_URL,
      mapProfileToUser: () => {
        return {
          role: Role.CANDIDATE,
          status: UserStatus.ACTIVE,
          needPasswordChange: false,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.CANDIDATE,
        input: true
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null
      }
    }
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user && !user.emailVerified) {
            sendEmail({
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user) {
            sendEmail({
              to: email,
              subject: "Password Reset OTP",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        }
      },
      expiresIn: 2 * 60,
      // 2 minutes in seconds
      otpLength: 6
    })
  ],
  session: {
    expiresIn: 60 * 60 * 60 * 24,
    // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24,
    // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24
      // 1 day in seconds
    }
  },
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000", envVars.FRONTEND_URL],
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: envVars.NODE_ENV === "production",
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      }
    }
  }
});

// src/app/utlis/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utlis/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/utlis/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //7d
    maxAge: 60 * 60 * 24 * 1e3 * 7
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie
};

// src/app/config/cloudnary.config.ts
import { v2 as cloudinary } from "cloudinary";
import status3 from "http-status";
cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
});
var uploadFileToCloudinary = async (buffer, fileName) => {
  if (!buffer || !fileName) {
    throw new AppError_default(status3.BAD_REQUEST, "File buffer and file name are required for upload");
  }
  const extension = fileName.split(".").pop()?.toLocaleLowerCase();
  console.log("hi", extension);
  const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtension;
  const folder = extension === "pdf" ? "pdfs" : "images";
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: `ai-recruiter/${folder}/${uniqueName}`,
        folder: `ai-recruiter/${folder}`
      },
      (error, result) => {
        if (error) {
          return reject(new AppError_default(status3.INTERNAL_SERVER_ERROR, "Failed to upload file to Cloudinary"));
        }
        resolve(result);
      }
    ).end(buffer);
  });
};
var deleteFileFromCloudinary = async (url) => {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.[^./]+)?$/;
    const match = url.match(regex);
    if (!match || !match[1]) {
      throw new Error("Invalid Cloudinary URL");
    }
    const publicId = match[1];
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    });
    console.log(`Cloudinary file deleted: ${publicId}`);
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new AppError_default(
      status3.INTERNAL_SERVER_ERROR,
      "Failed to delete file from Cloudinary"
    );
  }
};
var cloudinaryUpload = cloudinary;

// src/app/modules/Auth/auth.services.ts
var registerUser = async (payload, file) => {
  const { name, email, password, role } = payload;
  let imageUrl;
  if (file) {
    const uploadedImage = await uploadFileToCloudinary(
      file.buffer,
      file.originalname
    );
    imageUrl = uploadedImage.secure_url;
  }
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      role,
      image: imageUrl
    }
  });
  if (!data.user) {
    throw new AppError_default(status4.BAD_REQUEST, "Failed to Register");
  }
  try {
    if (data.user.role === Role.CANDIDATE) {
      await prisma.candidateProfile.create({
        data: {
          userId: data.user.id
        }
      });
    }
    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified
    });
    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified
    });
    return {
      ...data,
      accessToken,
      refreshToken,
      data
    };
  } catch (error) {
    console.log("Transaction error", error);
    await prisma.user.delete({
      where: {
        id: data.user.id
      }
    });
  }
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  if (data.user.status === UserStatus.INACTIVE) {
    throw new AppError_default(status4.FORBIDDEN, "User is Forbidden");
  }
  ;
  if (data.user.isDeleted || data.user.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  ;
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (user) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: user.userId }
  });
  if (!isUserExist) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  return isUserExist;
};
var getNewToken = async (refreshToken, sessionToken) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError_default(status4.UNAUTHORIZED, "Invalid session Token");
  }
  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.REFRESH_TOKEN_SECRET);
  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError_default(status4.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const newAccessToken = tokenUtils.getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const newRefreshToken = tokenUtils.getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1e3),
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token
  };
};
var changePassword = async (payload, sessionToken) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!session) {
    throw new AppError_default(status4.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (session.user.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  return {
    ...result,
    accessToken,
    refreshToken
  };
};
var logoutUser = async (sessionToken) => {
  if (!sessionToken) {
    return { success: true };
  }
  return auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
};
var updateProfile = async (payload, sessionToken) => {
  if (!sessionToken) {
    throw new AppError_default(status4.UNAUTHORIZED, "Session token is missing");
  }
  const session = await auth.api.getSession({
    headers: new Headers({ Authorization: `Bearer ${sessionToken}` })
  });
  if (!session) {
    throw new AppError_default(status4.UNAUTHORIZED, "Invalid session token");
  }
  if (!payload.currentPassword) {
    throw new AppError_default(status4.BAD_REQUEST, "Current password is required");
  }
  await auth.api.verifyPassword({
    body: { password: payload.currentPassword },
    headers: new Headers({ Authorization: `Bearer ${sessionToken}` })
  });
  const cleanName = typeof payload.name === "string" ? payload.name.trim() : void 0;
  if (cleanName !== void 0 && cleanName.length < 2) {
    throw new AppError_default(status4.BAD_REQUEST, "Name must be at least 2 characters");
  }
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...cleanName !== void 0 ? { name: cleanName } : {},
      ...payload.image !== void 0 ? { image: payload.image } : {}
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      status: true,
      emailVerified: true,
      needPasswordChange: true,
      isDeleted: true
    }
  });
  const candidateFields = {
    phone: payload.phone,
    location: payload.location,
    experience: payload.experience,
    linkedin: payload.linkedin,
    github: payload.github,
    portfolio: payload.portfolio
  };
  if (session.user.role === Role.CANDIDATE) {
    await prisma.candidateProfile.update({
      where: { userId: session.user.id },
      data: Object.fromEntries(
        Object.entries(candidateFields).filter(([, value]) => value !== void 0)
      )
    });
  }
  return updatedUser;
};
var verifyEmail = async (email, otp) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp
    }
  });
  if (result.status && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email
      },
      data: {
        emailVerified: true
      }
    });
  }
};
var forgetPassword = async (email) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status4.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
};
var resetPassword = async (email, otp, newPassword) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status4.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status4.NOT_FOUND, "User not found");
  }
  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  if (isUserExist.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: isUserExist.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  await prisma.session.deleteMany({
    where: {
      userId: isUserExist.id
    }
  });
};
var googleLoginSuccess = async (session) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });
  if (!isUserExists) {
    await prisma.user.create({
      data: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email
      }
    });
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  return {
    accessToken,
    refreshToken
  };
};
var changeUserStatus = async (userId, userStatus) => {
  if (!Object.values(UserStatus).includes(
    userStatus
  )) {
    throw new AppError_default(
      status4.BAD_REQUEST,
      "Invalid user status"
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      role: true,
      status: true,
      isDeleted: true
    }
  });
  if (!user) {
    throw new AppError_default(
      status4.NOT_FOUND,
      "User not found"
    );
  }
  if (user.isDeleted) {
    throw new AppError_default(
      status4.BAD_REQUEST,
      "User has already been deleted"
    );
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status: userStatus
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      image: true,
      updatedAt: true
    }
  });
  return updatedUser;
};
var deleteUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true
    }
  });
  if (!user) {
    throw new AppError_default(
      status4.NOT_FOUND,
      "User not found"
    );
  }
  if (user.role === "ADMIN") {
    throw new AppError_default(
      status4.FORBIDDEN,
      "Admin user cannot be deleted"
    );
  }
  await prisma.$transaction(
    async (tx) => {
      await tx.candidateProfile.deleteMany({
        where: {
          userId
        }
      });
      await tx.company.deleteMany({
        where: {
          userId
        }
      });
      await tx.session.deleteMany({
        where: {
          userId
        }
      });
      await tx.account.deleteMany({
        where: {
          userId
        }
      });
      await tx.user.delete({
        where: {
          id: userId
        }
      });
    }
  );
  if (user.image) {
    try {
      await deleteFileFromCloudinary(
        user.image
      );
    } catch (error) {
      console.error(
        "User deleted but Cloudinary image deletion failed:",
        error
      );
    }
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    message: "User and profile image deleted successfully"
  };
};
var getAllCandidates = async () => {
  const candidates = await prisma.user.findMany({
    where: {
      role: "CANDIDATE"
    }
  });
  return candidates;
};
var authServices = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  updateProfile,
  logoutUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  googleLoginSuccess,
  changeUserStatus,
  deleteUser,
  getAllCandidates
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data
  });
};

// src/app/modules/Auth/auth.controller.ts
import status5 from "http-status";
var registerUser2 = catchAsync(
  async (req, res) => {
    const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN);
    const payload = req.body;
    const result = await authServices.registerUser(
      payload,
      req.file
    );
    if (!result || !("accessToken" in result) || !("refreshToken" in result)) {
      return res.status(400).json({
        success: false,
        message: "User registration failed"
      });
    }
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    if (token) {
      tokenUtils.setBetterAuthSessionCookie(res, token);
    }
    sendResponse(res, {
      httpStatusCode: status5.CREATED,
      success: true,
      message: "User Registered successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var loginUser2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await authServices.loginUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "User Login Successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var getUser = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await authServices.getMe(user);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result
    });
  }
);
var getNewToken2 = catchAsync(
  async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
      throw new AppError_default(status5.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await authServices.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken
      }
    });
  }
);
var changePassword2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.changePassword(payload, betterAuthSessionToken);
    const { accessToken, refreshToken, token } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Password changed successfully",
      data: result
    });
  }
);
var updateProfile2 = catchAsync(
  async (req, res) => {
    const sessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.updateProfile(req.body, sessionToken);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Profile updated successfully",
      data: result
    });
  }
);
var logoutUser2 = catchAsync(
  async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.logoutUser(betterAuthSessionToken);
    CookieUtils.clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none",
      path: "/"
    });
    CookieUtils.clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none",
      path: "/"
    });
    CookieUtils.clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none",
      path: "/"
    });
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "User logged out successfully",
      data: result
    });
  }
);
var verifyEmail2 = catchAsync(
  async (req, res) => {
    const { email, otp } = req.body;
    await authServices.verifyEmail(email, otp);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Email verified successfully"
    });
  }
);
var forgetPassword2 = catchAsync(
  async (req, res) => {
    const { email } = req.body;
    await authServices.forgetPassword(email);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Password reset OTP sent to email successfully"
    });
  }
);
var resetPassword2 = catchAsync(
  async (req, res) => {
    const { email, otp, newPassword } = req.body;
    await authServices.resetPassword(email, otp, newPassword);
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Password reset successfully"
    });
  }
);
var googleLogin = catchAsync((req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const encodedRedirectPath = encodeURIComponent(redirectPath);
  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
  res.render("googleRedirect", {
    callbackURL,
    betterAuthUrl: envVars.BETTER_AUTH_URL
  });
});
var googleLoginSuccess2 = catchAsync(async (req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      "Cookie": `better-auth.session_token=${sessionToken}`
    }
  });
  if (!session) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
  }
  if (session && !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
  }
  const result = await authServices.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
  res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});
var handleOAuthError = catchAsync((req, res) => {
  const error = req.query.error || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});
var changeUserStatus2 = catchAsync(
  async (req, res) => {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    const { status: userStatus } = req.body;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }
    const result = await authServices.changeUserStatus(
      userId,
      userStatus
    );
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "User status updated successfully",
      data: result
    });
  }
);
var deleteUser2 = catchAsync(
  async (req, res) => {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }
    const result = await authServices.deleteUser(
      userId
    );
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    });
  }
);
var getAllCandidates2 = catchAsync(
  async (req, res) => {
    const result = await authServices.getAllCandidates();
    sendResponse(res, {
      httpStatusCode: status5.OK,
      success: true,
      message: "Candidates retrieved successfully",
      data: result
    });
  }
);
var authController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getUser,
  getNewToken: getNewToken2,
  changePassword: changePassword2,
  updateProfile: updateProfile2,
  logoutUser: logoutUser2,
  verifyEmail: verifyEmail2,
  forgetPassword: forgetPassword2,
  resetPassword: resetPassword2,
  googleLogin,
  googleLoginSuccess: googleLoginSuccess2,
  handleOAuthError,
  changeUserStatus: changeUserStatus2,
  deleteUser: deleteUser2,
  getAllCandidates: getAllCandidates2
};

// src/app/middleware/checkAuth.ts
import status6 from "http-status";
var checkAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");
    if (!sessionToken) {
      throw new Error("Unauthorized access! No session token provided.");
    }
    if (sessionToken) {
      const sessionExists = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: /* @__PURE__ */ new Date()
          }
        },
        include: {
          user: {
            include: {
              candidateProfile: true
            }
          }
        }
      });
      if (sessionExists && sessionExists.user) {
        const user = sessionExists.user;
        const now = /* @__PURE__ */ new Date();
        const expiresAt = new Date(sessionExists.expiresAt);
        const createdAt = new Date(sessionExists.createdAt);
        const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
        const timeRemaining = expiresAt.getTime() - now.getTime();
        const percentRemaining = timeRemaining / sessionLifeTime * 100;
        if (percentRemaining < 20) {
          res.setHeader("X-Session-Refresh", "true");
          res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
          res.setHeader("X-Time-Remaining", timeRemaining.toString());
          console.log("Session Expiring Soon!!");
        }
        if (user.status === UserStatus.SUSPENDED || user.status === UserStatus.INACTIVE) {
          throw new AppError_default(status6.UNAUTHORIZED, "Unauthorized access! User is not active.");
        }
        if (user.isDeleted) {
          throw new AppError_default(status6.UNAUTHORIZED, "Unauthorized access! User is deleted.");
        }
        if (authRoles.length > 0 && !authRoles.includes(user.role)) {
          throw new AppError_default(status6.FORBIDDEN, "Forbidden access! You do not have permission to access this resource.");
        }
        req.user = {
          id: user.id,
          userId: user.id,
          role: user.role,
          email: user.email,
          candidateProfile: user.candidateProfile
        };
      }
      const accessToken2 = CookieUtils.getCookie(req, "accessToken");
      if (!accessToken2) {
        throw new AppError_default(status6.UNAUTHORIZED, "Unauthorized access! No access token provided.");
      }
    }
    const accessToken = CookieUtils.getCookie(req, "accessToken");
    if (!accessToken) {
      throw new AppError_default(status6.UNAUTHORIZED, "Unauthorized access! No access token provided.");
    }
    const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);
    if (!verifiedToken.success) {
      throw new AppError_default(status6.UNAUTHORIZED, "Unauthorized access! Invalid access token.");
    }
    if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role)) {
      throw new AppError_default(status6.FORBIDDEN, "Forbidden access! You do not have permission to access this resource.");
    }
    req.user = {
      id: verifiedToken.data.id,
      userId: verifiedToken.data.userId,
      role: verifiedToken.data.role,
      email: verifiedToken.data.email,
      candidateProfile: verifiedToken.data.candidateProfile
    };
    next();
  } catch (error) {
    next(error);
  }
};

// src/app/config/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only PDF and DOCX files are allowed")
      );
    }
    cb(null, true);
  }
});
var multerImageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp"
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        )
      );
    }
    cb(null, true);
  }
});

// src/app/modules/Auth/auth.routes.ts
var router = Router();
router.post("/register", multerImageUpload.single("image"), authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/getMe", checkAuth(), authController.getUser);
router.post("/refresh-token", authController.getNewToken);
router.post("/change-password", checkAuth(Role.ADMIN, Role.CANDIDATE, Role.RECRUITER), authController.changePassword);
router.patch("/profile", checkAuth(Role.ADMIN, Role.CANDIDATE, Role.RECRUITER), authController.updateProfile);
router.post("/logout", authController.logoutUser);
router.post("/verify-email", authController.verifyEmail);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/login/google", authController.googleLogin);
router.get("/google/success", authController.googleLoginSuccess);
router.get("/oauth/error", authController.handleOAuthError);
router.patch(
  "/users/:userId/status",
  checkAuth("ADMIN"),
  authController.changeUserStatus
);
router.get(
  "/allCandidates",
  checkAuth(Role.ADMIN, Role.RECRUITER),
  authController.getAllCandidates
);
router.delete(
  "/users/:userId",
  checkAuth("ADMIN"),
  authController.deleteUser
);
var authRouters = router;

// src/app/modules/candidate/candidate.route.ts
import { Router as Router2 } from "express";

// src/app/modules/candidate/candidate.controller.ts
import status9 from "http-status";

// src/app/modules/candidate/candiate.services.ts
import status8 from "http-status";

// src/app/modules/candidate/candidate.embedding.service.ts
import status7 from "http-status";

// src/app/modules/aiRecruiter/candidateEmbedding.service.ts
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1/embeddings";
var EMBEDDING_MODEL = envVars.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
var CandidateEmbeddingService = async (text, model = EMBEDDING_MODEL) => {
  if (!text?.trim()) {
    throw new Error(
      "Text is empty. Cannot generate embedding."
    );
  }
  const apiKey = envVars.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }
  try {
    const response = await fetch(
      OPENROUTER_API_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          input: text.trim(),
          encoding_format: "float"
        })
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter Embedding Error: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    ;
    const embedding = data?.data?.[0]?.embedding;
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error(
        "No embedding returned from OpenRouter"
      );
    }
    if (!embedding.every(
      (value) => typeof value === "number"
    )) {
      throw new Error(
        "OpenRouter returned an invalid embedding"
      );
    }
    console.log(
      "Embedding model:",
      model
    );
    console.log(
      "Embedding dimensions:",
      embedding.length
    );
    return embedding;
  } catch (error) {
    console.error(
      "Candidate embedding generation failed:",
      error
    );
    throw error;
  }
};

// src/app/modules/candidate/candidate.embedding.service.ts
var generateCandidateEmbedding = async (candidateProfileId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      id: candidateProfileId
    },
    include: {
      skills: true,
      education: true,
      projects: true,
      certifications: true,
      resumes: true
    }
  });
  if (!candidate) {
    throw new AppError_default(
      status7.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const skills = candidate.skills.map((skill) => skill.name).join(", ");
  const education = candidate.education.map(
    (edu) => `${edu.degree ?? ""} ${edu.field ?? ""} ${edu.institution}`
  ).join(", ");
  const projects = candidate.projects.map(
    (project) => `${project.name}: ${project.description ?? ""} ${project.technologies ?? ""}`
  ).join("\n");
  const certifications = candidate.certifications.map(
    (cert) => `${cert.name} ${cert.issuer ?? ""}`
  ).join(", ");
  const resumeText = candidate.resumes.map(
    (resume) => resume.rawText ?? ""
  ).join("\n");
  const candidateText = `
Candidate Profile

Skills:
${skills}

Experience:
${candidate.experience ?? ""}

Education:
${education}

Projects:
${projects}

Certifications:
${certifications}

Resume:
${resumeText}
  `.trim();
  const embedding = await CandidateEmbeddingService(
    candidateText
  );
  if (!Array.isArray(embedding)) {
    throw new Error(
      "Embedding is not an array"
    );
  }
  if (embedding.length !== 2048) {
    throw new Error(
      `Expected 2048 dimensions but received ${embedding.length}`
    );
  }
  console.log(
    "Candidate embedding dimensions:",
    embedding.length
  );
  const vectorLiteral = `[${embedding.join(",")}]`;
  await prisma.$executeRaw`
  INSERT INTO candidate_embeddings
  (
    id,
    "candidateProfileId",
    embedding,
    "createdAt",
    "updatedAt"
  )
  VALUES
  (
    gen_random_uuid(),
    ${candidateProfileId},
    CAST(${vectorLiteral} AS vector),
    NOW(),
    NOW()
  )
  ON CONFLICT ("candidateProfileId")
  DO UPDATE SET
    embedding = EXCLUDED.embedding,
    "updatedAt" = NOW()
`;
  console.log(
    "Candidate embedding saved successfully:",
    candidateProfileId
  );
  return {
    candidateProfileId,
    dimensions: embedding.length,
    message: "Candidate embedding created successfully"
  };
};

// src/app/modules/candidate/candiate.services.ts
var getMyProfile = async (userId) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    include: {
      skills: true,
      education: true,
      projects: true,
      certifications: true
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  return profile;
};
var updateMyProfile = async (userId, payload) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId }
  });
  console.log("Profile", profile);
  if (!profile) {
    throw new AppError_default(status8.NOT_FOUND, "Candidate profile not found");
  }
  const { name, ...profileData } = payload;
  const updatedProfile = await prisma.candidateProfile.update({
    where: { userId },
    data: {
      ...profileData,
      ...name ? { user: { update: { name } } } : {}
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      skills: true,
      education: true,
      projects: true,
      certifications: true
    }
  });
  await generateCandidateEmbedding(updatedProfile.id);
  return updatedProfile;
};
var addSkill = async (userId, skills) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  if (typeof skills === "string") {
    const skill = await prisma.candidateSkill.create({
      data: {
        candidateId: profile.id,
        name: skills
      }
    });
    await generateCandidateEmbedding(profile.id);
    return skill;
  }
  const result = await prisma.candidateSkill.createMany({
    data: skills.map((skill) => ({
      candidateId: profile.id,
      name: skill.name
    }))
  });
  await generateCandidateEmbedding(profile.id);
  return result;
};
var deleteSkill = async (userId, skillId) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const skill = await prisma.candidateSkill.findFirst({
    where: {
      id: skillId,
      candidateId: profile.id
    }
  });
  if (!skill) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Skill not found"
    );
  }
  await prisma.candidateSkill.delete({
    where: {
      id: skillId
    }
  });
  await generateCandidateEmbedding(profile.id);
  return null;
};
var addEducation = async (userId, payload) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const education = await prisma.candidateEducation.create({
    data: {
      ...payload,
      candidateId: profile.id
    }
  });
  await generateCandidateEmbedding(profile.id);
  return education;
};
var updateEducation = async (userId, educationId, payload) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const education = await prisma.candidateEducation.findFirst({
    where: {
      id: educationId,
      candidateId: profile.id
    }
  });
  if (!education) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Education not found"
    );
  }
  const updatedEducation = await prisma.candidateEducation.update({
    where: {
      id: educationId
    },
    data: payload
  });
  await generateCandidateEmbedding(profile.id);
  return updatedEducation;
};
var deleteEducation = async (userId, educationId) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const education = await prisma.candidateEducation.findFirst({
    where: {
      id: educationId,
      candidateId: profile.id
    }
  });
  if (!education) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Education not found"
    );
  }
  await prisma.candidateEducation.delete({
    where: {
      id: educationId
    }
  });
  await generateCandidateEmbedding(profile.id);
  return null;
};
var createProject = async (userId, payload) => {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new AppError_default(
      status8.NOT_FOUND,
      "Candidate profile not found"
    );
  }
  const project = await prisma.candidateProject.create({
    data: {
      name: payload.name,
      description: payload.description ?? null,
      technologies: payload.technologies ?? null,
      projectUrl: payload.projectUrl ?? null,
      image: payload.image ?? null,
      candidateId: candidateProfile.id
    }
  });
  await generateCandidateEmbedding(candidateProfile.id);
  return project;
};
var getMyProjects = async (candidateId) => {
  return await prisma.candidateProject.findMany({
    where: {
      candidateId
    },
    orderBy: {
      id: "desc"
    }
  });
};
var getProjectById = async (candidateId, projectId) => {
  return await prisma.candidateProject.findFirst({
    where: {
      id: projectId,
      candidateId
    }
  });
};
var updateProject = async (candidateId, projectId, payload) => {
  const existingProject = await prisma.candidateProject.findFirst({
    where: {
      id: projectId,
      candidateId
    }
  });
  if (!existingProject) {
    throw new Error("Project not found");
  }
  const updatedProject = await prisma.candidateProject.update({
    where: {
      id: projectId
    },
    data: {
      ...payload
    }
  });
  await generateCandidateEmbedding(candidateId);
  return updatedProject;
};
var deleteProject = async (candidateId, projectId) => {
  const existingProject = await prisma.candidateProject.findFirst({
    where: {
      id: projectId,
      candidateId
    }
  });
  if (!existingProject) {
    throw new Error("Project not found");
  }
  const deletedProject = await prisma.candidateProject.delete({
    where: {
      id: projectId
    }
  });
  await generateCandidateEmbedding(candidateId);
  return deletedProject;
};
var createCertification = async (userId, payload) => {
  console.log("Certificate", payload);
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const certification = await prisma.candidateCertification.create({
    data: {
      name: payload.name ?? null,
      issuer: payload.issuer ?? null,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : null,
      credentialUrl: payload.credentialUrl ?? null,
      image: payload.image ?? null,
      candidateId: candidate.id
    }
  });
  await generateCandidateEmbedding(candidate.id);
  return certification;
};
var getMyCertifications = async (candidateId) => {
  return await prisma.candidateCertification.findMany({
    where: {
      candidateId
    },
    orderBy: {
      issueDate: "desc"
    }
  });
};
var getCertificationById = async (candidateId, certificationId) => {
  return await prisma.candidateCertification.findFirst({
    where: {
      id: certificationId,
      candidateId
    }
  });
};
var updateCertification = async (candidateId, certificationId, payload) => {
  const existingCertification = await prisma.candidateCertification.findFirst({
    where: {
      id: certificationId,
      candidateId
    }
  });
  if (!existingCertification) {
    throw new Error("Certification not found");
  }
  const updatedCertification = await prisma.candidateCertification.update({
    where: {
      id: certificationId
    },
    data: {
      ...payload.name !== void 0 && {
        name: payload.name
      },
      ...payload.issuer !== void 0 && {
        issuer: payload.issuer
      },
      ...payload.issueDate !== void 0 && {
        issueDate: payload.issueDate ? new Date(payload.issueDate) : null
      },
      ...payload.credentialUrl !== void 0 && {
        credentialUrl: payload.credentialUrl
      }
    }
  });
  await generateCandidateEmbedding(candidateId);
  return updatedCertification;
};
var deleteCertification = async (candidateId, certificationId) => {
  const existingCertification = await prisma.candidateCertification.findFirst({
    where: {
      id: certificationId,
      candidateId
    }
  });
  if (!existingCertification) {
    throw new Error("Certification not found");
  }
  if (existingCertification.image) {
    await deleteFileFromCloudinary(
      existingCertification.image
    );
  }
  const deletedCertification = await prisma.candidateCertification.delete({
    where: {
      id: certificationId
    }
  });
  await generateCandidateEmbedding(candidateId);
  return deletedCertification;
};
var candidateService = {
  getMyProfile,
  updateMyProfile,
  addSkill,
  deleteSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  createCertification,
  getMyCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification
};

// src/app/modules/candidate/candidate.controller.ts
var getMyProfile2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const result = await candidateService.getMyProfile(
      userId
    );
    sendResponse(res, {
      httpStatusCode: status9.OK,
      success: true,
      message: "Candidate profile fetched successfully",
      data: result
    });
  }
);
var updateMyProfile2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const result = await candidateService.updateMyProfile(
      userId,
      req.body
    );
    sendResponse(res, {
      httpStatusCode: status9.OK,
      success: true,
      message: "Candidate profile updated successfully",
      data: result
    });
  }
);
var addSkill2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const { skills } = req.body;
    const result = await candidateService.addSkill(
      userId,
      skills
    );
    sendResponse(res, {
      httpStatusCode: status9.CREATED,
      success: true,
      message: "Skill(s) added successfully",
      data: result
    });
  }
);
var deleteSkill2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const skillId = Array.isArray(req.params.skillId) ? req.params.skillId[0] : req.params.skillId;
    if (!skillId) {
      throw new Error("Skill ID is required");
    }
    await candidateService.deleteSkill(
      userId,
      skillId
    );
    sendResponse(res, {
      httpStatusCode: status9.OK,
      success: true,
      message: "Skill deleted successfully",
      data: null
    });
  }
);
var addEducation2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const result = await candidateService.addEducation(
      userId,
      req.body
    );
    sendResponse(res, {
      httpStatusCode: status9.CREATED,
      success: true,
      message: "Education added successfully",
      data: result
    });
  }
);
var updateEducation2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error("ID is required");
    }
    const result = await candidateService.updateEducation(
      userId,
      id,
      req.body
    );
    sendResponse(res, {
      httpStatusCode: status9.OK,
      success: true,
      message: "Education updated successfully",
      data: result
    });
  }
);
var deleteEducation2 = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error("ID is required");
    }
    await candidateService.deleteEducation(
      userId,
      id
    );
    sendResponse(res, {
      httpStatusCode: status9.OK,
      success: true,
      message: "Education deleted successfully",
      data: null
    });
  }
);
var createProject2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const project = await candidateService.createProject(
      userId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create project"
    });
  }
};
var getMyProjects2 = async (req, res) => {
  try {
    const candidateId = req.user.userId;
    const projects = await candidateService.getMyProjects(candidateId);
    console.log("Projects", projects);
    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to retrieve projects"
    });
  }
};
var getProjectById2 = async (req, res) => {
  try {
    const candidateId = req.user.userId;
    const projectId = Array.isArray(req.params.projectId) ? req.params.projectId[0] : req.params.projectId;
    if (!projectId) {
      throw new Error("projectId ID is required");
    }
    const project = await candidateService.getProjectById(
      candidateId,
      projectId
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to retrieve project"
    });
  }
};
var updateProject2 = async (req, res) => {
  try {
    const candidateId = req.user.userId;
    const projectId = Array.isArray(req.params.projectId) ? req.params.projectId[0] : req.params.projectId;
    if (!projectId) {
      throw new Error("projectId ID is required");
    }
    const project = await candidateService.updateProject(
      candidateId,
      projectId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update project"
    });
  }
};
var deleteProject2 = async (req, res) => {
  try {
    const candidateId = req.user.userId;
    const projectId = Array.isArray(req.params.projectId) ? req.params.projectId[0] : req.params.projectId;
    if (!projectId) {
      throw new Error("projectId ID is required");
    }
    await candidateService.deleteProject(
      candidateId,
      projectId
    );
    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete project"
    });
  }
};
var createCertification2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    let certificateImage;
    console.log("\u{1F4E6} BODY:", req.body);
    console.log("\u{1F4C1} FILE:", req.file);
    if (req.file) {
      const uploaded = await uploadFileToCloudinary(
        req.file.buffer,
        req.file.originalname
      );
      certificateImage = uploaded.secure_url;
      console.log(
        "\u2601\uFE0F Cloudinary URL:",
        certificateImage
      );
    }
    const certification = await candidateService.createCertification(
      userId,
      {
        ...req.body,
        image: certificateImage
      }
    );
    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification
    });
  } catch (error) {
    console.error("\u274C Certification error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create certification"
    });
  }
};
var getMyCertifications2 = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const certifications = await candidateService.getMyCertifications(
      candidateId
    );
    res.status(200).json({
      success: true,
      message: "Certifications retrieved successfully",
      data: certifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to retrieve certifications"
    });
  }
};
var getCertificationById2 = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    ) ? req.params.certificationId[0] : req.params.certificationId;
    if (!certificationId) {
      throw new Error("certificationId ID is required");
    }
    const certification = await candidateService.getCertificationById(
      candidateId,
      certificationId
    );
    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Certification retrieved successfully",
      data: certification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to retrieve certification"
    });
  }
};
var updateCertification2 = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    ) ? req.params.certificationId[0] : req.params.certificationId;
    if (!certificationId) {
      throw new Error("certificationId ID is required");
    }
    const certification = await candidateService.updateCertification(
      candidateId,
      certificationId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update certification"
    });
  }
};
var deleteCertification2 = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    ) ? req.params.certificationId[0] : req.params.certificationId;
    if (!certificationId) {
      throw new Error("certificationId ID is required");
    }
    await candidateService.deleteCertification(
      candidateId,
      certificationId
    );
    res.status(200).json({
      success: true,
      message: "Certification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete certification"
    });
  }
};
var candidateController = {
  getMyProfile: getMyProfile2,
  updateMyProfile: updateMyProfile2,
  addSkill: addSkill2,
  deleteSkill: deleteSkill2,
  addEducation: addEducation2,
  updateEducation: updateEducation2,
  deleteEducation: deleteEducation2,
  createProject: createProject2,
  getMyProjects: getMyProjects2,
  getProjectById: getProjectById2,
  updateProject: updateProject2,
  deleteProject: deleteProject2,
  createCertification: createCertification2,
  getMyCertifications: getMyCertifications2,
  getCertificationById: getCertificationById2,
  updateCertification: updateCertification2,
  deleteCertification: deleteCertification2
};

// src/app/modules/candidate/candidate.route.ts
var router2 = Router2();
router2.get(
  "/me",
  checkAuth(Role.CANDIDATE),
  candidateController.getMyProfile
);
router2.patch(
  "/me",
  checkAuth(Role.CANDIDATE),
  candidateController.updateMyProfile
);
router2.post(
  "/skills",
  checkAuth(Role.CANDIDATE),
  candidateController.addSkill
);
router2.delete(
  "/skills/:skillId",
  checkAuth(Role.CANDIDATE),
  candidateController.deleteSkill
);
router2.post(
  "/education",
  checkAuth(Role.CANDIDATE),
  candidateController.addEducation
);
router2.patch(
  "/education/:id",
  checkAuth(Role.CANDIDATE),
  candidateController.updateEducation
);
router2.delete(
  "/education/:id",
  checkAuth(Role.CANDIDATE),
  candidateController.deleteEducation
);
router2.post(
  "/projects",
  checkAuth(Role.CANDIDATE),
  candidateController.createProject
);
router2.get(
  "/projects",
  checkAuth(Role.CANDIDATE),
  candidateController.getMyProjects
);
router2.get(
  "/projects/:projectId",
  checkAuth(Role.CANDIDATE),
  candidateController.getProjectById
);
router2.patch(
  "/projects/:projectId",
  checkAuth(Role.CANDIDATE),
  candidateController.updateProject
);
router2.delete(
  "/projects/:projectId",
  checkAuth(Role.CANDIDATE),
  candidateController.deleteProject
);
router2.post(
  "/certificate",
  (req, res, next) => {
    multerImageUpload.single("image")(req, res, (err) => {
      if (err) {
        console.error("\u{1F525} MULTER ERROR:", err);
        console.error("\u{1F525} MESSAGE:", err.message);
        console.error("\u{1F525} STACK:", err.stack);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      console.log("\u2705 MULTER SUCCESS");
      console.log("FILE:", req.file);
      next();
    });
  },
  checkAuth(Role.CANDIDATE),
  candidateController.createCertification
);
router2.get(
  "/certificate",
  checkAuth(Role.CANDIDATE),
  candidateController.getMyCertifications
);
router2.get(
  "/certificate/:certificationId",
  checkAuth(Role.CANDIDATE),
  candidateController.getCertificationById
);
router2.patch(
  "/certificate/:certificationId",
  checkAuth(Role.CANDIDATE),
  candidateController.updateCertification
);
router2.delete(
  "/certificate/:certificationId",
  checkAuth(Role.CANDIDATE),
  candidateController.deleteCertification
);
var candidateRoutes = router2;

// src/app/modules/Resume/resume.route.ts
import { Router as Router3 } from "express";

// src/app/middleware/uploadResume.ts
import multer2 from "multer";
import path3 from "path";
var storage2 = multer2.memoryStorage();
var fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".docx"];
  const extension = path3.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return cb(new Error("Only PDF and DOCX files are allowed"));
  }
  cb(null, true);
};
var uploadResume = multer2({
  storage: storage2,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5 MB
  }
});

// src/app/config/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: envVars.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});
var openai_default = openai;

// src/app/modules/Resume/embedding.serviceRaw.ts
var EMBEDDING_MODEL2 = envVars.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
var generateEmbedding = async (text) => {
  if (!text.trim()) {
    throw new Error("Text is required for embedding");
  }
  const response = await openai_default.embeddings.create({
    model: EMBEDDING_MODEL2,
    input: text,
    encoding_format: "float"
  });
  const embedding = response.data[0]?.embedding;
  if (!embedding) {
    throw new Error(
      "Failed to generate embedding"
    );
  }
  if (!Array.isArray(embedding)) {
    throw new Error(
      "Embedding response is not an array"
    );
  }
  console.log(
    "Embedding dimension:",
    embedding.length
  );
  return embedding;
};

// src/app/modules/recruiter-rag/retrieval.service.ts
var retrieveRelevantResumeChunks = async (question, topK = 10) => {
  const embedding = await generateEmbedding(question);
  const vectorString = `[${embedding.join(",")}]`;
  const results = await prisma.$queryRaw`
    SELECT
      rc.id,
      rc."resumeId",

      r."candidateId" AS "candidateId",

      rc."chunkText",
      rc."chunkIndex",

      CAST(
        1 - (rc.embedding <=> CAST(${vectorString} AS vector))
        AS FLOAT
      ) AS similarity,

      u.name AS "candidateName",
      u.email AS "candidateEmail",

      r."fileName" AS "resumeFileName"

    FROM resume_chunks rc

    INNER JOIN resumes r
      ON r.id = rc."resumeId"

    INNER JOIN candidate_profile cp
      ON cp.id = r."candidateId"

    INNER JOIN "user" u
      ON u.id = cp."userId"

    WHERE rc.embedding IS NOT NULL

    ORDER BY
      rc.embedding <=> CAST(${vectorString} AS vector)

    LIMIT ${topK}
  `;
  return results;
};

// src/app/modules/recruiter-rag/candidate-grouping.service.ts
var groupChunksByCandidate = (chunks) => {
  const candidateMap = /* @__PURE__ */ new Map();
  for (const chunk of chunks) {
    const existing = candidateMap.get(chunk.candidateId);
    if (!existing) {
      candidateMap.set(chunk.candidateId, {
        candidateId: chunk.candidateId,
        candidateName: chunk.candidateName,
        candidateEmail: chunk.candidateEmail,
        resumeFileName: chunk.resumeFileName,
        bestSimilarity: Number(chunk.similarity),
        chunks: [chunk.chunkText]
      });
      continue;
    }
    existing.bestSimilarity = Math.max(
      existing.bestSimilarity,
      Number(chunk.similarity)
    );
    existing.chunks.push(chunk.chunkText);
  }
  return Array.from(candidateMap.values()).sort(
    (a, b) => b.bestSimilarity - a.bestSimilarity
  );
};

// src/app/config/gemini.ts
import { GoogleGenAI } from "@google/genai";
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not configured");
}
var gemini = new GoogleGenAI({
  apiKey: envVars.GEMINI_API_KEY
});
var gemini_default = gemini;

// src/app/modules/recruiter-rag/prompt.ts
var buildRecruiterPrompt = (question, candidates) => {
  const candidateContext = candidates.map(
    (candidate, index) => `
Candidate ${index + 1}

Candidate ID:
${candidate.candidateId}

Name:
${candidate.candidateName}

Email:
${candidate.candidateEmail}

Vector similarity:
${candidate.bestSimilarity.toFixed(3)}

Resume evidence:
${candidate.chunks.join("\n\n---\n\n")}
`
  ).join("\n\n====================\n\n");
  return `
You are an AI recruitment assistant.

You must answer the recruiter's question using ONLY the candidate
evidence provided below.

Do not invent candidate experience, skills, education, projects,
companies or technologies.

Recruiter question:
${question}

Candidate evidence:
${candidateContext}

Instructions:

1. Identify the strongest candidates.
2. Rank them from strongest to weakest.
3. Explain why each candidate is relevant.
4. Mention the actual evidence from the resume.
5. Mention missing requirements when evidence is insufficient.
6. Do not claim that vector similarity is an exact hiring score.
7. If there is not enough evidence, clearly say so.

Return valid JSON using this structure:

{
  "summary": "string",
  "candidates": [
    {
      "candidateId": "string",
      "name": "string",
      "matchScore": 0,
      "reason": "string",
      "evidence": ["string"],
      "missingRequirements": ["string"]
    }
  ]
}
`;
};

// src/app/modules/recruiter-rag/llm.service.ts
var LLM_MODEL = process.env.GEMINI_LLM_MODEL || "gemini-3.6-flash";
var generateRecruiterAnswer = async (question, candidates) => {
  const prompt = buildRecruiterPrompt(
    question,
    candidates
  );
  const response = await gemini_default.models.generateContent({
    model: LLM_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a precise AI recruitment assistant.

Rules:
- Never invent candidate information.
- Only use information provided in the candidate data.
- Return valid JSON only.
- Match candidates based on evidence.
- Explain why each candidate matches.
- Mention missing requirements when applicable.

${prompt}
`
          }
        ]
      }
    ],
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          summary: {
            type: "string"
          },
          candidates: {
            type: "array",
            items: {
              type: "object",
              properties: {
                candidateId: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                matchScore: {
                  type: "number"
                },
                reason: {
                  type: "string"
                },
                evidence: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                missingRequirements: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              },
              required: [
                "candidateId",
                "name",
                "matchScore",
                "reason",
                "evidence",
                "missingRequirements"
              ]
            }
          }
        },
        required: [
          "summary",
          "candidates"
        ]
      }
    }
  });
  const content = response.text;
  if (!content) {
    throw new Error("Gemini returned an empty response");
  }
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(
      "Gemini returned invalid JSON"
    );
  }
  if (typeof parsed !== "object" || parsed === null || !("summary" in parsed) || !("candidates" in parsed)) {
    throw new Error(
      "Invalid recruiter AI response"
    );
  }
  return parsed;
};

// src/app/modules/Resume/chunking.service.ts
var DEFAULT_CHUNK_SIZE = 1200;
var DEFAULT_OVERLAP = 200;
var chunkText = (text, chunkSize = DEFAULT_CHUNK_SIZE, overlap = DEFAULT_OVERLAP) => {
  if (!text.trim()) {
    return [];
  }
  const cleanedText = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const chunks = [];
  let start = 0;
  while (start < cleanedText.length) {
    const end = Math.min(start + chunkSize, cleanedText.length);
    const chunk = cleanedText.slice(start, end).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    if (end >= cleanedText.length) {
      break;
    }
    start = end - overlap;
  }
  return chunks;
};

// src/app/modules/Resume/ingestion.service.ts
var ingestResume = async (resumeId) => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  const rawText = resume.rawText;
  if (typeof rawText !== "string" || rawText.trim().length === 0) {
    throw new Error("Resume text is empty");
  }
  const chunks = chunkText(rawText);
  if (chunks.length === 0) {
    throw new Error("No chunks generated from resume");
  }
  await prisma.resumeChunk.deleteMany({
    where: {
      resumeId
    }
  });
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await generateEmbedding(chunk);
    const vectorString = `[${embedding.join(",")}]`;
    await prisma.$executeRaw`
      INSERT INTO resume_chunks
      (
        id,
        "resumeId",
        "chunkText",
        "chunkIndex",
        embedding,
        "createdAt"
      )
      VALUES
      (
        gen_random_uuid(),
        ${resumeId},
        ${chunk},
        ${i},
        ${vectorString}::vector,
        NOW()
      )
    `;
  }
};

// src/app/modules/recruiter-rag/recruiter-ai.service.ts
var askRecruiterAI = async (question, topK = 10) => {
  const chunks = await retrieveRelevantResumeChunks(
    question,
    topK
  );
  if (chunks.length === 0) {
    return {
      summary: "No relevant candidates were found.",
      candidates: [],
      retrievedChunks: 0
    };
  }
  const candidates = groupChunksByCandidate(chunks);
  const answer = await generateRecruiterAnswer(
    question,
    candidates
  );
  return {
    ...answer,
    retrievedChunks: chunks.length
  };
};

// src/app/modules/recruiter-rag/recruiter-rag.validation.ts
import { z } from "zod";
var recruiterSearchSchema = z.object({
  question: z.string().trim().min(3, "Question must be at least 3 characters long").max(1e3, "Question cannot exceed 1000 characters"),
  limit: z.number().int().min(1).max(20).optional().default(5)
});

// src/app/modules/recruiter-rag/recruiter-ai.controller.ts
var askRecruiterAIController = async (req, res) => {
  try {
    const validation = recruiterSearchSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid recruiter question",
        errors: validation.error.flatten()
      });
    }
    const {
      question,
      limit
    } = validation.data;
    const result = await askRecruiterAI(
      question,
      limit
    );
    return res.status(200).json({
      success: true,
      message: "Recruiter AI response generated successfully",
      data: result
    });
  } catch (error) {
    console.error(
      "Recruiter AI error:",
      error
    );
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to generate recruiter AI response"
    });
  }
};

// src/app/modules/Resume/resume.extractor.ts
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
var extractResumeText = async (buffer, mimetype) => {
  if (mimetype === "application/pdf") {
    const parser = new PDFParse({
      data: buffer
    });
    try {
      const data = await parser.getText();
      const text = data.text ?? "";
      const urlRegex = /https?:\/\/[^\s<>"')]+/gi;
      const links = text.match(urlRegex) ?? [];
      return {
        text,
        links: [...new Set(links)]
      };
    } finally {
      await parser.destroy();
    }
  }
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({
      buffer
    });
    const text = result.value ?? "";
    const urlRegex = /https?:\/\/[^\s<>"')]+/gi;
    const links = text.match(urlRegex) ?? [];
    return {
      text,
      links: [...new Set(links)]
    };
  }
  throw new Error("Unsupported file type");
};

// src/app/modules/Resume/resume.ai.ts
import Groq from "groq-sdk";
var groq = new Groq({
  apiKey: envVars.GROQ_API_KEY
});
var parseResumeWithAI = async (text, links) => {
  const prompt = `
You are a professional resume parser.

Extract structured information from the resume.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use \`\`\`json.
4. Do NOT add explanations before or after the JSON.
5. Do NOT invent information.
6. If information is missing, return an empty value.
7. Preserve the candidate's information accurately.
8. Do not create skills, experiences, projects, certifications,
   education or URLs that are not present.
9. Use the detected hyperlinks provided below.
10. Never guess or generate a GitHub or LinkedIn URL.
11. Keep descriptions concise but informative.

DETECTED HYPERLINKS:

${links.length > 0 ? links.join("\n") : "No hyperlinks detected."}

IMPORTANT URL RULES:

- If a detected URL belongs to GitHub, use it as githubUrl.
- If a detected URL belongs to LinkedIn, use it as linkedinUrl.
- If GitHub URL is not detected, return "".
- If LinkedIn URL is not detected, return "".
- Never construct URLs yourself.

Return exactly this structure:

{
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": [],
  "certifications": [],
  "githubUrl": "",
  "linkedinUrl": ""
}

Resume:

${text}
`;
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("AI returned empty response");
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error(
      "Invalid AI response:",
      content
    );
    throw new Error("AI returned invalid JSON");
  }
};

// src/app/modules/Resume/resume.analysis.ts
import Groq2 from "groq-sdk";
var groq2 = new Groq2({
  apiKey: envVars.GROQ_API_KEY
});
var analyzeResumeWithAI = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS resume evaluator and professional career coach.

Analyze the candidate's resume carefully.

Your goal is to evaluate the quality, ATS compatibility,
completeness, relevance, and effectiveness of the resume.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use \`\`\`json.
4. Do NOT add explanations before or after the JSON.
5. Do NOT invent information.
6. Never assume that the candidate has a skill, experience,
   certification, education or achievement that is not present.
7. Scores must be integers between 0 and 100.
8. Base all analysis only on the provided resume.
9. If a target job description is provided, compare the resume
   against that job description.
10. If no job description is provided, do NOT pretend that
    keyword matching is job-specific.

SCORING:

overallScore:
Overall quality of the resume considering skills, experience,
education, projects, certifications, ATS compatibility,
content quality and completeness.

skillsScore:
Quality, relevance and presentation of the candidate's skills.

experienceScore:
Quality and relevance of professional experience.
If there is no professional experience, do not treat this as
a writing error. Score according to the available evidence.

educationScore:
Quality and completeness of education information.

projectsScore:
Quality, technical depth, descriptions and achievements
of projects.

certificationsScore:
Quality and relevance of certifications.
If there are no certifications, score according to the
candidate's profile rather than inventing certifications.

ATS SCORE:

atsScore should evaluate how well the resume can be processed
and understood by an ATS.

Consider:

- clear section headings
- standard resume structure
- readable text
- keyword usage
- bullet point quality
- unnecessary formatting
- missing important information
- contact information
- section completeness

ATS ANALYSIS:

keywordMatch:
Evaluate how well the resume uses relevant keywords.

formattingScore:
Evaluate ATS-friendly formatting based ONLY on the extracted
resume text.

sectionCompleteness:
Evaluate whether important resume sections and information
are present.

IMPORTANT:

Do not claim that a PDF has bad colors, fonts, columns,
graphics or visual formatting unless that information is
actually available from the extracted text.

KEYWORD ANALYSIS:

If a job description is provided:

- matchedKeywords = important keywords appearing in both
  the resume and job description.
- missingKeywords = important job-description keywords that
  are relevant to the candidate but are missing from the resume.
- matchPercentage = approximate percentage of important
  job-description keywords found in the resume.

If a job description is NOT provided:

- matchedKeywords = important technical/professional keywords
  found in the resume.
- missingKeywords = [].
- matchPercentage = 0.

Do NOT randomly select technologies such as AWS, Docker,
GraphQL or Kubernetes as missing skills unless they are
relevant to the provided job description.

FORMATTING ANALYSIS:

Evaluate formatting-related issues that can reasonably be
detected from extracted text.

Examples:

- missing professional summary
- missing graduation year
- missing contact information
- missing GitHub URL
- missing LinkedIn URL
- inconsistent section structure
- overly long bullet points
- paragraphs instead of concise bullets

Do not invent visual formatting problems.

MISSING INFORMATION:

Identify useful resume information that appears to be missing.

Examples:

- professional summary
- graduation year
- GitHub URL
- LinkedIn URL
- measurable achievements
- internship experience
- relevant coursework
- certifications

STRENGTHS:

Identify specific strengths from the actual resume.

WEAKNESSES:

Identify specific weaknesses from the actual resume.

SUGGESTIONS:

Provide practical and actionable improvements.

MISSING SKILLS:

If a job description is provided:
return relevant skills required by the job that are missing
from the resume.

If no job description is provided:
return skills that could reasonably improve the resume,
but clearly base them on the candidate's target/profile context.
Do not randomly list popular technologies.

Return exactly this JSON structure:

{
  "overallScore": 0,

  "skillsScore": 0,

  "experienceScore": 0,

  "educationScore": 0,

  "projectsScore": 0,

  "certificationsScore": 0,

  "atsScore": 0,

  "atsAnalysis": {
    "keywordMatch": 0,
    "formattingScore": 0,
    "sectionCompleteness": 0,
    "issues": []
  },

  "keywordAnalysis": {
    "matchedKeywords": [],
    "missingKeywords": [],
    "matchPercentage": 0
  },

  "formattingAnalysis": {
    "score": 0,
    "issues": []
  },

  "missingInformation": [],

  "strengths": [],

  "weaknesses": [],

  "suggestions": [],

  "missingSkills": []
}

TARGET JOB DESCRIPTION:

${jobDescription || "No job description provided."}

RESUME:

${resumeText}
`;
  const completion = await groq2.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("AI returned empty response");
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Invalid AI JSON:", content);
    throw new Error("AI returned invalid JSON");
  }
};

// src/app/modules/Resume/embedding.service.ts
var OPENROUTER_API_URL2 = "https://openrouter.ai/api/v1/embeddings";
var EMBEDDING_MODEL3 = envVars.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
var generateResumeEmbedding = async (resumeId, resumeText) => {
  if (!resumeText?.trim()) {
    throw new Error("Resume text is empty");
  }
  const apiKey = envVars.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }
  try {
    const response = await fetch(
      OPENROUTER_API_URL2,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: EMBEDDING_MODEL3,
          input: resumeText.trim(),
          encoding_format: "float"
        })
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter Embedding Error: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    const embedding = data?.data?.[0]?.embedding;
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error(
        "No embedding returned from OpenRouter"
      );
    }
    console.log(
      "Embedding model:",
      EMBEDDING_MODEL3
    );
    console.log(
      "Embedding dimensions:",
      embedding.length
    );
    const vector = `[${embedding.join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "resumes"
      SET "embedding" = ${vector}::vector
      WHERE "id" = ${resumeId}
    `;
    console.log(
      `Resume embedding stored successfully: ${resumeId}`
    );
    return {
      resumeId,
      dimensions: embedding.length
    };
  } catch (error) {
    console.error(
      "Resume embedding generation failed:",
      error
    );
    throw error;
  }
};

// src/app/modules/Resume/resume.service.ts
var uploadResume2 = async (userId, file) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinaryUpload.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resumes"
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(file.buffer);
  });
  const extracted = await extractResumeText(
    file.buffer,
    file.mimetype
  );
  const rawText = extracted.text;
  const links = extracted.links;
  if (!rawText || !rawText.trim()) {
    throw new Error(
      "Could not extract text from resume"
    );
  }
  const parsedData = await parseResumeWithAI(
    rawText,
    links
  );
  const resume = await prisma.resume.create({
    data: {
      candidateId: candidate.id,
      fileName: file.originalname,
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileType: file.mimetype,
      fileSize: file.size,
      rawText,
      parsedData
    }
  });
  console.log("Resume Info", resume.id, rawText);
  await generateResumeEmbedding(
    resume.id,
    rawText
  );
  return resume;
};
var getMyResumes = async (userId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  return prisma.resume.findMany({
    where: {
      candidateId: candidate.id
    },
    include: {
      analysis: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getResumeById = async (userId, resumeId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id
    },
    include: {
      analysis: true
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  return resume;
};
var deleteResume = async (userId, resumeId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  await cloudinaryUpload.uploader.destroy(
    resume.publicId,
    {
      resource_type: "raw"
    }
  );
  await prisma.resume.delete({
    where: {
      id: resume.id
    }
  });
  return {
    message: "Resume deleted successfully"
  };
};
var analyzeResume = async (userId, resumeId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  if (!resume.rawText) {
    throw new Error("Resume text not available");
  }
  const result = await analyzeResumeWithAI(
    resume.rawText
  );
  const analysis = await prisma.resumeAnalysis.upsert({
    where: {
      resumeId: resume.id
    },
    update: {
      overallScore: result.overallScore,
      skillsScore: result.skillsScore,
      experienceScore: result.experienceScore,
      educationScore: result.educationScore,
      projectsScore: result.projectsScore,
      certificationsScore: result.certificationsScore,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      suggestions: result.suggestions,
      missingSkills: result.missingSkills
    },
    create: {
      resumeId: resume.id,
      overallScore: result.overallScore,
      skillsScore: result.skillsScore,
      experienceScore: result.experienceScore,
      educationScore: result.educationScore,
      projectsScore: result.projectsScore,
      certificationsScore: result.certificationsScore,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      suggestions: result.suggestions,
      missingSkills: result.missingSkills
    }
  });
  return analysis;
};
var getResumeAnalysis = async (userId, resumeId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  return prisma.resumeAnalysis.findUnique({
    where: {
      resumeId
    }
  });
};
var resumeServices = {
  uploadResume: uploadResume2,
  getMyResumes,
  getResumeById,
  deleteResume,
  analyzeResume,
  getResumeAnalysis
};

// src/app/modules/Resume/resume.controller.ts
import status10 from "http-status";
var uploadResume3 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required"
      });
    }
    const userId = req.user.userId;
    const result = await resumeServices.uploadResume(
      userId,
      req.file
    );
    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getMyResumes2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await resumeServices.getMyResumes(userId);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getResume = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!resumeId) {
      throw new Error("Resume ID is required");
    }
    const result = await resumeServices.getResumeById(
      userId,
      resumeId
    );
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var deleteResume2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!resumeId) {
      throw new Error("Resume ID is required");
    }
    const result = await resumeServices.deleteResume(
      userId,
      resumeId
    );
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var analyze = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!resumeId) {
      throw new Error("Resume ID is required");
    }
    const result = await resumeServices.analyzeResume(
      userId,
      resumeId
    );
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getAnalysis = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!resumeId) {
      throw new Error("Resume ID is required");
    }
    const result = await resumeServices.getResumeAnalysis(
      userId,
      resumeId
    );
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var ingestResume2 = async (req, res) => {
  const resumeId = Array.isArray(req.params.resumeId) ? req.params.resumeId[0] : req.params.resumeId;
  if (!resumeId) {
    throw new Error("Resume ID is required");
  }
  const result = await ingestResume(resumeId);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Resume ingested successfully",
    data: result
  });
};
var resumeController = {
  uploadResume: uploadResume3,
  getMyResumes: getMyResumes2,
  getResume,
  deleteResume: deleteResume2,
  analyze,
  getAnalysis,
  ingestResume: ingestResume2
};

// src/app/modules/Resume/resume.route.ts
var router3 = Router3();
router3.use(checkAuth(Role.CANDIDATE));
router3.post(
  "/upload",
  uploadResume.single("resume"),
  resumeController.uploadResume
);
router3.get(
  "/",
  resumeController.getMyResumes
);
router3.get(
  "/:id",
  resumeController.getResume
);
router3.delete(
  "/:id",
  resumeController.deleteResume
);
router3.post(
  "/:id/analyze",
  resumeController.analyze
);
router3.get(
  "/:id/analysis",
  resumeController.getAnalysis
);
router3.post(
  "/:resumeId/ingest",
  resumeController.ingestResume
);
router3.post(
  "/ask",
  askRecruiterAIController
);
var resumeRouter = router3;

// src/app/modules/company/createCompany/company.router.ts
import { Router as Router4 } from "express";

// src/app/modules/company/createCompany/company.validation.ts
import { z as z2 } from "zod";
var createCompanySchema = z2.object({
  name: z2.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  description: z2.string().max(1e3, "Description is too long").optional(),
  website: z2.preprocess(
    (value) => value === "" ? void 0 : value,
    z2.string().url("Invalid website URL").optional()
  )
});
var updateCompanySchema = z2.object({
  name: z2.string().min(2).max(100).optional(),
  description: z2.string().max(1e3).optional(),
  website: z2.preprocess(
    (value) => value === "" ? void 0 : value,
    z2.string().url("Invalid website URL").optional()
  )
});

// src/app/modules/company/createCompany/comapny.services.ts
var createCompany = async (userId, payload) => {
  const existingCompany = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (existingCompany) {
    throw new AppError_default(
      400,
      "You already have a company"
    );
  }
  const company = await prisma.company.create({
    data: {
      name: payload.name,
      description: payload.description,
      website: payload.website,
      userId
    }
  });
  return company;
};
var getMyCompany = async (userId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    },
    include: {
      jobs: true
    }
  });
  if (!company) {
    return null;
  }
  return company;
};
var updateMyCompany = async (userId, payload) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw new AppError_default(
      404,
      "Company not found"
    );
  }
  const updatedCompany = await prisma.company.update({
    where: {
      userId
    },
    data: payload
  });
  return updatedCompany;
};
var deleteMyCompany = async (userId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw new AppError_default(
      404,
      "Company not found"
    );
  }
  await prisma.company.delete({
    where: {
      userId
    }
  });
  return null;
};
var getMyCompanyComplaints = async (userId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    return [];
  }
  const complaints = await prisma.reviewComplaint.findMany({
    where: {
      companyId: company.id
    },
    include: {
      // Candidate information
      candidateProfile: {
        select: {
          id: true,
          phone: true,
          location: true,
          experience: true
        }
      },
      // Job information
      job: {
        select: {
          id: true,
          title: true,
          location: true
        }
      },
      // Application information
      jobApplication: {
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      },
      // Evidence/images
      evidence: true,
      // Admin decision
      penalty: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return complaints;
};
var getMyCompanyPenalties = async (userId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    return [];
  }
  const penalties = await prisma.penalty.findMany({
    where: {
      companyId: company.id
    },
    include: {
      complaint: {
        include: {
          job: {
            select: {
              id: true,
              title: true
            }
          },
          evidence: true
        }
      },
      company: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return penalties;
};
var getMyCompanyPenaltyById = async (userId, penaltyId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw new Error(
      "Company profile not found"
    );
  }
  const penalty = await prisma.penalty.findFirst({
    where: {
      id: penaltyId,
      // Security check
      companyId: company.id
    },
    include: {
      complaint: {
        include: {
          candidateProfile: {
            select: {
              id: true,
              phone: true,
              location: true,
              experience: true
            }
          },
          job: true,
          evidence: true
        }
      },
      company: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  if (!penalty) {
    throw new Error(
      "Penalty not found"
    );
  }
  return penalty;
};
var companyServices = {
  createCompany,
  getMyCompany,
  updateMyCompany,
  deleteMyCompany,
  getMyCompanyComplaints,
  getMyCompanyPenalties,
  getMyCompanyPenaltyById
};

// src/app/modules/company/createCompany/company.controller.ts
var createCompanyController = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  const userId = req.user.userId;
  const validatedData = createCompanySchema.parse(
    req.body
  );
  const company = await companyServices.createCompany(
    userId,
    validatedData
  );
  res.status(201).json({
    success: true,
    message: "Company created successfully",
    data: company
  });
};
var getMyCompanyController = async (req, res) => {
  const userId = req.user.userId;
  const company = await companyServices.getMyCompany(userId);
  res.status(200).json({
    success: true,
    message: "Company retrieved successfully",
    data: company
  });
};
var updateMyCompanyController = async (req, res) => {
  const userId = req.user.userId;
  const validatedData = updateCompanySchema.parse(
    req.body
  );
  const company = await companyServices.updateMyCompany(
    userId,
    validatedData
  );
  res.status(200).json({
    success: true,
    message: "Company updated successfully",
    data: company
  });
};
var deleteMyCompanyController = async (req, res) => {
  const userId = req.user.userId;
  await companyServices.deleteMyCompany(userId);
  res.status(200).json({
    success: true,
    message: "Company deleted successfully"
  });
};
var getMyCompanyComplaints2 = async (req, res) => {
  const userId = req.user.userId;
  const result = await companyServices.getMyCompanyComplaints(
    userId
  );
  res.status(200).json({
    success: true,
    message: "Company complaints retrieved successfully",
    data: result
  });
};
var getMyCompanyComplaintById = async (req, res) => {
  const userId = req.user.userId;
  const complaintId = String(req.params.complaintId);
  const result = await companyServices.getMyCompanyPenaltyById(
    userId,
    complaintId
  );
  res.status(200).json({
    success: true,
    message: "Complaint retrieved successfully",
    data: result
  });
};
var getMyCompanyPenalties2 = async (req, res) => {
  const userId = req.user.userId;
  const result = await companyServices.getMyCompanyPenalties(
    userId
  );
  res.status(200).json({
    success: true,
    message: "Company penalties retrieved successfully",
    data: result
  });
};
var getMyCompanyPenaltyById2 = async (req, res) => {
  const userId = req.user.id;
  const penaltyId = String(req.params.penaltyId);
  const result = await companyServices.getMyCompanyPenaltyById(
    userId,
    penaltyId
  );
  res.status(200).json({
    success: true,
    message: "Penalty retrieved successfully",
    data: result
  });
};
var companyController = {
  createCompanyController,
  getMyCompanyController,
  updateMyCompanyController,
  deleteMyCompanyController,
  getMyCompanyPenaltyById: getMyCompanyPenaltyById2,
  getMyCompanyPenalties: getMyCompanyPenalties2,
  getMyCompanyComplaints: getMyCompanyComplaints2,
  getMyCompanyComplaintById
};

// src/app/modules/company/createCompany/company.router.ts
var router4 = Router4();
router4.post(
  "/jobs",
  checkAuth(Role.RECRUITER),
  companyController.createCompanyController
);
router4.get(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.getMyCompanyController
);
router4.patch(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.updateMyCompanyController
);
router4.delete(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.deleteMyCompanyController
);
router4.get(
  "/complaints",
  checkAuth(Role.RECRUITER),
  companyController.getMyCompanyComplaints
);
router4.get(
  "/penalties",
  checkAuth(Role.RECRUITER),
  companyController.getMyCompanyPenalties
);
router4.get(
  "/penalties/:penaltyId",
  checkAuth(Role.RECRUITER),
  companyController.getMyCompanyPenaltyById
);
var companyRouter = router4;

// src/app/modules/company/createJob/job.route.ts
import { Router as Router5 } from "express";

// src/app/modules/company/createJob/generateJobEmbedding.ts
var OPENROUTER_API_URL3 = "https://openrouter.ai/api/v1/embeddings";
var EMBEDDING_MODEL4 = envVars.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
var generateJobEmbedding = async (jobId, jobText) => {
  if (!jobText?.trim()) {
    throw new Error("Job text is empty");
  }
  const apiKey = envVars.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }
  try {
    const response = await fetch(
      OPENROUTER_API_URL3,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: EMBEDDING_MODEL4,
          input: jobText.trim(),
          encoding_format: "float"
        })
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter Embedding Error: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    const embedding = data?.data?.[0]?.embedding;
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error(
        "No embedding returned from OpenRouter"
      );
    }
    console.log(
      "Embedding model:",
      EMBEDDING_MODEL4
    );
    console.log(
      "Embedding dimensions:",
      embedding.length
    );
    if (embedding.length !== 2048) {
      throw new Error(
        `Embedding dimension mismatch. Expected 2048 but received ${embedding.length}`
      );
    }
    const vector = `[${embedding.join(",")}]`;
    const updateResult = await prisma.$executeRaw`
      UPDATE "Job"
      SET "embedding" = ${vector}::vector
      WHERE "id" = ${jobId}
    `;
    if (updateResult !== 1) {
      throw new Error(
        `Embedding was not stored: job ${jobId} was not updated`
      );
    }
    const verification = await prisma.$queryRaw`
      SELECT
        "embedding" IS NOT NULL AS "hasEmbedding",
        CASE
          WHEN "embedding" IS NULL THEN NULL
          ELSE vector_dims("embedding")
        END AS dimensions
      FROM "Job"
      WHERE "id" = ${jobId}
    `;
    const stored = verification[0];
    if (!stored?.hasEmbedding || stored.dimensions !== 2048) {
      throw new Error(
        `Embedding verification failed for job ${jobId}: ${JSON.stringify(stored ?? null)}`
      );
    }
    console.log(
      `Job embedding verified in database: ${jobId} (${stored.dimensions} dimensions)`
    );
    return {
      jobId,
      dimensions: stored.dimensions
    };
  } catch (error) {
    console.error(
      "Job embedding generation failed:",
      error
    );
    throw error;
  }
};

// src/app/modules/company/createJob/job.validation.ts
import { z as z3 } from "zod";
var createJobSchema = z3.object({
  title: z3.string().min(3).max(200),
  description: z3.string().min(20),
  location: z3.string().trim().min(1, "Location is required"),
  remoteType: z3.enum(["ONSITE", "REMOTE", "HYBRID"]).default("ONSITE"),
  employmentType: z3.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE"
  ]),
  experienceLevel: z3.enum([
    "ENTRY",
    "JUNIOR",
    "MID",
    "SENIOR",
    "LEAD"
  ]),
  salaryMin: z3.number().nonnegative().optional(),
  salaryMax: z3.number().nonnegative().optional(),
  salaryCurrency: z3.string().max(10).default("BDT"),
  deadline: z3.coerce.date().refine((date) => date > /* @__PURE__ */ new Date(), "Deadline must be in the future"),
  requiredSkills: z3.array(z3.string().min(1)).min(1),
  preferredSkills: z3.array(z3.string().min(1)).default([]),
  status: z3.enum(["DRAFT", "PUBLISHED"]).default("DRAFT")
});
var searchJobSchema = z3.object({
  keyword: z3.string().optional(),
  location: z3.string().optional(),
  skills: z3.string().optional(),
  salaryMin: z3.coerce.number().nonnegative().optional(),
  salaryMax: z3.coerce.number().nonnegative().optional(),
  experience: z3.enum([
    "ENTRY",
    "JUNIOR",
    "MID",
    "SENIOR",
    "LEAD"
  ]).optional(),
  remote: z3.enum(["ONSITE", "REMOTE", "HYBRID"]).optional(),
  employmentType: z3.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE"
  ]).optional(),
  companyId: z3.string().uuid().optional(),
  page: z3.coerce.number().int().positive().default(1),
  limit: z3.coerce.number().int().positive().max(50).default(10),
  sortBy: z3.enum([
    "createdAt",
    "salaryMin",
    "salaryMax",
    "deadline"
  ]).default("createdAt"),
  sortOrder: z3.enum(["asc", "desc"]).default("desc")
});

// src/app/modules/company/createJob/job.services.ts
var createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
var createJobService = async (userId, data) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError("Company profile not found", 404);
  }
  if (!data.title?.trim()) {
    throw createError("Job title is required", 400);
  }
  if (!data.description?.trim()) {
    throw createError("Job description is required", 400);
  }
  if (!data.location?.trim()) {
    throw createError("Job location is required", 400);
  }
  if (!data.employmentType) {
    throw createError("Employment type is required", 400);
  }
  if (!data.experienceLevel) {
    throw createError("Experience level is required", 400);
  }
  if (!data.deadline) {
    throw createError("Deadline is required", 400);
  }
  const title = data.title.trim();
  const description = data.description.trim();
  const location = data.location.trim();
  const employmentType = data.employmentType;
  const experienceLevel = data.experienceLevel;
  const remoteType = data.remoteType ?? RemoteType.ONSITE;
  const status19 = data.status;
  const deadline = data.deadline instanceof Date ? data.deadline : new Date(data.deadline);
  if (Number.isNaN(deadline.getTime())) {
    throw createError("Invalid deadline", 400);
  }
  if (deadline <= /* @__PURE__ */ new Date()) {
    throw createError(
      "Deadline must be a future date",
      400
    );
  }
  if (data.salaryMin !== void 0 && data.salaryMin !== null && data.salaryMax !== void 0 && data.salaryMax !== null && data.salaryMin > data.salaryMax) {
    throw createError(
      "Minimum salary cannot be greater than maximum salary",
      400
    );
  }
  const skillNames = (data.requiredSkills ?? []).map((skill) => {
    if (typeof skill === "string") {
      return {
        name: skill,
        priority: "medium"
      };
    }
    return {
      name: skill.name,
      priority: skill.priority ?? "medium"
    };
  }).map((skill) => ({
    name: skill.name.trim(),
    priority: skill.priority
  })).filter((skill) => Boolean(skill.name));
  const job = await prisma.job.create({
    data: {
      company: {
        connect: {
          id: company.id
        }
      },
      title,
      description,
      location,
      remoteType,
      employmentType,
      experienceLevel,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      salaryCurrency: data.salaryCurrency ?? "BDT",
      deadline,
      status: status19,
      publishedAt: status19 === JobStatus.PUBLISHED ? /* @__PURE__ */ new Date() : null,
      requiredSkills: {
        create: skillNames.map((skill) => ({
          name: skill.name,
          priority: skill.priority
        }))
      }
    },
    include: {
      company: true,
      requiredSkills: true
    }
  });
  const skillsText = skillNames.map((skill) => skill.name).join(", ");
  const jobText = `
Job Title:
${job.title}

Job Description:
${job.description}

Location:
${job.location}

Remote Type:
${job.remoteType}

Employment Type:
${job.employmentType}

Experience Level:
${job.experienceLevel}

Salary:
${job.salaryMin !== null || job.salaryMax !== null ? `${job.salaryMin ?? "N/A"} - ${job.salaryMax ?? "N/A"} ${job.salaryCurrency ?? ""}` : "Not specified"}

Deadline:
${job.deadline.toISOString()}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();
  console.log("Job embedding text:");
  console.log(jobText);
  let embeddingResult = null;
  try {
    embeddingResult = await generateJobEmbedding(
      job.id,
      jobText
    );
  } catch (error) {
    console.error(
      "Job saved, but embedding generation failed:",
      error
    );
  }
  return {
    ...job,
    embedding: embeddingResult ? {
      dimensions: embeddingResult.dimensions
    } : null
  };
};
var getAllJobsService = async (userId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError(
      "Company profile not found",
      404
    );
  }
  const jobs = await prisma.job.findMany({
    where: {
      companyId: company.id
    },
    include: {
      requiredSkills: true,
      _count: {
        select: {
          jobApplications: true,
          matches: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return jobs;
};
var allJobsService = async () => {
  const jobs = await prisma.job.findMany({
    include: {
      company: true,
      requiredSkills: true,
      _count: {
        select: {
          jobApplications: true,
          matches: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return jobs;
};
var updateJobService = async (userId, jobId, data) => {
  const existingJob = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId
      }
    },
    include: {
      requiredSkills: true
    }
  });
  if (!existingJob) {
    throw createError(
      "Job not found or unauthorized",
      404
    );
  }
  if (data.salaryMin !== void 0 && data.salaryMax !== void 0 && data.salaryMin !== null && data.salaryMax !== null && data.salaryMin > data.salaryMax) {
    throw createError(
      "Minimum salary cannot be greater than maximum salary",
      400
    );
  }
  if (data.deadline) {
    if (data.deadline <= /* @__PURE__ */ new Date()) {
      throw createError(
        "Deadline must be a future date",
        400
      );
    }
  }
  const updateData = {
    ...data.title !== void 0 && {
      title: data.title.trim()
    },
    ...data.description !== void 0 && {
      description: data.description.trim()
    },
    ...data.location !== void 0 && {
      location: data.location.trim()
    },
    ...data.remoteType !== void 0 && {
      remoteType: data.remoteType
    },
    ...data.employmentType !== void 0 && data.employmentType !== "" && {
      employmentType: data.employmentType
    },
    ...data.experienceLevel !== void 0 && data.experienceLevel !== null && {
      experienceLevel: data.experienceLevel
    },
    ...data.salaryMin !== void 0 && {
      salaryMin: data.salaryMin
    },
    ...data.salaryMax !== void 0 && {
      salaryMax: data.salaryMax
    },
    ...data.salaryCurrency !== void 0 && {
      salaryCurrency: data.salaryCurrency
    },
    ...data.deadline !== void 0 && {
      deadline: data.deadline
    },
    ...data.status !== void 0 && {
      status: data.status
    },
    ...data.status === "PUBLISHED" && {
      publishedAt: existingJob.publishedAt ?? /* @__PURE__ */ new Date()
    },
    ...data.status !== "PUBLISHED" && data.status !== void 0 && {
      publishedAt: null
    }
  };
  const updatedJob = await prisma.$transaction(
    async (tx) => {
      if (data.requiredSkills !== void 0) {
        await tx.jobSkill.deleteMany({
          where: {
            jobId
          }
        });
        const skills = data.requiredSkills.map((skill) => {
          if (typeof skill === "string") {
            return {
              name: skill,
              priority: "medium"
            };
          }
          return {
            name: skill.name,
            priority: skill.priority ?? "medium"
          };
        }).map((skill) => ({
          name: skill.name.trim(),
          priority: skill.priority
        })).filter((skill) => Boolean(skill.name));
        if (skills.length > 0) {
          await tx.jobSkill.createMany({
            data: skills.map((skill) => ({
              jobId,
              name: skill.name,
              priority: skill.priority
            }))
          });
        }
      }
      const job = await tx.job.update({
        where: {
          id: jobId
        },
        data: updateData,
        include: {
          company: true,
          matches: true,
          requiredSkills: true,
          _count: {
            select: {
              jobApplications: true,
              matches: true
            }
          }
        }
      });
      return job;
    }
  );
  const skillsText = updatedJob.requiredSkills.map((skill) => skill.name).join(", ");
  const jobText = `
Job Title:
${updatedJob.title}

Job Description:
${updatedJob.description}

Location:
${updatedJob.location}

Remote Type:
${updatedJob.remoteType}

Employment Type:
${updatedJob.employmentType}

Experience Level:
${updatedJob.experienceLevel}

Salary:
${updatedJob.salaryMin !== null || updatedJob.salaryMax !== null ? `${updatedJob.salaryMin ?? "N/A"} - ${updatedJob.salaryMax ?? "N/A"} ${updatedJob.salaryCurrency ?? ""}` : "Not specified"}

Deadline:
${updatedJob.deadline.toISOString()}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();
  console.log(
    "Updated Job embedding text:"
  );
  console.log(jobText);
  let embeddingResult = null;
  try {
    embeddingResult = await generateJobEmbedding(
      updatedJob.id,
      jobText
    );
  } catch (error) {
    console.error(
      "Job updated, but embedding generation failed:",
      error
    );
  }
  return {
    ...updatedJob,
    embedding: embeddingResult ? {
      dimensions: embeddingResult.dimensions
    } : null
  };
};
var deleteJobService = async (userId, jobId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError(
      "Company profile not found",
      404
    );
  }
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id
    }
  });
  if (!job) {
    throw createError(
      "Job not found or you do not own this job",
      404
    );
  }
  await prisma.job.delete({
    where: {
      id: jobId
    }
  });
  return null;
};
var getJobById = async (jobId) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    },
    include: {
      company: true,
      requiredSkills: true,
      _count: {
        select: {
          jobApplications: true,
          matches: true
        }
      }
    }
  });
  if (!job) {
    throw createError("Job not found", 404);
  }
  return job;
};
var publishJob = async (userId, jobId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError(
      "Company profile not found",
      404
    );
  }
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id
    }
  });
  if (!job) {
    throw createError("Job not found", 404);
  }
  if (job.status === JobStatus.PUBLISHED) {
    throw createError(
      "Job is already published",
      400
    );
  }
  if (job.deadline <= /* @__PURE__ */ new Date()) {
    throw createError(
      "Cannot publish a job with an expired deadline",
      400
    );
  }
  return prisma.job.update({
    where: {
      id: jobId
    },
    data: {
      status: JobStatus.PUBLISHED,
      publishedAt: /* @__PURE__ */ new Date(),
      closedAt: null
    },
    include: {
      company: true,
      requiredSkills: true
    }
  });
};
var closeJob = async (userId, jobId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError(
      "Company profile not found",
      404
    );
  }
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id
    }
  });
  if (!job) {
    throw createError("Job not found", 404);
  }
  if (job.status === JobStatus.CLOSED) {
    throw createError(
      "Job is already closed",
      400
    );
  }
  return prisma.job.update({
    where: {
      id: jobId
    },
    data: {
      status: JobStatus.CLOSED,
      closedAt: /* @__PURE__ */ new Date()
    },
    include: {
      company: true,
      requiredSkills: true
    }
  });
};
var duplicateJob = async (userId, jobId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw createError(
      "Company profile not found",
      404
    );
  }
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id
    },
    include: {
      requiredSkills: true
    }
  });
  if (!job) {
    throw createError("Job not found", 404);
  }
  const duplicateDeadline = /* @__PURE__ */ new Date();
  duplicateDeadline.setDate(
    duplicateDeadline.getDate() + 30
  );
  const duplicatedJob = await prisma.job.create({
    data: {
      companyId: company.id,
      title: `${job.title} - Copy`,
      description: job.description,
      location: job.location,
      remoteType: job.remoteType,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      deadline: duplicateDeadline,
      status: JobStatus.DRAFT,
      publishedAt: null,
      closedAt: null,
      requiredSkills: {
        create: job.requiredSkills.map(
          (skill) => ({
            name: skill.name,
            priority: skill.priority
          })
        )
      }
    },
    include: {
      requiredSkills: true,
      company: true
    }
  });
  return duplicatedJob;
};
var searchJobs = async (query) => {
  const params = searchJobSchema.parse(query);
  const {
    keyword,
    location,
    skills,
    salaryMin,
    salaryMax,
    experience,
    remote,
    employmentType,
    companyId,
    page,
    limit,
    sortBy,
    sortOrder
  } = params;
  const currentPage = Math.max(
    page ?? 1,
    1
  );
  const currentLimit = Math.min(
    Math.max(limit ?? 10, 1),
    100
  );
  const skip = (currentPage - 1) * currentLimit;
  const where = {
    status: JobStatus.PUBLISHED
  };
  if (keyword?.trim()) {
    const search = keyword.trim();
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive"
        }
      },
      {
        description: {
          contains: search,
          mode: "insensitive"
        }
      },
      {
        company: {
          name: {
            contains: search,
            mode: "insensitive"
          }
        }
      },
      {
        requiredSkills: {
          some: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      }
    ];
  }
  if (location?.trim()) {
    where.location = {
      contains: location.trim(),
      mode: "insensitive"
    };
  }
  if (remote) {
    where.remoteType = remote;
  }
  if (experience) {
    where.experienceLevel = experience;
  }
  if (employmentType) {
    where.employmentType = employmentType;
  }
  if (companyId) {
    where.companyId = companyId;
  }
  if (skills?.trim()) {
    const skillList = skills.split(",").map((skill) => skill.trim()).filter(Boolean);
    if (skillList.length > 0) {
      const skillConditions = skillList.map((skill) => ({
        requiredSkills: {
          some: {
            name: {
              contains: skill,
              mode: "insensitive"
            }
          }
        }
      }));
      where.AND = [
        ...Array.isArray(where.AND) ? where.AND : [],
        ...skillConditions
      ];
    }
  }
  if (salaryMin !== void 0) {
    where.salaryMax = {
      gte: salaryMin
    };
  }
  if (salaryMax !== void 0) {
    where.salaryMin = {
      lte: salaryMax
    };
  }
  const allowedSortFields = [
    "createdAt",
    "publishedAt",
    "salaryMin",
    "salaryMax",
    "title"
  ];
  const safeSortBy = allowedSortFields.includes(
    sortBy
  ) ? sortBy : "createdAt";
  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";
  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take: currentLimit,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            website: true
          }
        },
        requiredSkills: true,
        _count: {
          select: {
            jobApplications: true,
            matches: true
          }
        }
      },
      orderBy: {
        [safeSortBy]: safeSortOrder
      }
    }),
    prisma.job.count({
      where
    })
  ]);
  const totalPages = Math.ceil(
    total / currentLimit
  );
  return {
    jobs,
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  };
};
var jobServices = {
  createJobService,
  updateJobService,
  deleteJobService,
  getAllJobsService,
  getJobById,
  publishJob,
  closeJob,
  duplicateJob,
  searchJobs,
  allJobsService
};

// src/app/modules/company/createJob/job.controller.ts
var createJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const validatedData = createJobSchema.parse(req.body);
    const job = await jobServices.createJobService(userId, validatedData);
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create job"
    });
  }
};
var getAllJobs = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const jobs = await jobServices.getAllJobsService(userId);
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch jobs"
    });
  }
};
var allJobs = async (req, res) => {
  try {
    const jobs = await jobServices.allJobsService();
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch jobs"
    });
  }
};
var updateJob = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const updatedJob = await jobServices.updateJobService(userId, String(id), req.body);
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update job"
    });
  }
};
var deleteJob = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await jobServices.deleteJobService(userId, String(id));
    const responseMessage = result && typeof result === "object" && "message" in result ? String(result.message) : "Job deleted successfully";
    res.status(200).json({
      success: true,
      message: responseMessage
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete job"
    });
  }
};
var getJobById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await jobServices.getJobById(String(id));
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var publishJob2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await jobServices.publishJob(
      userId,
      String(id)
    );
    res.status(200).json({
      success: true,
      message: "Job published successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var closeJob2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await jobServices.closeJob(
      userId,
      String(id)
    );
    res.status(200).json({
      success: true,
      message: "Job closed successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var duplicateJob2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await jobServices.duplicateJob(
      userId,
      String(id)
    );
    res.status(201).json({
      success: true,
      message: "Job duplicated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var searchJobs2 = async (req, res) => {
  try {
    const result = await jobServices.searchJobs(req.query);
    res.status(200).json({
      success: true,
      message: "Jobs searched successfully",
      data: result.jobs,
      pagination: result.pagination
    });
  } catch (error) {
    console.error("========== SEARCH JOB ERROR ==========");
    console.error(error);
    console.error("======================================");
    console.error("Search jobs error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to search jobs"
    });
  }
};
var jobController = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobById: getJobById2,
  publishJob: publishJob2,
  closeJob: closeJob2,
  duplicateJob: duplicateJob2,
  searchJobs: searchJobs2,
  allJobs
};

// src/app/modules/company/createJob/job.route.ts
var router5 = Router5();
router5.post("/create", checkAuth(Role.RECRUITER), jobController.createJob);
router5.get("/my-jobs", checkAuth(), jobController.getAllJobs);
router5.get("/candidate", jobController.allJobs);
router5.patch("/:id", checkAuth(), jobController.updateJob);
router5.delete("/:id", checkAuth(), jobController.deleteJob);
router5.get(
  "/:id",
  checkAuth(),
  jobController.getJobById
);
router5.get(
  "/my/search",
  jobController.searchJobs
);
router5.patch(
  "/:id/publish",
  checkAuth(),
  jobController.publishJob
);
router5.patch(
  "/:id/close",
  checkAuth(),
  jobController.closeJob
);
router5.post(
  "/:id/duplicate",
  checkAuth(),
  jobController.duplicateJob
);
var jobRouters = router5;

// src/app/modules/company/jobSkills/job.router.ts
import { Router as Router6 } from "express";

// src/app/modules/company/jobSkills/job.services.ts
var createJobSkillService = async (userId, data) => {
  const job = await prisma.job.findFirst({
    where: {
      id: data.jobId,
      company: { userId }
    }
  });
  if (!job) {
    const error = new Error("Job not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }
  if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
    const skillsToCreate = data.skills.map((skill) => ({
      jobId: data.jobId,
      name: skill.name,
      priority: skill.priority || "medium"
    }));
    return await prisma.jobSkill.createMany({
      data: skillsToCreate
    });
  }
  if (!data.name) {
    const error = new Error("Skill name or skills array is required");
    error.statusCode = 400;
    throw error;
  }
  return await prisma.jobSkill.create({
    data: {
      jobId: data.jobId,
      name: data.name,
      priority: data.priority || "medium"
    }
  });
};
var getSkillsByJobIdService = async (jobId) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId }
  });
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.jobSkill.findMany({
    where: { jobId }
  });
};
var updateJobSkillService = async (userId, skillId, data) => {
  if (!data) {
    const error = new Error("Invalid request payload");
    error.statusCode = 400;
    throw error;
  }
  const skill = await prisma.jobSkill.findFirst({
    where: {
      id: skillId,
      job: {
        company: { userId }
      }
    }
  });
  if (!skill) {
    const error = new Error("Skill not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.jobSkill.update({
    where: { id: skillId },
    data: {
      name: data.name ?? skill.name,
      priority: data.priority ?? skill.priority
    }
  });
};
var deleteJobSkillService = async (userId, skillId) => {
  const skill = await prisma.jobSkill.findFirst({
    where: {
      id: skillId,
      job: {
        company: { userId }
      }
    }
  });
  if (!skill) {
    const error = new Error("Skill not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }
  await prisma.jobSkill.delete({
    where: { id: skillId }
  });
  return { message: "Job skill deleted successfully" };
};
var getAllJobSkillService = async () => {
  const skills = await prisma.jobSkill.findMany({
    include: {
      job: true
      // Optional: includes related job data
    }
  });
  return {
    skills,
    message: "All skills fetched successfully"
  };
};
var jobSkillServices = {
  createJobSkillService,
  getSkillsByJobIdService,
  updateJobSkillService,
  deleteJobSkillService,
  getAllJobSkillService
};

// src/app/modules/company/jobSkills/jobSkill.controller.ts
var createJobSkill = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const skill = await jobSkillServices.createJobSkillService(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Skill added to job successfully",
      data: skill
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to add skill"
    });
  }
};
var getSkillsByJobId = async (req, res) => {
  try {
    const jobId = Array.isArray(req.params.jobId) ? req.params.jobId[0] : req.params.jobId;
    if (!jobId) {
      throw new Error("Job ID is required");
    }
    const skills = await jobSkillServices.getSkillsByJobIdService(jobId);
    res.status(200).json({
      success: true,
      message: "Job skills retrieved successfully",
      data: skills
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch skills"
    });
  }
};
var updateJobSkill = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Request body cannot be empty" });
    }
    if (!id) {
      throw new Error("Job ID is required");
    }
    const updatedSkill = await jobSkillServices.updateJobSkillService(
      userId,
      id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update skill"
    });
  }
};
var deleteJobSkill = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!id) {
      throw new Error("Job ID is required");
    }
    const result = await jobSkillServices.deleteJobSkillService(userId, id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete skill"
    });
  }
};
var getAllJobs2 = async (req, res) => {
  try {
    const result = await jobSkillServices.getAllJobSkillService();
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.skills
      // Attach the skills data array here
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch skills"
    });
  }
};
var jobSkillController = {
  createJobSkill,
  getSkillsByJobId,
  updateJobSkill,
  deleteJobSkill,
  getAllJobs: getAllJobs2
};

// src/app/modules/company/jobSkills/job.router.ts
var router6 = Router6();
router6.post("/create", checkAuth(Role.RECRUITER), jobSkillController.createJobSkill);
router6.get("/job/:jobId", jobSkillController.getSkillsByJobId);
router6.get("/allJobs", jobSkillController.getAllJobs);
router6.patch("/:id", checkAuth(), jobSkillController.updateJobSkill);
router6.delete("/:id", checkAuth(), jobSkillController.deleteJobSkill);
var jobSkillRouters = router6;

// src/app/modules/skillGap/skillGap.routes.ts
import { Router as Router7 } from "express";

// src/app/modules/skillGap/skillGap.service.ts
var analyzeSkillGap = async (userId, jobId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    include: {
      skills: true
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      candidateId: candidate.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    },
    include: {
      requiredSkills: true
    }
  });
  if (!job) {
    throw new Error("Job not found");
  }
  const similarityResult = await prisma.$queryRaw`
    SELECT
      1 - (r.embedding <=> j.embedding) AS similarity
    FROM "resumes" r
    CROSS JOIN "Job" j
    WHERE r.id = ${resume.id}
      AND j.id = ${job.id}
  `;
  const similarityValue = similarityResult[0]?.similarity;
  if (similarityValue === null || similarityValue === void 0) {
    throw new Error(
      "Resume or job embedding not found. Generate embeddings first."
    );
  }
  const similarity = similarityValue;
  const normalizedSimilarity = Math.max(
    0,
    Math.min(1, Number(similarity))
  );
  const semanticMatchPercentage = Math.round(
    normalizedSimilarity * 100
  );
  const candidateSkills = candidate.skills.map(
    (skill) => skill.name.trim().toLowerCase()
  );
  const uniqueCandidateSkills = [
    ...new Set(candidateSkills)
  ];
  const jobSkills = job.requiredSkills.map((skill) => ({
    id: skill.id,
    name: skill.name.trim(),
    normalizedName: skill.name.trim().toLowerCase(),
    priority: skill.priority.trim().toLowerCase()
  }));
  const matchedSkills = jobSkills.filter(
    (jobSkill) => uniqueCandidateSkills.includes(jobSkill.normalizedName)
  );
  const missingSkills = jobSkills.filter(
    (jobSkill) => !uniqueCandidateSkills.includes(jobSkill.normalizedName)
  );
  const totalRequiredSkills = jobSkills.length;
  const matchedSkillCount = matchedSkills.length;
  const skillMatchPercentage = totalRequiredSkills === 0 ? 0 : Math.round(
    matchedSkillCount / totalRequiredSkills * 100
  );
  const highPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "high"
  );
  const mediumPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "medium"
  );
  const lowPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "low"
  );
  const learningPath = [
    ...highPrioritySkills,
    ...mediumPrioritySkills,
    ...lowPrioritySkills
  ].map((skill, index) => ({
    order: index + 1,
    skill: skill.name,
    priority: skill.priority
  }));
  const overallMatchPercentage = Math.round(
    semanticMatchPercentage * 0.6 + skillMatchPercentage * 0.4
  );
  return {
    overallMatchPercentage,
    semanticMatchPercentage,
    skillMatchPercentage,
    matchedSkills: matchedSkills.map(
      (skill) => skill.name
    ),
    missingSkills: {
      high: highPrioritySkills.map(
        (skill) => skill.name
      ),
      medium: mediumPrioritySkills.map(
        (skill) => skill.name
      ),
      low: lowPrioritySkills.map(
        (skill) => skill.name
      )
    },
    learningPath
  };
};

// src/app/modules/skillGap/skillGap.controller.ts
var analyzeSkillGap2 = async (req, res) => {
  const userId = req.user?.userId;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  const result = await analyzeSkillGap(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    data: result
  });
};

// src/app/modules/skillGap/skillGap.routes.ts
var router7 = Router7();
router7.get(
  "/:jobId",
  checkAuth(Role.CANDIDATE),
  analyzeSkillGap2
);
var skillGapRouter = router7;

// src/app/modules/jobMatched/job.router.ts
import { Router as Router8 } from "express";

// src/app/modules/jobMatched/job.services.ts
var normalizeSkill = (skill) => {
  return skill.toLowerCase().trim().replace(/\./g, "").replace(/\s+/g, " ");
};
var calculateSkillScore = (candidateSkills, requiredSkills) => {
  if (requiredSkills.length === 0) {
    return {
      score: 100,
      matchedSkills: [],
      missingSkills: {
        high: [],
        medium: [],
        low: []
      }
    };
  }
  const candidateSkillSet = new Set(
    candidateSkills.map(normalizeSkill)
  );
  const matchedSkills = [];
  const missingSkills = {
    high: [],
    medium: [],
    low: []
  };
  let totalWeight = 0;
  let matchedWeight = 0;
  for (const skill of requiredSkills) {
    const priority = skill.priority.toLowerCase();
    let weight = 1;
    if (priority === "high") {
      weight = 3;
    } else if (priority === "medium") {
      weight = 2;
    }
    totalWeight += weight;
    const normalizedSkill = normalizeSkill(skill.name);
    if (candidateSkillSet.has(normalizedSkill)) {
      matchedSkills.push(skill.name);
      matchedWeight += weight;
    } else {
      if (priority === "high") {
        missingSkills.high.push(skill.name);
      } else if (priority === "medium") {
        missingSkills.medium.push(skill.name);
      } else {
        missingSkills.low.push(skill.name);
      }
    }
  }
  const score = totalWeight === 0 ? 0 : Math.round(matchedWeight / totalWeight * 100);
  return {
    score,
    matchedSkills,
    missingSkills
  };
};
var calculateExperienceScore = (candidateExperience, requiredExperience) => {
  if (requiredExperience === null || requiredExperience <= 0) {
    return 100;
  }
  if (candidateExperience >= requiredExperience) {
    return 100;
  }
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        candidateExperience / requiredExperience * 100
      )
    )
  );
};
var calculateEducationScore = (candidateEducation, requiredEducation) => {
  if (!requiredEducation) {
    return 100;
  }
  if (!candidateEducation) {
    return 0;
  }
  const candidate = candidateEducation.toLowerCase();
  const required = requiredEducation.toLowerCase();
  if (candidate.includes(required)) {
    return 100;
  }
  return 50;
};
var calculateKeywordScore = (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) {
    return 0;
  }
  const stopWords = /* @__PURE__ */ new Set([
    "the",
    "and",
    "for",
    "with",
    "this",
    "that",
    "from",
    "have",
    "will",
    "your",
    "you",
    "are",
    "our",
    "job",
    "work",
    "years",
    "year",
    "about",
    "into",
    "their",
    "they",
    "them",
    "also",
    "using",
    "used",
    "looking",
    "role"
  ]);
  const jobWords = jobDescription.toLowerCase().split(/\W+/).filter(
    (word) => word.length > 3 && !stopWords.has(word)
  );
  const uniqueJobWords = [...new Set(jobWords)];
  const resume = resumeText.toLowerCase();
  const matched = uniqueJobWords.filter(
    (word) => resume.includes(word)
  );
  if (uniqueJobWords.length === 0) {
    return 0;
  }
  return Math.round(
    matched.length / uniqueJobWords.length * 100
  );
};
var generateRecommendation = (overallScore, skillsScore, missingSkills) => {
  const highMissing = missingSkills.high.length;
  if (overallScore >= 90 && skillsScore >= 85 && highMissing === 0) {
    return "Excellent Match \u2014 Strongly recommended";
  }
  if (overallScore >= 80 && skillsScore >= 70 && highMissing <= 1) {
    return "Strong Match \u2014 Recommended to apply";
  }
  if (overallScore >= 65 && skillsScore >= 50) {
    return "Moderate Match \u2014 Apply if interested";
  }
  if (overallScore >= 50 || skillsScore >= 40) {
    return "Weak Match \u2014 Consider improving missing skills first";
  }
  return "Poor Match \u2014 Not recommended for this position";
};
var getMatchLevel = (overallScore) => {
  if (overallScore >= 90) {
    return "excellent";
  }
  if (overallScore >= 80) {
    return "strong";
  }
  if (overallScore >= 65) {
    return "moderate";
  }
  if (overallScore >= 50) {
    return "weak";
  }
  return "poor";
};
var calculateJobMatch = async (userId, jobId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    include: {
      skills: true,
      education: true,
      resumes: {
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      }
    }
  });
  if (!candidate) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    },
    include: {
      requiredSkills: true
    }
  });
  if (!job) {
    throw new Error("Job not found");
  }
  const resume = candidate.resumes[0];
  if (!resume) {
    throw new Error(
      "Please upload a resume before matching"
    );
  }
  const semanticResult = await prisma.$queryRaw`
      SELECT
        1 - (r.embedding <=> j.embedding) AS similarity
      FROM "resumes" r
      CROSS JOIN "Job" j
      WHERE r.id = ${resume.id}
        AND j.id = ${job.id}
        AND r.embedding IS NOT NULL
        AND j.embedding IS NOT NULL
    `;
  if (!semanticResult.length) {
    throw new Error(
      "Resume or job embedding not found"
    );
  }
  const rawSimilarity = Number(
    semanticResult[0]?.similarity ?? 0
  );
  const semanticScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(rawSimilarity * 100)
    )
  );
  const candidateSkills = candidate.skills.map(
    (skill) => skill.name
  );
  const requiredSkills = job.requiredSkills.map(
    (skill) => ({
      name: skill.name,
      priority: skill.priority
    })
  );
  const skillResult = calculateSkillScore(
    candidateSkills,
    requiredSkills
  );
  const candidateExperience = 0;
  const requiredExperience = null;
  const experienceScore = calculateExperienceScore(
    candidateExperience,
    requiredExperience
  );
  const candidateEducation = candidate.education?.[0]?.degree ?? "";
  const requiredEducation = null;
  const educationScore = calculateEducationScore(
    candidateEducation,
    requiredEducation
  );
  const keywordScore = calculateKeywordScore(
    resume.rawText ?? "",
    job.description ?? ""
  );
  const overallScore = Math.round(
    semanticScore * 0.4 + skillResult.score * 0.3 + experienceScore * 0.15 + educationScore * 0.1 + keywordScore * 0.05
  );
  const recommendation = generateRecommendation(
    overallScore,
    skillResult.score,
    skillResult.missingSkills
  );
  const matchLevel = getMatchLevel(overallScore);
  const jobMatch = await prisma.jobMatch.upsert({
    where: {
      candidateId_jobId: {
        candidateId: candidate.id,
        jobId: job.id
      }
    },
    update: {
      overallScore,
      semanticScore,
      skillsScore: skillResult.score,
      experienceScore,
      educationScore,
      keywordScore,
      matchedSkills: skillResult.matchedSkills,
      missingSkills: skillResult.missingSkills,
      recommendation
    },
    create: {
      candidateId: candidate.id,
      jobId: job.id,
      overallScore,
      semanticScore,
      skillsScore: skillResult.score,
      experienceScore,
      educationScore,
      keywordScore,
      matchedSkills: skillResult.matchedSkills,
      missingSkills: skillResult.missingSkills,
      recommendation
    }
  });
  return {
    jobMatchId: jobMatch.id,
    overallMatchPercentage: overallScore,
    semanticMatchPercentage: semanticScore,
    skillMatchPercentage: skillResult.score,
    experienceMatchPercentage: experienceScore,
    educationMatchPercentage: educationScore,
    keywordMatchPercentage: keywordScore,
    matchedSkills: skillResult.matchedSkills,
    missingSkills: skillResult.missingSkills,
    recommendation,
    matchLevel
  };
};
var getMyJobMatch = async (userId, jobId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
  if (!candidate) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const jobMatch = await prisma.jobMatch.findUnique({
    where: {
      candidateId_jobId: {
        candidateId: candidate.id,
        jobId
      }
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          description: true
        }
      }
    }
  });
  if (!jobMatch) {
    throw new Error(
      "Job match not found. Calculate the match first."
    );
  }
  return {
    jobMatchId: jobMatch.id,
    job: jobMatch.job,
    overallMatchPercentage: jobMatch.overallScore,
    semanticMatchPercentage: jobMatch.semanticScore,
    skillMatchPercentage: jobMatch.skillsScore,
    experienceMatchPercentage: jobMatch.experienceScore,
    educationMatchPercentage: jobMatch.educationScore,
    keywordMatchPercentage: jobMatch.keywordScore,
    matchedSkills: jobMatch.matchedSkills,
    missingSkills: jobMatch.missingSkills,
    recommendation: jobMatch.recommendation,
    matchLevel: getMatchLevel(
      jobMatch.overallScore
    ),
    createdAt: jobMatch.createdAt,
    updatedAt: jobMatch.updatedAt
  };
};
var getMyJobMatches = async (userId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
  if (!candidate) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const jobMatches = await prisma.jobMatch.findMany({
    where: {
      candidateId: candidate.id
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          description: true
        }
      }
    },
    orderBy: {
      overallScore: "desc"
    }
  });
  return jobMatches.map((match) => ({
    jobMatchId: match.id,
    job: match.job,
    overallMatchPercentage: match.overallScore,
    semanticMatchPercentage: match.semanticScore,
    skillMatchPercentage: match.skillsScore,
    experienceMatchPercentage: match.experienceScore,
    educationMatchPercentage: match.educationScore,
    keywordMatchPercentage: match.keywordScore,
    matchedSkills: match.matchedSkills,
    missingSkills: match.missingSkills,
    recommendation: match.recommendation,
    matchLevel: getMatchLevel(
      match.overallScore
    ),
    createdAt: match.createdAt,
    updatedAt: match.updatedAt
  }));
};
var getJobMatches = async (userId, jobId) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId
      }
    },
    select: {
      id: true,
      title: true
    }
  });
  if (!job) {
    throw new Error(
      "Job not found or you are not authorized to view its matches"
    );
  }
  const matches = await prisma.jobMatch.findMany({
    where: {
      jobId
    },
    include: {
      candidate: {
        select: {
          id: true,
          phone: true,
          location: true,
          experience: true,
          linkedin: true,
          github: true,
          portfolio: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    },
    orderBy: {
      overallScore: "desc"
    }
  });
  return {
    job,
    totalCandidates: matches.length,
    matches: matches.map((match) => ({
      jobMatchId: match.id,
      candidate: match.candidate,
      overallMatchPercentage: match.overallScore,
      semanticMatchPercentage: match.semanticScore,
      skillMatchPercentage: match.skillsScore,
      experienceMatchPercentage: match.experienceScore,
      educationMatchPercentage: match.educationScore,
      keywordMatchPercentage: match.keywordScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      recommendation: match.recommendation,
      matchLevel: getMatchLevel(
        match.overallScore
      )
    }))
  };
};
var getJobMatchSummary = async (userId, jobId) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId
      }
    },
    select: {
      id: true,
      title: true
    }
  });
  if (!job) {
    throw new Error(
      "Job not found or you are not authorized"
    );
  }
  const matches = await prisma.jobMatch.findMany({
    where: {
      jobId
    },
    select: {
      overallScore: true,
      semanticScore: true,
      skillsScore: true,
      experienceScore: true,
      educationScore: true,
      keywordScore: true,
      matchedSkills: true,
      missingSkills: true
    }
  });
  if (matches.length === 0) {
    return {
      job,
      totalCandidates: 0,
      averageOverallScore: 0,
      averageSemanticScore: 0,
      averageSkillScore: 0,
      excellentMatches: 0,
      strongMatches: 0,
      moderateMatches: 0,
      weakMatches: 0,
      poorMatches: 0,
      topCandidates: []
    };
  }
  const average = (values) => {
    return Math.round(
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length
    );
  };
  const excellentMatches = matches.filter(
    (match) => match.overallScore >= 90
  ).length;
  const strongMatches = matches.filter(
    (match) => match.overallScore >= 80 && match.overallScore < 90
  ).length;
  const moderateMatches = matches.filter(
    (match) => match.overallScore >= 65 && match.overallScore < 80
  ).length;
  const weakMatches = matches.filter(
    (match) => match.overallScore >= 50 && match.overallScore < 65
  ).length;
  const poorMatches = matches.filter(
    (match) => match.overallScore < 50
  ).length;
  const sortedMatches = [...matches].sort(
    (a, b) => b.overallScore - a.overallScore
  );
  return {
    job,
    totalCandidates: matches.length,
    averageOverallScore: average(
      matches.map(
        (match) => match.overallScore
      )
    ),
    averageSemanticScore: average(
      matches.map(
        (match) => match.semanticScore
      )
    ),
    averageSkillScore: average(
      matches.map(
        (match) => match.skillsScore
      )
    ),
    excellentMatches,
    strongMatches,
    moderateMatches,
    weakMatches,
    poorMatches,
    topCandidates: sortedMatches.slice(0, 10).map((match) => ({
      overallScore: match.overallScore,
      semanticScore: match.semanticScore,
      skillsScore: match.skillsScore,
      experienceScore: match.experienceScore,
      educationScore: match.educationScore,
      keywordScore: match.keywordScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      matchLevel: getMatchLevel(
        match.overallScore
      )
    }))
  };
};
var deleteJobMatch = async (userId, jobId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
  if (!candidate) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const jobMatch = await prisma.jobMatch.findUnique({
    where: {
      candidateId_jobId: {
        candidateId: candidate.id,
        jobId
      }
    }
  });
  if (!jobMatch) {
    throw new Error(
      "Job match not found"
    );
  }
  await prisma.jobMatch.delete({
    where: {
      id: jobMatch.id
    }
  });
  return true;
};

// src/app/modules/jobMatched/job.controller.ts
var calculateJobMatch2 = async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  const result = await calculateJobMatch(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    message: "Job match calculated successfully",
    data: result
  });
};
var getMyJobMatch2 = async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  const result = await getMyJobMatch(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    data: result
  });
};
var getMyJobMatches2 = async (req, res) => {
  const userId = req.user.userId;
  const result = await getMyJobMatches(
    userId
  );
  return res.status(200).json({
    success: true,
    data: result
  });
};
var getJobMatches2 = async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  const result = await getJobMatches(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    data: result
  });
};
var getJobMatchSummary2 = async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  const result = await getJobMatchSummary(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    data: result
  });
};
var deleteJobMatch2 = async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required"
    });
  }
  await deleteJobMatch(
    userId,
    jobId
  );
  return res.status(200).json({
    success: true,
    message: "Job match deleted successfully"
  });
};

// src/app/modules/jobMatched/job.router.ts
var router8 = Router8();
router8.get(
  "/job/:jobId",
  checkAuth(Role.RECRUITER),
  getJobMatches2
);
router8.post(
  "/:jobId/calculate",
  checkAuth(Role.CANDIDATE),
  calculateJobMatch2
);
router8.get(
  "/all/me",
  checkAuth(Role.CANDIDATE),
  getMyJobMatches2
);
router8.get(
  "/:jobId",
  checkAuth(Role.CANDIDATE),
  getMyJobMatch2
);
router8.get(
  "/:jobId/summary",
  checkAuth(Role.CANDIDATE),
  getJobMatchSummary2
);
router8.delete(
  "/:jobId",
  checkAuth(Role.CANDIDATE),
  deleteJobMatch2
);
var jobMatchRouter = router8;

// src/app/modules/Application/candidate/application.router.ts
import { Router as Router9 } from "express";

// src/app/modules/Application/candidate/application.controller.ts
import status11 from "http-status";

// src/app/modules/Application/candidate/application.service.ts
var applyToJob = async (userId, jobId) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    }
  });
  if (!job) {
    throw new AppError_default(404, "Job not found");
  }
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new AppError_default(
      404,
      "Candidate profile not found. Please complete your profile first."
    );
  }
  const existingApplication = await prisma.jobApplication.findUnique({
    where: {
      candidateProfileId_jobId: {
        candidateProfileId: candidateProfile.id,
        jobId
      }
    }
  });
  if (existingApplication) {
    throw new AppError_default(
      409,
      "You have already applied to this job"
    );
  }
  const application = await prisma.jobApplication.create({
    data: {
      candidateProfileId: candidateProfile.id,
      jobId
    },
    include: {
      job: {
        include: {
          company: true
        }
      },
      candidateProfile: true
    }
  });
  return application;
};
var getMyApplications = async (candidateProfileId) => {
  const applications = await prisma.jobApplication.findMany({
    where: {
      candidateProfileId
    },
    include: {
      job: {
        include: {
          company: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return applications;
};
var getMyApplicationById = async (candidateProfileId, applicationId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      candidateProfileId
    },
    include: {
      job: {
        include: {
          company: true,
          requiredSkills: true
        }
      }
    }
  });
  if (!application) {
    throw new AppError_default(
      404,
      "Application not found"
    );
  }
  return application;
};
var deleteMyApplication = async (candidateProfileId, applicationId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      candidateProfileId
    }
  });
  if (!application) {
    throw new AppError_default(
      404,
      "Application not found"
    );
  }
  const now = Date.now();
  const createdAt = application.createdAt.getTime();
  const eightHours = 8 * 60 * 60 * 1e3;
  if (now - createdAt > eightHours) {
    throw new AppError_default(
      403,
      "You can delete your application only within 8 hours"
    );
  }
  await prisma.jobApplication.delete({
    where: {
      id: applicationId
    }
  });
  return null;
};

// src/app/modules/Application/candidate/application.controller.ts
var applyToJobController = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user.userId;
  const result = await applyToJob(
    userId,
    jobId
  );
  sendResponse(res, {
    httpStatusCode: status11.CREATED,
    success: true,
    message: "Job application submitted successfully",
    data: result
  });
};
var getMyApplicationsController = async (req, res) => {
  const candidateProfileId = req.user.candidateProfile;
  const result = await getMyApplications(candidateProfileId);
  sendResponse(res, {
    httpStatusCode: status11.OK,
    success: true,
    message: "Applications retrieved successfully",
    data: result
  });
};
var getMyApplicationControllerById = async (req, res) => {
  const applicationId = String(req.params.applicationId);
  const candidateProfileId = req.user.candidateProfile;
  const result = await getMyApplicationById(
    candidateProfileId,
    applicationId
  );
  sendResponse(res, {
    httpStatusCode: status11.OK,
    success: true,
    message: "Application retrieved successfully",
    data: result
  });
};
var deleteMyApplicationController = async (req, res) => {
  const applicationId = String(req.params.applicationId);
  const candidateProfileId = req.user.userId;
  await deleteMyApplication(
    candidateProfileId,
    applicationId
  );
  sendResponse(res, {
    httpStatusCode: status11.OK,
    success: true,
    message: "Application deleted successfully",
    data: null
  });
};

// src/app/modules/Application/candidate/application.router.ts
var router9 = Router9();
router9.post(
  "/apply",
  checkAuth(Role.CANDIDATE),
  applyToJobController
);
router9.get(
  "/my/application",
  checkAuth(Role.CANDIDATE),
  getMyApplicationsController
);
router9.get(
  "/my/:applicationId",
  checkAuth(Role.CANDIDATE),
  getMyApplicationControllerById
);
router9.delete(
  "/:applicationId",
  checkAuth(Role.CANDIDATE),
  deleteMyApplicationController
);
var candidateApplication = router9;

// src/app/modules/Application/recruter/application.router.ts
import { Router as Router10 } from "express";

// src/app/modules/Application/recruter/application.services.ts
var getJobApplicationsForRecruiter = async (userId, jobId) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId
      }
    }
  });
  if (!job) {
    throw new AppError_default(
      404,
      "Job not found or you don't have access"
    );
  }
  const applications = await prisma.jobApplication.findMany({
    where: {
      jobId
    },
    include: {
      candidateProfile: {
        include: {
          skills: true,
          education: true,
          projects: true,
          certifications: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return applications;
};
var getRecruiterApplicationById = async (userId, applicationId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        company: {
          userId
        }
      }
    },
    include: {
      candidateProfile: {
        include: {
          skills: true,
          education: true,
          projects: true,
          certifications: true
        }
      },
      job: {
        include: {
          company: true,
          requiredSkills: true
        }
      }
    }
  });
  if (!application) {
    throw new AppError_default(
      404,
      "Application not found or unauthorized"
    );
  }
  return application;
};
var updateApplicationStatus = async (userId, applicationId, status19) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        company: {
          userId
        }
      }
    }
  });
  if (!application) {
    throw new AppError_default(
      404,
      "Application not found or unauthorized"
    );
  }
  const updatedApplication = await prisma.jobApplication.update({
    where: {
      id: applicationId
    },
    data: {
      status: status19
    },
    include: {
      candidateProfile: true,
      job: {
        include: {
          company: true
        }
      }
    }
  });
  return updatedApplication;
};
var deleteRecruiterApplication = async (userId, applicationId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        company: {
          userId
        }
      }
    }
  });
  if (!application) {
    throw new AppError_default(
      404,
      "Application not found or unauthorized"
    );
  }
  await prisma.jobApplication.delete({
    where: {
      id: applicationId
    }
  });
  return null;
};
var getCompanyApplications = async (userId) => {
  const applications = await prisma.jobApplication.findMany({
    where: {
      job: {
        company: {
          userId
        }
      }
    },
    include: {
      candidateProfile: true,
      job: {
        include: {
          company: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return applications;
};

// src/app/modules/Application/recruter/application.controller.ts
import status12 from "http-status";
var getJobApplicationsController = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user.userId;
  const result = await getJobApplicationsForRecruiter(
    userId,
    jobId
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Job applications retrieved successfully",
    data: result
  });
};
var getRecruiterApplicationControllerById = async (req, res) => {
  const applicationId = req.params.applicationId;
  const userId = req.user.userId;
  const result = await getRecruiterApplicationById(
    userId,
    applicationId
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Application retrieved successfully",
    data: result
  });
};
var updateApplicationStatusController = async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status: applicationStatus } = req.body;
  const userId = req.user.id;
  const result = await updateApplicationStatus(
    userId,
    applicationId,
    applicationStatus
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Application status updated successfully",
    data: result
  });
};
var deleteRecruiterApplicationController = async (req, res) => {
  const applicationId = req.params.applicationId;
  const userId = req.user.id;
  await deleteRecruiterApplication(
    userId,
    applicationId
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Application deleted successfully",
    data: null
  });
};
var getCompanyApplicationsController = async (req, res) => {
  const userId = req.user.id;
  const result = await getCompanyApplications(userId);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Company applications retrieved successfully",
    data: result
  });
};

// src/app/modules/Application/recruter/application.router.ts
var router10 = Router10();
router10.get(
  "/recruiter/applications",
  checkAuth("RECRUITER"),
  getCompanyApplicationsController
);
router10.get(
  "/recruiter/jobs/:jobId/applications",
  checkAuth("RECRUITER"),
  getJobApplicationsController
);
router10.get(
  "/recruiter/applications/:applicationId",
  checkAuth("RECRUITER"),
  getRecruiterApplicationControllerById
);
router10.patch(
  "/recruiter/applications/:applicationId/status",
  checkAuth("RECRUITER"),
  updateApplicationStatusController
);
router10.delete(
  "/recruiter/applications/:applicationId",
  checkAuth("RECRUITER"),
  deleteRecruiterApplicationController
);
var recruiterApplication = router10;

// src/app/modules/applicationStatusHistory/applicationStatusHistory.route.ts
import { Router as Router11 } from "express";

// src/app/modules/applicationStatusHistory/applicationStatusHistory.controller.ts
import httpStatus from "http-status";

// src/app/modules/applicationStatusHistory/applicationStatusHistory.service.ts
var changeApplicationStatus = async (applicationId, newStatus, changedById) => {
  return await prisma.$transaction(async (tx) => {
    const application = await tx.jobApplication.findUnique({
      where: {
        id: applicationId
      }
    });
    if (!application) {
      throw new Error("Job application not found");
    }
    if (application.status === newStatus) {
      throw new Error(
        `Application is already in ${newStatus} status`
      );
    }
    const updatedApplication = await tx.jobApplication.update({
      where: {
        id: applicationId
      },
      data: {
        status: newStatus
      }
    });
    const history = await tx.applicationStatusHistory.create({
      data: {
        applicationId,
        oldStatus: application.status,
        newStatus,
        changedById
      }
    });
    return {
      application: updatedApplication,
      history
    };
  });
};
var getApplicationStatusHistory = async (applicationId) => {
  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId
    },
    select: {
      id: true
    }
  });
  if (!application) {
    throw new Error("Job application not found");
  }
  const history = await prisma.applicationStatusHistory.findMany({
    where: {
      applicationId
    },
    orderBy: {
      changedAt: "asc"
    }
  });
  return history;
};
var getSingleStatusHistory = async (applicationId, historyId) => {
  const history = await prisma.applicationStatusHistory.findFirst({
    where: {
      id: historyId,
      applicationId
    }
  });
  if (!history) {
    throw new Error("Application status history not found");
  }
  return history;
};
var ApplicationStatusHistoryService = {
  changeApplicationStatus,
  getApplicationStatusHistory,
  getSingleStatusHistory
};

// src/app/modules/applicationStatusHistory/applicationStatusHistory.controller.ts
var changeApplicationStatus2 = async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status: status19 } = req.body;
  const changedById = req.user.userId;
  const result = await ApplicationStatusHistoryService.changeApplicationStatus(
    applicationId,
    status19,
    changedById
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status updated successfully",
    data: result
  });
};
var getApplicationStatusHistory2 = async (req, res) => {
  const applicationId = req.params.applicationId;
  const result = await ApplicationStatusHistoryService.getApplicationStatusHistory(
    applicationId
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status history retrieved successfully",
    data: result
  });
};
var getSingleStatusHistory2 = async (req, res) => {
  const applicationId = req.params.applicationId;
  const historyId = req.params.historyId;
  const result = await ApplicationStatusHistoryService.getSingleStatusHistory(
    applicationId,
    historyId
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status history retrieved successfully",
    data: result
  });
};
var ApplicationStatusHistoryController = {
  changeApplicationStatus: changeApplicationStatus2,
  getApplicationStatusHistory: getApplicationStatusHistory2,
  getSingleStatusHistory: getSingleStatusHistory2
};

// src/app/modules/applicationStatusHistory/applicationStatusHistory.route.ts
var router11 = Router11();
router11.patch(
  "/applications/:applicationId/status",
  checkAuth(),
  ApplicationStatusHistoryController.changeApplicationStatus
);
router11.get(
  "/applications/:applicationId/status-history",
  checkAuth(),
  ApplicationStatusHistoryController.getApplicationStatusHistory
);
router11.get(
  "/applications/:applicationId/status-history/:historyId",
  ApplicationStatusHistoryController.getSingleStatusHistory
);
var ApplicationStatusHistoryRoutes = router11;

// src/app/modules/AiServices/interview/interview.router.ts
import { Router as Router12 } from "express";

// src/app/modules/AiServices/interview/interview.controller.ts
import status13 from "http-status";

// src/app/modules/AiServices/interview/interview.service.ts
import { GoogleGenAI as GoogleGenAI2 } from "@google/genai";
var ai = new GoogleGenAI2({
  apiKey: process.env.GEMINI_API_KEY
});
var generateInterviewQuestions = async (jobId, experienceLevel, interviewType) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    },
    include: {
      company: true,
      requiredSkills: true
    }
  });
  if (!job) {
    throw new Error("Job not found");
  }
  const skills = job.requiredSkills.map((skill) => skill.name).join(", ");
  const prompt = `
You are an expert technical interviewer, senior hiring manager,
and recruitment specialist.

Your task is to generate a comprehensive interview question set
for the following job.

========================================
JOB INFORMATION
========================================

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${skills}

Candidate Experience Level:
${experienceLevel}

Interview Type:
${interviewType}

Company:
${job.company.name}

========================================
QUESTION GENERATION RULES
========================================

Generate realistic questions that a professional interviewer
could actually ask during an interview.

Questions must be strongly related to:

1. Job title
2. Job description
3. Required skills
4. Candidate experience level
5. Interview type

Do NOT generate generic questions repeatedly.

Questions should gradually increase in difficulty.

Use:

Easy
Medium
Hard

appropriately according to the candidate's experience.

For junior/fresher candidates:
- Focus more on fundamentals
- Practical implementation
- Basic problem solving
- Projects
- Learning ability

For mid-level candidates:
- Focus on architecture
- Production experience
- Debugging
- Performance
- Security
- Scalability

For senior candidates:
- Focus on architecture
- System design
- Trade-offs
- Scalability
- Reliability
- Leadership
- Production incidents
- Technical decision making

========================================
GENERATE EXACTLY 10 CATEGORIES
========================================

1. TECHNICAL
Generate exactly 10 questions.

Focus on:
- Required technologies
- Programming concepts
- Frameworks
- Databases
- APIs
- Authentication
- Security
- Performance
- Testing
- Debugging

Example:

Question:
How would you implement JWT authentication in an Express.js API?

Difficulty:
Medium

Category:
Authentication

Expected Answer:
The candidate should explain access tokens, refresh tokens,
secure storage, expiration and middleware-based authorization.

Evaluation Points:
- Understands JWT
- Understands access/refresh tokens
- Understands token expiration
- Understands security concerns


2. BEHAVIORAL
Generate exactly 5 questions.

Focus on:
- Communication
- Teamwork
- Conflict
- Leadership
- Failure
- Learning
- Adaptability

Example:

Question:
Tell me about a time when you disagreed with a technical
decision made by your team.

Difficulty:
Medium

Category:
Teamwork


3. SYSTEM DESIGN
Generate exactly 5 questions.

Focus on:
- Scalability
- Architecture
- Database design
- Caching
- Load balancing
- Queues
- Microservices
- Reliability
- Security

Example:

Question:
How would you design a scalable job application system
that supports 1 million candidates?

Difficulty:
Hard

Category:
Scalability


4. PROJECT
Generate exactly 5 questions.

These questions must investigate the candidate's actual
projects and technical decisions.

Focus on:
- Architecture
- Database
- APIs
- Authentication
- Deployment
- Performance
- Challenges
- Trade-offs

Example:

Question:
Explain the architecture of your most complex project
and why you selected that architecture.

Difficulty:
Medium

Category:
Project Architecture


5. FOLLOW-UP
Generate exactly 5 questions.

These should be natural follow-up questions that an interviewer
could ask after a candidate answers a technical question.

Example:

Question:
You mentioned Redis caching. What would happen if Redis
became unavailable?

Difficulty:
Hard

Category:
Caching


6. SCENARIO BASED
Generate exactly 5 questions.

Give realistic production scenarios.

Focus on:
- Server crashes
- Database failures
- Security attacks
- Slow APIs
- High traffic
- Deployment problems
- Data inconsistency

Example:

Question:
Your API normally responds in 200ms but suddenly takes
5 seconds. How would you investigate the problem?

Difficulty:
Hard

Category:
Production Debugging


7. PROBLEM SOLVING
Generate exactly 5 questions.

Focus on:
- Debugging
- Algorithms
- Logical thinking
- Optimization
- Code quality
- Edge cases

Example:

Question:
An API endpoint becomes slow when the database contains
millions of records. How would you identify and solve the problem?

Difficulty:
Hard

Category:
Performance Optimization


8. HR AND CULTURE
Generate exactly 5 questions.

Focus on:
- Motivation
- Career goals
- Teamwork
- Company culture
- Strengths
- Weaknesses
- Salary expectations

Example:

Question:
Why do you want to join our company?

Difficulty:
Easy

Category:
Motivation


9. ROLE SPECIFIC
Generate exactly 5 questions.

These must be highly specific to the job role.

For example:

If the job is Backend Developer:
- API design
- Database optimization
- Authentication
- Distributed systems

If Frontend Developer:
- React
- Next.js
- Performance
- State management
- Accessibility

If Full Stack Developer:
- Frontend + backend
- API integration
- Database
- Authentication
- Deployment

If DevOps:
- Docker
- Kubernetes
- CI/CD
- Cloud
- Monitoring

If ML Engineer:
- ML algorithms
- Model evaluation
- Feature engineering
- Deployment

Example:

Question:
How would you design an authentication system using
Next.js and Express?

Difficulty:
Hard

Category:
Full Stack Authentication


10. ADVANCED CHALLENGE
Generate exactly 5 difficult questions.

These should distinguish strong candidates from average candidates.

Focus on:
- Architecture trade-offs
- Performance
- Security
- Scalability
- Production engineering
- Complex debugging

Example:

Question:
Your application has 10 million users and PostgreSQL is
becoming the main performance bottleneck. How would you
redesign the data layer?

Difficulty:
Hard

Category:
Database Scalability

========================================
IMPORTANT OUTPUT RULES
========================================

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use:

\`\`\`json

Do NOT add explanations before or after JSON.

The response must exactly follow this structure:

{
  "technical": [
    {
      "question": "...",
      "difficulty": "Easy",
      "category": "...",
      "expectedAnswer": "...",
      "evaluationPoints": [
        "...",
        "...",
        "..."
      ],
      "followUpQuestions": [
        "...",
        "..."
      ]
    }
  ],

  "behavioral": [],

  "systemDesign": [],

  "project": [],

  "followUp": [],

  "scenarioBased": [],

  "problemSolving": [],

  "hrAndCulture": [],

  "roleSpecific": [],

  "advancedChallenge": []
}

========================================
FINAL REQUIREMENTS
========================================

technical = exactly 10
behavioral = exactly 5
systemDesign = exactly 5
project = exactly 5
followUp = exactly 5
scenarioBased = exactly 5
problemSolving = exactly 5
hrAndCulture = exactly 5
roleSpecific = exactly 5
advancedChallenge = exactly 5

TOTAL = 55 QUESTIONS.

Every question must contain:

question
difficulty
category
expectedAnswer
evaluationPoints
followUpQuestions
`;
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });
  const text = response.text;
  if (!text) {
    throw new Error("AI did not return a response");
  }
  let questions;
  try {
    questions = JSON.parse(text);
  } catch (error) {
    console.error("Gemini JSON:", text);
    throw new Error("AI returned invalid JSON");
  }
  const expectedCounts = {
    technical: 10,
    behavioral: 5,
    systemDesign: 5,
    project: 5,
    followUp: 5,
    scenarioBased: 5,
    problemSolving: 5,
    hrAndCulture: 5,
    roleSpecific: 5,
    advancedChallenge: 5
  };
  for (const [category, expectedCount] of Object.entries(
    expectedCounts
  )) {
    const actualCount = questions[category]?.length ?? 0;
    if (actualCount !== expectedCount) {
      throw new Error(
        `AI generated ${actualCount} ${category} questions. Expected ${expectedCount}.`
      );
    }
  }
  return {
    job: {
      id: job.id,
      title: job.title,
      company: job.company.name
    },
    candidate: {
      experienceLevel
    },
    interview: {
      type: interviewType
    },
    totalQuestions: 55,
    questions
  };
};
var InterviewQuestionService = {
  generateInterviewQuestions
};

// src/app/modules/AiServices/interview/interview.controller.ts
var generateInterviewQuestions2 = async (req, res) => {
  try {
    const {
      jobId,
      experienceLevel,
      interviewType
    } = req.body;
    const result = await InterviewQuestionService.generateInterviewQuestions(
      jobId,
      experienceLevel,
      interviewType
    );
    res.status(status13.OK).json({
      success: true,
      message: "Interview questions generated successfully",
      data: result
    });
  } catch (error) {
    res.status(status13.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};
var InterviewController = {
  generateInterviewQuestions: generateInterviewQuestions2
};

// src/app/modules/AiServices/interview/interview.router.ts
var router12 = Router12();
router12.post(
  "/questions",
  checkAuth("CANDIDATE"),
  InterviewController.generateInterviewQuestions
);
var InterviewRouter = router12;

// src/app/modules/AiServices/Interview_Practice/interview.router.ts
import { Router as Router13 } from "express";

// src/app/modules/AiServices/Interview_Practice/interview.service.ts
import { GoogleGenAI as GoogleGenAI3 } from "@google/genai";
var ai2 = new GoogleGenAI3({
  apiKey: envVars.GEMINI_API_KEY
});
var startInterview = async (userId, jobId, experienceLevel, interviewType) => {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new Error(
      "Candidate profile not found for this user"
    );
  }
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    },
    include: {
      requiredSkills: true
    }
  });
  if (!job) {
    throw new Error("Job not found");
  }
  const session = await prisma.interviewSession.create({
    data: {
      candidateProfileId: candidateProfile.id,
      jobId,
      experienceLevel,
      interviewType
    }
  });
  const response = await ai2.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `
You are an expert technical interviewer.

Job:
${job.title}

Description:
${job.description}

Required skills:
${job.requiredSkills.map((skill) => skill.name).join(", ")}

Candidate experience:
${experienceLevel}

Interview type:
${interviewType}

Generate ONE interview question.

Return ONLY valid JSON:

{
  "question": "...",
  "difficulty": "Easy | Medium | Hard",
  "category": "..."
}
`
  });
  const text = response.text;
  if (!text) {
    throw new Error("AI did not return question");
  }
  const question = JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "").trim()
  );
  return {
    sessionId: session.id,
    questionNumber: 1,
    question
  };
};
var evaluateAnswer = async (sessionId, answer) => {
  const session = await prisma.interviewSession.findUnique({
    where: {
      id: sessionId
    },
    include: {
      job: {
        include: {
          requiredSkills: true
        }
      },
      answers: true
    }
  });
  if (!session) {
    throw new Error("Interview session not found");
  }
  const previousAnswers = session.answers.map(
    (item) => `Question: ${item.question}
Answer: ${item.candidateAnswer}`
  ).join("\n");
  const currentQuestion = session.answers.length === 0 ? "First interview question" : session.answers[session.answers.length - 1]?.question;
  if (!currentQuestion) {
    throw new Error("Current interview question not found");
  }
  const prompt = `
You are an expert technical interviewer.

Job:
${session.job.title}

Required skills:
${session.job.requiredSkills.map((skill) => skill.name).join(", ")}

Candidate experience:
${session.experienceLevel}

Current question:
${currentQuestion}

Candidate answer:
${answer}

Evaluate the candidate.

Give scores from 0 to 100:

Technical Accuracy
Communication
Confidence
Completeness

Calculate Overall Score.

Give short useful feedback.

Then generate the next interview question.

Return ONLY JSON:

{
  "evaluation": {
    "technicalAccuracy": 82,
    "communication": 76,
    "confidence": 80,
    "completeness": 71,
    "overall": 77,
    "feedback": "..."
  },
  "nextQuestion": {
    "question": "...",
    "difficulty": "Medium",
    "category": "Backend"
  }
}
`;
  const response = await ai2.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
  });
  const text = response.text;
  if (!text) {
    throw new Error("AI evaluation failed");
  }
  const result = JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "").trim()
  );
  await prisma.interviewAnswer.create({
    data: {
      sessionId,
      question: currentQuestion,
      candidateAnswer: answer,
      technicalAccuracy: result.evaluation.technicalAccuracy,
      communication: result.evaluation.communication,
      confidence: result.evaluation.confidence,
      completeness: result.evaluation.completeness,
      overallScore: result.evaluation.overall,
      feedback: result.evaluation.feedback
    }
  });
  return result;
};
var InterviewQuestionService2 = {
  startInterview,
  evaluateAnswer
};

// src/app/modules/AiServices/Interview_Practice/interview.controller.ts
var startInterview2 = async (req, res) => {
  try {
    const { jobId, experienceLevel, interviewType } = req.body;
    const userId = req.user.userId;
    const result = await InterviewQuestionService2.startInterview(
      userId,
      jobId,
      experienceLevel,
      interviewType
    );
    res.status(200).json({
      success: true,
      message: "Interview started successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};
var answerInterview = async (req, res) => {
  try {
    const {
      sessionId,
      answer
    } = req.body;
    const result = await InterviewQuestionService2.evaluateAnswer(
      sessionId,
      answer
    );
    res.status(200).json({
      success: true,
      message: "Answer evaluated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var InterviewController2 = {
  startInterview: startInterview2,
  answerInterview
};

// src/app/modules/AiServices/Interview_Practice/interview.router.ts
var router13 = Router13();
router13.post(
  "/practice/start",
  checkAuth(),
  InterviewController2.startInterview
);
router13.post(
  "/practice/answer",
  checkAuth(),
  InterviewController2.answerInterview
);
var InterviewPracticesRouter = router13;

// src/app/modules/applicationAssistant/applicationAssistant.route.ts
import { Router as Router14 } from "express";

// src/app/modules/applicationAssistant/applicationAssistant.service.ts
import { GoogleGenAI as GoogleGenAI4 } from "@google/genai";
var ai3 = new GoogleGenAI4({
  apiKey: process.env.GEMINI_API_KEY
});
var generateApplicationAssistant = async (userId, jobId, resumeId) => {
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidate) {
    throw new Error("Candidate profile not found");
  }
  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    }
  });
  if (!job) {
    throw new Error("Job not found");
  }
  const candidateProfileId = candidate.id;
  if (!resumeId) {
    throw new Error("Resume ID is required");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidateProfileId
    }
  });
  if (!resume) {
    throw new Error("Resume not found or does not belong to this candidate");
  }
  const prompt = `
You are an AI recruitment assistant.

Analyze the candidate resume against the job.

JOB:
Title: ${job.title}

Description:
${job.description}

CANDIDATE RESUME:
${resume.rawText ?? ""}

Return ONLY valid JSON.

Format:

{
  "matchScore": 0,
  "recommendation": "",
  "missingSkills": [],
  "suggestions": [],
  "applicationTips": []
}

Rules:
- matchScore must be between 0 and 100
- missingSkills must contain skills required by the job but missing from resume
- suggestions must provide practical resume improvements
- applicationTips must provide useful application advice
`;
  const response = await ai3.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
  });
  const text = response.text;
  if (!text) {
    throw new Error("AI failed to generate response");
  }
  const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const result = JSON.parse(cleanText);
  const saved = await prisma.applicationAssistant.upsert({
    where: {
      candidateProfileId_jobId: {
        candidateProfileId: candidate.id,
        jobId
      }
    },
    update: {
      resumeId: resume.id,
      matchScore: result.matchScore,
      recommendation: result.recommendation,
      missingSkills: result.missingSkills,
      suggestions: result.suggestions,
      applicationTips: result.applicationTips
    },
    create: {
      candidateProfileId: candidate.id,
      jobId,
      resumeId: resume.id,
      matchScore: result.matchScore,
      recommendation: result.recommendation,
      missingSkills: result.missingSkills,
      suggestions: result.suggestions,
      applicationTips: result.applicationTips
    }
  });
  return saved;
};
var ApplicationAssistantService = {
  generateApplicationAssistant
};

// src/app/modules/applicationAssistant/applicationAssistant.controller.ts
var generateAssistant = async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.params;
  const { resumeId } = req.body;
  const result = await ApplicationAssistantService.generateApplicationAssistant(
    userId,
    jobId,
    resumeId
  );
  res.status(200).json({
    success: true,
    message: "Application assistant generated successfully",
    data: result
  });
};
var ApplicationAssistantController = {
  generateAssistant
};

// src/app/modules/applicationAssistant/applicationAssistant.route.ts
var router14 = Router14();
router14.post(
  "/:jobId",
  checkAuth(Role.CANDIDATE),
  ApplicationAssistantController.generateAssistant
);
var ApplicationAssistantRouter = router14;

// src/app/modules/candidateRanking/candidateRanking.route.ts
import { Router as Router15 } from "express";

// src/app/modules/candidateRanking/candidateRanking.service.ts
var normalize = (value) => {
  return value?.trim().toLowerCase() ?? "";
};
var CandidateRankingService = {
  async rankApplicants(jobId) {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId
      },
      include: {
        requiredSkills: true
      }
    });
    if (!job) {
      throw new Error("Job not found");
    }
    const requiredSkills = job.requiredSkills.map(
      (skill) => normalize(skill.name)
    );
    console.log("Required job skills:", requiredSkills);
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId
      },
      include: {
        candidateProfile: {
          include: {
            user: true,
            resumes: true
          }
        }
      }
    });
    const results = [];
    for (const application of applications) {
      const candidate = application.candidateProfile;
      const user = candidate?.user;
      if (!candidate) {
        console.warn(
          `No candidate profile for application ${application.id}`
        );
        continue;
      }
      console.log("--------------------------------");
      console.log(
        "Candidate:",
        candidate.id
      );
      console.log(
        "Candidate user:",
        user?.name
      );
      const candidateSkillsRaw = candidate.skills;
      const candidateSkills = Array.isArray(candidateSkillsRaw) ? candidateSkillsRaw.map((skill) => {
        if (typeof skill === "string") {
          return normalize(skill);
        }
        if (typeof skill === "object" && skill !== null && "name" in skill) {
          const name = skill.name;
          return typeof name === "string" ? normalize(name) : "";
        }
        return "";
      }).filter(Boolean) : [];
      console.log(
        "Candidate skills:",
        candidateSkills
      );
      const matchedSkills = requiredSkills.filter(
        (requiredSkill) => candidateSkills.some(
          (candidateSkill) => candidateSkill === requiredSkill
        )
      );
      const skillScore = requiredSkills.length === 0 ? 0 : matchedSkills.length / requiredSkills.length * 100;
      console.log(
        "Matched skills:",
        matchedSkills
      );
      console.log(
        "Skill score:",
        skillScore
      );
      const minExperience = typeof job.minExperience === "number" ? job.minExperience : 0;
      const candidateExperience = Number(
        candidate.experience ?? 0
      );
      let experienceScore = 0;
      if (minExperience === 0) {
        experienceScore = 100;
      } else if (candidateExperience >= minExperience) {
        experienceScore = 100;
      } else {
        experienceScore = candidateExperience / minExperience * 100;
      }
      experienceScore = Math.min(
        experienceScore,
        100
      );
      const jobLocation = normalize(
        job.location
      );
      const candidateLocation = normalize(
        candidate.location
      );
      let locationScore = 0;
      if (!jobLocation) {
        locationScore = 100;
      } else if (candidateLocation === jobLocation) {
        locationScore = 100;
      } else {
        locationScore = 0;
      }
      const resume = candidate.resumes?.[0];
      console.log(
        "Resume:",
        resume ? resume.id : "No resume found"
      );
      let semanticScore = 0;
      const finalScore = skillScore * 0.5 + experienceScore * 0.2 + semanticScore * 0.2 + locationScore * 0.1;
      const strengths = [];
      const weaknesses = [];
      if (skillScore >= 70) {
        strengths.push(
          "Strong match with the required skills"
        );
      } else if (skillScore > 0) {
        strengths.push(
          "Matches some required skills"
        );
      } else {
        weaknesses.push(
          "No matching required skills found"
        );
      }
      if (experienceScore >= 100) {
        strengths.push(
          "Meets the required experience level"
        );
      } else if (experienceScore > 0) {
        weaknesses.push(
          "Has less experience than required"
        );
      }
      if (locationScore >= 100) {
        strengths.push(
          "Location matches the job"
        );
      }
      if (semanticScore >= 70) {
        strengths.push(
          "Resume appears highly relevant to the job"
        );
      }
      if (semanticScore === 0) {
        weaknesses.push(
          "Semantic resume matching is not available yet"
        );
      }
      const explanation = `Candidate ${user?.name ?? "Unknown Candidate"} received a ${Math.round(finalScore)}% match score based on skills, experience, semantic relevance, and location.`;
      results.push({
        applicationId: application.id,
        candidateId: candidate.id,
        id: candidate.userId,
        name: user?.name ?? candidate.name ?? "Unknown Candidate",
        email: user?.email ?? candidate.email ?? null,
        profileImage: user?.image ?? candidate.profileImage ?? null,
        phone: candidate.phone ?? null,
        location: candidate.location ?? null,
        experience: candidate.experience ?? null,
        skills: candidateSkills,
        appliedAt: application.createdAt ?? null,
        resume: resume ? {
          id: resume.id,
          ...resume
        } : null,
        education: candidate.education ?? null,
        linkedin: candidate.linkedin ?? null,
        github: candidate.github ?? null,
        portfolio: candidate.portfolio ?? null,
        score: Math.round(finalScore),
        matchScore: Math.round(finalScore),
        matchPercentage: Math.round(finalScore),
        breakdown: {
          skillScore: Math.round(
            skillScore
          ),
          experienceScore: Math.round(
            experienceScore
          ),
          semanticScore: Math.round(
            semanticScore
          ),
          locationScore: Math.round(
            locationScore
          )
        },
        strengths,
        weaknesses,
        explanation
      });
    }
    results.sort(
      (a, b) => b.score - a.score
    );
    return results;
  },
  // ============================================
  // 2. Get ranked applicants + filters
  // ============================================
  async getRankedApplicants(jobId, filters) {
    const ranked = await CandidateRankingService.rankApplicants(jobId);
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId
      },
      include: {
        candidateProfile: {
          include: {
            // Candidate profile data
            resumes: true,
            // User model data
            user: true
          }
        }
      }
    });
    const result = ranked.map((rank) => {
      const application = applications.find(
        (app2) => app2.id === rank.applicationId
      );
      if (!application) {
        return null;
      }
      return {
        ...rank,
        // Full candidate profile
        candidateProfile: application.candidateProfile,
        // Keep candidate property too
        // so your existing filtering code
        // remains unchanged.
        candidate: application.candidateProfile,
        // Explicit user model data
        user: application.candidateProfile.user
      };
    }).filter(
      (item) => item !== null
    );
    const filteredResult = result.filter((item) => {
      const candidate = item.candidate;
      if (item.score < filters.minScore) {
        return false;
      }
      const experience = candidate.experience ?? 0;
      if (Number(experience) < filters.minExperience) {
        return false;
      }
      if (filters.skill) {
        const requestedSkill = filters.skill.toLowerCase().trim();
        const candidateSkillsRaw = candidate.skills;
        const hasSkill = Array.isArray(
          candidateSkillsRaw
        ) && candidateSkillsRaw.some(
          (candidateSkill) => typeof candidateSkill === "string" && candidateSkill.toLowerCase().trim() === requestedSkill
        );
        if (!hasSkill) {
          return false;
        }
      }
      if (filters.location) {
        const candidateLocation = candidate.location?.toLowerCase().trim();
        const requestedLocation = filters.location.toLowerCase().trim();
        if (candidateLocation !== requestedLocation) {
          return false;
        }
      }
      return true;
    });
    return filteredResult;
  }
};

// src/app/modules/candidateRanking/candidateRanking.controller.ts
var rankApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (typeof jobId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
      return;
    }
    const result = await CandidateRankingService.rankApplicants(jobId);
    res.status(200).json({
      success: true,
      message: "Applicants ranked successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to rank applicants"
    });
  }
};
var getRankedApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (typeof jobId !== "string" || !jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required"
      });
    }
    const {
      minScore,
      minExperience,
      skill,
      location
    } = req.query;
    const parsedMinScore = minScore ? Number(minScore) : 0;
    const parsedMinExperience = minExperience ? Number(minExperience) : 0;
    if (Number.isNaN(parsedMinScore) || parsedMinScore < 0 || parsedMinScore > 100) {
      return res.status(400).json({
        success: false,
        message: "minScore must be a number between 0 and 100"
      });
    }
    if (Number.isNaN(parsedMinExperience) || parsedMinExperience < 0) {
      return res.status(400).json({
        success: false,
        message: "minExperience must be a valid positive number"
      });
    }
    const skillValue = typeof skill === "string" ? skill : void 0;
    const locationValue = typeof location === "string" ? location : void 0;
    const result = await CandidateRankingService.getRankedApplicants(
      jobId,
      {
        minScore: parsedMinScore,
        minExperience: parsedMinExperience,
        ...skillValue !== void 0 && {
          skill: skillValue
        },
        ...locationValue !== void 0 && {
          location: locationValue
        }
      }
    );
    return res.status(200).json({
      success: true,
      message: "Ranked applicants retrieved successfully",
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error(
      "Get ranked applicants error:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Failed to get ranked applicants"
    });
  }
};
var CandidateRankingController = {
  rankApplicants,
  getRankedApplicants
};

// src/app/modules/candidateRanking/candidateRanking.route.ts
var router15 = Router15();
router15.post(
  "/jobs/:jobId/rank-applicants",
  CandidateRankingController.rankApplicants
);
router15.get(
  "/jobs/:jobId/applicants",
  CandidateRankingController.getRankedApplicants
);
var CandidateRankingRouter = router15;

// src/app/modules/aiRecruiter/aiRecruiter.route.ts
import { Router as Router16 } from "express";

// src/app/modules/aiRecruiter/aiRecruiter.controller.ts
import status14 from "http-status";

// src/app/services/llm.service.ts
import { GoogleGenAI as GoogleGenAI5 } from "@google/genai";
var ai4 = new GoogleGenAI5({
  apiKey: process.env.GEMINI_API_KEY
});
async function generateAnswer(query, context) {
  const prompt = `
You are an AI Recruiter Assistant.

Recruiter question:
${query}

Retrieved recruitment data:
${context}

Rules:

1. ONLY use the retrieved recruitment data.
2. NEVER invent candidate information.
3. NEVER assume information that is not provided.
4. Rank candidates based on the supplied scores and relevant skills.
5. Explain why each candidate is recommended.
6. If the retrieved data is insufficient, clearly say so.
7. Keep the answer concise and professional.
`;
  const response = await ai4.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
  });
  const answer = response.text;
  if (!answer) {
    throw new Error("Gemini did not return an answer");
  }
  return answer;
}

// src/app/modules/aiRecruiter/aiRecruiter.service.ts
var AIRecruiterService = {
  // =====================================================
  // AI RECRUITER ASSISTANT
  // =====================================================
  async assistant(recruiterId, input) {
    const limit = input.limit ?? 5;
    let job;
    if (input.jobId) {
      job = await prisma.job.findUnique({
        where: {
          id: input.jobId
        },
        include: {
          company: true,
          // IMPORTANT:
          // Job model has `requiredSkills`,
          // NOT `jobSkills`
          requiredSkills: true
        }
      });
    } else {
      job = await this.findJobFromQuery(
        recruiterId,
        input.query
      );
    }
    if (!job) {
      throw new Error(
        "Could not find a job matching the request"
      );
    }
    if (job.company.userId !== recruiterId) {
      throw new Error(
        "You are not authorized to access this job"
      );
    }
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId: job.id
      },
      include: {
        candidateProfile: {
          include: {
            user: true,
            skills: true,
            resumes: true
          }
        }
      }
    });
    if (applications.length === 0) {
      return {
        job: {
          id: job.id,
          title: job.title
        },
        candidates: [],
        answer: "There are currently no applicants for this job."
      };
    }
    const jobEmbeddingResult = await prisma.$queryRaw`
    SELECT "embedding"::text AS embedding
    FROM "Job"
    WHERE "id" = ${job.id}
  `;
    if (!jobEmbeddingResult.length || !jobEmbeddingResult[0]?.embedding) {
      throw new Error("Job embedding has not been generated yet");
    }
    const jobEmbedding = jobEmbeddingResult[0].embedding;
    const candidateIds = applications.map(
      (application) => application.candidateProfileId
    );
    const candidatePlaceholders = candidateIds.map((_, index) => `$${index + 2}`).join(", ");
    const semanticCandidates = await prisma.$queryRawUnsafe(
      `
          SELECT
            "candidateProfileId",
            embedding <=> CAST($1 AS vector) AS distance
          FROM candidate_embeddings
          WHERE "candidateProfileId" IN (${candidatePlaceholders})
          ORDER BY distance ASC
          LIMIT ${Math.max(limit * 3, 15)}
        `,
      jobEmbedding,
      ...candidateIds
    );
    const semanticScoreMap = /* @__PURE__ */ new Map();
    for (const candidate of semanticCandidates) {
      const similarity = 1 - Number(candidate.distance);
      semanticScoreMap.set(
        candidate.candidateProfileId,
        Math.max(
          0,
          Math.min(1, similarity)
        )
      );
    }
    const rankedCandidates = [];
    for (const application of applications) {
      const candidate = application.candidateProfile;
      const semanticScore = semanticScoreMap.get(candidate.id) ?? 0;
      const skillScore = this.calculateSkillScore(
        job,
        candidate
      );
      const experienceScore = this.calculateExperienceScore(
        job,
        candidate
      );
      const locationScore = this.calculateLocationScore(
        job,
        candidate
      );
      const finalScore = semanticScore * 40 + skillScore * 30 + experienceScore * 20 + locationScore * 10;
      const candidateName = candidate.user?.name ?? "Unknown Candidate";
      const candidateSkills = candidate.skills.map(
        (skill) => skill.name
      );
      const resumeText = candidate.resumes.map(
        (resume) => resume.rawText ?? ""
      ).join("\n");
      rankedCandidates.push({
        applicationId: application.id,
        candidateId: candidate.id,
        name: candidateName,
        semanticScore,
        skillScore,
        experienceScore,
        locationScore,
        finalScore,
        skills: candidateSkills,
        ...candidate.experience ? { experience: candidate.experience } : {},
        ...resumeText ? { resumeText } : {}
      });
    }
    rankedCandidates.sort(
      (a, b) => b.finalScore - a.finalScore
    );
    const topCandidates = rankedCandidates.slice(
      0,
      limit
    );
    const context = this.buildLLMContext(
      job,
      topCandidates
    );
    const answer = await generateAnswer(
      input.query,
      context
    );
    return {
      query: input.query,
      job: {
        id: job.id,
        title: job.title
      },
      candidates: topCandidates.map(
        (candidate) => ({
          candidateId: candidate.candidateId,
          applicationId: candidate.applicationId,
          name: candidate.name,
          score: Number(
            candidate.finalScore.toFixed(2)
          ),
          breakdown: {
            semanticScore: Number(
              (candidate.semanticScore * 100).toFixed(2)
            ),
            skillScore: Number(
              (candidate.skillScore * 100).toFixed(2)
            ),
            experienceScore: Number(
              (candidate.experienceScore * 100).toFixed(2)
            ),
            locationScore: Number(
              (candidate.locationScore * 100).toFixed(2)
            )
          }
        })
      ),
      answer
    };
  },
  // =====================================================
  // FIND JOB FROM RECRUITER QUERY
  // =====================================================
  async findJobFromQuery(recruiterId, query) {
    const jobs = await prisma.job.findMany({
      where: {
        company: {
          userId: recruiterId
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: query,
              mode: "insensitive"
            }
          }
        ]
      },
      include: {
        company: true,
        // IMPORTANT
        requiredSkills: true
      },
      take: 5
    });
    return jobs[0] ?? null;
  },
  // =====================================================
  // SKILL SCORE
  // =====================================================
  calculateSkillScore(job, candidate) {
    const requiredSkills = job.requiredSkills?.map(
      (jobSkill) => jobSkill.name.toLowerCase().trim()
    ) ?? [];
    const candidateSkills = candidate.skills?.map(
      (skill) => skill.name.toLowerCase().trim()
    ) ?? [];
    if (requiredSkills.length === 0) {
      return 1;
    }
    let matched = 0;
    for (const required of requiredSkills) {
      const isMatched = candidateSkills.some(
        (candidateSkill) => candidateSkill === required || candidateSkill.includes(
          required
        ) || required.includes(
          candidateSkill
        )
      );
      if (isMatched) {
        matched++;
      }
    }
    return matched / requiredSkills.length;
  },
  // =====================================================
  // EXPERIENCE SCORE
  // =====================================================
  calculateExperienceScore(job, candidate) {
    if (!candidate.experience) {
      return 0.5;
    }
    if (!job.description) {
      return 0.5;
    }
    const candidateExperience = candidate.experience.toLowerCase();
    const jobDescription = job.description.toLowerCase();
    const keywords = [
      "experience",
      "years",
      "developer",
      "engineer",
      "senior",
      "junior",
      "full stack",
      "backend",
      "frontend"
    ];
    const matches = keywords.filter(
      (keyword) => jobDescription.includes(
        keyword
      ) && candidateExperience.includes(
        keyword
      )
    );
    if (matches.length > 0) {
      return 1;
    }
    return 0.5;
  },
  // =====================================================
  // LOCATION SCORE
  // =====================================================
  calculateLocationScore(job, candidate) {
    if (!job.location || !candidate.location) {
      return 0.5;
    }
    const jobLocation = job.location.toLowerCase().trim();
    const candidateLocation = candidate.location.toLowerCase().trim();
    if (jobLocation.includes(
      candidateLocation
    ) || candidateLocation.includes(
      jobLocation
    )) {
      return 1;
    }
    return 0;
  },
  // =====================================================
  // BUILD RAG CONTEXT
  // =====================================================
  buildLLMContext(job, candidates) {
    return `
You are an AI Recruiter Assistant.

JOB
---

Title:
${job.title}

Description:
${job.description}

Location:
${job.location ?? "Not specified"}

Required Skills:
${job.requiredSkills?.map(
      (jobSkill) => jobSkill.name
    ).join(", ") ?? ""}


TOP CANDIDATES
-------------

${candidates.map(
      (candidate, index) => `
Candidate ${index + 1}

Name:
${candidate.name}

Overall Score:
${candidate.finalScore.toFixed(2)}%

Semantic Score:
${(candidate.semanticScore * 100).toFixed(2)}%

Skill Score:
${(candidate.skillScore * 100).toFixed(2)}%

Experience Score:
${(candidate.experienceScore * 100).toFixed(2)}%

Location Score:
${(candidate.locationScore * 100).toFixed(2)}%

Skills:
${candidate.skills.join(", ")}

Experience:
${candidate.experience ?? "Not provided"}

Resume:
${candidate.resumeText ?? "Not provided"}
`
    ).join("\n")}


INSTRUCTIONS
------------

Answer the recruiter using ONLY the supplied
candidate information.

Do not invent skills, experience,
education or achievements.

Explain why each candidate is suitable.

Mention important missing information
when necessary.

Return a concise recruiter-friendly answer.
`;
  }
};

// src/app/modules/aiRecruiter/aiRecruiter.controller.ts
var AIRecruiterController = {
  async assistant(req, res) {
    try {
      const {
        jobId,
        query,
        limit
      } = req.body;
      const recruiterId = req.user.userId;
      const result = await AIRecruiterService.assistant(
        recruiterId,
        {
          jobId,
          query,
          limit
        }
      );
      return res.status(
        status14.OK
      ).json({
        success: true,
        message: "AI recruiter assistant response generated successfully",
        data: result
      });
    } catch (error) {
      console.error(
        "AI Recruiter Assistant Error:",
        error
      );
      return res.status(
        status14.BAD_REQUEST
      ).json({
        success: false,
        message: error.message ?? "Failed to process recruiter request"
      });
    }
  }
};

// src/app/modules/aiRecruiter/aiRecruiter.route.ts
var router16 = Router16();
router16.post(
  "/assistant",
  checkAuth(Role.RECRUITER),
  AIRecruiterController.assistant
);
var AIRecruiterRouter = router16;

// src/app/modules/complaint/complaint.route.ts
import { Router as Router17 } from "express";

// src/app/modules/complaint/complaint.service.ts
var createComplaint = async (userId, payload, files) => {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const company = await prisma.company.findUnique({
    where: {
      id: payload.companyId
    }
  });
  if (!company) {
    throw new Error(
      "Company not found"
    );
  }
  if (payload.jobApplicationId) {
    const application = await prisma.jobApplication.findUnique({
      where: {
        id: payload.jobApplicationId
      },
      include: {
        job: true
      }
    });
    if (!application) {
      throw new Error(
        "Job application not found"
      );
    }
    if (application.candidateProfileId !== candidateProfile.id) {
      throw new Error(
        "You cannot report another candidate's application"
      );
    }
    if (application.job.companyId !== payload.companyId) {
      throw new Error(
        "This application does not belong to this company"
      );
    }
    if (payload.jobId && application.jobId !== payload.jobId) {
      throw new Error(
        "This application does not belong to this job"
      );
    }
  }
  const complaint = await prisma.reviewComplaint.create({
    data: {
      submittedById: userId,
      candidateProfileId: candidateProfile.id,
      companyId: payload.companyId,
      jobId: payload.jobId,
      jobApplicationId: payload.jobApplicationId,
      type: payload.type,
      title: payload.title,
      description: payload.description
    }
  });
  if (files && files.length > 0) {
    try {
      for (const file of files) {
        const uploaded = await uploadFileToCloudinary(
          file.buffer,
          file.originalname
        );
        await prisma.complaintEvidence.create({
          data: {
            complaintId: complaint.id,
            fileUrl: uploaded.secure_url,
            fileName: file.originalname,
            fileType: file.mimetype
          }
        });
      }
    } catch (error) {
      await prisma.reviewComplaint.delete({
        where: {
          id: complaint.id
        }
      });
      throw error;
    }
  }
  return prisma.reviewComplaint.findUnique({
    where: {
      id: complaint.id
    },
    include: {
      company: true,
      job: true,
      evidence: true
    }
  });
};
var getMyComplaints = async (candidateProfileId) => {
  return prisma.reviewComplaint.findMany({
    where: {
      candidateProfileId
    },
    include: {
      company: true,
      job: true,
      penalty: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var updateComplaint = async (userId, complaintId, payload, files) => {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new Error("Candidate profile not found");
  }
  const complaint = await prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId
    },
    include: {
      evidence: true
    }
  });
  if (!complaint) {
    throw new Error("Complaint not found");
  }
  if (complaint.candidateProfileId !== candidateProfile.id) {
    throw new Error(
      "You cannot update another candidate's complaint"
    );
  }
  if (complaint.status !== "PENDING") {
    throw new Error(
      "Reviewed complaints cannot be updated"
    );
  }
  const now = /* @__PURE__ */ new Date();
  const createdAt = new Date(complaint.createdAt);
  const fiveHoursInMilliseconds = 5 * 60 * 60 * 1e3;
  const timePassed = now.getTime() - createdAt.getTime();
  if (timePassed > fiveHoursInMilliseconds) {
    throw new Error(
      "You can only update a complaint within 5 hours of submission"
    );
  }
  await prisma.reviewComplaint.update({
    where: {
      id: complaintId
    },
    data: {
      ...payload.type !== void 0 && {
        type: payload.type
      },
      ...payload.title !== void 0 && {
        title: payload.title
      },
      ...payload.description !== void 0 && {
        description: payload.description
      }
    }
  });
  if (files && files.length > 0) {
    for (const file of files) {
      const uploaded = await uploadFileToCloudinary(
        file.buffer,
        file.originalname
      );
      await prisma.complaintEvidence.create({
        data: {
          complaintId,
          fileUrl: uploaded.secure_url,
          fileName: file.originalname,
          fileType: file.mimetype
        }
      });
    }
  }
  return prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId
    },
    include: {
      company: true,
      job: true,
      penalty: true,
      evidence: true
    }
  });
};
var deleteComplaint = async (userId, complaintId) => {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId
    }
  });
  if (!candidateProfile) {
    throw new Error(
      "Candidate profile not found"
    );
  }
  const complaint = await prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId
    },
    include: {
      evidence: true
    }
  });
  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }
  if (complaint.candidateProfileId !== candidateProfile.id) {
    throw new Error(
      "You cannot delete another candidate's complaint"
    );
  }
  if (complaint.status !== "PENDING") {
    throw new Error(
      "Reviewed complaints cannot be deleted"
    );
  }
  for (const evidence of complaint.evidence) {
    try {
      await deleteFileFromCloudinary(
        evidence.fileUrl
      );
    } catch (error) {
      console.error(
        "Failed to delete Cloudinary file:",
        evidence.fileUrl,
        error
      );
      throw new Error(
        "Failed to delete complaint evidence from Cloudinary"
      );
    }
  }
  await prisma.reviewComplaint.delete({
    where: {
      id: complaintId
    }
  });
  return {
    id: complaintId,
    message: "Complaint deleted successfully"
  };
};
var getComplaintsForAdmin = async () => {
  return prisma.reviewComplaint.findMany({
    include: {
      candidateProfile: true,
      company: true,
      job: true,
      evidence: true,
      penalty: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var decideComplaint = async (complaintId, adminId, decision, adminNote) => {
  const complaint = await prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId
    }
  });
  if (!complaint) {
    throw new Error("Complaint not found");
  }
  if (complaint.status === "RESOLVED") {
    throw new Error(
      "Complaint is already resolved"
    );
  }
  const updated = await prisma.reviewComplaint.update({
    where: {
      id: complaintId
    },
    data: {
      decision,
      adminNote,
      reviewedById: adminId,
      reviewedAt: /* @__PURE__ */ new Date(),
      status: decision === "NO_VIOLATION" ? "REJECTED" : "ACCEPTED"
    }
  });
  return updated;
};
var createPenalty = async (complaintId, adminId, payload) => {
  const complaint = await prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId
    }
  });
  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }
  if (complaint.decision !== "PENALTY") {
    throw new Error(
      "Penalty cannot be created for this complaint"
    );
  }
  const existingPenalty = await prisma.penalty.findUnique({
    where: {
      complaintId
    }
  });
  if (existingPenalty) {
    throw new Error(
      "Penalty already exists"
    );
  }
  const penalty = await prisma.penalty.create({
    data: {
      complaintId,
      companyId: complaint.companyId,
      amount: payload.amount,
      currency: payload.currency,
      reason: payload.reason,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : void 0
    }
  });
  return penalty;
};
var getCompanyPenalties = async (companyId) => {
  return prisma.penalty.findMany({
    where: {
      companyId
    },
    include: {
      complaint: {
        select: {
          id: true,
          title: true,
          type: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getMyCompanyComplaintById2 = async (userId, complaintId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId
    }
  });
  if (!company) {
    throw new Error(
      "Company profile not found"
    );
  }
  const complaint = await prisma.reviewComplaint.findFirst({
    where: {
      id: complaintId,
      // VERY IMPORTANT:
      // complaint must belong to this company
      companyId: company.id
    },
    include: {
      // ========================================
      // Company
      // ========================================
      company: true,
      // ========================================
      // Candidate
      // ========================================
      candidateProfile: true,
      // ========================================
      // Job
      // ========================================
      job: true,
      // ========================================
      // Job Application
      // ========================================
      jobApplication: true,
      // ========================================
      // Complaint Evidence
      // ========================================
      evidence: true,
      // ========================================
      // Penalty
      // ========================================
      penalty: true
    }
  });
  if (!complaint) {
    throw new Error(
      "Complaint not found or does not belong to your company"
    );
  }
  return complaint;
};
var updatePenalty = async (penaltyId, companyId, payload) => {
  const penalty = await prisma.penalty.findFirst({
    where: {
      id: penaltyId,
      companyId
    }
  });
  if (!penalty) {
    throw new Error(
      "Penalty not found for this company"
    );
  }
  const updatedPenalty = await prisma.penalty.update({
    where: {
      id: penaltyId
    },
    data: {
      ...payload.amount !== void 0 && {
        amount: payload.amount
      },
      ...payload.currency !== void 0 && {
        currency: payload.currency
      },
      ...payload.reason !== void 0 && {
        reason: payload.reason
      },
      ...payload.dueDate !== void 0 && {
        dueDate: payload.dueDate ? new Date(payload.dueDate) : null
      }
    },
    include: {
      complaint: {
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          decision: true
        }
      },
      company: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return updatedPenalty;
};
var deletePenalty = async (penaltyId, companyId) => {
  const penalty = await prisma.penalty.findFirst({
    where: {
      id: penaltyId,
      companyId
    }
  });
  if (!penalty) {
    throw new Error(
      "Penalty not found for this company"
    );
  }
  await prisma.penalty.delete({
    where: {
      id: penaltyId
    }
  });
  return {
    id: penaltyId,
    message: "Penalty deleted successfully"
  };
};
var ComplaintService = {
  createComplaint,
  getMyComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintsForAdmin,
  decideComplaint,
  createPenalty,
  getCompanyPenalties,
  getMyCompanyComplaintById: getMyCompanyComplaintById2,
  updatePenalty,
  deletePenalty
};

// src/app/modules/complaint/complaint.controller.ts
var createComplaint2 = async (req, res) => {
  const userId = req.user.userId;
  console.log("UserId", userId);
  const files = req.files;
  const result = await ComplaintService.createComplaint(
    userId,
    {
      companyId: req.body.companyId,
      jobId: req.body.jobId,
      jobApplicationId: req.body.jobApplicationId,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description
    },
    files
  );
  res.status(201).json({
    success: true,
    message: "Complaint submitted successfully",
    data: result
  });
};
var getMyComplaints2 = async (req, res) => {
  const candidateProfileId = req.user.candidateProfile;
  const result = await ComplaintService.getMyComplaints(
    candidateProfileId
  );
  res.status(200).json({
    success: true,
    data: result
  });
};
var updateComplaint2 = async (req, res) => {
  const userId = req.user.userId;
  const complaintId = String(req.params.id);
  const files = req.files;
  const result = await ComplaintService.updateComplaint(
    userId,
    complaintId,
    {
      type: req.body.type,
      title: req.body.title,
      description: req.body.description
    },
    files
  );
  res.status(200).json({
    success: true,
    message: "Complaint updated successfully",
    data: result
  });
};
var deleteComplaint2 = async (req, res) => {
  const userId = req.user.userId;
  const complaintId = String(req.params.id);
  const result = await ComplaintService.deleteComplaint(
    userId,
    complaintId
  );
  res.status(200).json({
    success: true,
    message: "Complaint deleted successfully",
    data: result
  });
};
var getComplaintsForAdmin2 = async (req, res) => {
  const result = await ComplaintService.getComplaintsForAdmin();
  res.status(200).json({
    success: true,
    data: result
  });
};
var decideComplaint2 = async (req, res) => {
  const complaintId = String(req.params.complaintId);
  const adminId = req.user.id;
  const {
    decision,
    adminNote
  } = req.body;
  const result = await ComplaintService.decideComplaint(
    complaintId,
    adminId,
    decision,
    adminNote
  );
  res.status(200).json({
    success: true,
    message: "Complaint decision submitted successfully",
    data: result
  });
};
var createPenalty2 = async (req, res) => {
  const complaintId = String(req.params.complaintId);
  const adminId = req.user.id;
  const result = await ComplaintService.createPenalty(
    complaintId,
    adminId,
    req.body
  );
  res.status(201).json({
    success: true,
    message: "Penalty created successfully",
    data: result
  });
};
var getCompanyPenalties2 = async (req, res) => {
  const companyId = String(req.params.companyId);
  const result = await ComplaintService.getCompanyPenalties(
    companyId
  );
  res.status(200).json({
    success: true,
    message: "Company penalties retrieved successfully",
    data: result
  });
};
var updatePenalty2 = async (req, res) => {
  const penaltyId = String(req.params.penaltyId);
  const companyId = String(req.params.companyId);
  const result = await ComplaintService.updatePenalty(
    penaltyId,
    companyId,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Penalty updated successfully",
    data: result
  });
};
var deletePenalty2 = async (req, res) => {
  const penaltyId = String(req.params.penaltyId);
  const companyId = String(req.params.companyId);
  const result = await ComplaintService.deletePenalty(
    penaltyId,
    companyId
  );
  res.status(200).json({
    success: true,
    message: "Penalty deleted successfully",
    data: result
  });
};
var ComplaintController = {
  createComplaint: createComplaint2,
  getMyComplaints: getMyComplaints2,
  getComplaintsForAdmin: getComplaintsForAdmin2,
  updateComplaint: updateComplaint2,
  deleteComplaint: deleteComplaint2,
  getCompanyPenalties: getCompanyPenalties2,
  createPenalty: createPenalty2,
  decideComplaint: decideComplaint2,
  updatePenalty: updatePenalty2,
  deletePenalty: deletePenalty2
};

// src/app/modules/complaint/complaint.route.ts
var router17 = Router17();
router17.post(
  "/",
  checkAuth("CANDIDATE"),
  multerImageUpload.array(
    "evidence",
    5
  ),
  ComplaintController.createComplaint
);
router17.get(
  "/my",
  checkAuth("CANDIDATE"),
  ComplaintController.getMyComplaints
);
router17.patch(
  "/:id",
  checkAuth("CANDIDATE"),
  multerImageUpload.array(
    "evidence",
    5
  ),
  ComplaintController.updateComplaint
);
router17.delete(
  "/:id",
  checkAuth("CANDIDATE"),
  ComplaintController.deleteComplaint
);
router17.get(
  "/admin",
  checkAuth("ADMIN"),
  ComplaintController.getComplaintsForAdmin
);
router17.patch(
  "/:complaintId/decision",
  checkAuth("ADMIN"),
  ComplaintController.decideComplaint
);
router17.post(
  "/:complaintId/penalty",
  checkAuth("ADMIN"),
  ComplaintController.createPenalty
);
router17.get(
  "/:companyId/penalties",
  checkAuth("ADMIN"),
  ComplaintController.getCompanyPenalties
);
router17.patch(
  "/:companyId/penalties/:penaltyId",
  checkAuth("ADMIN"),
  ComplaintController.updatePenalty
);
router17.delete(
  "/:companyId/penalties/:penaltyId",
  checkAuth("ADMIN"),
  ComplaintController.deletePenalty
);
var ComplaintRouter = router17;

// src/app/modules/reviewComplaint/reviewComplaint.route.ts
import { Router as Router18 } from "express";

// src/app/modules/reviewComplaint/reviewComplaint.controller.ts
import status15 from "http-status";

// src/app/modules/reviewComplaint/reviewComplaint.validation.ts
import { z as z4 } from "zod";
var createReviewComplaintSchema = z4.object({
  companyId: z4.string().uuid(),
  jobId: z4.string().uuid().optional(),
  jobApplicationId: z4.string().uuid().optional(),
  type: z4.enum([
    "COMPANY_BEHAVIOR",
    "JOB_MISMATCH",
    "FAKE_JOB",
    "SALARY_MISMATCH",
    "INTERVIEW_PROBLEM",
    "HARASSMENT",
    "DISCRIMINATION",
    "FRAUD",
    "OTHER"
  ]),
  title: z4.string().min(5).max(200),
  description: z4.string().min(20).max(5e3)
});
var updateComplaintStatusSchema = z4.object({
  status: z4.enum([
    "PENDING",
    "UNDER_REVIEW",
    "NEED_MORE_INFORMATION",
    "ACCEPTED",
    "REJECTED",
    "RESOLVED"
  ])
});
var complaintDecisionSchema = z4.object({
  decision: z4.enum([
    "NO_VIOLATION",
    "WARNING",
    "PENALTY",
    "SUSPENSION",
    "JOB_REMOVAL",
    "COMPANY_SUSPENSION"
  ]),
  adminNote: z4.string().min(5).max(5e3)
});
var createPenaltySchema = z4.object({
  amount: z4.number().positive(),
  currency: z4.string().length(3).default("USD"),
  reason: z4.string().min(5).max(1e3),
  dueDate: z4.string().datetime().optional()
});

// src/app/modules/reviewComplaint/reviewComplaint.service.ts
var createComplaint3 = async (recruiterId, payload) => {
  const company = await prisma.company.findUnique({
    where: {
      userId: recruiterId
    }
  });
  if (!company) {
    throw new Error(
      "Recruiter company not found"
    );
  }
  if (company.id !== payload.companyId) {
    throw new Error(
      "You cannot submit a complaint for another company"
    );
  }
  if (payload.jobId) {
    const job = await prisma.job.findFirst({
      where: {
        id: payload.jobId,
        companyId: company.id
      }
    });
    if (!job) {
      throw new Error(
        "Job not found or does not belong to your company"
      );
    }
  }
  if (payload.jobApplicationId) {
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: payload.jobApplicationId,
        job: {
          companyId: company.id
        }
      }
    });
    if (!application) {
      throw new Error(
        "Application not found or does not belong to your company"
      );
    }
  }
  const complaint = await prisma.reviewComplaint.create({
    data: {
      submittedById: recruiterId,
      companyId: company.id,
      jobId: payload.jobId,
      jobApplicationId: payload.jobApplicationId,
      type: payload.type,
      title: payload.title,
      description: payload.description,
      status: ComplaintStatus.PENDING
    },
    include: {
      company: true,
      job: true,
      jobApplication: true
    }
  });
  return complaint;
};
var getMyComplaints3 = async (recruiterId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId: recruiterId
    }
  });
  if (!company) {
    throw new Error(
      "Company not found"
    );
  }
  const complaints = await prisma.reviewComplaint.findMany({
    where: {
      companyId: company.id,
      submittedById: recruiterId
    },
    include: {
      job: {
        select: {
          id: true,
          title: true
        }
      },
      jobApplication: {
        select: {
          id: true,
          status: true
        }
      },
      evidence: true,
      penalty: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return complaints;
};
var getMyComplaintById = async (recruiterId, complaintId) => {
  const company = await prisma.company.findUnique({
    where: {
      userId: recruiterId
    }
  });
  if (!company) {
    throw new Error(
      "Company not found"
    );
  }
  const complaint = await prisma.reviewComplaint.findFirst({
    where: {
      id: complaintId,
      companyId: company.id,
      submittedById: recruiterId
    },
    include: {
      company: true,
      job: true,
      jobApplication: true,
      evidence: true,
      penalty: true
    }
  });
  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }
  return complaint;
};
var ReviewComplaintService = {
  createComplaint: createComplaint3,
  getMyComplaints: getMyComplaints3,
  getMyComplaintById
};

// src/app/modules/reviewComplaint/reviewComplaint.controller.ts
var createComplaint4 = async (req, res) => {
  const validatedData = createReviewComplaintSchema.parse(
    req.body
  );
  const recruiterId = req.user.userId;
  const result = await ReviewComplaintService.createComplaint(
    recruiterId,
    validatedData
  );
  res.status(status15.CREATED).json({
    success: true,
    message: "Review/complaint sent to admin successfully",
    data: result
  });
};
var getMyComplaints4 = async (req, res) => {
  const recruiterId = req.user.userId;
  const result = await ReviewComplaintService.getMyComplaints(
    recruiterId
  );
  res.status(status15.OK).json({
    success: true,
    message: "Complaints retrieved successfully",
    data: result
  });
};
var getMyComplaintById2 = async (req, res) => {
  const recruiterId = req.user.userId;
  const complaintId = String(req.params.complaintId);
  const result = await ReviewComplaintService.getMyComplaintById(
    recruiterId,
    complaintId
  );
  res.status(status15.OK).json({
    success: true,
    message: "Complaint retrieved successfully",
    data: result
  });
};
var ReviewComplaintController = {
  createComplaint: createComplaint4,
  getMyComplaints: getMyComplaints4,
  getMyComplaintById: getMyComplaintById2
};

// src/app/modules/reviewComplaint/reviewComplaint.route.ts
var router18 = Router18();
router18.post(
  "/",
  checkAuth(
    "RECRUITER"
  ),
  ReviewComplaintController.createComplaint
);
router18.post(
  "/",
  checkAuth(
    "RECRUITER"
  ),
  ReviewComplaintController.createComplaint
);
var ReviewComplaintRouter = router18;

// src/app/modules/notification/notification.route.ts
import { Router as Router19 } from "express";

// src/app/modules/notification/notification.service.ts
var createNotification = async (payload) => {
  const notification = await prisma.notification.create({
    data: {
      userId: payload.userId,
      type: payload.type,
      channel: payload.channel ?? NotificationChannel.IN_APP,
      title: payload.title,
      message: payload.message,
      referenceId: payload.referenceId,
      status: NotificationStatus.PENDING
    }
  });
  return notification;
};
var getMyNotifications = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [notifications, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: {
        userId,
        channel: NotificationChannel.IN_APP
      },
      orderBy: {
        createdAt: "desc"
      },
      skip,
      take: limit
    }),
    prisma.notification.count({
      where: {
        userId,
        channel: NotificationChannel.IN_APP
      }
    }),
    prisma.notification.count({
      where: {
        userId,
        channel: NotificationChannel.IN_APP,
        status: {
          not: NotificationStatus.READ
        },
        readAt: null
      }
    })
  ]);
  return {
    notifications,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      unreadCount
    }
  };
};
var getUnreadNotifications = async (userId) => {
  return prisma.notification.findMany({
    where: {
      userId,
      channel: NotificationChannel.IN_APP,
      status: {
        not: NotificationStatus.READ
      },
      readAt: null
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getUnreadCount = async (userId) => {
  return prisma.notification.count({
    where: {
      userId,
      channel: NotificationChannel.IN_APP,
      status: {
        not: NotificationStatus.READ
      },
      readAt: null
    }
  });
};
var markAsRead = async (userId, notificationId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId
    }
  });
  if (!notification) {
    throw new Error("Notification not found");
  }
  if (notification.status === NotificationStatus.READ && notification.readAt) {
    return notification;
  }
  return prisma.notification.update({
    where: {
      id: notificationId
    },
    data: {
      status: NotificationStatus.READ,
      readAt: /* @__PURE__ */ new Date()
    }
  });
};
var markAllAsRead = async (userId) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      channel: NotificationChannel.IN_APP,
      status: {
        not: NotificationStatus.READ
      }
    },
    data: {
      status: NotificationStatus.READ,
      readAt: /* @__PURE__ */ new Date()
    }
  });
};
var deleteNotification = async (userId, notificationId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId
    }
  });
  if (!notification) {
    throw new Error("Notification not found");
  }
  return prisma.notification.delete({
    where: {
      id: notificationId
    }
  });
};
var deleteAllNotifications = async (userId) => {
  return prisma.notification.deleteMany({
    where: {
      userId,
      channel: NotificationChannel.IN_APP
    }
  });
};
var notificationService = {
  createNotification,
  getMyNotifications,
  getUnreadNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
};

// src/app/modules/notification/notification.controller.ts
var getMyNotifications2 = async (req, res) => {
  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Math.min(
    Number(req.query.limit) || 20,
    100
  );
  const result = await notificationService.getMyNotifications(
    userId,
    page,
    limit
  );
  res.status(200).json({
    success: true,
    message: "Notifications retrieved successfully",
    data: result
  });
};
var getUnreadNotifications2 = async (req, res) => {
  const userId = req.user.id;
  const notifications = await notificationService.getUnreadNotifications(
    userId
  );
  res.status(200).json({
    success: true,
    message: "Unread notifications retrieved successfully",
    data: notifications
  });
};
var getUnreadCount2 = async (req, res) => {
  const userId = req.user.id;
  const count = await notificationService.getUnreadCount(userId);
  res.status(200).json({
    success: true,
    message: "Unread notification count retrieved successfully",
    data: {
      count
    }
  });
};
var markAsRead2 = async (req, res) => {
  const userId = req.user.id;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Notification id is required"
    });
  }
  const notification = await notificationService.markAsRead(
    userId,
    id
  );
  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification
  });
};
var markAllAsRead2 = async (req, res) => {
  const userId = req.user.id;
  const result = await notificationService.markAllAsRead(userId);
  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
    data: result
  });
};
var deleteNotification2 = async (req, res) => {
  const userId = req.user.id;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Notification id is required"
    });
  }
  await notificationService.deleteNotification(
    userId,
    id
  );
  res.status(200).json({
    success: true,
    message: "Notification deleted successfully"
  });
};
var deleteAllNotifications2 = async (req, res) => {
  const userId = req.user.id;
  const result = await notificationService.deleteAllNotifications(
    userId
  );
  res.status(200).json({
    success: true,
    message: "All notifications deleted successfully",
    data: result
  });
};
var notificationController = {
  getMyNotifications: getMyNotifications2,
  getUnreadNotifications: getUnreadNotifications2,
  getUnreadCount: getUnreadCount2,
  markAsRead: markAsRead2,
  markAllAsRead: markAllAsRead2,
  deleteNotification: deleteNotification2,
  deleteAllNotifications: deleteAllNotifications2
};

// src/app/modules/notification/notification.route.ts
var router19 = Router19();
router19.get(
  "/",
  checkAuth(),
  notificationController.getMyNotifications
);
router19.get(
  "/unread",
  checkAuth(),
  notificationController.getUnreadNotifications
);
router19.get(
  "/unread-count",
  checkAuth(),
  notificationController.getUnreadCount
);
router19.patch(
  "/read-all",
  checkAuth(),
  notificationController.markAllAsRead
);
router19.patch(
  "/:id/read",
  checkAuth(),
  notificationController.markAsRead
);
router19.delete(
  "/:id",
  checkAuth(),
  notificationController.deleteNotification
);
router19.delete(
  "/",
  checkAuth(),
  notificationController.deleteAllNotifications
);
var notificationRoutes = router19;

// src/app/modules/recruiterInterview/interview/interview.route.ts
import { Router as Router20 } from "express";

// src/app/modules/recruiterInterview/interview/interview.validation.ts
import { z as z5 } from "zod";
var createInterviewSchema = z5.object({
  applicationId: z5.string().uuid(),
  scheduledAt: z5.string().datetime({
    offset: true
  }),
  durationMinutes: z5.number().int().min(15).max(180).default(30),
  type: z5.enum(["VIDEO", "PHONE", "IN_PERSON"]).default("VIDEO"),
  title: z5.string().trim().min(3).max(200).optional(),
  notes: z5.string().trim().max(2e3).optional(),
  meetingUrl: z5.string().url().optional()
});
var rescheduleInterviewSchema = z5.object({
  scheduledAt: z5.string().datetime({
    offset: true
  }),
  durationMinutes: z5.number().int().min(15).max(180).optional()
});
var sendMessageSchema = z5.object({
  content: z5.string().trim().min(1).max(5e3)
});

// src/app/modules/recruiterInterview/interview/interview.service.ts
function createMeetingUrl(applicationId) {
  const room = `ai-recruitment-${applicationId}`;
  return `https://meet.jit.si/${room}`;
}
async function recruiterOwnsApplication(recruiterId, application) {
  const company = await prisma.company.findFirst({
    where: {
      id: application.job.companyId,
      userId: recruiterId
    },
    select: {
      id: true
    }
  });
  return Boolean(company);
}
async function createInterview(recruiterId, input) {
  const data = createInterviewSchema.parse(input);
  const application = await prisma.jobApplication.findUnique({
    where: {
      id: data.applicationId
    },
    include: {
      candidateProfile: {
        select: {
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      job: {
        select: {
          id: true,
          title: true,
          companyId: true
        }
      }
    }
  });
  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  const isOwner = await recruiterOwnsApplication(
    recruiterId,
    application
  );
  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }
  if (application.status === ApplicationStatus.REJECTED) {
    throw new Error("CANNOT_SCHEDULE_INTERVIEW_FOR_REJECTED_APPLICATION");
  }
  const existingInterview = await prisma.interview.findFirst({
    where: {
      jobApplicationId: application.id,
      status: {
        in: [
          InterviewStatus.SCHEDULED,
          InterviewStatus.STARTED
        ]
      }
    },
    orderBy: {
      scheduledAt: "desc"
    }
  });
  if (existingInterview) {
    throw new Error("ACTIVE_INTERVIEW_ALREADY_EXISTS");
  }
  const scheduledAt = new Date(data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) {
    throw new Error("INVALID_INTERVIEW_DATE");
  }
  if (scheduledAt.getTime() <= Date.now()) {
    throw new Error("INTERVIEW_TIME_MUST_BE_IN_FUTURE");
  }
  const meetingUrl = data.meetingUrl ?? createMeetingUrl(application.id);
  const interview = await prisma.$transaction(
    async (tx) => {
      const createdInterview = await tx.interview.create({
        data: {
          jobApplicationId: application.id,
          scheduledById: recruiterId,
          scheduledAt,
          durationMinutes: data.durationMinutes,
          type: data.type,
          title: data.title ?? `Interview for ${application.job.title}`,
          notes: data.notes ?? null,
          meetingUrl,
          status: InterviewStatus.SCHEDULED
        }
      });
      await tx.notification.create({
        data: {
          userId: application.candidateProfile.userId,
          type: "INTERVIEW_SCHEDULED",
          channel: "IN_APP",
          status: "PENDING",
          title: "Interview scheduled",
          message: `Your interview for "${application.job.title}" has been scheduled.`,
          applicationId: application.id,
          interviewId: createdInterview.id
        }
      });
      const conversationId = await getOrCreateConversation(
        tx,
        application.id,
        application.candidateProfile.userId,
        recruiterId
      );
      await tx.message.create({
        data: {
          conversationId,
          senderId: recruiterId,
          content: `Your interview has been scheduled for ${scheduledAt.toLocaleString()}. Please check the interview details.`,
          isAutomatic: true
        }
      });
      return createdInterview;
    }
  );
  return interview;
}
async function getOrCreateConversation(tx, applicationId, candidateUserId, recruiterId) {
  const existingConversation = await tx.conversation.findUnique({
    where: {
      jobApplicationId: applicationId
    }
  });
  if (existingConversation) {
    return existingConversation.id;
  }
  const conversation = await tx.conversation.create({
    data: {
      jobApplicationId: applicationId,
      participants: {
        create: [
          {
            userId: candidateUserId
          },
          {
            userId: recruiterId
          }
        ]
      }
    }
  });
  return conversation.id;
}
async function getInterview(userId, applicationId) {
  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId
    },
    include: {
      candidateProfile: {
        include: {
          user: true
        }
      },
      job: true,
      interviews: {
        orderBy: {
          scheduledAt: "desc"
        }
      }
    }
  });
  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  const isCandidate = application.candidateProfile.userId === userId;
  const isRecruiter = await recruiterOwnsApplication(
    userId,
    application
  );
  if (!isCandidate && !isRecruiter) {
    throw new Error("FORBIDDEN");
  }
  return application;
}
async function rescheduleInterview(recruiterId, interviewId, input) {
  const data = rescheduleInterviewSchema.parse(input);
  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewId
    },
    include: {
      jobApplication: {
        include: {
          candidateProfile: {
            select: {
              userId: true
            }
          },
          job: {
            select: {
              id: true,
              title: true,
              companyId: true
            }
          }
        }
      }
    }
  });
  if (!interview) {
    throw new Error("INTERVIEW_NOT_FOUND");
  }
  const isOwner = await recruiterOwnsApplication(
    recruiterId,
    interview.jobApplication
  );
  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }
  if (interview.status !== InterviewStatus.SCHEDULED) {
    throw new Error(
      "INTERVIEW_CANNOT_BE_RESCHEDULED"
    );
  }
  const scheduledAt = new Date(data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) {
    throw new Error("INVALID_INTERVIEW_DATE");
  }
  if (scheduledAt.getTime() <= Date.now()) {
    throw new Error(
      "INTERVIEW_TIME_MUST_BE_IN_FUTURE"
    );
  }
  const updatedInterview = await prisma.$transaction(
    async (tx) => {
      const updated = await tx.interview.update({
        where: {
          id: interviewId
        },
        data: {
          scheduledAt
        }
      });
      await tx.notification.create({
        data: {
          userId: interview.jobApplication.candidateProfile.userId,
          type: "INTERVIEW_RESCHEDULED",
          channel: "IN_APP",
          status: "PENDING",
          title: "Interview rescheduled",
          message: `Your interview for "${interview.jobApplication.job.title}" has been rescheduled to ${scheduledAt.toLocaleString()}.`,
          applicationId: interview.jobApplication.id,
          interviewId: interview.id
        }
      });
      const conversationId = await getOrCreateConversation(
        tx,
        interview.jobApplication.id,
        interview.jobApplication.candidateProfile.userId,
        recruiterId
      );
      await tx.message.create({
        data: {
          conversationId,
          senderId: recruiterId,
          content: `Your interview has been rescheduled to ${scheduledAt.toLocaleString()}.`,
          isAutomatic: true
        }
      });
      return updated;
    }
  );
  return updatedInterview;
}
async function cancelInterview(recruiterId, interviewId) {
  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewId
    },
    include: {
      jobApplication: {
        include: {
          candidateProfile: {
            select: {
              userId: true
            }
          },
          job: {
            select: {
              id: true,
              title: true,
              companyId: true
            }
          }
        }
      }
    }
  });
  if (!interview) {
    throw new Error("INTERVIEW_NOT_FOUND");
  }
  const isOwner = await recruiterOwnsApplication(
    recruiterId,
    interview.jobApplication
  );
  if (!isOwner) {
    throw new Error("FORBIDDEN");
  }
  if (interview.status === InterviewStatus.CANCELLED || interview.status === InterviewStatus.COMPLETED) {
    throw new Error(
      "INTERVIEW_ALREADY_CLOSED"
    );
  }
  const cancelledInterview = await prisma.$transaction(
    async (tx) => {
      const updated = await tx.interview.update({
        where: {
          id: interviewId
        },
        data: {
          status: InterviewStatus.CANCELLED
        }
      });
      await tx.notification.create({
        data: {
          userId: interview.jobApplication.candidateProfile.userId,
          type: "INTERVIEW_CANCELLED",
          channel: "IN_APP",
          status: "PENDING",
          title: "Interview cancelled",
          message: `Your interview for "${interview.jobApplication.job.title}" has been cancelled.`,
          applicationId: interview.jobApplication.id,
          interviewId: interview.id
        }
      });
      const conversationId = await getOrCreateConversation(
        tx,
        interview.jobApplication.id,
        interview.jobApplication.candidateProfile.userId,
        recruiterId
      );
      await tx.message.create({
        data: {
          conversationId,
          senderId: recruiterId,
          content: `Your interview for "${interview.jobApplication.job.title}" has been cancelled.`,
          isAutomatic: true
        }
      });
      return updated;
    }
  );
  return cancelledInterview;
}
var getAll = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const interviews = await prisma.interview.findMany({
    where: {
      jobApplication: {
        job: {
          company: {
            userId
          }
        }
      }
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
                  image: true
                }
              },
              skills: true,
              education: true
            }
          },
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  website: true
                }
              },
              requiredSkills: true
            }
          }
        }
      }
    },
    orderBy: {
      scheduledAt: "asc"
    }
  });
  return interviews;
};

// src/app/modules/recruiterInterview/interview/interview.controller.ts
async function createInterviewController(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const interview = await createInterview(
      userId,
      req.body
    );
    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      data: interview
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      switch (error.message) {
        case "APPLICATION_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Application not found"
          });
        case "FORBIDDEN":
          return res.status(403).json({
            success: false,
            message: "You cannot access this application"
          });
        case "ACTIVE_INTERVIEW_ALREADY_EXISTS":
          return res.status(409).json({
            success: false,
            message: "An active interview already exists for this application"
          });
        case "INTERVIEW_TIME_MUST_BE_IN_FUTURE":
          return res.status(400).json({
            success: false,
            message: "Interview time must be in the future"
          });
        case "INVALID_INTERVIEW_DATE":
          return res.status(400).json({
            success: false,
            message: "Invalid interview date"
          });
        case "CANNOT_SCHEDULE_INTERVIEW_FOR_REJECTED_APPLICATION":
          return res.status(400).json({
            success: false,
            message: "Cannot schedule an interview for a rejected application"
          });
      }
    }
    return res.status(500).json({
      success: false,
      message: "Failed to create interview"
    });
  }
}
async function getApplicationInterviewController(req, res) {
  try {
    const userId = req.user?.userId;
    const applicationId = Array.isArray(
      req.params.applicationId
    ) ? req.params.applicationId[0] : req.params.applicationId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required"
      });
    }
    const application = await getInterview(
      userId,
      applicationId
    );
    return res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      switch (error.message) {
        case "APPLICATION_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Application not found"
          });
        case "FORBIDDEN":
          return res.status(403).json({
            success: false,
            message: "You cannot access this application"
          });
      }
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview"
    });
  }
}
async function rescheduleInterviewController(req, res) {
  try {
    const userId = req.user?.userId;
    const interviewId = Array.isArray(
      req.params.interviewId
    ) ? req.params.interviewId[0] : req.params.interviewId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required"
      });
    }
    const interview = await rescheduleInterview(
      userId,
      interviewId,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Interview rescheduled successfully",
      data: interview
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      switch (error.message) {
        case "INTERVIEW_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Interview not found"
          });
        case "FORBIDDEN":
          return res.status(403).json({
            success: false,
            message: "You cannot modify this interview"
          });
        case "INTERVIEW_CANNOT_BE_RESCHEDULED":
          return res.status(400).json({
            success: false,
            message: "This interview cannot be rescheduled"
          });
        case "INTERVIEW_TIME_MUST_BE_IN_FUTURE":
          return res.status(400).json({
            success: false,
            message: "Interview time must be in the future"
          });
        case "INVALID_INTERVIEW_DATE":
          return res.status(400).json({
            success: false,
            message: "Invalid interview date"
          });
      }
    }
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule interview"
    });
  }
}
async function cancelInterviewController(req, res) {
  try {
    const userId = req.user?.userId;
    const interviewId = Array.isArray(
      req.params.interviewId
    ) ? req.params.interviewId[0] : req.params.interviewId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required"
      });
    }
    const interview = await cancelInterview(
      userId,
      interviewId
    );
    return res.status(200).json({
      success: true,
      message: "Interview cancelled successfully",
      data: interview
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      switch (error.message) {
        case "INTERVIEW_NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Interview not found"
          });
        case "FORBIDDEN":
          return res.status(403).json({
            success: false,
            message: "You cannot modify this interview"
          });
        case "INTERVIEW_ALREADY_CLOSED":
          return res.status(400).json({
            success: false,
            message: "This interview is already closed"
          });
      }
    }
    return res.status(500).json({
      success: false,
      message: "Failed to cancel interview"
    });
  }
}
var getAll2 = async (req, res) => {
  try {
    console.log("GET ALL INTERVIEWS");
    console.log("req.user:", req.user);
    const userId = req.user?.userId;
    console.log("userId:", userId);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const interviews = await getAll(userId);
    return res.status(200).json({
      success: true,
      message: "Interviews retrieved successfully",
      data: {
        interviews
      }
    });
  } catch (error) {
    console.error("Get all interviews error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve interviews"
    });
  }
};

// src/app/modules/recruiterInterview/interview/interview.route.ts
var router20 = Router20();
router20.post(
  "/",
  checkAuth(),
  createInterviewController
);
router20.get(
  "/applications/:applicationId",
  checkAuth(),
  getApplicationInterviewController
);
router20.patch(
  "/:interviewId/reschedule",
  checkAuth(),
  rescheduleInterviewController
);
router20.patch(
  "/:interviewId/cancel",
  checkAuth(),
  cancelInterviewController
);
router20.get(
  "/data",
  checkAuth(),
  getAll2
);
var InterviewRouterCandidate = router20;

// src/app/modules/recruiterInterview/conversation/conversation.routes.ts
import { Router as Router21 } from "express";

// src/app/modules/recruiterInterview/conversation/conversation.service.ts
async function getApplicationConversation(userId, applicationId) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      jobApplicationId: applicationId
    },
    include: {
      jobApplication: {
        include: {
          candidateProfile: {
            include: {
              user: true
            }
          },
          job: true
        }
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    }
  });
  if (!conversation) {
    throw new Error("CONVERSATION_NOT_FOUND");
  }
  const participant = conversation.participants.some(
    (item) => item.userId === userId
  );
  if (!participant) {
    throw new Error("FORBIDDEN");
  }
  return conversation;
}
async function sendMessage(userId, applicationId, input) {
  const data = sendMessageSchema.parse(input);
  const conversation = await prisma.conversation.findUnique({
    where: {
      jobApplicationId: applicationId
    },
    include: {
      participants: true,
      jobApplication: {
        include: {
          candidateProfile: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });
  if (!conversation) {
    throw new Error("CONVERSATION_NOT_FOUND");
  }
  const participant = conversation.participants.some(
    (item) => item.userId === userId
  );
  if (!participant) {
    throw new Error("FORBIDDEN");
  }
  const receiver = conversation.participants.find(
    (item) => item.userId !== userId
  );
  const message = await prisma.$transaction(
    async (tx) => {
      const created = await tx.message.create({
        data: {
          conversationId: conversation.id,
          senderId: userId,
          content: data.content,
          isAutomatic: false
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
      if (receiver) {
        await tx.notification.create({
          data: {
            userId: receiver.userId,
            type: "NEW_MESSAGE",
            channel: "IN_APP",
            title: "New message",
            message: data.content.slice(0, 120),
            applicationId
          }
        });
      }
      return created;
    }
  );
  return message;
}
async function getCandidateConversations(userId) {
  if (!userId) {
    throw new Error("USER_ID_REQUIRED");
  }
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId
        }
      }
    },
    include: {
      jobApplication: {
        include: {
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  website: true
                }
              },
              requiredSkills: true
            }
          },
          candidateProfile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true
                }
              }
            }
          }
        }
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "desc"
        },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
  return conversations;
}
async function getAllConversations(userId) {
  if (!userId) {
    throw new Error("USER_ID_REQUIRED");
  }
  const conversations = await prisma.conversation.findMany({
    where: {
      jobApplication: {
        job: {
          company: {
            userId
          }
        }
      }
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
                  image: true
                }
              },
              skills: true,
              education: true
            }
          },
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  website: true
                }
              },
              requiredSkills: true
            }
          }
        }
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "desc"
        },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
  return conversations;
}
var ConversationService = {
  /* =======================================================
     SEND MESSAGE
  ======================================================= */
  async sendMessage({
    conversationId,
    senderId,
    content
  }) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      select: {
        id: true
      }
    });
    if (!conversation) {
      throw new Error(
        "CONVERSATION_NOT_FOUND"
      );
    }
    const participant = await prisma.conversationParticipant.findUnique(
      {
        where: {
          conversationId_userId: {
            conversationId,
            userId: senderId
          }
        },
        select: {
          id: true
        }
      }
    );
    if (!participant) {
      throw new Error(
        "NOT_CONVERSATION_PARTICIPANT"
      );
    }
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });
    await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return message;
  },
  /* =======================================================
     MARK AS READ
  ======================================================= */
  async markConversationAsRead(conversationId, userId) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      select: {
        id: true
      }
    });
    if (!conversation) {
      throw new Error(
        "CONVERSATION_NOT_FOUND"
      );
    }
    const participant = await prisma.conversationParticipant.findUnique(
      {
        where: {
          conversationId_userId: {
            conversationId,
            userId
          }
        },
        select: {
          id: true
        }
      }
    );
    if (!participant) {
      throw new Error(
        "NOT_CONVERSATION_PARTICIPANT"
      );
    }
    await prisma.message.updateMany({
      where: {
        conversationId,
        senderId: {
          not: userId
        },
        readAt: null
      },
      data: {
        readAt: /* @__PURE__ */ new Date()
      }
    });
  }
};
async function getApplicationMessages(userId, applicationId) {
  if (!userId) {
    throw new Error("USER_ID_REQUIRED");
  }
  if (!applicationId) {
    throw new Error("APPLICATION_ID_REQUIRED");
  }
  const conversation = await prisma.conversation.findUnique({
    where: {
      jobApplicationId: applicationId
    },
    select: {
      id: true,
      jobApplication: {
        select: {
          id: true,
          candidateProfile: {
            select: {
              userId: true
            }
          },
          job: {
            select: {
              id: true,
              title: true
            }
          }
        }
      },
      participants: {
        select: {
          userId: true
        }
      }
    }
  });
  if (!conversation) {
    throw new Error("CONVERSATION_NOT_FOUND");
  }
  const isParticipant = conversation.participants.some(
    (participant) => participant.userId === userId
  );
  const isApplicationUser = conversation?.jobApplication?.candidateProfile?.userId === userId;
  if (!isParticipant && !isApplicationUser) {
    throw new Error("FORBIDDEN");
  }
  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversation.id
    },
    orderBy: {
      createdAt: "asc"
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
  return messages;
}

// src/app/modules/recruiterInterview/conversation/conversation.controller.ts
async function getConversationController(req, res) {
  try {
    console.log("========== CONVERSATION AUTH ==========");
    console.log("User:", req.user);
    console.log("Application ID:", req.params.applicationId);
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const conversation = await getApplicationConversation(
      userId,
      String(req.params.applicationId)
    );
    return res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "You cannot access this conversation"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversation"
    });
  }
}
async function sendMessageController(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const message = await sendMessage(
      userId,
      String(req.params.applicationId),
      req.body
    );
    return res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
}
async function getAllConversationsController(req, res) {
  try {
    console.log("========== GET ALL CONVERSATIONS ==========");
    console.log("User:", req.user);
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const conversations = await getAllConversations(userId);
    return res.status(200).json({
      success: true,
      message: "Conversations retrieved successfully",
      data: {
        conversations
      }
    });
  } catch (error) {
    console.error(
      "Get all conversations error:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations"
    });
  }
}
var sendMessageControllerJob = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { conversationId } = req.params;
    const { content } = req.body;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required"
      });
    }
    if (typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content is required"
      });
    }
    const message = await ConversationService.sendMessage({
      conversationId: String(conversationId),
      senderId: userId,
      content: content.trim()
    });
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message
    });
  } catch (error) {
    console.error(
      "sendMessageController error:",
      error
    );
    if (error instanceof Error && error.message === "CONVERSATION_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }
    if (error instanceof Error && error.message === "NOT_CONVERSATION_PARTICIPANT") {
      return res.status(403).json({
        success: false,
        message: "You are not a participant of this conversation"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};
async function getCandidateConversationsController(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const conversations = await getCandidateConversations(userId);
    return res.status(200).json({
      success: true,
      message: "Candidate conversations retrieved successfully",
      data: {
        conversations
      }
    });
  } catch (error) {
    console.error(
      "Get candidate conversations error:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidate conversations"
    });
  }
}
async function getApplicationMessagesController(req, res) {
  try {
    console.log(
      "========== GET APPLICATION MESSAGES =========="
    );
    console.log("User:", req.user);
    console.log(
      "Application ID:",
      req.params.applicationId
    );
    const userId = req.user?.userId;
    const applicationId = String(
      req.params.applicationId
    );
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required"
      });
    }
    const messages = await getApplicationMessages(
      userId,
      applicationId
    );
    return res.status(200).json({
      success: true,
      message: "Application messages retrieved successfully",
      data: {
        messages
      }
    });
  } catch (error) {
    console.error(
      "Get application messages error:",
      error
    );
    if (error instanceof Error && error.message === "CONVERSATION_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "You cannot access these messages"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch application messages"
    });
  }
}

// src/app/modules/recruiterInterview/conversation/conversation.routes.ts
var router21 = Router21();
router21.get(
  "/",
  checkAuth(),
  getAllConversationsController
);
router21.get(
  "/applications/:applicationId",
  checkAuth(),
  getConversationController
);
router21.post(
  "/:conversationId/messages",
  checkAuth(),
  sendMessageControllerJob
);
router21.get(
  "/candidate",
  checkAuth(),
  getCandidateConversationsController
);
router21.get(
  "/applications/:applicationId/messages",
  checkAuth(),
  getApplicationMessagesController
);
router21.post(
  "/applications/:applicationId/messages",
  checkAuth(),
  sendMessageController
);
var ConversationRouterRecruiter = router21;

// src/app/modules/recruiterInterview/candidadeInterview/interview.route.ts
import { Router as Router22 } from "express";

// src/app/modules/recruiterInterview/candidadeInterview/interview.service.ts
var InterviewService = class {
  // ============================================
  // CREATE INTERVIEW
  // Recruiter creates an interview
  // ============================================
  async createInterview(recruiterId, payload) {
    const application = await prisma.jobApplication.findUnique({
      where: {
        id: payload.jobApplicationId
      },
      include: {
        candidateProfile: {
          include: {
            user: true
          }
        },
        job: true
      }
    });
    if (!application) {
      throw new Error("Job application not found");
    }
    if (application.job.id !== recruiterId) {
      throw new Error(
        "You are not authorized to schedule an interview for this application"
      );
    }
    const scheduledAt = new Date(payload.scheduledAt);
    if (scheduledAt <= /* @__PURE__ */ new Date()) {
      throw new Error(
        "Interview date must be in the future"
      );
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
        title: payload.title || `${application.job.title} Interview`,
        notes: payload.notes || null
      },
      include: {
        jobApplication: {
          include: {
            job: true,
            candidateProfile: {
              include: {
                user: true
              }
            }
          }
        },
        scheduledBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    return interview;
  }
  // ============================================
  // GET CANDIDATE INTERVIEWS
  // ============================================
  async getCandidateInterviews(userId) {
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: {
        userId
      }
    });
    if (!candidateProfile) {
      throw new Error(
        "Candidate profile not found"
      );
    }
    const interviews = await prisma.interview.findMany({
      where: {
        jobApplication: {
          candidateProfileId: candidateProfile.id
        }
      },
      orderBy: {
        scheduledAt: "asc"
      },
      include: {
        jobApplication: {
          include: {
            job: {
              include: {
                company: true
              }
            }
          }
        },
        scheduledBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    const now = /* @__PURE__ */ new Date();
    const upcoming = interviews.filter(
      (interview) => interview.scheduledAt > now && interview.status !== InterviewStatus.CANCELLED && interview.status !== InterviewStatus.COMPLETED
    );
    const completed = interviews.filter(
      (interview) => interview.status === InterviewStatus.COMPLETED
    );
    const cancelled = interviews.filter(
      (interview) => interview.status === InterviewStatus.CANCELLED
    );
    return {
      interviews,
      upcoming,
      completed,
      cancelled,
      stats: {
        total: interviews.length,
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length
      }
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
            userId
          }
        }
      },
      include: {
        jobApplication: {
          include: {
            job: {
              include: {
                company: true
              }
            },
            candidateProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        },
        scheduledBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found"
      );
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
            userId
          }
        }
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found"
      );
    }
    if (interview.status === InterviewStatus.CANCELLED) {
      throw new Error(
        "Cancelled interview cannot be confirmed"
      );
    }
    if (interview.status === InterviewStatus.COMPLETED) {
      throw new Error(
        "Completed interview cannot be confirmed"
      );
    }
    return prisma.interview.update({
      where: {
        id: interviewId
      },
      data: {
        status: InterviewStatus.COMPLETED
      },
      include: {
        jobApplication: {
          include: {
            job: true
          }
        }
      }
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
            userId
          }
        }
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found"
      );
    }
    if (interview.status === InterviewStatus.COMPLETED) {
      throw new Error(
        "Completed interview cannot be cancelled"
      );
    }
    if (interview.status === InterviewStatus.CANCELLED) {
      throw new Error(
        "Interview is already cancelled"
      );
    }
    return prisma.interview.update({
      where: {
        id: interviewId
      },
      data: {
        status: InterviewStatus.CANCELLED
      }
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
            userId
          }
        }
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found"
      );
    }
    if (interview.status === InterviewStatus.COMPLETED) {
      throw new Error(
        "Completed interview cannot be rescheduled"
      );
    }
    const newDate = new Date(
      scheduledAt
    );
    if (newDate <= /* @__PURE__ */ new Date()) {
      throw new Error(
        "New interview date must be in the future"
      );
    }
    return prisma.interview.update({
      where: {
        id: interviewId
      },
      data: {
        scheduledAt: newDate,
        status: InterviewStatus.RESCHEDULED
      }
    });
  }
  // ============================================
  // GET RECRUITER INTERVIEWS
  // ============================================
  async getRecruiterInterviews(recruiterId) {
    return prisma.interview.findMany({
      where: {
        scheduledById: recruiterId
      },
      orderBy: {
        scheduledAt: "asc"
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
                    email: true
                  }
                }
              }
            }
          }
        }
      }
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
        scheduledById: recruiterId
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found or unauthorized"
      );
    }
    const data = {};
    if (payload.scheduledAt) {
      const newDate = new Date(
        payload.scheduledAt
      );
      if (newDate <= /* @__PURE__ */ new Date()) {
        throw new Error(
          "Interview date must be in the future"
        );
      }
      data.scheduledAt = newDate;
    }
    if (payload.durationMinutes !== void 0) {
      data.durationMinutes = payload.durationMinutes;
    }
    if (payload.type) {
      data.type = payload.type;
    }
    if (payload.meetingUrl !== void 0) {
      data.meetingUrl = payload.meetingUrl || null;
    }
    if (payload.title !== void 0) {
      data.title = payload.title || null;
    }
    if (payload.notes !== void 0) {
      data.notes = payload.notes || null;
    }
    return prisma.interview.update({
      where: {
        id: interviewId
      },
      data,
      include: {
        jobApplication: {
          include: {
            job: true
          }
        }
      }
    });
  }
  // ============================================
  // DELETE INTERVIEW
  // ============================================
  async deleteInterview(recruiterId, interviewId) {
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        scheduledById: recruiterId
      }
    });
    if (!interview) {
      throw new Error(
        "Interview not found or unauthorized"
      );
    }
    return prisma.interview.delete({
      where: {
        id: interviewId
      }
    });
  }
};
var interview_service_default = new InterviewService();

// src/app/modules/recruiterInterview/candidadeInterview/interview.validation.ts
import { z as z6 } from "zod";
var createInterviewSchema2 = z6.object({
  jobApplicationId: z6.string().uuid("Invalid job application ID"),
  scheduledAt: z6.string().datetime("Invalid scheduled date"),
  durationMinutes: z6.number().int().positive().max(480).optional(),
  type: z6.enum([
    "VIDEO",
    "PHONE",
    "IN_PERSON"
  ]).optional(),
  meetingUrl: z6.string().url("Invalid meeting URL").optional().or(z6.literal("")),
  title: z6.string().max(200).optional(),
  notes: z6.string().max(5e3).optional()
});
var updateInterviewSchema = z6.object({
  scheduledAt: z6.string().datetime("Invalid scheduled date").optional(),
  durationMinutes: z6.number().int().positive().max(480).optional(),
  type: z6.enum([
    "VIDEO",
    "PHONE",
    "IN_PERSON"
  ]).optional(),
  meetingUrl: z6.string().url("Invalid meeting URL").optional().or(z6.literal("")),
  title: z6.string().max(200).optional(),
  notes: z6.string().max(5e3).optional()
});

// src/app/modules/recruiterInterview/candidadeInterview/interview.controller.ts
var createInterviewController2 = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const parsed = createInterviewSchema2.safeParse(
      req.body
    );
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten()
      });
    }
    const interview = await interview_service_default.createInterview(
      recruiterId,
      parsed?.data
    );
    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      data: interview
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create interview"
    });
  }
};
var getCandidateInterviewsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await interview_service_default.getCandidateInterviews(
      userId
    );
    return res.status(200).json({
      success: true,
      message: "Candidate interviews retrieved successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve interviews"
    });
  }
};
var getCandidateInterviewByIdController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { interviewId } = req.params;
    const interview = await interview_service_default.getCandidateInterviewById(
      userId,
      interviewId
    );
    return res.status(200).json({
      success: true,
      message: "Interview retrieved successfully",
      data: interview
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Interview not found"
    });
  }
};
var confirmInterviewController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { interviewId } = req.params;
    const interview = await interview_service_default.confirmInterview(
      userId,
      interviewId
    );
    return res.status(200).json({
      success: true,
      message: "Interview confirmed successfully",
      data: interview
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to confirm interview"
    });
  }
};
var cancelInterviewController2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { interviewId } = req.params;
    const interview = await interview_service_default.cancelInterview(
      userId,
      interviewId
    );
    return res.status(200).json({
      success: true,
      message: "Interview cancelled successfully",
      data: interview
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel interview"
    });
  }
};
var rescheduleInterviewController2 = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { interviewId } = req.params;
    const { scheduledAt } = req.body;
    if (!scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "scheduledAt is required"
      });
    }
    const interview = await interview_service_default.rescheduleInterview(
      userId,
      interviewId,
      scheduledAt
    );
    return res.status(200).json({
      success: true,
      message: "Interview rescheduled successfully",
      data: interview
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to reschedule interview"
    });
  }
};
var getRecruiterInterviewsController = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const interviews = await interview_service_default.getRecruiterInterviews(
      recruiterId
    );
    return res.status(200).json({
      success: true,
      message: "Recruiter interviews retrieved successfully",
      data: interviews
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve interviews"
    });
  }
};
var updateInterviewController = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const { interviewId } = req.params;
    const parsed = updateInterviewSchema.safeParse(
      req.body
    );
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten()
      });
    }
    const interview = await interview_service_default.updateInterview(
      recruiterId,
      interviewId,
      parsed.data
    );
    return res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: interview
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update interview"
    });
  }
};
var deleteInterviewController = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const { interviewId } = req.params;
    await interview_service_default.deleteInterview(
      recruiterId,
      interviewId
    );
    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete interview"
    });
  }
};

// src/app/modules/recruiterInterview/candidadeInterview/interview.route.ts
var router22 = Router22();
router22.post(
  "/",
  checkAuth(Role.RECRUITER),
  createInterviewController2
);
router22.get(
  "/recruiter",
  checkAuth(Role.RECRUITER),
  getRecruiterInterviewsController
);
router22.patch(
  "/:interviewId",
  checkAuth(Role.RECRUITER),
  updateInterviewController
);
router22.delete(
  "/:interviewId",
  checkAuth(Role.RECRUITER),
  deleteInterviewController
);
router22.get(
  "/candidate",
  checkAuth(Role.CANDIDATE),
  getCandidateInterviewsController
);
router22.get(
  "/candidate/:interviewId",
  checkAuth(Role.CANDIDATE),
  getCandidateInterviewByIdController
);
router22.patch(
  "/candidate/:interviewId/confirm",
  checkAuth(Role.CANDIDATE),
  confirmInterviewController
);
router22.patch(
  "/candidate/:interviewId/cancel",
  checkAuth(Role.CANDIDATE),
  cancelInterviewController2
);
router22.patch(
  "/candidate/:interviewId/reschedule",
  checkAuth(Role.CANDIDATE),
  rescheduleInterviewController2
);
var candidateInterviews = router22;

// src/app/routes/index.ts
var router23 = Router23();
router23.use("/auth", authRouters);
router23.use("/candidates", candidateRoutes);
router23.use("/resume", resumeRouter);
router23.use("/company", companyRouter);
router23.use("/job", jobRouters);
router23.use("/skill", jobSkillRouters);
router23.use("/skill-gap", skillGapRouter);
router23.use("/job-matches", jobMatchRouter);
router23.use("/candidate", candidateApplication);
router23.use("/", recruiterApplication);
router23.use("/", ApplicationStatusHistoryRoutes);
router23.use("/interview", InterviewRouter);
router23.use("/interviewPractices", InterviewPracticesRouter);
router23.use("/application-assistant", ApplicationAssistantRouter);
router23.use("/candidate-ranking", CandidateRankingRouter);
router23.use("/ai-recruiter", AIRecruiterRouter);
router23.use("/complaints", ComplaintRouter);
router23.use("/review-complaints", ReviewComplaintRouter);
router23.use("/notifications", notificationRoutes);
router23.use("/job/interviews", InterviewRouterCandidate);
router23.use("/conversations", ConversationRouterRecruiter);
router23.use("/interviews", candidateInterviews);
var indexRoutes = router23;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";

// src/app/middleware/globalErrorHandler.ts
import status17 from "http-status";
import z7 from "zod";

// src/app/errorHelpers/ZodError.ts
import status16 from "http-status";
var handleZodError = (err) => {
  const statusCode = status16.BAD_REQUEST;
  const message = "Zod Validation Error";
  const errorSources = [];
  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" => "),
      message: issue.message
    });
  });
  return {
    success: false,
    message,
    errorSources,
    statusCode
  };
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }
  let errorSources = [];
  let statusCode = status17.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let stack = void 0;
  if (err instanceof z7.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof AppError_default) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  } else if (err instanceof Error) {
    statusCode = status17.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  }
  const errorResponse = {
    success: false,
    message,
    errorSources,
    error: process.env.NODE_ENV === "development" ? err : void 0,
    stack: process.env.NODE_ENV === "development" ? stack : void 0
  };
  res.status(statusCode).json(errorResponse);
};

// src/app/middleware/notFound.ts
import status18 from "http-status";
var notFound = (req, res) => {
  res.status(status18.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} Not Found`
  });
};

// src/app.ts
import path4 from "path";
var app = express();
var allowedOrigins = [
  envVars.FRONTEND_URL,
  envVars.BETTER_AUTH_URL,
  "http://localhost:3000",
  "http://localhost:5000"
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/auth", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path4.resolve(process.cwd(), `src/app/templates`));
app.use(cookieParser());
app.use(express.json());
app.use("/", indexRoutes);
app.use("/api/v1", indexRoutes);
app.use(globalErrorHandler);
app.use(notFound);
app.get("/", async (req, res) => {
  res.status(201).json({
    success: true,
    message: "API is working"
  });
});

// src/server.ts
var bootstrap = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
bootstrap();
//# sourceMappingURL=server.js.map