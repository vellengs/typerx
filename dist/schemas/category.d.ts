/// <reference types="mongoose" />
import { SchemaDefinition } from 'modex';
export interface Category {
    id: string;
    name: string;
    value: string;
    parent: string;
}
export declare let schema: SchemaDefinition;
