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
		placeholder: '请输入关键词'
	},
	owner: {
		title: '责任人',
		type: 'string',
		widget: {
			id: w.search,
			domain: 'account'
		},
		maxlength: 11,
		placeholder: '请选择发布人'
	},
	status: {
		title: '文章状态',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'article_status'
		},
		placeholder: '请选择文章状态',
	}
};

