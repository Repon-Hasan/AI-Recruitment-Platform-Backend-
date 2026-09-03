import { prisma } from "../../../lib/prisma";

export const sendMessage = async ({
  conversationId,
  senderId,
  content,
}: {
  conversationId: string;
  senderId: string;
  content: string;
}) => {
  const participant =
    await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId: senderId,
        },
      },
    });

  if (!participant) {
    throw new Error(
      "You are not a participant of this conversation"
    );
  }

  return prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
      senderType: "USER",
    },
  });
};

export const getConversationMessages = async (
  conversationId: string,
  userId: string
) => {
  const participant =
    await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId,
        },
      },
    });

  if (!participant) {
    throw new Error(
      "You don't have access to this conversation"
    );
  }

  return prisma.message.findMany({
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