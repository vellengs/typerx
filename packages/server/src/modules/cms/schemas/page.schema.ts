
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: { type: t.String, unique: true },
    title: t.String,
    keyword: t.String,
    description: t.String,
    sort: t.Number,
    disable: t.Boolean,
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