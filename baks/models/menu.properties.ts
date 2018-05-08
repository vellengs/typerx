import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '名称',
		type: t.string,
		maxlength: 30,
		placeholder: '请输入菜单名称'
	},
	parent: {
		title: '父级菜单',
		type: t.string,
		widget: {
			id: w.search,
			domain: 'menu'
		}
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
			title: '新增菜单',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑菜单',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '菜单详情',
		}
	}
};
