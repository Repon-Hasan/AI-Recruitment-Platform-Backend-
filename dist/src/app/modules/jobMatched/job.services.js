import { prisma } from "../../lib/prisma";
// =====================================================
// Normalize Skill
// =====================================================
const normalizeSkill = (skill) => {
    return skill
        .toLowerCase()
        .trim()
        .replace(/\./g, "")
        .replace(/\s+/g, " ");
};
// =====================================================
// Calculate Skill Score
// =====================================================
const calculateSkillScore = (candidateSkills, requiredSkills) => {
    if (requiredSkills.length === 0) {
        return {
            score: 100,
            matchedSkills: [],
            missingSkills: {
                high: [],
                medium: [],
                low: [],
            },
        };
    }
    const candidateSkillSet = new Set(candidateSkills.map(normalizeSkill));
    const matchedSkills = [];
    const missingSkills = {
        high: [],
        medium: [],
        low: [],
    };
    let totalWeight = 0;
    let matchedWeight = 0;
    for (const skill of requiredSkills) {
        const priority = skill.priority.toLowerCase();
        let weight = 1;
        if (priority === "high") {
            weight = 3;
        }
        else if (priority === "medium") {
            weight = 2;
        }
        totalWeight += weight;
        const normalizedSkill = normalizeSkill(skill.name);
        if (candidateSkillSet.has(normalizedSkill)) {
            matchedSkills.push(skill.name);
            matchedWeight += weight;
        }
        else {
            if (priority === "high") {
                missingSkills.high.push(skill.name);
            }
            else if (priority === "medium") {
                missingSkills.medium.push(skill.name);
            }
            else {
                missingSkills.low.push(skill.name);
            }
        }
    }
    const score = totalWeight === 0
        ? 0
        : Math.round((matchedWeight / totalWeight) * 100);
    return {
        score,
        matchedSkills,
        missingSkills,
    };
};
// =====================================================
// Experience Score
// =====================================================
const calculateExperienceScore = (candidateExperience, requiredExperience) => {
    if (requiredExperience === null ||
        requiredExperience <= 0) {
        return 100;
    }
    if (candidateExperience >= requiredExperience) {
        return 100;
    }
    return Math.max(0, Math.min(100, Math.round((candidateExperience / requiredExperience) * 100)));
};
// =====================================================
// Education Score
// =====================================================
const calculateEducationScore = (candidateEducation, requiredEducation) => {
    if (!requiredEducation) {
        return 100;
    }
    if (!candidateEducation) {
        return 0;
    }
    const candidate = candidateEducation.toLowerCase();
    const required = requiredEducation.toLowerCase();
    if (candidate.includes(required)) {
        return 100;
    }
    return 50;
};
// =====================================================
// Keyword Score
// =====================================================
const calculateKeywordScore = (resumeText, jobDescription) => {
    if (!resumeText || !jobDescription) {
        return 0;
    }
    const stopWords = new Set([
        "the",
        "and",
        "for",
        "with",
        "this",
        "that",
        "from",
        "have",
        "will",
        "your",
        "you",
        "are",
        "our",
        "job",
        "work",
        "years",
        "year",
        "about",
        "into",
        "their",
        "they",
        "them",
        "also",
        "using",
        "used",
        "looking",
        "role",
    ]);
    const jobWords = jobDescription
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3 &&
        !stopWords.has(word));
    const uniqueJobWords = [...new Set(jobWords)];
    const resume = resumeText.toLowerCase();
    const matched = uniqueJobWords.filter((word) => resume.includes(word));
    if (uniqueJobWords.length === 0) {
        return 0;
    }
    return Math.round((matched.length / uniqueJobWords.length) * 100);
};
// =====================================================
// Recommendation
// =====================================================
const generateRecommendation = (overallScore, skillsScore, missingSkills) => {
    const highMissing = missingSkills.high.length;
    if (overallScore >= 90 &&
        skillsScore >= 85 &&
        highMissing === 0) {
        return "Excellent Match — Strongly recommended";
    }
    if (overallScore >= 80 &&
        skillsScore >= 70 &&
        highMissing <= 1) {
        return "Strong Match — Recommended to apply";
    }
    if (overallScore >= 65 &&
        skillsScore >= 50) {
        return "Moderate Match — Apply if interested";
    }
    if (overallScore >= 50 ||
        skillsScore >= 40) {
        return "Weak Match — Consider improving missing skills first";
    }
    return "Poor Match — Not recommended for this position";
};
// =====================================================
// Get Recommendation Level
// =====================================================
const getMatchLevel = (overallScore) => {
    if (overallScore >= 90) {
        return "excellent";
    }
    if (overallScore >= 80) {
        return "strong";
    }
    if (overallScore >= 65) {
        return "moderate";
    }
    if (overallScore >= 50) {
        return "weak";
    }
    return "poor";
};
// =====================================================
// Calculate Complete Job Match
// =====================================================
export const calculateJobMatch = async (userId, jobId) => {
    // ---------------------------------------------------
    // 1. Find Candidate
    // ---------------------------------------------------
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
        include: {
            skills: true,
            education: true,
            resumes: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
            },
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    // ---------------------------------------------------
    // 2. Find Job
    // ---------------------------------------------------
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
    // ---------------------------------------------------
    // 3. Get Latest Resume
    // ---------------------------------------------------
    const resume = candidate.resumes[0];
    if (!resume) {
        throw new Error("Please upload a resume before matching");
    }
    // ---------------------------------------------------
    // 4. Semantic Similarity
    // ---------------------------------------------------
    /*
     * IMPORTANT:
     *
     * Resume model:
     *
     * @@map("resumes")
     *
     * Therefore the PostgreSQL table is:
     *
     * "resumes"
     *
     * NOT:
     *
     * "Resume"
     */
    const semanticResult = await prisma.$queryRaw `
      SELECT
        1 - (r.embedding <=> j.embedding) AS similarity
      FROM "resumes" r
      CROSS JOIN "Job" j
      WHERE r.id = ${resume.id}
        AND j.id = ${job.id}
        AND r.embedding IS NOT NULL
        AND j.embedding IS NOT NULL
    `;
    if (!semanticResult.length) {
        throw new Error("Resume or job embedding not found");
    }
    const rawSimilarity = Number(semanticResult[0].similarity);
    const semanticScore = Math.max(0, Math.min(100, Math.round(rawSimilarity * 100)));
    // ---------------------------------------------------
    // 5. Candidate Skills
    // ---------------------------------------------------
    const candidateSkills = candidate.skills.map((skill) => skill.name);
    // ---------------------------------------------------
    // 6. Required Job Skills
    // ---------------------------------------------------
    const requiredSkills = job.requiredSkills.map((skill) => ({
        name: skill.name,
        priority: skill.priority,
    }));
    // ---------------------------------------------------
    // 7. Skill Match
    // ---------------------------------------------------
    const skillResult = calculateSkillScore(candidateSkills, requiredSkills);
    // ---------------------------------------------------
    // 8. Experience
    // ---------------------------------------------------
    /*
     * IMPORTANT:
     *
     * Replace this with your actual CandidateProfile
     * experience field.
     *
     * Example:
     *
     * const candidateExperience =
     *   candidate.yearsOfExperience ?? 0;
     */
    const candidateExperience = 0;
    /*
     * Replace this with your actual Job experience field.
     *
     * Example:
     *
     * const requiredExperience =
     *   job.experienceRequired ?? null;
     */
    const requiredExperience = null;
    const experienceScore = calculateExperienceScore(candidateExperience, requiredExperience);
    // ---------------------------------------------------
    // 9. Education
    // ---------------------------------------------------
    const candidateEducation = candidate.education?.[0]?.degree ?? "";
    /*
     * Replace this with your actual job education field.
     */
    const requiredEducation = null;
    const educationScore = calculateEducationScore(candidateEducation, requiredEducation);
    // ---------------------------------------------------
    // 10. Keyword Score
    // ---------------------------------------------------
    const keywordScore = calculateKeywordScore(resume.rawText ?? "", job.description ?? "");
    // ---------------------------------------------------
    // 11. Overall Score
    // ---------------------------------------------------
    const overallScore = Math.round(semanticScore * 0.40 +
        skillResult.score * 0.30 +
        experienceScore * 0.15 +
        educationScore * 0.10 +
        keywordScore * 0.05);
    // ---------------------------------------------------
    // 12. Recommendation
    // ---------------------------------------------------
    const recommendation = generateRecommendation(overallScore, skillResult.score, skillResult.missingSkills);
    const matchLevel = getMatchLevel(overallScore);
    // ---------------------------------------------------
    // 13. Save / Update Job Match
    // ---------------------------------------------------
    const jobMatch = await prisma.jobMatch.upsert({
        where: {
            candidateId_jobId: {
                candidateId: candidate.id,
                jobId: job.id,
            },
        },
        update: {
            overallScore,
            semanticScore,
            skillsScore: skillResult.score,
            experienceScore,
            educationScore,
            keywordScore,
            matchedSkills: skillResult.matchedSkills,
            missingSkills: skillResult.missingSkills,
            recommendation,
        },
        create: {
            candidateId: candidate.id,
            jobId: job.id,
            overallScore,
            semanticScore,
            skillsScore: skillResult.score,
            experienceScore,
            educationScore,
            keywordScore,
            matchedSkills: skillResult.matchedSkills,
            missingSkills: skillResult.missingSkills,
            recommendation,
        },
    });
    // ---------------------------------------------------
    // 14. Return
    // ---------------------------------------------------
    return {
        jobMatchId: jobMatch.id,
        overallMatchPercentage: overallScore,
        semanticMatchPercentage: semanticScore,
        skillMatchPercentage: skillResult.score,
        experienceMatchPercentage: experienceScore,
        educationMatchPercentage: educationScore,
        keywordMatchPercentage: keywordScore,
        matchedSkills: skillResult.matchedSkills,
        missingSkills: skillResult.missingSkills,
        recommendation,
        matchLevel,
    };
};
// =====================================================
// Get My Job Match
// =====================================================
export const getMyJobMatch = async (userId, jobId) => {
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const jobMatch = await prisma.jobMatch.findUnique({
        where: {
            candidateId_jobId: {
                candidateId: candidate.id,
                jobId,
            },
        },
        include: {
            job: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                },
            },
        },
    });
    if (!jobMatch) {
        throw new Error("Job match not found. Calculate the match first.");
    }
    return {
        jobMatchId: jobMatch.id,
        job: jobMatch.job,
        overallMatchPercentage: jobMatch.overallScore,
        semanticMatchPercentage: jobMatch.semanticScore,
        skillMatchPercentage: jobMatch.skillsScore,
        experienceMatchPercentage: jobMatch.experienceScore,
        educationMatchPercentage: jobMatch.educationScore,
        keywordMatchPercentage: jobMatch.keywordScore,
        matchedSkills: jobMatch.matchedSkills,
        missingSkills: jobMatch.missingSkills,
        recommendation: jobMatch.recommendation,
        matchLevel: getMatchLevel(jobMatch.overallScore),
        createdAt: jobMatch.createdAt,
        updatedAt: jobMatch.updatedAt,
    };
};
// =====================================================
// Get All My Job Matches
// =====================================================
// =====================================================
// Get All My Job Matches
// =====================================================
export const getMyJobMatches = async (userId) => {
    // ---------------------------------------------------
    // 1. Find Candidate
    // ---------------------------------------------------
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    // ---------------------------------------------------
    // 2. Get All Job Matches
    // ---------------------------------------------------
    const jobMatches = await prisma.jobMatch.findMany({
        where: {
            candidateId: candidate.id,
        },
        include: {
            job: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                },
            },
        },
        orderBy: {
            overallScore: "desc",
        },
    });
    // ---------------------------------------------------
    // 3. Return Matches
    // ---------------------------------------------------
    return jobMatches.map((match) => ({
        jobMatchId: match.id,
        job: match.job,
        overallMatchPercentage: match.overallScore,
        semanticMatchPercentage: match.semanticScore,
        skillMatchPercentage: match.skillsScore,
        experienceMatchPercentage: match.experienceScore,
        educationMatchPercentage: match.educationScore,
        keywordMatchPercentage: match.keywordScore,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
        recommendation: match.recommendation,
        matchLevel: getMatchLevel(match.overallScore),
        createdAt: match.createdAt,
        updatedAt: match.updatedAt,
    }));
};
// =====================================================
// Recruiter: Get Job Applicants Matches
// =====================================================
export const getJobMatches = async (userId, jobId) => {
    // ---------------------------------------------------
    // Verify that this recruiter owns the job
    // ---------------------------------------------------
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            company: {
                userId,
            },
        },
        select: {
            id: true,
            title: true,
        },
    });
    if (!job) {
        throw new Error("Job not found or you are not authorized to view its matches");
    }
    // ---------------------------------------------------
    // Get matches
    // ---------------------------------------------------
    const matches = await prisma.jobMatch.findMany({
        where: {
            jobId,
        },
        include: {
            candidate: {
                select: {
                    id: true,
                    phone: true,
                    location: true,
                    experience: true,
                    linkedin: true,
                    github: true,
                    portfolio: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            overallScore: "desc",
        },
    });
    return {
        job,
        totalCandidates: matches.length,
        matches: matches.map((match) => ({
            jobMatchId: match.id,
            candidate: match.candidate,
            overallMatchPercentage: match.overallScore,
            semanticMatchPercentage: match.semanticScore,
            skillMatchPercentage: match.skillsScore,
            experienceMatchPercentage: match.experienceScore,
            educationMatchPercentage: match.educationScore,
            keywordMatchPercentage: match.keywordScore,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills,
            recommendation: match.recommendation,
            matchLevel: getMatchLevel(match.overallScore),
        })),
    };
};
// =====================================================
// Get Match Summary
// =====================================================
export const getJobMatchSummary = async (userId, jobId) => {
    // ---------------------------------------------------
    // Verify recruiter owns job
    // ---------------------------------------------------
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            company: {
                userId,
            },
        },
        select: {
            id: true,
            title: true,
        },
    });
    if (!job) {
        throw new Error("Job not found or you are not authorized");
    }
    // ---------------------------------------------------
    // Get matches
    // ---------------------------------------------------
    const matches = await prisma.jobMatch.findMany({
        where: {
            jobId,
        },
        select: {
            overallScore: true,
            semanticScore: true,
            skillsScore: true,
            experienceScore: true,
            educationScore: true,
            keywordScore: true,
            matchedSkills: true,
            missingSkills: true,
        },
    });
    if (matches.length === 0) {
        return {
            job,
            totalCandidates: 0,
            averageOverallScore: 0,
            averageSemanticScore: 0,
            averageSkillScore: 0,
            excellentMatches: 0,
            strongMatches: 0,
            moderateMatches: 0,
            weakMatches: 0,
            poorMatches: 0,
            topCandidates: [],
        };
    }
    const average = (values) => {
        return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    };
    // ---------------------------------------------------
    // Match Categories
    // ---------------------------------------------------
    const excellentMatches = matches.filter((match) => match.overallScore >= 90).length;
    const strongMatches = matches.filter((match) => match.overallScore >= 80 &&
        match.overallScore < 90).length;
    const moderateMatches = matches.filter((match) => match.overallScore >= 65 &&
        match.overallScore < 80).length;
    const weakMatches = matches.filter((match) => match.overallScore >= 50 &&
        match.overallScore < 65).length;
    const poorMatches = matches.filter((match) => match.overallScore < 50).length;
    // ---------------------------------------------------
    // Sort Matches
    // ---------------------------------------------------
    const sortedMatches = [...matches].sort((a, b) => b.overallScore -
        a.overallScore);
    // ---------------------------------------------------
    // Return Summary
    // ---------------------------------------------------
    return {
        job,
        totalCandidates: matches.length,
        averageOverallScore: average(matches.map((match) => match.overallScore)),
        averageSemanticScore: average(matches.map((match) => match.semanticScore)),
        averageSkillScore: average(matches.map((match) => match.skillsScore)),
        excellentMatches,
        strongMatches,
        moderateMatches,
        weakMatches,
        poorMatches,
        topCandidates: sortedMatches
            .slice(0, 10)
            .map((match) => ({
            overallScore: match.overallScore,
            semanticScore: match.semanticScore,
            skillsScore: match.skillsScore,
            experienceScore: match.experienceScore,
            educationScore: match.educationScore,
            keywordScore: match.keywordScore,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills,
            matchLevel: getMatchLevel(match.overallScore),
        })),
    };
};
// =====================================================
// Delete My Job Match
// =====================================================
export const deleteJobMatch = async (userId, jobId) => {
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const jobMatch = await prisma.jobMatch.findUnique({
        where: {
            candidateId_jobId: {
                candidateId: candidate.id,
                jobId,
            },
        },
    });
    if (!jobMatch) {
        throw new Error("Job match not found");
    }
    await prisma.jobMatch.delete({
        where: {
            id: jobMatch.id,
        },
    });
    return true;
};
