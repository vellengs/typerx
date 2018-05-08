
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Role } from './../interfaces/role.interface';

export const schema = new Schema({
	name: { type: t.String },
	roles: [{ type: t.ObjectId, ref: 'Role' }],
	description: { type: t.String },
	permissions: [{ type: t.ObjectId, ref: 'Menu' }],
},
    { timestamps: true }); 