export declare const sendMessage: ({ conversationId, senderId, content, }: {
    conversationId: string;
    senderId: string;
    content: string;
}) => Promise<{
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    isAutomatic: boolean;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getConversationMessages: (conversationId: string, userId: string) => Promise<({
    sender: {
        id: string;
        image: string | null;
        name: string;
    };
} & {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    isAutomatic: boolean;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
//# sourceMappingURL=sendMessage.services.d.ts.map