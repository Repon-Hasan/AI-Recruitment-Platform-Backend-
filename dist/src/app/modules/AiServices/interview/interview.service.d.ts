interface InterviewQuestion {
    question: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string;
    expectedAnswer?: string;
    evaluationPoints?: string[];
    followUpQuestions?: string[];
}
interface GeneratedInterviewQuestions {
    technical: InterviewQuestion[];
    behavioral: InterviewQuestion[];
    systemDesign: InterviewQuestion[];
    project: InterviewQuestion[];
    followUp: InterviewQuestion[];
    scenarioBased: InterviewQuestion[];
    problemSolving: InterviewQuestion[];
    hrAndCulture: InterviewQuestion[];
    roleSpecific: InterviewQuestion[];
}
declare const generateInterviewQuestions: (jobId: string, experienceLevel: string, interviewType: string) => Promise<{
    job: {
        id: string;
        title: string;
        company: string;
    };
    candidate: {
        experienceLevel: string;
    };
    interview: {
        type: string;
    };
    totalQuestions: number;
    questions: GeneratedInterviewQuestions;
}>;
export declare const InterviewQuestionService: {
    generateInterviewQuestions: typeof generateInterviewQuestions;
};
export {};
//# sourceMappingURL=interview.service.d.ts.map