/// <reference types="express" />
import { Router } from 'express';
export declare class CustomRestServer {
    static buildServices(router: Router, ...types: any[]): void;
}
