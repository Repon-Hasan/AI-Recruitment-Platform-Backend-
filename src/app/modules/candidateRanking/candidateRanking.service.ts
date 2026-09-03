
import { prisma } from "../../lib/prisma";
import { RankingFilters } from "./candidateRanking.interface";

interface RankingResult {
  applicationId: string;
  candidateId: string;
  id?: string | null;
  name?: string | null;
  email?: string | null;
  profileImage?: string | null;
  phone?: string | null;
  location?: string | null;
  experience?: number | null;
  skills: string[];
  appliedAt?: Date | string | null;
  resume?:
    | ({
        id: string;
        fileName?: string | null;
        url?: string | null;
        fileUrl?: string | null;
      } & Record<string, unknown>)
    | null;
  education?: unknown;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  score: number;
  matchScore: number;
  matchPercentage: number;
  breakdown: {
    skillScore: number;
    experienceScore: number;
    semanticScore: number;
    locationScore: number;
  };
  strengths: string[];
  weaknesses: string[];
  explanation: string;
}

const normalize = (value: string | null | undefined) => {
  return value?.trim().toLowerCase() ?? "";
};

export const CandidateRankingService = {
async rankApplicants(jobId: string) {
  // =========================================================
  // 1. GET JOB
  // =========================================================

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

  // =========================================================
  // 2. GET REQUIRED JOB SKILLS
  // =========================================================

  const requiredSkills = job.requiredSkills.map((skill) =>
    normalize(skill.name),
  );

  console.log("Required job skills:", requiredSkills);

  // =========================================================
  // 3. GET APPLICATIONS + COMPLETE CANDIDATE DATA
  // =========================================================

  const applications =
    await prisma.jobApplication.findMany({
      where: {
        jobId,
      },

      include: {
        candidateProfile: {
          include: {
            user: true,
            resumes: true,
          },
        },
      },
    });

  const results: RankingResult[] = [];

  // =========================================================
  // 4. RANK EACH CANDIDATE
  // =========================================================

  for (const application of applications) {
    const candidate =
      application.candidateProfile;

    const user = candidate?.user;

    if (!candidate) {
      console.warn(
        `No candidate profile for application ${application.id}`,
      );

      continue;
    }

    console.log("--------------------------------");
    console.log(
      "Candidate:",
      candidate.id,
    );

    console.log(
      "Candidate user:",
      user?.name,
    );

    // =======================================================
    // 5. CANDIDATE SKILLS
    // =======================================================

    const candidateSkillsRaw = (
      candidate as {
        skills?: unknown;
      }
    ).skills;

    const candidateSkills: string[] =
      Array.isArray(candidateSkillsRaw)
        ? candidateSkillsRaw
            .map((skill) => {
              if (
                typeof skill === "string"
              ) {
                return normalize(skill);
              }

              if (
                typeof skill === "object" &&
                skill !== null &&
                "name" in skill
              ) {
                const name =
                  (skill as {
                    name?: unknown;
                  }).name;

                return typeof name ===
                  "string"
                  ? normalize(name)
                  : "";
              }

              return "";
            })
            .filter(Boolean)
        : [];

    console.log(
      "Candidate skills:",
      candidateSkills,
    );

    // =======================================================
    // 6. SKILL SCORE
    // =======================================================

    const matchedSkills =
      requiredSkills.filter(
        (requiredSkill) =>
          candidateSkills.some(
            (candidateSkill) =>
              candidateSkill ===
              requiredSkill,
          ),
      );

    const skillScore =
      requiredSkills.length === 0
        ? 0
        : (matchedSkills.length /
            requiredSkills.length) *
          100;

    console.log(
      "Matched skills:",
      matchedSkills,
    );

    console.log(
      "Skill score:",
      skillScore,
    );

    // =======================================================
    // 7. EXPERIENCE SCORE
    // =======================================================

    const minExperience =
      typeof (
        job as {
          minExperience?: unknown;
        }
      ).minExperience === "number"
        ? (
            job as unknown as {
              minExperience: number;
            }
          ).minExperience
        : 0;

    const candidateExperience =
      Number(
        (
          candidate as {
            experience?: unknown;
          }
        ).experience ?? 0,
      );

    let experienceScore = 0;

    if (minExperience === 0) {
      experienceScore = 100;
    } else if (
      candidateExperience >=
      minExperience
    ) {
      experienceScore = 100;
    } else {
      experienceScore =
        (candidateExperience /
          minExperience) *
        100;
    }

    experienceScore = Math.min(
      experienceScore,
      100,
    );

    // =======================================================
    // 8. LOCATION SCORE
    // =======================================================

    const jobLocation = normalize(
      job.location,
    );

    const candidateLocation =
      normalize(
        (
          candidate as {
            location?: string | null;
          }
        ).location,
      );

    let locationScore = 0;

    if (!jobLocation) {
      locationScore = 100;
    } else if (
      candidateLocation ===
      jobLocation
    ) {
      locationScore = 100;
    } else {
      locationScore = 0;
    }

    // =======================================================
    // 9. RESUME
    // =======================================================

    const resume =
      candidate.resumes?.[0];

    console.log(
      "Resume:",
      resume
        ? resume.id
        : "No resume found",
    );

    // =======================================================
    // 10. SEMANTIC SCORE
    // =======================================================

    let semanticScore = 0;

    /*
      TODO:

      Job embedding
           +
      Resume embedding
           ↓
      pgvector cosine similarity
           ↓
      semanticScore
    */

    // =======================================================
    // 11. FINAL SCORE
    // =======================================================

    const finalScore =
      skillScore * 0.50 +
      experienceScore * 0.20 +
      semanticScore * 0.20 +
      locationScore * 0.10;

    // =======================================================
    // 12. AI EXPLANATION
    // =======================================================

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (skillScore >= 70) {
      strengths.push(
        "Strong match with the required skills",
      );
    } else if (skillScore > 0) {
      strengths.push(
        "Matches some required skills",
      );
    } else {
      weaknesses.push(
        "No matching required skills found",
      );
    }

    if (experienceScore >= 100) {
      strengths.push(
        "Meets the required experience level",
      );
    } else if (
      experienceScore > 0
    ) {
      weaknesses.push(
        "Has less experience than required",
      );
    }

    if (locationScore >= 100) {
      strengths.push(
        "Location matches the job",
      );
    }

    if (semanticScore >= 70) {
      strengths.push(
        "Resume appears highly relevant to the job",
      );
    }

    if (semanticScore === 0) {
      weaknesses.push(
        "Semantic resume matching is not available yet",
      );
    }

    const explanation =
      `Candidate ${user?.name ?? "Unknown Candidate"} ` +
      `received a ${Math.round(finalScore)}% match score ` +
      `based on skills, experience, semantic relevance, and location.`;

    // =======================================================
    // 13. RETURN COMPLETE CANDIDATE + RANKING
    // =======================================================

    results.push({
      applicationId: application.id,

      candidateId: candidate.id,

      id: candidate.userId,

      name:
        user?.name ??
        (
          candidate as {
            name?: string | null;
          }
        ).name ??
        "Unknown Candidate",

      email:
        user?.email ??
        (
          candidate as {
            email?: string | null;
          }
        ).email ??
        null,

      profileImage:
        user?.image ??
        (
          candidate as {
            profileImage?: string | null;
          }
        ).profileImage ??
        null,

      phone:
        (
          candidate as {
            phone?: string | null;
          }
        ).phone ?? null,

      location:
        (
          candidate as {
            location?: string | null;
          }
        ).location ?? null,

      experience:
        (
          candidate as {
            experience?: number | null;
          }
        ).experience ?? null,

      skills: candidateSkills,

      appliedAt:
        application.createdAt ??
        null,

      resume: resume
        ? {
            id: resume.id,

            ...(
              resume as {
                fileName?: string | null;
                url?: string | null;
                fileUrl?: string | null;
              }
            ),
          }
        : null,

      education:
        (
          candidate as {
            education?: unknown;
          }
        ).education ?? null,

      linkedin:
        (
          candidate as {
            linkedin?: string | null;
          }
        ).linkedin ?? null,

      github:
        (
          candidate as {
            github?: string | null;
          }
        ).github ?? null,

      portfolio:
        (
          candidate as {
            portfolio?: string | null;
          }
        ).portfolio ?? null,

      score: Math.round(finalScore),

      matchScore:
        Math.round(finalScore),

      matchPercentage:
        Math.round(finalScore),

      breakdown: {
        skillScore: Math.round(
          skillScore,
        ),

        experienceScore: Math.round(
          experienceScore,
        ),

        semanticScore: Math.round(
          semanticScore,
        ),

        locationScore: Math.round(
          locationScore,
        ),
      },

      strengths,

      weaknesses,

      explanation,
    });
  }

  // =========================================================
  // 14. SORT HIGHEST SCORE FIRST
  // =========================================================

  results.sort(
    (a, b) => b.score - a.score,
  );

  return results;
},

  // ============================================
  // 2. Get ranked applicants + filters
  // ============================================

  async getRankedApplicants(
    jobId: string,
    filters: RankingFilters
  ) {
    // First calculate ranking
    const ranked =
      await CandidateRankingService
        .rankApplicants(jobId);

    // =========================================================
    // Get applicant information
    // =========================================================

    const applications =
      await prisma.jobApplication.findMany({
        where: {
          jobId,
        },
        include: {
          candidateProfile: {
            include: {
              // Candidate profile data
              resumes: true,

              // User model data
              user: true,
            },
          },
        },
      });

    // =========================================================
    // Combine ranking + candidateProfile + user
    // =========================================================

    const result = ranked
      .map((rank) => {
        const application =
          applications.find(
            (app) =>
              app.id === rank.applicationId
          );

        if (!application) {
          return null;
        }

        return {
          ...rank,

          // Full candidate profile
          candidateProfile:
            application.candidateProfile,

          // Keep candidate property too
          // so your existing filtering code
          // remains unchanged.
          candidate:
            application.candidateProfile,

          // Explicit user model data
          user:
            application.candidateProfile.user,
        };
      })
      .filter(
        (
          item
        ): item is NonNullable<typeof item> =>
          item !== null
      );

    // ==========================================
    // Apply filters
    // ==========================================

    const filteredResult =
      result.filter((item) => {
        const candidate =
          item.candidate;

        // ------------------------------
        // Minimum Score
        // ------------------------------

        if (
          item.score <
          filters.minScore
        ) {
          return false;
        }

        // ------------------------------
        // Minimum Experience
        // ------------------------------

        const experience =
          candidate.experience ?? 0;

        if (
          Number(experience) <
          filters.minExperience
        ) {
          return false;
        }

        // ------------------------------
        // Skill
        // ------------------------------

        if (filters.skill) {
          const requestedSkill =
            filters.skill
              .toLowerCase()
              .trim();

          const candidateSkillsRaw = (
            candidate as unknown as {
              skills?: unknown;
            }
          ).skills;

          const hasSkill =
            Array.isArray(
              candidateSkillsRaw
            ) &&
            candidateSkillsRaw.some(
              (
                candidateSkill
              ): candidateSkill is string =>
                typeof candidateSkill ===
                  "string" &&
                candidateSkill
                  .toLowerCase()
                  .trim() ===
                  requestedSkill
            );

          if (!hasSkill) {
            return false;
          }
        }

        // ------------------------------
        // Location
        // ------------------------------

        if (filters.location) {
          const candidateLocation =
            candidate.location
              ?.toLowerCase()
              .trim();

          const requestedLocation =
            filters.location
              .toLowerCase()
              .trim();

          if (
            candidateLocation !==
            requestedLocation
          ) {
            return false;
          }
        }

        return true;
      });

    return filteredResult;
  },
};

