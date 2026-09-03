import { ComplaintDecision } from "../../../generated/prisma/enums";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../../config/cloudnary.config";
import { prisma } from "../../lib/prisma";



const createComplaint = async (
  userId: string,

  payload: {
    companyId: string;
    jobId?: string;
    jobApplicationId?: string;
    type: any;
    title: string;
    description: string;
  },

  files?: Express.Multer.File[]
) => {

  // ============================================
  // 1. Find candidate profile
  // ============================================

  const candidateProfile =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidateProfile) {
    throw new Error(
      "Candidate profile not found"
    );
  }


  // ============================================
  // 2. Check company
  // ============================================

  const company =
    await prisma.company.findUnique({
      where: {
        id: payload.companyId,
      },
    });

  if (!company) {
    throw new Error(
      "Company not found"
    );
  }


  // ============================================
  // 3. Check application
  // ============================================

  if (payload.jobApplicationId) {

    const application =
      await prisma.jobApplication.findUnique({
        where: {
          id: payload.jobApplicationId,
        },

        include: {
          job: true,
        },
      });

    if (!application) {
      throw new Error(
        "Job application not found"
      );
    }


    // ============================================
    // 4. Verify candidate ownership
    // ============================================

    if (
      application.candidateProfileId !==
      candidateProfile.id
    ) {
      throw new Error(
        "You cannot report another candidate's application"
      );
    }


    // ============================================
    // 5. Verify company
    // ============================================

    if (
      application.job.companyId !==
      payload.companyId
    ) {
      throw new Error(
        "This application does not belong to this company"
      );
    }


    // ============================================
    // 6. Verify job
    // ============================================

    if (
      payload.jobId &&
      application.jobId !==
        payload.jobId
    ) {
      throw new Error(
        "This application does not belong to this job"
      );
    }
  }


  // ============================================
  // 7. Create complaint
  // ============================================

  const complaint =
    await prisma.reviewComplaint.create({
      data: {

        submittedById:
          userId,

        candidateProfileId:
          candidateProfile.id,

        companyId:
          payload.companyId,

        jobId:
          payload.jobId,

        jobApplicationId:
          payload.jobApplicationId,

        type:
          payload.type,

        title:
          payload.title,

        description:
          payload.description,
      },
    });


  // ============================================
  // 8. Upload evidence images
  // ============================================

  if (files && files.length > 0) {

    try {

      for (const file of files) {

        const uploaded =
          await uploadFileToCloudinary(
            file.buffer,
            file.originalname
          );

        await prisma.complaintEvidence.create({
          data: {

            complaintId:
              complaint.id,

            fileUrl:
              uploaded.secure_url,

            fileName:
              file.originalname,

            fileType:
              file.mimetype,
          },
        });
      }

    } catch (error) {

      // If upload/database evidence creation
      // fails, remove complaint

      await prisma.reviewComplaint.delete({
        where: {
          id: complaint.id,
        },
      });

      throw error;
    }
  }


  // ============================================
  // 9. Return complaint with evidence
  // ============================================

  return prisma.reviewComplaint.findUnique({
    where: {
      id: complaint.id,
    },

    include: {
      company: true,
      job: true,
      evidence: true,
    },
  });
};

