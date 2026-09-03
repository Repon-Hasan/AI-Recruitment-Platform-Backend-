import express from "express";
import cors from "cors";
import { indexRoutes } from "./app/routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import path from "path";
import { envVars } from "./app/config/env";
export const app = express();
const allowedOrigins = [
    envVars.FRONTEND_URL,
    envVars.BETTER_AUTH_URL,
    "http://localhost:3000",
    "http://localhost:5000",
].filter(Boolean);
// app.use((req, res, next) => {
//   console.log("========== INCOMING REQUEST ==========");
//   console.log("METHOD:", req.method);
//   console.log("URL:", req.originalUrl);
//   console.log("ORIGIN:", req.headers.origin);
//   console.log("======================================");
//   next();
// });
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/auth", toNodeHandler(auth));
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));
// Middleware to parse JSON bodies
app.use(cookieParser());
app.use(express.json());
app.use("/", indexRoutes);
app.use("/api/v1", indexRoutes);
app.use(globalErrorHandler);
app.use(notFound);
// Basic route
app.get('/', async (req, res) => {
    res.status(201).json({
        success: true,
        message: 'API is working',
    });
});
