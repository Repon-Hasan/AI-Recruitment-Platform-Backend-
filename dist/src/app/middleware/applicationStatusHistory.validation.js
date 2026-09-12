"use strict";
// applicationStatusHistory.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeApplicationStatusSchema = void 0;
const zod_1 = require("zod");
exports.changeApplicationStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            "APPLIED",
            "SCREENING",
            "INTERVIEW",
            "OFFER",
            "HIRED",
            "REJECTED",
            "WITHDRAWN",
        ]),
    }),
    params: zod_1.z.object({
        applicationId: zod_1.z.string().uuid(),
    }),
});
