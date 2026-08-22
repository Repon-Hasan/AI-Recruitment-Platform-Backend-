import { prisma } from "../../../lib/prisma";
// 1. Add Skill to Job
const createJobSkillService = async (userId, data) => {
    // Check if job exists and belongs to the user's company
    const job = await prisma.job.findFirst({
        where: {
            id: data.jobId,
            company: { userId },
        },
    });
    if (!job) {
        const error = new Error("Job not found or unauthorized");
        error.statusCode = 404;
        throw error;
    }
    // Handle bulk creation if 'skills' array is provided
    if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
        const skillsToCreate = data.skills.map((skill) => ({
            jobId: data.jobId,
            name: skill.name,
            priority: skill.priority || "medium",
        }));
        return await prisma.jobSkill.createMany({
            data: skillsToCreate,
        });
    }
    // Fallback to single skill creation if 'name' is provided
    if (!data.name) {
        const error = new Error("Skill name or skills array is required");
        error.statusCode = 400;
        throw error;
    }
    return await prisma.jobSkill.create({
        data: {
            jobId: data.jobId,
            name: data.name,
            priority: data.priority || "medium",
        },
    });
};
// 2. Get All Skills for a Specific Job
const getSkillsByJobIdService = async (jobId) => {
    const job = await prisma.job.findUnique({
        where: { id: jobId },
    });
    if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
    }
    return await prisma.jobSkill.findMany({
        where: { jobId },
    });
};
// 3. Update Skill
const updateJobSkillService = async (userId, skillId, data) => {
    if (!data) {
        const error = new Error("Invalid request payload");
        error.statusCode = 400;
        throw error;
    }
    // Check ownership through job and company
    const skill = await prisma.jobSkill.findFirst({
        where: {
            id: skillId,
            job: {
                company: { userId },
            },
        },
    });
    if (!skill) {
        const error = new Error("Skill not found or unauthorized");
        error.statusCode = 404;
        throw error;
    }
    return await prisma.jobSkill.update({
        where: { id: skillId },
        data: {
            name: data.name ?? skill.name,
            priority: data.priority ?? skill.priority,
        },
    });
};
// 4. Delete Skill
const deleteJobSkillService = async (userId, skillId) => {
    // Check ownership through job and company
    const skill = await prisma.jobSkill.findFirst({
        where: {
            id: skillId,
            job: {
                company: { userId },
            },
        },
    });
    if (!skill) {
        const error = new Error("Skill not found or unauthorized");
        error.statusCode = 404;
        throw error;
    }
    await prisma.jobSkill.delete({
        where: { id: skillId },
    });
    return { message: "Job skill deleted successfully" };
};
const getAllJobSkillService = async () => {
    const skills = await prisma.jobSkill.findMany({
        include: {
            job: true, // Optional: includes related job data
        },
    });
    return {
        skills,
        message: "All skills fetched successfully",
    };
};
export const jobSkillServices = {
    createJobSkillService,
    getSkillsByJobIdService,
    updateJobSkillService,
    deleteJobSkillService,
    getAllJobSkillService
};
