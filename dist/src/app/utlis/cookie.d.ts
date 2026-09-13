import { CookieOptions, Request, Response } from "express";
declare const setCookie: (res: Response, key: string, value: string, options: CookieOptions) => void;
declare const getCookie: (req: Request, key: string) => any;
declare const clearCookie: (res: Response, key: string, options: CookieOptions) => void;
export declare const CookieUtils: {
    setCookie: typeof setCookie;
    getCookie: typeof getCookie;
    clearCookie: typeof clearCookie;
};
export {};
//# sourceMappingURL=cookie.d.ts.map