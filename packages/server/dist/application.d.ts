/// <reference types="express" />
import * as express from 'express';
import { Appearance } from './types/appearance';
export interface Plugin {
}
export declare class Application {
    private server;
    private plugin;
    private app;
    PORT: number;
    private static appearances;
    constructor();
    init(): void;
    registerAppearances(name: string, appearance: Appearance): void;
    registerController(controller: any): void;
    getExpressApp(): express.Application;
    static getAppearance(name: string): Appearance;
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
