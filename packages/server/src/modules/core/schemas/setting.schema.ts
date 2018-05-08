
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Setting } from './../interfaces/setting.interface';

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