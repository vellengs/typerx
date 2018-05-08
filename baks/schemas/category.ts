import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Category {
	_id?: string;
	id: string;
	name: string;
	paths?: string[];
	parent?: string;
}

export let schema: SchemaDefinition = {
	id: {
		type: t.String
	},
	name: {
		type: t.String
	},
	paths: [{ type: t.ObjectId, ref: 'Category' }],
	parent: {
		type: t.ObjectId,
		ref: 'Category'
	}
};

create(schema, 'Category');
