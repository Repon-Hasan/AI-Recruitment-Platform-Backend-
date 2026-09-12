"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatusSchema = exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    jobId: zod_1.z.string().uuid(),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "APPLIED",
        "SCREENING",
        "SHORTLISTED",
        "INTERVIEW",
        "OFFER",
        "HIRED",
        "REJECTED",
        "WITHDRAWN",
    ]),
});
