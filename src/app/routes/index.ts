
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";
import { candidateRoutes } from "../modules/candidate/candidate.route";
import { resumeRouter } from "../modules/Resume/resume.route";
import { companyRouter } from "../modules/company/createCompany/company.router";
import { jobRouters } from "../modules/company/createJob/job.route";
import { jobSkillRouters } from "../modules/company/jobSkills/job.router";
import { skillGapRouter } from "../modules/skillGap/skillGap.routes";
import { jobMatchRouter } from "../modules/jobMatched/job.router";
import { candidateApplication } from "../modules/Application/candidate/application.router";
import { recruiterApplication } from "../modules/Application/recruter/application.router";
import { ApplicationStatusHistoryRoutes } from "../modules/applicationStatusHistory/applicationStatusHistory.route";
import { InterviewRouter } from "../modules/AiServices/interview/interview.router";
import { InterviewPracticesRouter } from "../modules/AiServices/Interview_Practice/interview.router";
import { ApplicationAssistantRouter } from "../modules/applicationAssistant/applicationAssistant.route";
import { CandidateRankingRouter } from "../modules/candidateRanking/candidateRanking.route";
import { AIRecruiterRouter } from "../modules/aiRecruiter/aiRecruiter.route";
import { ComplaintRouter } from "../modules/complaint/complaint.route";
import { ReviewComplaintRouter } from "../modules/reviewComplaint/reviewComplaint.route";


const router=Router()

router.use("/auth",authRouters)
router.use("/candidates",candidateRoutes)
router.use("/resume",resumeRouter)
router.use("/company",companyRouter)
router.use("/job",jobRouters)
router.use("/skill",jobSkillRouters)
router.use("/skill-gap",skillGapRouter)
router.use("/job-matches",jobMatchRouter)
router.use("/candidate",candidateApplication)
router.use("/",recruiterApplication)
router.use("/",ApplicationStatusHistoryRoutes)
router.use("/interview",InterviewRouter)
router.use("/interviewPractices",InterviewPracticesRouter)
router.use("/application-assistant",ApplicationAssistantRouter)
router.use("/candidate-ranking",CandidateRankingRouter)
router.use("/ai-recruiter",AIRecruiterRouter)
router.use("/complaints",ComplaintRouter)
router.use("/review-complaints",ReviewComplaintRouter)

export const indexRoutes=router;