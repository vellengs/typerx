import { create, SchemaDefinition, SchemaTypes as t } from 'modex';
import { Category } from './category';

export interface Article {
	id: string;
	name: string;
	keyword: string;
	author: string;
	comment: string;
	category: string | Category;
}

export let schema: SchemaDefinition = {
	id: {
		type: t.String
	},
	name: {
		type: t.String
	},
	keyword: {
		type: t.String
	},
	author: {
		type: t.String
	},
	owner: {
		type: t.ObjectId,
		ref: 'Account'
	},
	category: {
		type: t.ObjectId,
		ref: 'Category'
	},
	comment: {
		type: t.String
	},
	created: {
		type: t.Date,
		default: Date.now
	},
};

create(schema, 'Article');
