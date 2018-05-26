/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Category extends Document {
    name: string;
}
