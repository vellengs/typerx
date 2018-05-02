import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const query: EntityProperties = {
	name: {
		title: '名称',
		type: t.string,
		widget: {
			id: w.string,
			icon: 'anticon-search'
		},
		maxlength: 30,
		placeholder: '请输入名称'
	}
};

