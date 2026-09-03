import httpStatus from "http-status";
import { sendMessage as sendMessageService } from "./sendMessage.services";
const sendMessage = async (req, res) => {
    const conversationId = Array.isArray(req.params.conversationId)
        ? req.params.conversationId[0]
        : req.params.conversationId;
    const { content } = req.body;
    const userId = req.user.id;
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
