// applicationAssistant.validation.ts
import { z } from "zod";
export const applicationAssistantSchema = z.object({
    resumeId: z.string().optional(),
});
