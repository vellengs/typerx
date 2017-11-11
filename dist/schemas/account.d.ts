/// <reference types="mongoose" />
import { SchemaDefinition } from "modex";
export interface Account {
    name: string;
    password: string;
}
export declare let schema: SchemaDefinition;
