import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const query: EntityProperties = {
	username: {
		title: '账号',
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入账号名称'
	},
	mobile: {
		title: '手机',
		type: 'string',
		placeholder: '请输入手机号码'
	},
	mail: {
		title: '邮箱',
		type: t.string,
		placeholder: '请输入邮箱'
	},
	enterprise: {
		title: '企业',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'customer_status'
		},
		placeholder: '请选择客户状态',
	}
};

