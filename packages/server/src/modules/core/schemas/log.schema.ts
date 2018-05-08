
import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';
 
export const schema = new Schema({
	name: {
		type: t.String
	},
	operator: {
		type: t.String
	},
	operatorIp: {
		type: t.String
	},
	operation: {
		type: t.String
	},
	comment: {
		type: t.String
	},
	created: {
		type: t.Date,
		default: Date.now
	}
},
    { timestamps: true }); 