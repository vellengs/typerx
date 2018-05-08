/// <reference types="mongoose" />
import { Model } from 'mongoose';
import { Account } from './interfaces/account.interface';
export declare const CoreDatabase: {
    Account: Model<Account>;
};