const getMyComplaints = async (
  candidateProfileId: string
) => {

  return prisma.reviewComplaint.findMany({
    where: {
      candidateProfileId,
    },

    include: {
      company: true,
      job: true,
      penalty: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateComplaint = async (
  userId: string,
  complaintId: string,
  payload: {
    type?: any;
    title?: string;
    description?: string;
  },
  files?: Express.Multer.File[]
) => {
  // ============================================
  // 1. Find candidate profile
  // ============================================

  const candidateProfile =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidateProfile) {
    throw new Error("Candidate profile not found");
  }

  // ============================================
  // 2. Find complaint
  // ============================================

  const complaint =
    await prisma.reviewComplaint.findUnique({
      where: {
        id: complaintId,
      },

      include: {
        evidence: true,
      },
    });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  // ============================================
  // 3. Check ownership
  // ============================================

  if (
    complaint.candidateProfileId !==
    candidateProfile.id
  ) {
    throw new Error(
      "You cannot update another candidate's complaint"
    );
  }

  // ============================================
  // 4. Complaint must still be PENDING
  // ============================================

  if (complaint.status !== "PENDING") {
    throw new Error(
      "Reviewed complaints cannot be updated"
    );
  }

  // ============================================
  // 5. Check 5-hour update window
  // ============================================

  const now = new Date();

  const createdAt =
    new Date(complaint.createdAt);

  const fiveHoursInMilliseconds =
    5 * 60 * 60 * 1000;

  const timePassed =
    now.getTime() - createdAt.getTime();

  if (
    timePassed >
    fiveHoursInMilliseconds
  ) {
    throw new Error(
      "You can only update a complaint within 5 hours of submission"
    );
  }

  // ============================================
  // 6. Update complaint text fields
  // ============================================

  await prisma.reviewComplaint.update({
    where: {
      id: complaintId,
    },

    data: {
      ...(payload.type !== undefined && {
        type: payload.type,
      }),

      ...(payload.title !== undefined && {
        title: payload.title,
      }),

      ...(payload.description !== undefined && {
        description: payload.description,
      }),
    },
  });

  // ============================================
  // 7. Upload new evidence
  // ============================================

  if (files && files.length > 0) {
    for (const file of files) {
      const uploaded =
        await uploadFileToCloudinary(
          file.buffer,
          file.originalname
        );

      await prisma.complaintEvidence.create({
        data: {
          complaintId,

          fileUrl:
            uploaded.secure_url,

          fileName:
            file.originalname,

          fileType:
            file.mimetype,
        },
      });
    }
  }

  // ============================================
  // 8. Return updated complaint
  // ============================================

  return prisma.reviewComplaint.findUnique({
    where: {
      id: complaintId,
    },

    include: {
      company: true,
      job: true,
      penalty: true,
      evidence: true,
    },
  });
};

const deleteComplaint = async (
  userId: string,
  complaintId: string
) => {

  // ============================================
  // 1. Find candidate
  // ============================================

  const candidateProfile =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidateProfile) {
    throw new Error(
      "Candidate profile not found"
    );
  }


  // ============================================
  // 2. Find complaint
  // ============================================

  const complaint =
    await prisma.reviewComplaint.findUnique({
      where: {
        id: complaintId,
      },

      include: {
        evidence: true,
      },
    });


  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }


  // ============================================
  // 3. Verify ownership
  // ============================================

  if (
    complaint.candidateProfileId !==
    candidateProfile.id
  ) {
    throw new Error(
      "You cannot delete another candidate's complaint"
    );
  }


  // ============================================
  // 4. Only pending complaints can be deleted
  // ============================================

  if (complaint.status !== "PENDING") {
    throw new Error(
      "Reviewed complaints cannot be deleted"
    );
  }


  // ============================================
  // 5. Delete Cloudinary images
  // ============================================

  for (
    const evidence of complaint.evidence
  ) {

    try {

      await deleteFileFromCloudinary(
        evidence.fileUrl
      );

    } catch (error) {

      console.error(
        "Failed to delete Cloudinary file:",
        evidence.fileUrl,
        error
      );

      // Stop deletion so DB and Cloudinary
      // don't become inconsistent
      throw new Error(
        "Failed to delete complaint evidence from Cloudinary"
      );
    }
  }


  // ============================================
  // 6. Delete complaint
  // ============================================

  await prisma.reviewComplaint.delete({
    where: {
      id: complaintId,
    },
  });


  return {
    id: complaintId,
    message:
      "Complaint deleted successfully",
  };
};


//ForAdmin
const getComplaintsForAdmin = async () => {

  return prisma.reviewComplaint.findMany({
    include: {
      candidateProfile: true,
      company: true,
      job: true,
      evidence: true,
      penalty: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const decideComplaint = async (
  complaintId: string,
  adminId: string,
  decision: ComplaintDecision,
  adminNote: string
) => {

  const complaint =
    await prisma.reviewComplaint.findUnique({
      where: {
        id: complaintId,
      },
    });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  if (
    complaint.status === "RESOLVED"
  ) {
    throw new Error(
      "Complaint is already resolved"
    );
  }

  const updated =
    await prisma.reviewComplaint.update({
      where: {
        id: complaintId,
      },

      data: {
        decision,

        adminNote,

        reviewedById: adminId,

        reviewedAt: new Date(),

        status:
          decision === "NO_VIOLATION"
            ? "REJECTED"
            : "ACCEPTED",
      },
    });

  return updated;
};

const createPenalty = async (
  complaintId: string,
  adminId: string,
  payload: {
    amount: number;
    currency: string;
    reason: string;
    dueDate?: string;
  }
) => {

  const complaint =
    await prisma.reviewComplaint.findUnique({
      where: {
        id: complaintId,
      },
    });

  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }

  if (
    complaint.decision !== "PENALTY"
  ) {
    throw new Error(
      "Penalty cannot be created for this complaint"
    );
  }

  const existingPenalty =
    await prisma.penalty.findUnique({
      where: {
        complaintId,
      },
    });

  if (existingPenalty) {
    throw new Error(
      "Penalty already exists"
    );
  }

  const penalty =
    await prisma.penalty.create({
      data: {
        complaintId,

        companyId:
          complaint.companyId,

        amount: payload.amount,

        currency: payload.currency,

        reason: payload.reason,

        dueDate: payload.dueDate
          ? new Date(payload.dueDate)
          : undefined,
      },
    });

  return penalty;
};
const getCompanyPenalties = async (
  companyId: string
) => {

  return prisma.penalty.findMany({
    where: {
      companyId,
    },

    include: {
      complaint: {
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMyCompanyComplaintById = async (
  userId: string,
  complaintId: string
) => {

  // ============================================
  // 1. Find company belonging to authenticated user
  // ============================================

  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error(
      "Company profile not found"
    );
  }

  // ============================================
  // 2. Find complaint
  // ============================================

  const complaint =
    await prisma.reviewComplaint.findFirst({
      where: {
        id: complaintId,

        // VERY IMPORTANT:
        // complaint must belong to this company
        companyId: company.id,
      },

      include: {

        // ========================================
        // Company
        // ========================================

        company: true,

        // ========================================
        // Candidate
        // ========================================

        candidateProfile: true,

        // ========================================
        // Job
        // ========================================

        job: true,

        // ========================================
        // Job Application
        // ========================================

        jobApplication: true,

        // ========================================
        // Complaint Evidence
        // ========================================

        evidence: true,

        // ========================================
        // Penalty
        // ========================================

        penalty: true,
      },
    });

  // ============================================
  // 3. Complaint not found
  // ============================================

  if (!complaint) {
    throw new Error(
      "Complaint not found or does not belong to your company"
    );
  }

  // ============================================
  // 4. Return complaint
  // ============================================

  return complaint;
};

// ============================================
// Update Penalty
// ============================================

const updatePenalty = async (
  penaltyId: string,
  companyId: string,
  payload: {
    amount?: number;
    currency?: string;
    reason?: string;
    dueDate?: string | null;
  }
) => {

  // ============================================
  // 1. Find penalty
  // ============================================

  const penalty = await prisma.penalty.findFirst({
    where: {
      id: penaltyId,
      companyId,
    },
  });

  if (!penalty) {
    throw new Error(
      "Penalty not found for this company"
    );
  }

  // ============================================
  // 2. Update penalty
  // ============================================

  const updatedPenalty =
    await prisma.penalty.update({
      where: {
        id: penaltyId,
      },

      data: {
        ...(payload.amount !== undefined && {
          amount: payload.amount,
        }),

        ...(payload.currency !== undefined && {
          currency: payload.currency,
        }),

        ...(payload.reason !== undefined && {
          reason: payload.reason,
        }),

        ...(payload.dueDate !== undefined && {
          dueDate: payload.dueDate
            ? new Date(payload.dueDate)
            : null,
        }),
      },

      include: {
        complaint: {
          select: {
            id: true,
            title: true,
            type: true,
            status: true,
            decision: true,
          },
        },

        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

  return updatedPenalty;
};

// ============================================
// Delete Penalty
// ============================================

const deletePenalty = async (
  penaltyId: string,
  companyId: string
) => {

  // ============================================
  // 1. Find penalty
  // ============================================

  const penalty = await prisma.penalty.findFirst({
    where: {
      id: penaltyId,
      companyId,
    },
  });

  if (!penalty) {
    throw new Error(
      "Penalty not found for this company"
    );
  }

  // ============================================
  // 2. Delete penalty
  // ============================================

  await prisma.penalty.delete({
    where: {
      id: penaltyId,
    },
  });

  return {
    id: penaltyId,
    message: "Penalty deleted successfully",
  };
};

export const ComplaintService = {
  createComplaint,getMyComplaints,updateComplaint,deleteComplaint,getComplaintsForAdmin,decideComplaint,createPenalty,getCompanyPenalties,getMyCompanyComplaintById,updatePenalty,deletePenalty
};