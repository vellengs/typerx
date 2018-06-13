/// <reference types="express" />
import { Request } from 'express';
export declare function interceptor(req: Request): Promise<Request>;
export declare function operationLog(req: Request): Promise<void>;
