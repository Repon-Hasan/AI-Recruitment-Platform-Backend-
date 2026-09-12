"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendMessage_services_1 = require("./sendMessage.services");
const sendMessage = async (req, res) => {
    const conversationId = Array.isArray(req.params.conversationId)
        ? req.params.conversationId[0]
        : req.params.conversationId;
    const { content } = req.body;
    const userId = req.user.id;
    const message = await (0, sendMessage_services_1.sendMessage)({
        conversationId,
        senderId: userId,
        content,
    });
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Message sent successfully",
        data: message,
    });
};
exports.default = sendMessage;
