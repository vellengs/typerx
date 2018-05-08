import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Media } from './../interfaces/media.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 