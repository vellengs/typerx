
import { Schema, SchemaTypes as t } from 'mongoose';

export const schema = new Schema({
    name: {
        type: t.String
    },
    method: {
        type: t.String
    },
    version: {
        type: t.String
    },
    path: {
        type: t.String
    },
    description: {
        type: t.String
    }
},
    { timestamps: true }); 