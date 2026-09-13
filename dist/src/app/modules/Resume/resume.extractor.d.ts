export interface ResumeExtractionResult {
    text: string;
    links: string[];
}
export declare const extractResumeText: (buffer: Buffer, mimetype: string) => Promise<ResumeExtractionResult>;
//# sourceMappingURL=resume.extractor.d.ts.map