/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Page extends Document {
    id: string;
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
