"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterviewQuestionsSchema = void 0;
const zod_1 = require("zod");
exports.generateInterviewQuestionsSchema = zod_1.z.object({
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
