import { ConversationService, getAllConversations, getApplicationConversation, getApplicationMessages, getCandidateConversations, sendMessage, } from "./conversation.service";
export async function getConversationController(req, res) {
    try {
        console.log("========== CONVERSATION AUTH ==========");
        console.log("User:", req.user);
        console.log("Application ID:", req.params.applicationId);
        //const userId = req.user?.id;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const conversation = await getApplicationConversation(userId, String(req.params.applicationId));
        return res.json({
            success: true,
            data: conversation,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error &&
            error.message === "FORBIDDEN") {
            return res.status(403).json({
                success: false,
                message: "You cannot access this conversation",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to fetch conversation",
        });
    }
}
export async function sendMessageController(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const message = await sendMessage(userId, String(req.params.applicationId), req.body);
        return res.status(201).json({
            success: true,
            data: message,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
}
export async function getAllConversationsController(req, res) {
    try {
        console.log("========== GET ALL CONVERSATIONS ==========");
        console.log("User:", req.user);
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const conversations = await getAllConversations(userId);
        return res.status(200).json({
            success: true,
            message: "Conversations retrieved successfully",
            data: {
                conversations,
            },
        });
    }
    catch (error) {
        console.error("Get all conversations error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch conversations",
        });
    }
}
export const sendMessageControllerJob = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { conversationId } = req.params;
        const { content } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }
        if (typeof content !== "string" ||
            !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message content is required",
            });
        }
        const message = await ConversationService.sendMessage({
            conversationId: String(conversationId),
            senderId: userId,
            content: content.trim(),
        });
        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: message,
        });
    }
    catch (error) {
        console.error("sendMessageController error:", error);
        if (error instanceof Error &&
            error.message ===
                "CONVERSATION_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }
        if (error instanceof Error &&
            error.message ===
                "NOT_CONVERSATION_PARTICIPANT") {
            return res.status(403).json({
                success: false,
                message: "You are not a participant of this conversation",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
};
export async function getCandidateConversationsController(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const conversations = await getCandidateConversations(userId);
        return res.status(200).json({
            success: true,
            message: "Candidate conversations retrieved successfully",
            data: {
                conversations,
            },
        });
    }
    catch (error) {
        console.error("Get candidate conversations error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch candidate conversations",
        });
    }
}
export async function getApplicationMessagesController(req, res) {
    try {
        console.log("========== GET APPLICATION MESSAGES ==========");
        console.log("User:", req.user);
        console.log("Application ID:", req.params.applicationId);
        const userId = req.user?.userId;
        const applicationId = String(req.params.applicationId);
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!applicationId) {
            return res.status(400).json({
                success: false,
                message: "Application ID is required",
            });
        }
        const messages = await getApplicationMessages(userId, applicationId);
        return res.status(200).json({
            success: true,
            message: "Application messages retrieved successfully",
            data: {
                messages,
            },
        });
    }
    catch (error) {
        console.error("Get application messages error:", error);
        if (error instanceof Error &&
            error.message ===
                "CONVERSATION_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }
        if (error instanceof Error &&
            error.message === "FORBIDDEN") {
            return res.status(403).json({
                success: false,
                message: "You cannot access these messages",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to fetch application messages",
        });
    }
}
