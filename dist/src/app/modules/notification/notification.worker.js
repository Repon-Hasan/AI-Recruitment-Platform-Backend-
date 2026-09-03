import { prisma } from "../../lib/prisma";
import { sendEmail } from "./email.service";
export const processNotifications = async () => {
    const notifications = await prisma.notification.findMany({
        where: {
            status: "PENDING",
            channel: "EMAIL",
        },
        take: 20,
        orderBy: {
            createdAt: "asc",
        },
    });
    for (const notification of notifications) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: notification.userId,
                },
            });
            if (!user?.email) {
                continue;
            }
            await sendEmail({
                to: user.email,
                subject: notification.title,
                html: `
            <div
              style="
                font-family: Arial;
                padding: 20px;
              "
            >

              <h2>
                ${notification.title}
              </h2>

              <p>
                ${notification.message}
              </p>

            </div>
          `,
            });
            await prisma.notification.update({
                where: {
                    id: notification.id,
                },
                data: {
                    status: "SENT",
                },
            });
        }
        catch (error) {
            console.error("Notification failed:", notification.id, error);
            await prisma.notification.update({
                where: {
                    id: notification.id,
                },
                data: {
                    status: "FAILED",
                },
            });
        }
    }
};
