
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Page } from './../interfaces/page.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 