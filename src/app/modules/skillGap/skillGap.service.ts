import { prisma } from "../../lib/prisma";

export const analyzeSkillGap = async (
  userId: string,
  jobId: string
) => {
  // --------------------------------------------------
  // 1. Get candidate profile + candidate skills
  // --------------------------------------------------
  const candidate = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
    include: {
      skills: true,
    },
  });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  // --------------------------------------------------
  // 2. Get candidate's latest resume
  // --------------------------------------------------
  const resume = await prisma.resume.findFirst({
    where: {
      candidateId: candidate.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  // --------------------------------------------------
  // 3. Get job + required skills
  // --------------------------------------------------
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      requiredSkills: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // --------------------------------------------------
  // 4. Calculate Resume ↔ Job vector similarity
  // --------------------------------------------------
  //
  // <=> = cosine distance in pgvector
  //
  // cosine similarity = 1 - cosine distance
  //
  // Example:
  // distance = 0.15
  // similarity = 0.85
  // percentage = 85%
  //
  const similarityResult = await prisma.$queryRaw<
    { similarity: number | null }[]
  >`
    SELECT
      1 - (r.embedding <=> j.embedding) AS similarity
    FROM "resumes" r
    CROSS JOIN "Job" j
    WHERE r.id = ${resume.id}
      AND j.id = ${job.id}
  `;

  const similarityValue = similarityResult[0]?.similarity;

  if (similarityValue === null || similarityValue === undefined) {
    throw new Error(
      "Resume or job embedding not found. Generate embeddings first."
    );
  }

  const similarity = similarityValue;

  // Make sure the value stays between 0 and 1
  const normalizedSimilarity = Math.max(
    0,
    Math.min(1, Number(similarity))
  );

  const semanticMatchPercentage = Math.round(
    normalizedSimilarity * 100
  );

  // --------------------------------------------------
  // 5. Normalize candidate skills
  // --------------------------------------------------
  const candidateSkills = candidate.skills.map((skill) =>
    skill.name.trim().toLowerCase()
  );

  // Remove duplicate candidate skills
  const uniqueCandidateSkills = [
    ...new Set(candidateSkills),
  ];

  // --------------------------------------------------
  // 6. Normalize job required skills
  // --------------------------------------------------
  const jobSkills = job.requiredSkills.map((skill) => ({
    id: skill.id,
    name: skill.name.trim(),
    normalizedName: skill.name.trim().toLowerCase(),
    priority: skill.priority.trim().toLowerCase(),
  }));

  // --------------------------------------------------
  // 7. Find matched skills
  // --------------------------------------------------
  const matchedSkills = jobSkills.filter((jobSkill) =>
    uniqueCandidateSkills.includes(jobSkill.normalizedName)
  );

  // --------------------------------------------------
  // 8. Find missing skills
  // --------------------------------------------------
  const missingSkills = jobSkills.filter(
    (jobSkill) =>
      !uniqueCandidateSkills.includes(jobSkill.normalizedName)
  );

  // --------------------------------------------------
  // 9. Calculate skill match percentage
  // --------------------------------------------------
  const totalRequiredSkills = jobSkills.length;

  const matchedSkillCount = matchedSkills.length;

  const skillMatchPercentage =
    totalRequiredSkills === 0
      ? 0
      : Math.round(
          (matchedSkillCount / totalRequiredSkills) * 100
        );

  // --------------------------------------------------
  // 10. Group missing skills by priority
  // --------------------------------------------------
  const highPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "high"
  );

  const mediumPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "medium"
  );

  const lowPrioritySkills = missingSkills.filter(
    (skill) => skill.priority === "low"
  );

  // --------------------------------------------------
  // 11. Create learning path
  // High → Medium → Low
  // --------------------------------------------------
  const learningPath = [
    ...highPrioritySkills,
    ...mediumPrioritySkills,
    ...lowPrioritySkills,
  ].map((skill, index) => ({
    order: index + 1,
    skill: skill.name,
    priority: skill.priority,
  }));

  // --------------------------------------------------
  // 12. Optional overall score
  // --------------------------------------------------
  //
  // 60% semantic/vector matching
  // 40% exact skill matching
  //
  const overallMatchPercentage = Math.round(
    semanticMatchPercentage * 0.6 +
      skillMatchPercentage * 0.4
  );

  // --------------------------------------------------
  // 13. Return final result
  // --------------------------------------------------
  return {
    overallMatchPercentage,

    semanticMatchPercentage,

    skillMatchPercentage,

    matchedSkills: matchedSkills.map(
      (skill) => skill.name
    ),

    missingSkills: {
      high: highPrioritySkills.map(
        (skill) => skill.name
      ),

      medium: mediumPrioritySkills.map(
        (skill) => skill.name
      ),

      low: lowPrioritySkills.map(
        (skill) => skill.name
      ),
    },

    learningPath,
  };
};