import { ComplaintStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const createComplaint = async (recruiterId, payload) => {
    /*
     * 1. Find recruiter/company
     */
    const company = await prisma.company.findUnique({
        where: {
            userId: recruiterId,
        },
    });
    if (!company) {
        throw new Error("Recruiter company not found");
    }
    /*
     * 2. Make sure recruiter is submitting
     *    for his own company
     */
    if (company.id !== payload.companyId) {
        throw new Error("You cannot submit a complaint for another company");
    }
    /*
     * 3. If jobId exists,
     *    verify job belongs to company
     */
    if (payload.jobId) {
        const job = await prisma.job.findFirst({
            where: {
                id: payload.jobId,
                companyId: company.id,
            },
        });
        if (!job) {
            throw new Error("Job not found or does not belong to your company");
        }
    }
    /*
     * 4. If application exists,
     *    verify application belongs to company job
     */
    if (payload.jobApplicationId) {
        const application = await prisma.jobApplication.findFirst({
            where: {
                id: payload.jobApplicationId,
                job: {
                    companyId: company.id,
                },
            },
        });
        if (!application) {
            throw new Error("Application not found or does not belong to your company");
        }
    }
    /*
     * 5. Create complaint
     */
    const complaint = await prisma.reviewComplaint.create({
        data: {
            submittedById: recruiterId,
            companyId: company.id,
            jobId: payload.jobId,
            jobApplicationId: payload.jobApplicationId,
            type: payload.type,
            title: payload.title,
            description: payload.description,
            status: ComplaintStatus.PENDING,
        },
        include: {
            company: true,
            job: true,
            jobApplication: true,
        },
    });
    return complaint;
};
const getMyComplaints = async (recruiterId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId: recruiterId,
        },
    });
    if (!company) {
        throw new Error("Company not found");
    }
    const complaints = await prisma.reviewComplaint.findMany({
        where: {
            companyId: company.id,
            submittedById: recruiterId,
        },
        include: {
            job: {
                select: {
                    id: true,
                    title: true,
                },
            },
            jobApplication: {
                select: {
                    id: true,
                    status: true,
                },
            },
            evidence: true,
            penalty: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return complaints;
};
const getMyComplaintById = async (recruiterId, complaintId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId: recruiterId,
        },
    });
    if (!company) {
        throw new Error("Company not found");
    }
    const complaint = await prisma.reviewComplaint.findFirst({
        where: {
            id: complaintId,
            companyId: company.id,
            submittedById: recruiterId,
        },
        include: {
            company: true,
            job: true,
            jobApplication: true,
            evidence: true,
            penalty: true,
        },
    });
    if (!complaint) {
        throw new Error("Complaint not found");
    }
    return complaint;
};
export const ReviewComplaintService = {
    createComplaint,
    getMyComplaints,
    getMyComplaintById,
};
