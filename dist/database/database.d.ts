/// <reference types="mongoose" />
import './../schemas';
import * as mongoose from 'mongoose';
import { Mongoose, Document, Model } from 'mongoose';
export interface INew<T> {
    new: (doc?: Object) => MongoDocument & T;
}
export interface MongoDocument extends Document {
}
export interface ILog {
    _id?: string;
    uid?: string;
    category?: string;
    level?: number;
    url?: string;
    message: string;
    process: number;
    createdAt?: Date;
}
export declare class Database {
    db: Mongoose;
    account: Model<Document> & INew<any>;
    menu: Model<Document> & INew<any>;
    dict: Model<Document> & INew<any>;
    customer: Model<Document> & INew<any>;
    domain: Model<Document> & INew<any>;
    employee: Model<Document> & INew<any>;
    article: Model<Document> & INew<any>;
    role: Model<Document> & INew<any>;
    category: Model<Document> & INew<any>;
    setting: Model<Document> & INew<any>;
    permission: Model<Document> & INew<any>;
    handleError: (err: any, message: string, res?: any, notLog?: boolean) => void;
    parseQuery: (req: any, modelName: any) => {};
    paginate: (modelName: string, cond: Object, option: Object, callback?: (err: any, res: any) => void) => any;
    constructor();
    getModel: (modelName: string) => mongoose.Model<mongoose.Document> & INew<any>;
}
