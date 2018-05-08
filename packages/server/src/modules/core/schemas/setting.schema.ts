
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: {
        type: t.String
    },
    key: {
        type: t.String
    },
    value: {
        type: t.Mixed
    },
    description: {
        type: t.String
    }
},
    { timestamps: true }); 