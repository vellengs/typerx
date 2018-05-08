/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Article extends Document {
    name: string;
}
