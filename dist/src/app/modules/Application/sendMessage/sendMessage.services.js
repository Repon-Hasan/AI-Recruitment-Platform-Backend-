"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationMessages = exports.sendMessage = void 0;
const prisma_1 = require("../../../lib/prisma");
const sendMessage = async ({ conversationId, senderId, content, }) => {
    const participant = await prisma_1.prisma.conversationParticipant.findUnique({
        where: {
            conversationId_userId: {
                conversationId,
                userId: senderId,
            },
        },
    });
    if (!participant) {
        throw new Error("You are not a participant of this conversation");
    }
    return prisma_1.prisma.message.create({
        data: {
            conversationId,
            senderId,
            content,
            senderType: "USER",
        },
    });
};
exports.sendMessage = sendMessage;
const getConversationMessages = async (conversationId, userId) => {
    const participant = await prisma_1.prisma.conversationParticipant.findUnique({
        where: {
            conversationId_userId: {
                conversationId,
                userId,
            },
        },
    });
    if (!participant) {
        throw new Error("You don't have access to this conversation");
    }
    return prisma_1.prisma.message.findMany({
        where: {
            conversationId,
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
};
exports.getConversationMessages = getConversationMessages;
