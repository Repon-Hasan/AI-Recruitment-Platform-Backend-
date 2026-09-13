declare const startInterview: (userId: string, jobId: string, experienceLevel: string, interviewType: string) => Promise<{
    sessionId: string;
    questionNumber: number;
    question: any;
}>;
declare const evaluateAnswer: (sessionId: string, answer: string) => Promise<any>;
export declare const InterviewQuestionService: {
    startInterview: typeof startInterview;
    evaluateAnswer: typeof evaluateAnswer;
};
export {};
//# sourceMappingURL=interview.service.d.ts.map