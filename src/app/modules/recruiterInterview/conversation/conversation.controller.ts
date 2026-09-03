import type {
  Request,
  Response,
} from "express";

import {
  getAllConversations,
  getApplicationConversation,
  sendMessage,
} from "./conversation.service";

export async function getConversationController(
  req: Request,
  res: Response,
) {
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

    const conversation =
      await getApplicationConversation(
        userId,
        String(req.params.applicationId),
      );

    return res.json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
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

export async function sendMessageController(
  req: Request,
  res: Response,
) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const message = await sendMessage(
      userId,
      String(req.params.applicationId),
      req.body,
    );

    return res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}

export async function getAllConversationsController(
  req: Request,
  res: Response,
) {
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

    const conversations =
      await getAllConversations(userId);

    return res.status(200).json({
      success: true,
      message: "Conversations retrieved successfully",
      data: {
        conversations,
      },
    });
  } catch (error) {
    console.error(
      "Get all conversations error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
}
