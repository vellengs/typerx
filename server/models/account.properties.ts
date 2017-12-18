
import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	username: {
		title: '账号名',
		type: t.string,
		required: true,
	},
	name: {
		title: '姓名',
		type: t.string,
		required: true,
	},
	password: {
		title: '密码',
		widget: w.input,
		type: t.string
	},
	alias: {
		title: '别名',
		widget: w.input,
		type: t.string
	},
	type: {
		title: '类型',
		widget: w.input,
		type: t.string
	},
	role: {
		title: '角色',
		widget: w.input,
		type: t.string
	},
	mail: {
		title: '邮箱',
		widget: w.input,
		type: t.string
	},
	mobile: {
		title: '邮箱',
		widget: w.input,
		type: t.string
	},
	group: {
		title: '分组',
		widget: w.input,
		type: t.string
	},
	isDisable: {
		title: '是否禁用',
		widget: w.input,
		type: t.string
	},
	isAdmin: {
		title: '是否管理员',
		widget: w.input,
		type: t.string
	},
	isApproved: {
		title: '是否审核',
		widget: w.input,
		type: t.string
	},
	secret: {
		title: '密保',
		widget: w.input,
		type: t.string
	},
	updated: {
		title: '更新时间',
		widget: w.input,
		type: t.string
	},
	created: {
		title: '创建时间',
		widget: w.input,
		type: t.string
	}
};

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.entry,
			title: '新增账号',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑账号',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '账号详情',
		}
	}
};

