/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Category extends Document {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}
