import { Router } from "express";
import { getAllConversationsController, getApplicationMessagesController, getCandidateConversationsController, getConversationController, sendMessageController, sendMessageControllerJob, } from "./conversation.controller.js";
import { checkAuth } from "../../../middleware/checkAuth";
const router = Router();
router.get("/", checkAuth(), getAllConversationsController);
router.get("/applications/:applicationId", checkAuth(), getConversationController);
router.post("/:conversationId/messages", checkAuth(), sendMessageControllerJob);
router.get("/candidate", checkAuth(), getCandidateConversationsController);
/** * ========================================================= * GET APPLICATION MESSAGES * GET /conversations/applications/:applicationId/messages * ========================================================= */
router.get("/applications/:applicationId/messages", checkAuth(), getApplicationMessagesController);
router.post("/applications/:applicationId/messages", checkAuth(), sendMessageController);
export const ConversationRouterRecruiter = router;
//# sourceMappingURL=conversation.routes.js.map