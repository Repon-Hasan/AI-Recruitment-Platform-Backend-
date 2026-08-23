import { prisma } from "../../lib/prisma";
import { generateAnswer } from "../../services/llm.service";

interface RecruiterAssistantInput {
  jobId?: string;
  query: string;
  limit?: number;
}

interface CandidateResult {
  applicationId: string;
  candidateId: string;
  name: string;
  semanticScore: number;
  skillScore: number;
  experienceScore: number;
  locationScore: number;
  finalScore: number;
  skills: string[];
  experience?: string;
  resumeText?: string;
}

export const AIRecruiterService = {
  // =====================================================
  // AI RECRUITER ASSISTANT
  // =====================================================

  async assistant(
    recruiterId: string,
    input: RecruiterAssistantInput
  ) {
    const limit = input.limit ?? 5;

    // =====================================================
    // STEP 1: Find Job
    // =====================================================

    let job;

    if (input.jobId) {
      job = await prisma.job.findUnique({
        where: {
          id: input.jobId,
        },

        include: {
          company: true,

          // IMPORTANT:
          // Job model has `requiredSkills`,
          // NOT `jobSkills`
          requiredSkills: true,
        },
      });
    } else {
      job = await this.findJobFromQuery(
        recruiterId,
        input.query
      );
    }

    if (!job) {
      throw new Error(
        "Could not find a job matching the request"
      );
    }

    // =====================================================
    // STEP 2: Check Recruiter Ownership
    // =====================================================
//     console.log("recruiterId:", recruiterId);
// console.log("company userId:", job.company.userId);
// console.log("company id:", job.company.id);

    if (job.company.userId !== recruiterId) {
      throw new Error(
        "You are not authorized to access this job"
      );
    }

    // =====================================================
    // STEP 3: Get Applicants
    // =====================================================

const applications = await prisma.jobApplication.findMany({
  where: {
    jobId: job.id,
  },
  include: {
    candidateProfile: {
      include: {
        user: true,
        skills: true,
        resumes: true,
      },
    },
  },
});

    if (applications.length === 0) {
      return {
        job: {
          id: job.id,
          title: job.title,
        },

        candidates: [],

        answer:
          "There are currently no applicants for this job.",
      };
    }

    // =====================================================
    // STEP 4: Get Job Embedding
    // =====================================================

 const jobEmbeddingResult =
  await prisma.$queryRaw<{ embedding: string }[]>`
    SELECT "embedding"::text AS embedding
    FROM "Job"
    WHERE "id" = ${job.id}
  `;

    if (
      !jobEmbeddingResult.length ||
      !jobEmbeddingResult[0].embedding
    ) {
      throw new Error(
        "Job embedding has not been generated yet"
      );
    }

    const jobEmbedding =
      jobEmbeddingResult[0].embedding;

    // =====================================================
    // STEP 5: Candidate IDs
    // =====================================================

    const candidateIds =
      applications.map(
        (application) =>
          application.candidateProfileId
      );

    // =====================================================
    // STEP 6: Semantic Candidate Search
    // =====================================================

    /**
     * IMPORTANT:
     *
     * Your database column is:
     *
     * "candidateProfileId"
     *
     * NOT:
     *
     * candidate_profile_id
     */

    const candidatePlaceholders = candidateIds
      .map((_, index) => `$${index + 2}`)
      .join(", ");

    const semanticCandidates =
      await prisma.$queryRawUnsafe<
        {
          candidateProfileId: string;
          distance: number;
        }[]
      >(
        `
          SELECT
            "candidateProfileId",
            embedding <=> CAST($1 AS vector) AS distance
          FROM candidate_embeddings
          WHERE "candidateProfileId" IN (${candidatePlaceholders})
          ORDER BY distance ASC
          LIMIT ${Math.max(limit * 3, 15)}
        `,
        jobEmbedding,
        ...candidateIds
      );

    // =====================================================
    // STEP 7: Create Semantic Score Map
    // =====================================================

    const semanticScoreMap =
      new Map<string, number>();

    for (const candidate of semanticCandidates) {
      const similarity =
        1 - Number(candidate.distance);

      semanticScoreMap.set(
        candidate.candidateProfileId,

        Math.max(
          0,
          Math.min(1, similarity)
        )
      );
    }

    // =====================================================
    // STEP 8: Calculate Ranking
    // =====================================================

    const rankedCandidates: CandidateResult[] = [];

    for (const application of applications) {
      const candidate =
        application.candidateProfile;

      // -------------------------------------------------
      // Semantic Score
      // -------------------------------------------------

      const semanticScore =
        semanticScoreMap.get(candidate.id) ?? 0;

      // -------------------------------------------------
      // Skill Score
      // -------------------------------------------------

      const skillScore =
        this.calculateSkillScore(
          job,
          candidate
        );

      // -------------------------------------------------
      // Experience Score
      // -------------------------------------------------

      const experienceScore =
        this.calculateExperienceScore(
          job,
          candidate
        );

      // -------------------------------------------------
      // Location Score
      // -------------------------------------------------

      const locationScore =
        this.calculateLocationScore(
          job,
          candidate
        );

      // -------------------------------------------------
      // Final Score
      // -------------------------------------------------

      const finalScore =
        semanticScore * 40 +
        skillScore * 30 +
        experienceScore * 20 +
        locationScore * 10;

      // -------------------------------------------------
      // Candidate Name
      // -------------------------------------------------

      /**
       * CandidateProfile does not have a `name`
       * field.
       *
       * Therefore we use User.name if available.
       */

      const candidateName =
        (candidate as any).user?.name ??
        "Unknown Candidate";

      // -------------------------------------------------
      // Candidate Skills
      // -------------------------------------------------

      const candidateSkills =
        candidate.skills.map(
          (skill) => skill.name
        );

      // -------------------------------------------------
      // Resume Text
      // -------------------------------------------------

      const resumeText =
        candidate.resumes
          .map(
            (resume) =>
              resume.rawText ?? ""
          )
          .join("\n");

      rankedCandidates.push({
        applicationId:
          application.id,

        candidateId:
          candidate.id,

        name: candidateName,

        semanticScore,

        skillScore,

        experienceScore,

        locationScore,

        finalScore,

        skills:
          candidateSkills,

        experience:
          candidate.experience ?? undefined,

        resumeText:
          resumeText || undefined,
      });
    }

    // =====================================================
    // STEP 9: Sort
    // =====================================================

    rankedCandidates.sort(
      (a, b) =>
        b.finalScore -
        a.finalScore
    );

    // =====================================================
    // STEP 10: Top Candidates
    // =====================================================

    const topCandidates =
      rankedCandidates.slice(
        0,
        limit
      );

    // =====================================================
    // STEP 11: Build LLM Context
    // =====================================================

    const context =
      this.buildLLMContext(
        job,
        topCandidates
      );

    // =====================================================
    // STEP 12: Generate AI Answer
    // =====================================================

    const answer =
      await generateAnswer(
        input.query,
        context
      );

    // =====================================================
    // STEP 13: Return Response
    // =====================================================

    return {
      query: input.query,

      job: {
        id: job.id,
        title: job.title,
      },

      candidates:
        topCandidates.map(
          (candidate) => ({
            candidateId:
              candidate.candidateId,

            applicationId:
              candidate.applicationId,

            name:
              candidate.name,

            score:
              Number(
                candidate.finalScore.toFixed(2)
              ),

            breakdown: {
              semanticScore:
                Number(
                  (
                    candidate.semanticScore *
                    100
                  ).toFixed(2)
                ),

              skillScore:
                Number(
                  (
                    candidate.skillScore *
                    100
                  ).toFixed(2)
                ),

              experienceScore:
                Number(
                  (
                    candidate.experienceScore *
                    100
                  ).toFixed(2)
                ),

              locationScore:
                Number(
                  (
                    candidate.locationScore *
                    100
                  ).toFixed(2)
                ),
            },
          })
        ),

      answer,
    };
  },

  // =====================================================
  // FIND JOB FROM RECRUITER QUERY
  // =====================================================

  async findJobFromQuery(
    recruiterId: string,
    query: string
  ) {
    const jobs =
      await prisma.job.findMany({
        where: {
          company: {
            userId: recruiterId,
          },

          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },

            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },

        include: {
          company: true,

          // IMPORTANT
          requiredSkills: true,
        },

        take: 5,
      });

    return jobs[0] ?? null;
  },

  // =====================================================
  // SKILL SCORE
  // =====================================================

  calculateSkillScore(
    job: any,
    candidate: any
  ): number {
    /**
     * JobSkill:
     *
     * model JobSkill {
     *   id
     *   jobId
     *   name
     *   priority
     * }
     *
     * Therefore:
     *
     * job.requiredSkills[].name
     *
     * NOT:
     *
     * job.jobSkills[].skill.name
     */

    const requiredSkills =
      job.requiredSkills?.map(
        (jobSkill: any) =>
          jobSkill.name
            .toLowerCase()
            .trim()
      ) ?? [];

    const candidateSkills =
      candidate.skills?.map(
        (skill: any) =>
          skill.name
            .toLowerCase()
            .trim()
      ) ?? [];

    if (
      requiredSkills.length === 0
    ) {
      return 1;
    }

    let matched = 0;

    for (
      const required of requiredSkills
    ) {
      const isMatched =
        candidateSkills.some(
          (candidateSkill: string) =>
            candidateSkill === required ||
            candidateSkill.includes(
              required
            ) ||
            required.includes(
              candidateSkill
            )
        );

      if (isMatched) {
        matched++;
      }
    }

    return (
      matched /
      requiredSkills.length
    );
  },

  // =====================================================
  // EXPERIENCE SCORE
  // =====================================================

  calculateExperienceScore(
    job: any,
    candidate: any
  ): number {
    /**
     * Your CandidateProfile has:
     *
     * experience String?
     *
     * Your Job model does NOT have:
     *
     * requiredExperience
     *
     * Therefore we cannot directly calculate
     * numeric experience from the current schema.
     *
     * For now, use simple text-based matching.
     */

    if (!candidate.experience) {
      return 0.5;
    }

    if (!job.description) {
      return 0.5;
    }

    const candidateExperience =
      candidate.experience
        .toLowerCase();

    const jobDescription =
      job.description
        .toLowerCase();

    const keywords = [
      "experience",
      "years",
      "developer",
      "engineer",
      "senior",
      "junior",
      "full stack",
      "backend",
      "frontend",
    ];

    const matches =
      keywords.filter(
        (keyword) =>
          jobDescription.includes(
            keyword
          ) &&
          candidateExperience.includes(
            keyword
          )
      );

    if (matches.length > 0) {
      return 1;
    }

    return 0.5;
  },

  // =====================================================
  // LOCATION SCORE
  // =====================================================

  calculateLocationScore(
    job: any,
    candidate: any
  ): number {
    if (
      !job.location ||
      !candidate.location
    ) {
      return 0.5;
    }

    const jobLocation =
      job.location
        .toLowerCase()
        .trim();

    const candidateLocation =
      candidate.location
        .toLowerCase()
        .trim();

    if (
      jobLocation.includes(
        candidateLocation
      ) ||
      candidateLocation.includes(
        jobLocation
      )
    ) {
      return 1;
    }

    return 0;
  },

  // =====================================================
  // BUILD RAG CONTEXT
  // =====================================================

  buildLLMContext(
    job: any,
    candidates: CandidateResult[]
  ) {
    return `
You are an AI Recruiter Assistant.

JOB
---

Title:
${job.title}

Description:
${job.description}

Location:
${job.location ?? "Not specified"}

Required Skills:
${
  job.requiredSkills
    ?.map(
      (jobSkill: any) =>
        jobSkill.name
    )
    .join(", ") ?? ""
}


TOP CANDIDATES
-------------

${candidates
  .map(
    (candidate, index) => `
Candidate ${index + 1}

Name:
${candidate.name}

Overall Score:
${candidate.finalScore.toFixed(2)}%

Semantic Score:
${(
  candidate.semanticScore * 100
).toFixed(2)}%

Skill Score:
${(
  candidate.skillScore * 100
).toFixed(2)}%

Experience Score:
${(
  candidate.experienceScore * 100
).toFixed(2)}%

Location Score:
${(
  candidate.locationScore * 100
).toFixed(2)}%

Skills:
${candidate.skills.join(", ")}

Experience:
${
  candidate.experience ??
  "Not provided"
}

Resume:
${
  candidate.resumeText ??
  "Not provided"
}
`
  )
  .join("\n")}


INSTRUCTIONS
------------

Answer the recruiter using ONLY the supplied
candidate information.

Do not invent skills, experience,
education or achievements.

Explain why each candidate is suitable.

Mention important missing information
when necessary.

Return a concise recruiter-friendly answer.
`;
  },
};