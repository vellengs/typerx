
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
import { Account } from './../interfaces/account.interface';

export const schema = new Schema({
	username: t.String,
	password: t.String,
	avatar: t.String,
	email: t.String,
	nick: t.String,
	type: t.String,
	mobile: t.String,
	roles: [{
		type: t.ObjectId, ref: 'Role'
	}],
	isDisable: {
		type: t.Boolean
	},
	isAdmin: {
		type: t.Boolean
	},
	isApproved: {
		type: t.Boolean
	},
	expired: {
		type: t.Boolean
	},
},
	{ timestamps: true }); 