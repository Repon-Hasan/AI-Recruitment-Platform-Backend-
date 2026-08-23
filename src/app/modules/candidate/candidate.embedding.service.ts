import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { CandidateEmbeddingService } from "../aiRecruiter/candidateEmbedding.service";

export const generateCandidateEmbedding = async (
  candidateProfileId: string
) => {

  // ==========================================
  // 1. Get candidate with all required data
  // ==========================================

  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        id: candidateProfileId,
      },

      include: {
        skills: true,
        education: true,
        projects: true,
        certifications: true,
        resumes: true,
      },
    });

  if (!candidate) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }


  // ==========================================
  // 2. Prepare candidate data
  // ==========================================

  const skills = candidate.skills
    .map((skill) => skill.name)
    .join(", ");


  const education = candidate.education
    .map(
      (edu) =>
        `${edu.degree ?? ""} ${edu.field ?? ""} ${edu.institution}`
    )
    .join(", ");


  const projects = candidate.projects
    .map(
      (project) =>
        `${project.name}: ${
          project.description ?? ""
        } ${project.technologies ?? ""}`
    )
    .join("\n");


  const certifications =
    candidate.certifications
      .map(
        (cert) =>
          `${cert.name} ${cert.issuer ?? ""}`
      )
      .join(", ");


  const resumeText = candidate.resumes
    .map(
      (resume) => resume.rawText ?? ""
    )
    .join("\n");


  // ==========================================
  // 3. Build complete candidate text
  // ==========================================

  const candidateText = `
Candidate Profile

Skills:
${skills}

Experience:
${candidate.experience ?? ""}

Education:
${education}

Projects:
${projects}

Certifications:
${certifications}

Resume:
${resumeText}
  `.trim();


  // ==========================================
  // 4. Generate embedding
  // ==========================================

  const embedding =
    await CandidateEmbeddingService(
      candidateText
    );


  // ==========================================
  // 5. Validate embedding
  // ==========================================

  if (!Array.isArray(embedding)) {
    throw new Error(
      "Embedding is not an array"
    );
  }


  if (embedding.length !== 2048) {
    throw new Error(
      `Expected 2048 dimensions but received ${embedding.length}`
    );
  }


  console.log(
    "Candidate embedding dimensions:",
    embedding.length
  );


  // ==========================================
  // 6. Convert number[] → pgvector format
  // ==========================================

  const vectorLiteral =
    `[${embedding.join(",")}]`;


  // ==========================================
  // 7. INSERT or UPDATE database
  // ==========================================

 await prisma.$executeRaw`
  INSERT INTO candidate_embeddings
  (
    id,
    "candidateProfileId",
    embedding,
    "createdAt",
    "updatedAt"
  )
  VALUES
  (
    gen_random_uuid(),
    ${candidateProfileId},
    CAST(${vectorLiteral} AS vector),
    NOW(),
    NOW()
  )
  ON CONFLICT ("candidateProfileId")
  DO UPDATE SET
    embedding = EXCLUDED.embedding,
    "updatedAt" = NOW()
`;


  // ==========================================
  // 8. Return result
  // ==========================================

  console.log(
    "Candidate embedding saved successfully:",
    candidateProfileId
  );

  return {
    candidateProfileId,
    dimensions: embedding.length,
    message:
      "Candidate embedding created successfully",
  };
};