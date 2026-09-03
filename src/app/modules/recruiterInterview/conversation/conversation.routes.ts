import { Router } from "express";

import {
  getAllConversationsController,
  getConversationController,
  sendMessageController,
} from "./conversation.controller";
import { checkAuth } from "../../../middleware/checkAuth";



const router = Router();


router.get(
  "/",
  checkAuth(),
  getAllConversationsController,
);
router.get(
  "/applications/:applicationId",
  checkAuth(),
  getConversationController,
);

router.post(
  "/applications/:applicationId/messages",
  checkAuth(),
  sendMessageController,
);

export const ConversationRouterRecruiter = router;