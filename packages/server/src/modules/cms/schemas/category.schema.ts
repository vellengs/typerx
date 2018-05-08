import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Category } from './../interfaces/category.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 