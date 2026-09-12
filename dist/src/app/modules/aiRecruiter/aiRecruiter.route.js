import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { AIRecruiterController } from "./aiRecruiter.controller";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/assistant", checkAuth(Role.RECRUITER), AIRecruiterController.assistant);
export const AIRecruiterRouter = router;
