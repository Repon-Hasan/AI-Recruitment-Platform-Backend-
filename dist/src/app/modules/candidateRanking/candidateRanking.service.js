import { prisma } from "../../lib/prisma";
const normalize = (value) => {
    return value?.trim().toLowerCase() ?? "";
};
export const CandidateRankingService = {
    async rankApplicants(jobId) {
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
        const requiredSkills = job.requiredSkills.map((skill) => normalize(skill.name));
        console.log("Required job skills:", requiredSkills);
        // =========================================================
        // 3. GET APPLICATIONS + COMPLETE CANDIDATE DATA
        // =========================================================
        const applications = await prisma.jobApplication.findMany({
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
        const results = [];
        // =========================================================
        // 4. RANK EACH CANDIDATE
        // =========================================================
        for (const application of applications) {
            const candidate = application.candidateProfile;
            const user = candidate?.user;
            if (!candidate) {
                console.warn(`No candidate profile for application ${application.id}`);
                continue;
            }
            console.log("--------------------------------");
            console.log("Candidate:", candidate.id);
            console.log("Candidate user:", user?.name);
            // =======================================================
            // 5. CANDIDATE SKILLS
            // =======================================================
            const candidateSkillsRaw = candidate.skills;
            const candidateSkills = Array.isArray(candidateSkillsRaw)
                ? candidateSkillsRaw
                    .map((skill) => {
                    if (typeof skill === "string") {
                        return normalize(skill);
                    }
                    if (typeof skill === "object" &&
                        skill !== null &&
                        "name" in skill) {
                        const name = skill.name;
                        return typeof name ===
                            "string"
                            ? normalize(name)
                            : "";
                    }
                    return "";
                })
                    .filter(Boolean)
                : [];
            console.log("Candidate skills:", candidateSkills);
            // =======================================================
            // 6. SKILL SCORE
            // =======================================================
            const matchedSkills = requiredSkills.filter((requiredSkill) => candidateSkills.some((candidateSkill) => candidateSkill ===
                requiredSkill));
            const skillScore = requiredSkills.length === 0
                ? 0
                : (matchedSkills.length /
                    requiredSkills.length) *
                    100;
            console.log("Matched skills:", matchedSkills);
            console.log("Skill score:", skillScore);
            // =======================================================
            // 7. EXPERIENCE SCORE
            // =======================================================
            const minExperience = typeof job.minExperience === "number"
                ? job.minExperience
                : 0;
            const candidateExperience = Number(candidate.experience ?? 0);
            let experienceScore = 0;
            if (minExperience === 0) {
                experienceScore = 100;
            }
            else if (candidateExperience >=
                minExperience) {
                experienceScore = 100;
            }
            else {
                experienceScore =
                    (candidateExperience /
                        minExperience) *
                        100;
            }
            experienceScore = Math.min(experienceScore, 100);
            // =======================================================
            // 8. LOCATION SCORE
            // =======================================================
            const jobLocation = normalize(job.location);
            const candidateLocation = normalize(candidate.location);
            let locationScore = 0;
            if (!jobLocation) {
                locationScore = 100;
            }
            else if (candidateLocation ===
                jobLocation) {
                locationScore = 100;
            }
            else {
                locationScore = 0;
            }
            // =======================================================
            // 9. RESUME
            // =======================================================
            const resume = candidate.resumes?.[0];
            console.log("Resume:", resume
                ? resume.id
                : "No resume found");
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
            const finalScore = skillScore * 0.50 +
                experienceScore * 0.20 +
                semanticScore * 0.20 +
                locationScore * 0.10;
            // =======================================================
            // 12. AI EXPLANATION
            // =======================================================
            const strengths = [];
            const weaknesses = [];
            if (skillScore >= 70) {
                strengths.push("Strong match with the required skills");
            }
            else if (skillScore > 0) {
                strengths.push("Matches some required skills");
            }
            else {
                weaknesses.push("No matching required skills found");
            }
            if (experienceScore >= 100) {
                strengths.push("Meets the required experience level");
            }
            else if (experienceScore > 0) {
                weaknesses.push("Has less experience than required");
            }
            if (locationScore >= 100) {
                strengths.push("Location matches the job");
            }
            if (semanticScore >= 70) {
                strengths.push("Resume appears highly relevant to the job");
            }
            if (semanticScore === 0) {
                weaknesses.push("Semantic resume matching is not available yet");
            }
            const explanation = `Candidate ${user?.name ?? "Unknown Candidate"} ` +
                `received a ${Math.round(finalScore)}% match score ` +
                `based on skills, experience, semantic relevance, and location.`;
            // =======================================================
            // 13. RETURN COMPLETE CANDIDATE + RANKING
            // =======================================================
            results.push({
                applicationId: application.id,
                candidateId: candidate.id,
                id: candidate.userId,
                name: user?.name ??
                    candidate.name ??
                    "Unknown Candidate",
                email: user?.email ??
                    candidate.email ??
                    null,
                profileImage: user?.image ??
                    candidate.profileImage ??
                    null,
                phone: candidate.phone ?? null,
                location: candidate.location ?? null,
                experience: candidate.experience ?? null,
                skills: candidateSkills,
                appliedAt: application.createdAt ??
                    null,
                resume: resume
                    ? {
                        id: resume.id,
                        ...resume,
                    }
                    : null,
                education: candidate.education ?? null,
                linkedin: candidate.linkedin ?? null,
                github: candidate.github ?? null,
                portfolio: candidate.portfolio ?? null,
                score: Math.round(finalScore),
                matchScore: Math.round(finalScore),
                matchPercentage: Math.round(finalScore),
                breakdown: {
                    skillScore: Math.round(skillScore),
                    experienceScore: Math.round(experienceScore),
                    semanticScore: Math.round(semanticScore),
                    locationScore: Math.round(locationScore),
                },
                strengths,
                weaknesses,
                explanation,
            });
        }
        // =========================================================
        // 14. SORT HIGHEST SCORE FIRST
        // =========================================================
        results.sort((a, b) => b.score - a.score);
        return results;
    },
    // ============================================
    // 2. Get ranked applicants + filters
    // ============================================
    async getRankedApplicants(jobId, filters) {
        // First calculate ranking
        const ranked = await CandidateRankingService
            .rankApplicants(jobId);
        // =========================================================
        // Get applicant information
        // =========================================================
        const applications = await prisma.jobApplication.findMany({
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
            const application = applications.find((app) => app.id === rank.applicationId);
            if (!application) {
                return null;
            }
            return {
                ...rank,
                // Full candidate profile
                candidateProfile: application.candidateProfile,
                // Keep candidate property too
                // so your existing filtering code
                // remains unchanged.
                candidate: application.candidateProfile,
                // Explicit user model data
                user: application.candidateProfile.user,
            };
        })
            .filter((item) => item !== null);
        // ==========================================
        // Apply filters
        // ==========================================
        const filteredResult = result.filter((item) => {
            const candidate = item.candidate;
            // ------------------------------
            // Minimum Score
            // ------------------------------
            if (item.score <
                filters.minScore) {
                return false;
            }
            // ------------------------------
            // Minimum Experience
            // ------------------------------
            const experience = candidate.experience ?? 0;
            if (Number(experience) <
                filters.minExperience) {
                return false;
            }
            // ------------------------------
            // Skill
            // ------------------------------
            if (filters.skill) {
                const requestedSkill = filters.skill
                    .toLowerCase()
                    .trim();
                const candidateSkillsRaw = candidate.skills;
                const hasSkill = Array.isArray(candidateSkillsRaw) &&
                    candidateSkillsRaw.some((candidateSkill) => typeof candidateSkill ===
                        "string" &&
                        candidateSkill
                            .toLowerCase()
                            .trim() ===
                            requestedSkill);
                if (!hasSkill) {
                    return false;
                }
            }
            // ------------------------------
            // Location
            // ------------------------------
            if (filters.location) {
                const candidateLocation = candidate.location
                    ?.toLowerCase()
                    .trim();
                const requestedLocation = filters.location
                    .toLowerCase()
                    .trim();
                if (candidateLocation !==
                    requestedLocation) {
                    return false;
                }
            }
            return true;
        });
        return filteredResult;
    },
};
