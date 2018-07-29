/// <reference types="mongoose" />
import { Model, Document, DocumentQuery } from 'mongoose';
import { KeyValue, TreeNode } from '../types/data.types';
export declare class Repository {
    static remove(model: Model<Document>, id: string): Promise<any>;
    static removeItems(model: Model<Document>, ids: string[]): Promise<any>;
    static get(model: Model<Document>, id: string, populates?: any[]): Promise<any>;
    static searchTree(model: Model<Document>, keyword?: string, id?: string, category?: string, limit?: number, labelField?: string, valueField?: string, searchField?: string): Promise<Array<TreeNode>>;
    static search(model: Model<Document>, keyword?: string, id?: string, category?: string, limit?: number, labelField?: string, valueField?: string, searchField?: string): Promise<Array<KeyValue>>;
    static deeplyFind(query: Model<Document>, id: string): Promise<string[]>;
    static query<T extends Document, TResponse>(query: DocumentQuery<T[], T>, collection: DocumentQuery<T[], T>, page: number, size: number, fields: string[]): Promise<{
        list: TResponse[];
        total: number;
    }>;
    static mergeProfile(user?: Document): any;
}
