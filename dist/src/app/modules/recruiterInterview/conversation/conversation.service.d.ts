type SendMessageInput = {
    conversationId: string;
    senderId: string;
    content: string;
};
export declare function getApplicationConversation(userId: string, applicationId: string): Promise<{
    jobApplication: ({
        candidateProfile: {
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: import("../../../../generated/prisma/enums").Role;
                status: import("../../../../generated/prisma/enums").UserStatus;
                needPasswordChange: boolean;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            userId: string;
            phone: string | null;
            location: string | null;
            bio: string | null;
            experience: string | null;
            linkedin: string | null;
            github: string | null;
            portfolio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
            id: string;
            companyId: string;
            title: string;
            description: string;
            location: string;
            image: string | null;
            remoteType: import("../../../../generated/prisma/enums").RemoteType;
            employmentType: import("../../../../generated/prisma/enums").EmploymentType;
            experienceLevel: import("../../../../generated/prisma/enums").ExperienceLevel;
            salaryMin: number | null;
            salaryMax: number | null;
            salaryCurrency: string | null;
            deadline: Date;
            status: import("../../../../generated/prisma/enums").JobStatus;
            publishedAt: Date | null;
            closedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null;
    messages: ({
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
    })[];
    participants: ({
        user: {
            email: string;
            id: string;
            image: string | null;
            name: string;
        };
    } & {
        id: string;
        conversationId: string;
        userId: string;
        joinedAt: Date;
    })[];
} & {
    id: string;
    jobApplicationId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function sendMessage(userId: string, applicationId: string, input: unknown): Promise<{
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
}>;
export declare function getCandidateConversations(userId: string): Promise<({
    jobApplication: ({
        candidateProfile: {
            user: {
                email: string;
                id: string;
                image: string | null;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            phone: string | null;
            location: string | null;
            bio: string | null;
            experience: string | null;
            linkedin: string | null;
            github: string | null;
            portfolio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
            company: {
                description: string | null;
                id: string;
                name: string;
                website: string | null;
            };
            requiredSkills: {
                id: string;
                jobId: string;
                name: string;
                priority: string;
            }[];
        } & {
            id: string;
            companyId: string;
            title: string;
            description: string;
            location: string;
            image: string | null;
            remoteType: import("../../../../generated/prisma/enums").RemoteType;
            employmentType: import("../../../../generated/prisma/enums").EmploymentType;
            experienceLevel: import("../../../../generated/prisma/enums").ExperienceLevel;
            salaryMin: number | null;
            salaryMax: number | null;
            salaryCurrency: string | null;
            deadline: Date;
            status: import("../../../../generated/prisma/enums").JobStatus;
            publishedAt: Date | null;
            closedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null;
    messages: ({
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
    })[];
    participants: ({
        user: {
            email: string;
            id: string;
            image: string | null;
            name: string;
        };
    } & {
        id: string;
        conversationId: string;
        userId: string;
        joinedAt: Date;
    })[];
} & {
    id: string;
    jobApplicationId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare function getAllConversations(userId: string): Promise<({
    jobApplication: ({
        candidateProfile: {
            education: {
                id: string;
                institution: string;
                degree: string | null;
                field: string | null;
                startYear: number | null;
                endYear: number | null;
                candidateId: string;
            }[];
            skills: {
                id: string;
                name: string;
                candidateId: string;
            }[];
            user: {
                email: string;
                id: string;
                image: string | null;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            phone: string | null;
            location: string | null;
            bio: string | null;
            experience: string | null;
            linkedin: string | null;
            github: string | null;
            portfolio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
            company: {
                description: string | null;
                id: string;
                name: string;
                website: string | null;
            };
            requiredSkills: {
                id: string;
                jobId: string;
                name: string;
                priority: string;
            }[];
        } & {
            id: string;
            companyId: string;
            title: string;
            description: string;
            location: string;
            image: string | null;
            remoteType: import("../../../../generated/prisma/enums").RemoteType;
            employmentType: import("../../../../generated/prisma/enums").EmploymentType;
            experienceLevel: import("../../../../generated/prisma/enums").ExperienceLevel;
            salaryMin: number | null;
            salaryMax: number | null;
            salaryCurrency: string | null;
            deadline: Date;
            status: import("../../../../generated/prisma/enums").JobStatus;
            publishedAt: Date | null;
            closedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null;
    messages: ({
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
    })[];
    participants: ({
        user: {
            email: string;
            id: string;
            image: string | null;
            name: string;
        };
    } & {
        id: string;
        conversationId: string;
        userId: string;
        joinedAt: Date;
    })[];
} & {
    id: string;
    jobApplicationId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const ConversationService: {
    sendMessage({ conversationId, senderId, content, }: SendMessageInput): Promise<{
        sender: {
            email: string;
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
    }>;
    markConversationAsRead(conversationId: string, userId: string): Promise<void>;
};
export declare function getApplicationMessages(userId: string, applicationId: string): Promise<({
    sender: {
        email: string;
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
export {};
//# sourceMappingURL=conversation.service.d.ts.map