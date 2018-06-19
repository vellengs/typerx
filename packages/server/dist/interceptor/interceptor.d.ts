/// <reference types="express" />
import { Request, Response, NextFunction } from 'express';
export declare const apiPrefix = "/api";
export declare function interceptor(req: Request): Promise<Request>;
export declare function permissionCheck(req: Request): Promise<Request>;
export declare function operationLog(req: Request): Promise<Request>;
export declare function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void>;
