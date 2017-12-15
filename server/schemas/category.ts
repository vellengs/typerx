import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Category {
	id: string;
	name: string;
	value: string;
	parent: string;
}

export let schema: SchemaDefinition = {
	id: {
		type: t.String
	},
	name: {
		type: t.String
	},
	value: {
		type: t.String
	},
	parent: {
		type: t.ObjectId,
		ref: 'Category'
	}
};

create(schema, 'Category');
