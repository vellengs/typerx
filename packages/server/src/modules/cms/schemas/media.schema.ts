import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: t.String,
    caption: t.Number,
    description: t.String,
    ext: t.Mixed,
    url: t.String,
    uri: t.String,
},
    { timestamps: true }); 