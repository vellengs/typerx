/// <reference types="mongoose" />
import { SchemaDefinition } from 'modex';
export interface Menu {
    uid: string;
    name: string;
    translate: string;
    group: boolean;
    link: string;
    externalLink: string;
    target: string;
    icon: string;
    badge?: string;
    badgeDot?: string;
    badgeStatus?: string;
    hide: boolean;
    acl: string;
    paths?: any[];
    parent: string | Menu;
}
export declare let schema: SchemaDefinition;
