/// <reference types="express" />
import { Request, Response } from 'express';
export declare const pages: {
    [key: string]: (req: Request, res: Response, type: string) => void;
};
