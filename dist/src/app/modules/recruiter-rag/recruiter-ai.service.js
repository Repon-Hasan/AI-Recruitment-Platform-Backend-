"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askRecruiterAI = exports.ingestResumeForRAG = void 0;
const retrieval_service_1 = require("./retrieval.service");
const candidate_grouping_service_1 = require("./candidate-grouping.service");
const llm_service_1 = require("./llm.service");
const prisma_1 = require("../../lib/prisma");
const ingestion_service_1 = require("../Resume/ingestion.service");
const ingestResumeForRAG = async (resumeId) => {
    const resume = await prisma_1.prisma.resume.findUnique({
        where: {
            id: resumeId,
        },
    });
    if (!resume) {
        throw new Error("Resume not found");
    }
    await (0, ingestion_service_1.ingestResume)(resumeId);
    return {
        resumeId,
        message: "Resume successfully indexed for RAG",
    };
};
exports.ingestResumeForRAG = ingestResumeForRAG;
const askRecruiterAI = async (question, topK = 10) => {
    const chunks = await (0, retrieval_service_1.retrieveRelevantResumeChunks)(question, topK);
    if (chunks.length === 0) {
        return {
            summary: "No relevant candidates were found.",
            candidates: [],
            retrievedChunks: 0,
        };
    }
    const candidates = (0, candidate_grouping_service_1.groupChunksByCandidate)(chunks);
    const answer = await (0, llm_service_1.generateRecruiterAnswer)(question, candidates);
    return {
        ...answer,
        retrievedChunks: chunks.length,
    };
};
exports.askRecruiterAI = askRecruiterAI;
