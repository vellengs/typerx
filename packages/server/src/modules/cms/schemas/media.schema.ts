import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: t.String,
    size: t.Number,
    type: t.String,
    url: t.String,
    uri: t.String,
},
    { timestamps: true }); 