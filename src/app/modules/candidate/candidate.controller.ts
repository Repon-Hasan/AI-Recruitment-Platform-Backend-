import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { candidateService } from "./candiate.services";
import { sendResponse } from "../../shared/sendResponse";
import { authServices } from "../Auth/auth.services";
import { Certificate } from "node:crypto";




// ========================================
// GET /api/candidates/me
// ========================================
const getMyProfile = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const result = await candidateService.getMyProfile(
            userId
        );

        sendResponse(res, {
             httpStatusCode: status.OK,
            success: true,
            message: "Candidate profile fetched successfully",
            data: result,
        });
    }
);


// ========================================
// PATCH /api/candidates/me
// ========================================
const updateMyProfile = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const result = await candidateService.updateMyProfile(
            userId,
            req.body
        );

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Candidate profile updated successfully",
            data: result,
        });
    }
);


// ========================================
// POST /api/candidates/skills
// ========================================
const addSkill = catchAsync(
    async (req: Request, res: Response) => {
        const userId = req.user!.userId;

        const { skills } = req.body;

        const result = await candidateService.addSkill(
            userId,
            skills
        );

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Skill(s) added successfully",
            data: result,
        });
    }
);


// ========================================
// DELETE /api/candidates/skills/:skillId
// ========================================
const deleteSkill = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const skillId = Array.isArray(req.params.skillId)
            ? req.params.skillId[0]
            : req.params.skillId;

        await candidateService.deleteSkill(
            userId,
            skillId
        );

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Skill deleted successfully",
            data: null,
        });
    }
);


// ========================================
// POST /api/candidates/education
// ========================================
const addEducation = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const result = await candidateService.addEducation(
            userId,
            req.body
        );

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Education added successfully",
            data: result,
        });
    }
);


// ========================================
// PATCH /api/candidates/education/:id
// ========================================
const updateEducation = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        const result = await candidateService.updateEducation(
            userId,
            id,
            req.body
        );

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Education updated successfully",
            data: result,
        });
    }
);


// ========================================
// DELETE /api/candidates/education/:id
// ========================================
const deleteEducation = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user!.userId;

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        await candidateService.deleteEducation(
            userId,
            id
        );

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Education deleted successfully",
            data: null,
        });
    }
);

//Project Add PART


const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const project = await candidateService.createProject(
      userId,
      req.body
    );

    //console.log(project)

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create project",
    });
  }
};

const getMyProjects = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.id;

    const projects =
      await candidateService.getMyProjects(candidateId);
     console.log("Projects",projects)
    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve projects",
    });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.id;
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    const project =
      await candidateService.getProjectById(
        candidateId,
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve project",
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.id;
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    const project =
      await candidateService.updateProject(
        candidateId,
        projectId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update project",
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.id;
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    await candidateService.deleteProject(
      candidateId,
      projectId
    );

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete project",
    });
  }
};

//Certificate

const createCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.userId;

    let certificateImage: string | undefined;

    // File uploaded through multer-storage-cloudinary
    if (req.file) {
      certificateImage = (req.file as Express.Multer.File).path;
    }

    const certification =
      await candidateService.createCertification(
        userId,
        {
          ...req.body,
          image: certificateImage,
        }
      );

      
    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create certification",
    });
  }
};

const getMyCertifications = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId = req.user.id;

    const certifications =
      await candidateService.getMyCertifications(
        candidateId
      );

    res.status(200).json({
      success: true,
      message: "Certifications retrieved successfully",
      data: certifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve certifications",
    });
  }
};

const getCertificationById = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    )
      ? req.params.certificationId[0]
      : req.params.certificationId;

    const certification =
      await candidateService.getCertificationById(
        candidateId,
        certificationId
      );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification retrieved successfully",
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve certification",
    });
  }
};

const updateCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    )
      ? req.params.certificationId[0]
      : req.params.certificationId;

    const certification =
      await candidateService.updateCertification(
        candidateId,
        certificationId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update certification",
    });
  }
};

const deleteCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId = req.user.id;
    const certificationId = Array.isArray(
      req.params.certificationId
    )
      ? req.params.certificationId[0]
      : req.params.certificationId;

    await candidateService.deleteCertification(
      candidateId,
      certificationId
    );

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete certification",
    });
  }
};


export const candidateController = {
    getMyProfile,
    updateMyProfile,
    addSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    createCertification,
    getMyCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
};