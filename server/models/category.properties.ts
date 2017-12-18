import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '分类名称',
		type: t.string,
		maxlength: 30,
		placeholder: '请输入分类名称'
	},
	parent: {
		title: '父级分类',
		type: t.string,
		widget: {
			id: w.search,
			domain: 'category'
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
			title: '新增分类',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑分类',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '分类详情',
		}
	}
};
