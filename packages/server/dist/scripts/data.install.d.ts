/// <reference types="mongoose" />
import { Connection } from "mongoose";
export declare class Installer {
    mongooseUri: string;
    db: Connection;
    constructor(mongooseUri: string);
    private static loadJson(dataFolder, file);
    initData(): Promise<void>;
    drop(): Promise<void>;
}
