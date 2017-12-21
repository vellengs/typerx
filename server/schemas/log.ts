import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Log {
	name: string;								// 日志名称
	operator: string;							// 操作人
	operatorIp: string;							// 操作人 IP
	event: string; 								// 事件;
	remoteIp: string;							// 远程IP;
	comment: string;  							// 备注
	created: Date;								// 日志时间
}

export let schema: SchemaDefinition = {
	name: {
		type: t.String,
		unique: true
	},
	operator: {
		type: t.String
	},
	operatorIp: {
		type: t.String
	},
	event: {
		type: t.String
	},
	remoteIp: {
		type: t.String
	},
	comment: {
		type: t.String
	},
	created: {
		type: t.Date,
		default: Date.now
	}
};

create(schema, 'Log');
