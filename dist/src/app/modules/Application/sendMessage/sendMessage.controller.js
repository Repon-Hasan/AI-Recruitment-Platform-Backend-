import httpStatus from "http-status";
import { sendMessage as sendMessageService } from "./sendMessage.services.js";
const sendMessage = async (req, res) => {
    const conversationId = Array.isArray(req.params.conversationId)
        ? req.params.conversationId[0]
        : req.params.conversationId;
    const { content } = req.body;
    const userId = req.user.userId;
    if (!userId) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized user",
        });
    }
    if (!conversationId) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Conversation ID is required",
        });
    }
    const message = await sendMessageService({
        conversationId,
        senderId: userId,
        content,
    });
    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Message sent successfully",
        data: message,
    });
};
export default sendMessage;
//# sourceMappingURL=sendMessage.controller.js.map