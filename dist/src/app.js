"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const node_1 = require("better-auth/node");
const auth_1 = require("./app/lib/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = require("./app/middleware/notFound");
const path_1 = __importDefault(require("path"));
const env_1 = require("./app/config/env");
exports.app = (0, express_1.default)();
const allowedOrigins = [
    env_1.envVars.FRONTEND_URL,
    env_1.envVars.BETTER_AUTH_URL,
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
exports.app.use((0, cors_1.default)({
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
exports.app.use("/api/auth", (0, node_1.toNodeHandler)(auth_1.auth));
// Enable URL-encoded form data parsing
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.resolve(process.cwd(), `src/app/templates`));
// Middleware to parse JSON bodies
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/", routes_1.indexRoutes);
exports.app.use("/api/v1", routes_1.indexRoutes);
exports.app.use(globalErrorHandler_1.globalErrorHandler);
exports.app.use(notFound_1.notFound);
// Basic route
exports.app.get('/', async (req, res) => {
    res.status(201).json({
        success: true,
        message: 'API is working',
    });
});
