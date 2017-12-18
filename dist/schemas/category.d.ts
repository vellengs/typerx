/// <reference types="mongoose" />
import { SchemaDefinition } from 'modex';
export interface Category {
    _id?: string;
    id: string;
    name: string;
    paths?: string[];
    parent?: string;
}
export declare let schema: SchemaDefinition;
