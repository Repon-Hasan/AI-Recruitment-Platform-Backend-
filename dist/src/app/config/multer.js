"use strict";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloudinaryUpload } from "./cloudnary.config";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerImageUpload = exports.multerUpload = void 0;
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinaryUpload,
//     params: async (req, file) => {
//         const originalName = file.originalname;
//         const extension = originalName.split(".").pop()?.toLocaleLowerCase();
//         const fileNameWithoutExtension = originalName
//             .split(".")
//             .slice(0, -1)
//             .join(".")
//             .toLowerCase()
//             .replace(/\s+/g, "-")
//             // eslint-disable-next-line no-useless-escape
//             .replace(/[^a-z0-9\-]/g, "");
//         const uniqueName =
//             Math.random().toString(36).substring(2)+
//             "-"+
//             Date.now()+
//             "-"+
//             fileNameWithoutExtension;
//         const folder = extension === "pdf" ? "pdfs" : "images";
//         return {
//             folder : `ai-recruiter/${folder}`,
//             public_id: uniqueName,
//             resource_type : "auto"
//         }
//     }
// })
// export const multerUpload = multer({storage})
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.multerUpload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only PDF and DOCX files are allowed"));
        }
        cb(null, true);
    },
});
// ===============================
// Profile Image Upload
// ===============================
exports.multerImageUpload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
        }
        cb(null, true);
    },
});
