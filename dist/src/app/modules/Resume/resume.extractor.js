"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractResumeText = void 0;
const pdf_parse_1 = require("pdf-parse");
const mammoth_1 = __importDefault(require("mammoth"));
const extractResumeText = async (buffer, mimetype) => {
    // =========================
    // PDF
    // =========================
    if (mimetype === "application/pdf") {
        const parser = new pdf_parse_1.PDFParse({
            data: buffer,
        });
        try {
            const data = await parser.getText();
            const text = data.text ?? "";
            // Extract URLs that are actually visible in the text
            const urlRegex = /https?:\/\/[^\s<>"')]+/gi;
            const links = text.match(urlRegex) ?? [];
            return {
                text,
                links: [...new Set(links)],
            };
        }
        finally {
            await parser.destroy();
        }
    }
    // =========================
    // DOCX
    // =========================
    if (mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const result = await mammoth_1.default.extractRawText({
            buffer,
        });
        const text = result.value ?? "";
        const urlRegex = /https?:\/\/[^\s<>"')]+/gi;
        const links = text.match(urlRegex) ?? [];
        return {
            text,
            links: [...new Set(links)],
        };
    }
    throw new Error("Unsupported file type");
};
exports.extractResumeText = extractResumeText;
