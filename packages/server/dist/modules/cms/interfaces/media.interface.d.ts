/// <reference types="mongoose" />
import { Document } from 'mongoose';
export interface Media extends Document {
    id: string;
    name: string;
    caption: string;
    description: string;
    ext: any;
    url: string;
    uri: string;
}
