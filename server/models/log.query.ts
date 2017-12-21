import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const query: EntityProperties = {
	keyword: {
		title: '关键词',
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入名称'
	},
	operator: {
		title: '操作用户',
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入名称'
	},
	range: {
		title: '日期范围',
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入名称'
	},

};

