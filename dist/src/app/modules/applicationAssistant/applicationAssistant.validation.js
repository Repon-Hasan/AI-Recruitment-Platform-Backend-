"use strict";
// applicationAssistant.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationAssistantSchema = void 0;
const zod_1 = require("zod");
exports.applicationAssistantSchema = zod_1.z.object({
    resumeId: zod_1.z.string().optional(),
});
