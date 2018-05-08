
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Dict } from './../interfaces/dict.interface';

export const schema = new Schema({
    category: { type: t.String },
    name: { type: t.String },
    translate: { type: t.String },
    expand: { type: t.Mixed },
},
    { timestamps: true }); 