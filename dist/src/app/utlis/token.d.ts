import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
declare const getAccessToken: (payload: JwtPayload) => string;
declare const getRefreshToken: (payload: JwtPayload) => string;
declare const setAccessTokenCookie: (res: Response, token: string) => void;
declare const setRefreshTokenCookie: (res: Response, token: string) => void;
declare const setBetterAuthSessionCookie: (res: Response, token: string) => void;
export declare const tokenUtils: {
    getAccessToken: typeof getAccessToken;
    getRefreshToken: typeof getRefreshToken;
    setAccessTokenCookie: typeof setAccessTokenCookie;
    setRefreshTokenCookie: typeof setRefreshTokenCookie;
    setBetterAuthSessionCookie: typeof setBetterAuthSessionCookie;
};
export {};
//# sourceMappingURL=token.d.ts.map