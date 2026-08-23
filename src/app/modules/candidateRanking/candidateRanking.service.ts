import { prisma } from "../../lib/prisma";
import { RankingFilters } from "./candidateRanking.interface";

interface RankingResult {
  applicationId: string;
  candidateId: string;
  score: number;

  breakdown: {
    skillScore: number;
    experienceScore: number;
    semanticScore: number;
    locationScore: number;
  };
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
      normalize(skill.name)
    );

    console.log("Required job skills:", requiredSkills);

    // =========================================================
    // 3. GET APPLICATIONS
    // =========================================================

    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId,
      },

      include: {
        candidateProfile: {
          include: {
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
      const candidate = application.candidateProfile;

      console.log("--------------------------------");
      console.log("Candidate:", candidate.id);

      // =======================================================
      // 5. CANDIDATE SKILLS
      // =======================================================

      const candidateSkillsRaw = (
        candidate as {
          skills?: unknown;
        }
      ).skills;

      const candidateSkills: string[] = Array.isArray(
        candidateSkillsRaw
      )
        ? candidateSkillsRaw
            .filter(
              (skill): skill is string =>
                typeof skill === "string"
            )
            .map(normalize)
        : [];

      console.log(
        "Candidate skills:",
        candidateSkills
      );

      // =======================================================
      // 6. SKILL SCORE
      // =======================================================

      const matchedSkills = requiredSkills.filter(
        (requiredSkill) => {
          return candidateSkills.some(
            (candidateSkill) =>
              candidateSkill === requiredSkill
          );
        }
      );

      const skillScore =
        requiredSkills.length === 0
          ? 0
          : (matchedSkills.length /
              requiredSkills.length) *
            100;

      console.log(
        "Matched skills:",
        matchedSkills
      );

      console.log(
        "Skill score:",
        skillScore
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

      const candidateExperience = Number(
        (candidate as { experience?: unknown })
          .experience ?? 0
      );

      let experienceScore = 0;

      if (minExperience === 0) {
        experienceScore = 100;
      } else if (
        candidateExperience >= minExperience
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
        100
      );

      console.log(
        "Candidate experience:",
        candidateExperience
      );

      console.log(
        "Required experience:",
        minExperience
      );

      console.log(
        "Experience score:",
        experienceScore
      );

      // =======================================================
      // 8. LOCATION SCORE
      // =======================================================

      const jobLocation = normalize(
        job.location
      );

      const candidateLocation = normalize(
        (candidate as {
          location?: string | null;
        }).location
      );

      let locationScore = 0;

      if (!jobLocation) {
        locationScore = 100;
      } else if (
        candidateLocation === jobLocation
      ) {
        locationScore = 100;
      } else {
        locationScore = 0;
      }

      console.log(
        "Job location:",
        jobLocation
      );

      console.log(
        "Candidate location:",
        candidateLocation
      );

      console.log(
        "Location score:",
        locationScore
      );

      // =======================================================
      // 9. RESUME
      // =======================================================

      const resume =
        candidate.resumes?.[0];

      if (!resume) {
        console.log(
          "No resume found for candidate"
        );
      } else {
        console.log(
          "Resume:",
          resume.id
        );
      }

      // =======================================================
      // 10. SEMANTIC SCORE
      // =======================================================
      //
      // IMPORTANT:
      //
      // Your current code:
      //
      // const semanticScore = skillScore;
      //
      // DOES NOT USE VECTOR EMBEDDINGS.
      //
      // We temporarily keep semantic score at 0
      // until pgvector similarity is implemented.
      //
      // =======================================================

      let semanticScore = 0;

      /*
        Later:

        Job embedding
             +
        Resume embedding
             ↓
        pgvector cosine similarity
             ↓
        semanticScore
      */

      console.log(
        "Semantic score:",
        semanticScore
      );

      // =======================================================
      // 11. FINAL SCORE
      // =======================================================

      const finalScore =
        skillScore * 0.50 +
        experienceScore * 0.20 +
        semanticScore * 0.20 +
        locationScore * 0.10;

      console.log(
        "Final score:",
        finalScore
      );

      // =======================================================
      // 12. SAVE RESULT
      // =======================================================

      results.push({
        applicationId: application.id,

        candidateId: candidate.id,

        score: Math.round(finalScore),

        breakdown: {
          skillScore: Math.round(
            skillScore
          ),

          experienceScore: Math.round(
            experienceScore
          ),

          semanticScore: Math.round(
            semanticScore
          ),

          locationScore: Math.round(
            locationScore
          ),
        },
      });
    }

    // =========================================================
    // 13. SORT HIGHEST SCORE FIRST
    // =========================================================

    results.sort(
      (a, b) => b.score - a.score
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


    // Get applicant information
    const applications =
      await prisma.jobApplication.findMany({

        where: {
          jobId,
        },

        include: {
          candidateProfile: true,
        },
      });


    // Combine ranking + candidate
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

          candidate:
            application.candidateProfile,
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
            Array.isArray(candidateSkillsRaw) &&
            candidateSkillsRaw.some(
              (candidateSkill): candidateSkill is string =>
                typeof candidateSkill === "string" &&
                candidateSkill.toLowerCase().trim() ===
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
