"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = __importDefault(require("zod"));
const ZodError_1 = require("../errorHelpers/ZodError");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log("Error from Global Error Handler", err);
    }
    let errorSources = [];
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let stack = undefined;
    //Zod Error Patttern
    /*
     error.issues;
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' , 'password' ], => username password
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ]
    */
    if (err instanceof zod_1.default.ZodError) {
        const simplifiedError = (0, ZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    else if (err instanceof Error) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    const errorResponse = {
        success: false,
        message: message,
        errorSources,
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
};
exports.globalErrorHandler = globalErrorHandler;
