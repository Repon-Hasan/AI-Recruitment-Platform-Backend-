import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async (
  buffer: Buffer,
  mimetype: string
) => {
  if (mimetype === "application/pdf") {
    const parser = new PDFParse({ data: buffer });

    try {
      const data = await parser.getText();
      return data.text;
    } finally {
      await parser.destroy();
    }
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  throw new Error("Unsupported file type");
};