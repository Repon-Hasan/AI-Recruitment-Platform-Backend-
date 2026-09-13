import { prisma } from "../../../lib/prisma";
import { sendMessageSchema } from "../interview/interview.validation";
export async function getApplicationConversation(userId, applicationId) {
    //   console.log("========== GET CONVERSATION ==========");
    // console.log("userId:", userId);
    // console.log("applicationId:", applicationId);
    const conversation = await prisma.conversation.findUnique({
        where: {
            jobApplicationId: applicationId,
        },
        include: {
            jobApplication: {
                include: {
                    candidateProfile: {
                        include: {
                            user: true,
                        },
                    },
                    job: true,
                },
            },
            participants: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
            messages: {
                orderBy: {
                    createdAt: "asc",
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
            },
        },
    });
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }
    const participant = conversation.participants.some((item) => item.userId === userId);
    if (!participant) {
        throw new Error("FORBIDDEN");
    }
    return conversation;
}
export async function sendMessage(userId, applicationId, input) {
    const data = sendMessageSchema.parse(input);
    const conversation = await prisma.conversation.findUnique({
        where: {
            jobApplicationId: applicationId,
        },
        include: {
            participants: true,
            jobApplication: {
                include: {
                    candidateProfile: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }
    const participant = conversation.participants.some((item) => item.userId === userId);
    if (!participant) {
        throw new Error("FORBIDDEN");
    }
    const receiver = conversation.participants.find((item) => item.userId !== userId);
    const message = await prisma.$transaction(async (tx) => {
        const created = await tx.message.create({
            data: {
                conversationId: conversation.id,
                senderId: userId,
                content: data.content,
                isAutomatic: false,
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
        });
        if (receiver) {
            await tx.notification.create({
                data: {
                    userId: receiver.userId,
                    type: "NEW_MESSAGE",
                    channel: "IN_APP",
                    title: "New message",
                    message: data.content.slice(0, 120),
                    applicationId,
                },
            });
        }
        return created;
    });
    return message;
}
export async function getCandidateConversations(userId) {
    if (!userId) {
        throw new Error("USER_ID_REQUIRED");
    }
    const conversations = await prisma.conversation.findMany({
        where: {
            participants: {
                some: {
                    userId,
                },
            },
        },
        include: {
            jobApplication: {
                include: {
                    job: {
                        include: {
                            company: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    website: true,
                                },
                            },
                            requiredSkills: true,
                        },
                    },
                    candidateProfile: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            },
            participants: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return conversations;
}
export async function getAllConversations(userId) {
    if (!userId) {
        throw new Error("USER_ID_REQUIRED");
    }
    const conversations = await prisma.conversation.findMany({
        where: {
            jobApplication: {
                job: {
                    company: {
                        userId,
                    },
                },
            },
        },
        include: {
            jobApplication: {
                include: {
                    candidateProfile: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    image: true,
                                },
                            },
                            skills: true,
                            education: true,
                        },
                    },
                    job: {
                        include: {
                            company: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    website: true,
                                },
                            },
                            requiredSkills: true,
                        },
                    },
                },
            },
            participants: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return conversations;
}
export const ConversationService = {
    /* =======================================================
       SEND MESSAGE
    ======================================================= */
    async sendMessage({ conversationId, senderId, content, }) {
        /* -----------------------------------------------------
           1. Check conversation
        ----------------------------------------------------- */
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                id: true,
            },
        });
        if (!conversation) {
            throw new Error("CONVERSATION_NOT_FOUND");
        }
        /* -----------------------------------------------------
           2. Verify participant
        ----------------------------------------------------- */
        const participant = await prisma.conversationParticipant.findUnique({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId: senderId,
                },
            },
            select: {
                id: true,
            },
        });
        if (!participant) {
            throw new Error("NOT_CONVERSATION_PARTICIPANT");
        }
        /* -----------------------------------------------------
           3. Create message
        ----------------------------------------------------- */
        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId,
                content,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
            },
        });
        /* -----------------------------------------------------
           4. Update conversation timestamp
        ----------------------------------------------------- */
        await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                updatedAt: new Date(),
            },
        });
        return message;
    },
    /* =======================================================
       MARK AS READ
    ======================================================= */
    async markConversationAsRead(conversationId, userId) {
        /* -----------------------------------------------------
           1. Check conversation
        ----------------------------------------------------- */
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                id: true,
            },
        });
        if (!conversation) {
            throw new Error("CONVERSATION_NOT_FOUND");
        }
        /* -----------------------------------------------------
           2. Check participant
        ----------------------------------------------------- */
        const participant = await prisma.conversationParticipant.findUnique({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
            select: {
                id: true,
            },
        });
        if (!participant) {
            throw new Error("NOT_CONVERSATION_PARTICIPANT");
        }
        /* -----------------------------------------------------
           3. Mark messages read
        ----------------------------------------------------- */
        await prisma.message.updateMany({
            where: {
                conversationId,
                senderId: {
                    not: userId,
                },
                readAt: null,
            },
            data: {
                readAt: new Date(),
            },
        });
    },
};
export async function getApplicationMessages(userId, applicationId) {
    if (!userId) {
        throw new Error("USER_ID_REQUIRED");
    }
    if (!applicationId) {
        throw new Error("APPLICATION_ID_REQUIRED");
    }
    /**
     * Find conversation by JobApplication ID
     */
    const conversation = await prisma.conversation.findUnique({
        where: {
            jobApplicationId: applicationId,
        },
        select: {
            id: true,
            jobApplication: {
                select: {
                    id: true,
                    candidateProfile: {
                        select: {
                            userId: true,
                        },
                    },
                    job: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            },
            participants: {
                select: {
                    userId: true,
                },
            },
        },
    });
    /**
     * Conversation doesn't exist
     */
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }
    /**
     * Check whether current user is a participant
     */
    const isParticipant = conversation.participants.some((participant) => participant.userId === userId);
    /**
     * Also allow the candidate/recruiter who owns
     * the application relationship.
     */
    const isApplicationUser = conversation?.jobApplication?.candidateProfile
        ?.userId === userId;
    /**
     * If user is neither participant nor candidate,
     * deny access.
     */
    if (!isParticipant && !isApplicationUser) {
        throw new Error("FORBIDDEN");
    }
    /**
     * Get messages
     */
    const messages = await prisma.message.findMany({
        where: {
            conversationId: conversation.id,
        },
        orderBy: {
            createdAt: "asc",
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
    return messages;
}
//# sourceMappingURL=conversation.service.js.map