/// <reference types="express" />
import { Request, Response, NextFunction } from "express";
export declare function init(): void;
/**
 * Login Required middleware.
 */
export declare let isAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Authorization Required middleware.
 */
export declare let isAuthorized: (req: Request, res: Response, next: NextFunction) => void;
