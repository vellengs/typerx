import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
 
export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 