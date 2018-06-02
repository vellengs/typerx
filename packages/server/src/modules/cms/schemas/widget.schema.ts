
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: t.String,
    title: t.String,
    type: t.String,
    params: t.Mixed
},
    { timestamps: true }); 