"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, responseData) => {
    const { httpStatusCode, success, message, data } = responseData;
    res.status(httpStatusCode).json({
        success,
        message,
        data
    });
};
exports.sendResponse = sendResponse;
