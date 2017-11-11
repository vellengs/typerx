/// <reference types="mongoose" />
import { SchemaDefinition } from 'modex';
export interface Menu {
    category: string;
    name: string;
    translate: string;
}
export declare let schema: SchemaDefinition;
