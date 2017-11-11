import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Customer {
	name: string;
	password: string;
}

export let schema: SchemaDefinition = {
	name: {
		type: t.String
	},
	password: {
		type: t.String
	},
	role: {
		type: t.ObjectId,
		ref: 'Role'
	}
};

create(schema, 'Customer');