/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Page extends Document {
    name: string;
    title: string;
    keyword: string;
    description: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}
