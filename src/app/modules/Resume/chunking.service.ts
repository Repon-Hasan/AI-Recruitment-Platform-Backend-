const DEFAULT_CHUNK_SIZE = 1200;
const DEFAULT_OVERLAP = 200;

export const chunkText = (
  text: string,
  chunkSize = DEFAULT_CHUNK_SIZE,
  overlap = DEFAULT_OVERLAP
): string[] => {
  if (!text.trim()) {
    return [];
  }

  const cleanedText = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks: string[] = [];

  let start = 0;

  while (start < cleanedText.length) {
    const end = Math.min(start + chunkSize, cleanedText.length);

    const chunk = cleanedText.slice(start, end).trim();

    if (chunk) {
      chunks.push(chunk);
    }

    if (end >= cleanedText.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
};