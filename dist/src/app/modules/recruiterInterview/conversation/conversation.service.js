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
