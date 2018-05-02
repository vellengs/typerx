import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '项名称',
		type: t.string,
	},
	key: {
		title: '设置键',
		type: t.string
	},
	value: {
		title: '设置值',
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
			title: '新增设置项',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑设置',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '设置详情',
		}
	}
};
