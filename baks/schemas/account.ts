import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Account {
	username: string;				// 用户名
	name: string;					// 姓名
	password: string;				// 密码
	alias: string;					// 别名
	type: string;					// 类型
	role: any;						// 角色
	mail: string;					// 邮箱
	mobile: string;					// 手机号码
	group: string;					// 分组
	isDisable: boolean;				// 是否禁用
	isAdmin: boolean;				// 是否管理员
	isApproved: boolean;			// 是否审核
	secret: string;					// 密保
	salt: string;					// 盐值
	updated: Date;					// 更新日期
	created: Date;					// 创建日期
}

export let schema: SchemaDefinition = {
	name: {
		type: t.String
	},
	username: {
		type: t.String,
		unique: true,
		index: true
	},
	password: {
		type: t.String
	},
	alias: {
		type: t.String
	},
	type: {
		type: t.String
	},
	role: {
		type: t.ObjectId,
		ref: 'Role'
	},
	mail: {
		type: t.String,
	},
	mobile: {
		type: t.String
	},
	group: {
		type: t.String
	},
	isDisable: {
		type: t.Boolean
	},
	isAdmin: {
		type: t.Boolean
	},
	isApproved: {
		type: t.Boolean
	},
	updated: {
		type: t.Date,
		default: Date.now
	},
	created: {
		type: t.Date,
		default: Date.now
	}
};

create(schema, 'Account');
