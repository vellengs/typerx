import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Role {
	name: string;
	description: string;
}

export let schema: SchemaDefinition = {
	name: {
		type: t.String,
		unique: true
	},
	description: {
		type: t.String
	}
};

create(schema, 'Role');
