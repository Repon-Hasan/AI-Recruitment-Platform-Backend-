import { Request, Response } from "express";
import { CandidateRankingService } from "./candidateRanking.service";

const rankApplicants = async (
  req: Request,
  res: Response
) => {

  try {

    const { jobId } = req.params;

    if (typeof jobId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
      return;
    }

    const result =
      await CandidateRankingService
        .rankApplicants(jobId);

    res.status(200).json({

      success: true,

      message:
        "Applicants ranked successfully",

      data: result,
    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to rank applicants",
    });
  }
};
const getRankedApplicants = async (
  req: Request,
  res: Response
) => {

  try {

    const { jobId } = req.params;


    // ------------------------------------------
    // Validate jobId
    // ------------------------------------------

    if (typeof jobId !== "string" || !jobId) {

      return res.status(400).json({

        success: false,

        message:
          "Job ID is required",
      });
    }


    // ------------------------------------------
    // Read query parameters
    // ------------------------------------------

    const {
      minScore,
      minExperience,
      skill,
      location,
    } = req.query;


    // ------------------------------------------
    // Convert numbers
    // ------------------------------------------

    const parsedMinScore =
      minScore
        ? Number(minScore)
        : 0;

    const parsedMinExperience =
      minExperience
        ? Number(minExperience)
        : 0;


    // ------------------------------------------
    // Validate numbers
    // ------------------------------------------

    if (
      Number.isNaN(parsedMinScore) ||
      parsedMinScore < 0 ||
      parsedMinScore > 100
    ) {

      return res.status(400).json({

        success: false,

        message:
          "minScore must be a number between 0 and 100",
      });
    }


    if (
      Number.isNaN(parsedMinExperience) ||
      parsedMinExperience < 0
    ) {

      return res.status(400).json({

        success: false,

        message:
          "minExperience must be a valid positive number",
      });
    }


    // ------------------------------------------
    // Convert skill/location safely
    // ------------------------------------------

    const skillValue =
      typeof skill === "string"
        ? skill
        : undefined;

    const locationValue =
      typeof location === "string"
        ? location
        : undefined;


    // ------------------------------------------
    // Call service
    // ------------------------------------------

    const result =
      await CandidateRankingService
        .getRankedApplicants(
          jobId,
          {
            minScore:
              parsedMinScore,

            minExperience:
              parsedMinExperience,

            skill:
              skillValue,

            location:
              locationValue,
          }
        );


    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Ranked applicants retrieved successfully",

      count:
        result.length,

      data:
        result,
    });

  } catch (error) {

    console.error(
      "Get ranked applicants error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to get ranked applicants",
    });
  }
};

export const CandidateRankingController = {
  rankApplicants,getRankedApplicants
};