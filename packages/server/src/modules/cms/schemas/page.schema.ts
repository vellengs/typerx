
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: { type: t.String },
    title: t.String,
    keyword: t.String,
    description: t.String,
    sort: t.Number,
    disable: t.Boolean,
    publish: { type: t.Date, default: Date.now },
    meta: {
        ref: 'Meta', type: t.ObjectId
    },
    content: {
        ref: 'Content', type: t.ObjectId,
    },
    template: {
        ref: 'Content', type: t.ObjectId
    }
},
    { timestamps: true }); 