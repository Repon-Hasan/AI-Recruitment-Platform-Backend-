import { JwtPayload, SignOptions } from "jsonwebtoken";
declare const createToken: (payload: JwtPayload, secret: string, { expiresIn }: SignOptions) => string;
declare const verifyToken: (token: string, secret: string) => {
    success: boolean;
    data: JwtPayload;
    message?: undefined;
    error?: undefined;
} | {
    data?: undefined;
    success: boolean;
    message: any;
    error: any;
};
declare const decodeToken: (token: string) => JwtPayload;
export declare const jwtUtils: {
    createToken: typeof createToken;
    verifyToken: typeof verifyToken;
    decodeToken: typeof decodeToken;
};
export {};
//# sourceMappingURL=jwt.d.ts.map