"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRouterRecruiter = void 0;
const express_1 = require("express");
const conversation_controller_1 = require("./conversation.controller");
const checkAuth_1 = require("../../../middleware/checkAuth");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.checkAuth)(), conversation_controller_1.getAllConversationsController);
router.get("/applications/:applicationId", (0, checkAuth_1.checkAuth)(), conversation_controller_1.getConversationController);
router.post("/:conversationId/messages", (0, checkAuth_1.checkAuth)(), conversation_controller_1.sendMessageControllerJob);
router.get("/candidate", (0, checkAuth_1.checkAuth)(), conversation_controller_1.getCandidateConversationsController);
/** * ========================================================= * GET APPLICATION MESSAGES * GET /conversations/applications/:applicationId/messages * ========================================================= */
router.get("/applications/:applicationId/messages", (0, checkAuth_1.checkAuth)(), conversation_controller_1.getApplicationMessagesController);
router.post("/applications/:applicationId/messages", (0, checkAuth_1.checkAuth)(), conversation_controller_1.sendMessageController);
exports.ConversationRouterRecruiter = router;
