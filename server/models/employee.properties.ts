import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	name: {
		type: t.string,
		title: '名称',
	},
	nick: {
		type: t.string,
		title: '昵称',
	},
	gender: {
		type: t.string,
		title: '性别',
		widget: {
			id: w.dict,
			category: 'gender',
		}
	},
	mobile: {
		type: t.string,
		title: '手机',
	},
	department: {
		type: t.string,
		title: '部门',
	},
	idcard: {
		type: t.string,
		title: '身份证',
	},
	bank_no: {
		type: t.string,
		title: '银行卡号',
	},
	job: {
		type: t.string,
		title: '职业',
	},
	position: {
		type: t.string,
		title: '职位',
	},
	grade: {
		type: t.string,
		title: '级别',
	},
	subject: {
		type: t.string,
		title: '科目',
	},
	boss: {
		type: t.string,
		title: '上级',
	},
	contact: {
		type: t.string,
		title: '联系人',
	},
	email: {
		type: t.string,
		title: '邮箱',
	},
	qq: {
		type: t.string,
		title: 'QQ号码',
	},
	hiredate: {
		type: t.string,
		title: '入职日期',
		widget: w.date
	},
	formal: {
		type: t.boolean,
		title: '是否转正',
	},
	formal_date: {
		type: t.string,
		title: '转正日期',
		widget: w.date,
	},
	comment: {
		type: t.string,
		title: '备注',
	},
	auto_gen: {
		type: t.string,
		title: '是否自动生产帐号',
	},
};

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.entry,
			title: '新增员工',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑员工',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '员工详情',
		}
	}
};

