/// <reference types="mongoose" />
import { SchemaDefinition } from 'modex';
export interface Account {
    username: string;
    name: string;
    password: string;
    alias: string;
    type: string;
    role: any;
    mail: string;
    mobile: string;
    group: string;
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    secret: string;
    salt: string;
    updated: Date;
    created: Date;
}
export declare let schema: SchemaDefinition;
