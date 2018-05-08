import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Setting {
	_id?: string;
	id: string;
	name: string;    // 设置项目名称
	key: string;	 // 设置项键名
	value: any;			// 设置值
	description: string;   // 设置描述
}

export let schema: SchemaDefinition = {
	id: {
		type: t.String
	},
	name: {
		type: t.String
	},
	key: {
		type: t.String
	},
	value: {
		type: t.Mixed
	},
	description: {
		type: t.String
	}
};

create(schema, 'Setting');
