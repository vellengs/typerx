import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Article } from './../interfaces/article.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 