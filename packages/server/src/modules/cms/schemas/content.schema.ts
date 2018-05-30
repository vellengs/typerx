
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    text: t.String
},
    { timestamps: true }); 