import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '项名称',
		type: t.string,
	},
	description: {
		title: '描述',
		type: t.string,
		widget: {
			id: w.textarea,
			size: 24
		}
	}
};

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.entry,
			title: '新增角色',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑角色',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '角色详情',
		}
	}
};
