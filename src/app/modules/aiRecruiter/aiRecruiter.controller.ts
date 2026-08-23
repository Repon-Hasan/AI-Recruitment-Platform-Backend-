import { Request, Response } from "express";
import status from "http-status";

import { AIRecruiterService } from "./aiRecruiter.service";

export const AIRecruiterController = {

  async assistant(
    req: Request,
    res: Response
  ) {

    try {

      const {
        jobId,
        query,
        limit,
      } = req.body;

      /*
      Your auth middleware should attach
      the authenticated user to req.user.
      */

      const recruiterId =
        (req as any).user.userId;
  //console.log("REQ.USER:", req.user);
      const result =
        await AIRecruiterService.assistant(
          recruiterId,
          {
            jobId,
            query,
            limit,
          }
        );

      

      return res.status(
        status.OK
      ).json({

        success: true,

        message:
          "AI recruiter assistant response generated successfully",

        data: result,
      });

    } catch (error: any) {

      console.error(
        "AI Recruiter Assistant Error:",
        error
      );

      return res.status(
        status.BAD_REQUEST
      ).json({

        success: false,

        message:
          error.message ??
          "Failed to process recruiter request",
      });
    }
  },
};