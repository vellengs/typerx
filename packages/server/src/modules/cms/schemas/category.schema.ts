import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: { type: t.String },
    slug: { type: t.String },
    order: { type: t.Number, default: 100 },
    parent: { type: t.ObjectId, ref: 'Category' },
    paths: [{ type: t.ObjectId, ref: 'Category' }],
    description: { type: t.String }
},
    { timestamps: true }); 