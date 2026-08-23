import { CandidateEvidence } from "./candidate-grouping.service";

export const buildRecruiterPrompt = (
  question: string,
  candidates: CandidateEvidence[]
): string => {
  const candidateContext = candidates
    .map(
      (candidate, index) => `
Candidate ${index + 1}

Candidate ID:
${candidate.candidateId}

Name:
${candidate.candidateName}

Email:
${candidate.candidateEmail}

Vector similarity:
${candidate.bestSimilarity.toFixed(3)}

Resume evidence:
${candidate.chunks.join("\n\n---\n\n")}
`
    )
    .join("\n\n====================\n\n");

  return `
You are an AI recruitment assistant.

You must answer the recruiter's question using ONLY the candidate
evidence provided below.

Do not invent candidate experience, skills, education, projects,
companies or technologies.

Recruiter question:
${question}

Candidate evidence:
${candidateContext}

Instructions:

1. Identify the strongest candidates.
2. Rank them from strongest to weakest.
3. Explain why each candidate is relevant.
4. Mention the actual evidence from the resume.
5. Mention missing requirements when evidence is insufficient.
6. Do not claim that vector similarity is an exact hiring score.
7. If there is not enough evidence, clearly say so.

Return valid JSON using this structure:

{
  "summary": "string",
  "candidates": [
    {
      "candidateId": "string",
      "name": "string",
      "matchScore": 0,
      "reason": "string",
      "evidence": ["string"],
      "missingRequirements": ["string"]
    }
  ]
}
`;
};