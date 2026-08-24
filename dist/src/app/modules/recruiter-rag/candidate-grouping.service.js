export const groupChunksByCandidate = (chunks) => {
    const candidateMap = new Map();
    for (const chunk of chunks) {
        const existing = candidateMap.get(chunk.candidateId);
        if (!existing) {
            candidateMap.set(chunk.candidateId, {
                candidateId: chunk.candidateId,
                candidateName: chunk.candidateName,
                candidateEmail: chunk.candidateEmail,
                resumeFileName: chunk.resumeFileName,
                bestSimilarity: Number(chunk.similarity),
                chunks: [chunk.chunkText],
            });
            continue;
        }
        existing.bestSimilarity = Math.max(existing.bestSimilarity, Number(chunk.similarity));
        existing.chunks.push(chunk.chunkText);
    }
    return Array.from(candidateMap.values()).sort((a, b) => b.bestSimilarity - a.bestSimilarity);
};
