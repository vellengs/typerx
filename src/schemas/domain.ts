import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Domain {
	category: string;
	name: string;
	translate: string;
}

export let schema: SchemaDefinition = {
	category: {
		type: t.String
	},
	name: {
		type: t.String
	},
	translate: {
		type: t.String
	}
};
create(schema, 'Domain');