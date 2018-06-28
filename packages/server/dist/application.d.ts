/// <reference types="express" />
import * as express from 'express';
import { Appearance } from './types/appearance';
export interface Plugin {
}
export declare class Application {
    private server;
    private loaded;
    private plugin;
    private app;
    PORT: number;
    constructor(connected?: boolean);
    init(): void;
    registerController(controller: any): void;
    registerAppearance(name: string, appearance: Appearance): void;
    getExpressApp(): express.Application;
    private setUploadsFolder();
    private hostSwaggerDocs();
    private config();
    private handerErrors();
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start(): Promise<any>;
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop(): Promise<boolean>;
}
