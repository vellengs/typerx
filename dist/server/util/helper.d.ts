/// <reference types="mongoose" />
import { Model, Document } from 'mongoose';
export declare class Helper {
    static remove(model: Model<Document>, id: string): Promise<any>;
    static removeItems(model: Model<Document>, ids: string[]): Promise<any>;
}
