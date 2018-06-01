/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Media extends Document {
    name: string;
    size: number;
    type: string;
    url: string;
    uri: string;
}
