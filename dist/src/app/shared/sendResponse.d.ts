import { Response } from "express";
interface IResponseData<T> {
    httpStatusCode: number;
    success: boolean;
    message: string;
    data?: T;
}
export declare const sendResponse: <T>(res: Response, responseData: IResponseData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map