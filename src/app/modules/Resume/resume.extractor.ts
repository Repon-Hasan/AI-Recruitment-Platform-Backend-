import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export interface ResumeExtractionResult {
  text: string;
  links: string[];
}

export const extractResumeText = async (
  buffer: Buffer,
  mimetype: string
): Promise<ResumeExtractionResult> => {
  // =========================
  // PDF
  // =========================
  if (mimetype === "application/pdf") {
    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const data = await parser.getText();

      const text = data.text ?? "";

      // Extract URLs that are actually visible in the text
      const urlRegex =
        /https?:\/\/[^\s<>"')]+/gi;

      const links = text.match(urlRegex) ?? [];

      return {
        text,
        links: [...new Set(links)],
      };
    } finally {
      await parser.destroy();
    }
  }

  // =========================
  // DOCX
  // =========================
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    const text = result.value ?? "";

    const urlRegex =
      /https?:\/\/[^\s<>"')]+/gi;

    const links = text.match(urlRegex) ?? [];

    return {
      text,
      links: [...new Set(links)],
    };
  }

  throw new Error("Unsupported file type");
};