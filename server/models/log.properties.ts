import { EntityProperties, WidgetTypes as w, DataTypes as t, SchemaForms } from 'modex';

export const schema: EntityProperties = {
	created: {
		title: '项名称',
		type: t.string,
	}, 
	name: {
		title: '项名称',
		type: t.string,
	}, 
	operation: {
		title: '项名称',
		type: t.string,
	}, 
	description: {
		title: '项名称',
		type: t.string,
	}, 
	operatorIp: {
		title: '项名称',
		type: t.string,
	}, 
};

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.entry,
			title: '新增日志',
		}
	},
	edit: {
		widget: {
			id: w.entry,
			title: '编辑日志',
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '日志详情',
		}
	}
};
