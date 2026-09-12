"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".pdf", ".docx"];
    const extension = path_1.default.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
        return cb(new Error("Only PDF and DOCX files are allowed"));
    }
    cb(null, true);
};
exports.uploadResume = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});
