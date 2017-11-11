import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Employee {
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

create(schema, 'Employee');