import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Comment } from './../interfaces/comment.interface';

export const schema = new Schema({
    name: t.String,
},
    { timestamps: true }); 