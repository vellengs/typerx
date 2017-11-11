import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '名称',
		type: t.string,
	},
	description: {
		title: '描述',
		type: t.string,
		widget: w.string
	},
	fields: {
		title: '字段列表',
		type: t.array,
		items: {
			title: '字段',
			type: t.object,
			properties: {
				name: {
					title: '名称',
					type: t.string
				},
				required: {
					title: '必填',
					type: t.boolean
				},
				type: {
					title: '类型',
					type: t.string,
					width: '120px',
					widget: {
						id: w.dict,
						category: 'field'
					}
				},
				pattern: {
					title: '规则',
					type: t.string
				},
				minlength: {
					title: '最小长度',
					type: t.number
				},
				maxlength: {
					title: '最大长度',
					type: t.number
				},
				widget: {
					title: '控件',
					type: t.string,
					width: '120px',
					widget: {
						id: w.dict,
						category: 'widget'
					}
				}
			},
			widget: w.entry
		},
		widget: w.domain
	}
};