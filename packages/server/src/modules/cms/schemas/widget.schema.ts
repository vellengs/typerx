
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Widget } from './../interfaces/widget.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 