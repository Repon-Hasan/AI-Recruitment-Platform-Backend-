"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerInterviewSchema = exports.startInterviewSchema = void 0;
const zod_1 = require("zod");
exports.startInterviewSchema = zod_1.z.object({
    jobId: zod_1.z.string(),
    experienceLevel: zod_1.z.enum([
        "JUNIOR",
        "MID",
        "SENIOR",
    ]),
    interviewType: zod_1.z.enum([
        "TECHNICAL",
        "BEHAVIORAL",
        "SYSTEM_DESIGN",
        "MIXED",
    ]),
});
exports.answerInterviewSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    answer: zod_1.z.string().min(5),
});
