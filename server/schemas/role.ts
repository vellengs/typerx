import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Role {
	name: string;
}

export let schema: SchemaDefinition = {
	name: {
		type: t.String
	}
};

create(schema, 'Role');
