import type { Request, Response } from "express";
export declare function getConversationController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function sendMessageController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getAllConversationsController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const sendMessageControllerJob: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare function getCandidateConversationsController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getApplicationMessagesController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=conversation.controller.d.ts.map