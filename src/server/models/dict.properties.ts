import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

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

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.entry,
			title: '新增字典',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑字典',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '字典详情',
		}
	}
};
