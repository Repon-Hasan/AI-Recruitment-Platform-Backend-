"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const ejs_1 = __importDefault(require("ejs"));
const http_status_1 = __importDefault(require("http-status"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(env_1.envVars.EMAIL_SENDER.SMTP_PORT),
    // true for port 465, false for 587
    secure: Number(env_1.envVars.EMAIL_SENDER.SMTP_PORT) === 465,
    auth: {
        user: env_1.envVars.EMAIL_SENDER.SMTP_USER,
        pass: env_1.envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
const sendEmail = async ({ to, subject, templateName, templateData, attachments, }) => {
    try {
        // Email template path
        const templatePath = path_1.default.resolve(process.cwd(), `src/app/templates/${templateName}.ejs`);
        // Render EJS template
        const html = await ejs_1.default.renderFile(templatePath, templateData);
        // Send email
        const info = await transporter.sendMail({
            from: env_1.envVars.EMAIL_SENDER.SMTP_FROM,
            to,
            subject,
            html,
            ...(attachments?.length && {
                attachments: attachments.map((attachment) => ({
                    filename: attachment.filename,
                    content: attachment.content,
                    contentType: attachment.contentType,
                })),
            }),
        });
        console.log(`✅ Email sent successfully`);
        console.log(`📧 To: ${to}`);
        console.log(`🆔 Message ID: ${info.messageId}`);
    }
    catch (error) {
        console.error("❌ Email Sending Error:", error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
};
exports.sendEmail = sendEmail;
