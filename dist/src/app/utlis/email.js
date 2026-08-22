/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from "ejs";
import status from "http-status";
import nodemailer from "nodemailer";
import path from "path";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
const transporter = nodemailer.createTransport({
    host: envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
    // true for port 465, false for 587
    secure: Number(envVars.EMAIL_SENDER.SMTP_PORT) === 465,
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
export const sendEmail = async ({ to, subject, templateName, templateData, attachments, }) => {
    try {
        // Email template path
        const templatePath = path.resolve(process.cwd(), `src/app/templates/${templateName}.ejs`);
        // Render EJS template
        const html = await ejs.renderFile(templatePath, templateData);
        // Send email
        const info = await transporter.sendMail({
            from: envVars.EMAIL_SENDER.SMTP_FROM,
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
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
};
