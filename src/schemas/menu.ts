import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Menu {
	category: string;
	name: string;
	translate: string;
}

export let schema: SchemaDefinition = {
	uid: { type: t.String },
	text: { type: t.String },
	translate: { type: t.String },
	group: { type: t.Boolean },
	link: { type: t.String },
	externalLink: { type: t.String },
	target: { type: t.String },
	icon: { type: t.String },
	badge: { type: t.String },
	badgeDot: { type: t.String },
	badgeStatus: { type: t.String },
	hide: { type: t.String },
	acl: { type: t.String },
	parent: {
		type: t.ObjectId,
		ref: 'Menu'
	}
};

create(schema, 'Menu');