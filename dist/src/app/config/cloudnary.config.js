"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteFileFromCloudinary = exports.uploadFileToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env_1.envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});
const uploadFileToCloudinary = async (buffer, fileName) => {
    if (!buffer || !fileName) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "File buffer and file name are required for upload");
    }
    const extension = fileName.split(".").pop()?.toLocaleLowerCase();
    console.log("hi", extension);
    const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".")
        .toLowerCase()
        .replace(/\s+/g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-]/g, "");
    const uniqueName = Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileNameWithoutExtension;
    const folder = extension === "pdf" ? "pdfs" : "images";
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload_stream({
            resource_type: "auto",
            public_id: `ai-recruiter/${folder}/${uniqueName}`,
            folder: `ai-recruiter/${folder}`,
        }, (error, result) => {
            if (error) {
                return reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to upload file to Cloudinary"));
            }
            resolve(result);
        }).end(buffer);
    });
};
exports.uploadFileToCloudinary = uploadFileToCloudinary;
// export const deleteFileFromCloudinary = async (url : string) => {
//     try {
//         const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
//         const match = url.match(regex);
//         if (match && match[1]) {
//             const publicId = match[1];
//             await cloudinary.uploader.destroy(
//                 publicId, {
//                 resource_type: "image"
//             }
//             )
//             console.log(`File ${publicId} deleted from cloudinary`);
//         }
//     } catch (error) {
//         console.error("Error deleting file from Cloudinary:", error);
//         throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to delete file from Cloudinary");
//     }
// }
const deleteFileFromCloudinary = async (url) => {
    try {
        const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.[^./]+)?$/;
        const match = url.match(regex);
        if (!match || !match[1]) {
            throw new Error("Invalid Cloudinary URL");
        }
        const publicId = match[1];
        await cloudinary_1.v2.uploader.destroy(publicId, {
            resource_type: "image",
        });
        console.log(`Cloudinary file deleted: ${publicId}`);
    }
    catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to delete file from Cloudinary");
    }
};
exports.deleteFileFromCloudinary = deleteFileFromCloudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
