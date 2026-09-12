"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewRouter = void 0;
const express_1 = require("express");
const interview_controller_1 = require("./interview.controller");
const checkAuth_1 = require("../../../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post("/questions", (0, checkAuth_1.checkAuth)("CANDIDATE"), interview_controller_1.InterviewController.generateInterviewQuestions);
exports.InterviewRouter = router;
