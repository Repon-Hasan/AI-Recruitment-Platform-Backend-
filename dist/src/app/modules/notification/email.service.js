import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async ({ to, subject, html, }) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
    }
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM ||
            "onboarding@resend.dev",
        to: [to],
        subject,
        html,
    });
    if (error) {
        console.error("Resend email error:", error);
        throw new Error("Failed to send email");
    }
    return data;
};
