import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const schema: EntityProperties = {
	category: {
		title: '字典分类',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'category'
		}
	},
	name: {
		title: '字典键',
		type: t.string,
	},
	translate: {
		title: '名称',
		type: t.string,
	}
};