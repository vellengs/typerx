/// <reference types="express" />
import { Request, Response, NextFunction } from "express";
export declare function initPassport(): void;
/**
 * Authorization Required middleware.
 */
export declare let isAuthorized: (req: Request, res: Response, next: NextFunction) => void;
