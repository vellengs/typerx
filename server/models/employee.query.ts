import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const query: EntityProperties = {
	name: {
		title: "姓名",
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入姓名、拼音、电话'
	},
	primary_adviser: {
		title: '责任人',
		type: 'string',
		widget: w.input,
		maxlength: 11,
		placeholder: '请选择责任人'
	},
	intent: {
		title: '意向级别',
		type: t.string,
		widget: w.rate
	},
	status: {
		title: '客户状态',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'customer_status'
		},
		placeholder: '请选择客户状态',
	}
};

