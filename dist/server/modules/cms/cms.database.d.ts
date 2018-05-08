/// <reference types="mongoose" />
import { Model } from 'mongoose';
import { Page } from './interfaces/page.interface';
export declare const CoreDatabase: {
    Account: Model<Page>;
};
