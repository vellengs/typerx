import { SchemaForms, EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '标题',
		type: t.string,
		required: true,
	},
	keyword: {
		title: '关键词',
		type: t.string,
	},
	author: {
		title: '作者',
		type: t.string,
		maxlength: 11,
		widget: w.input,
		required: true,
	},
	owner: {
		title: '发布人',
		widget: {
			id: w.search,
			domain: 'account'
		}
	},
	category: {
		title: '文章分类',
		widget: {
			id: w.search,
			domain: 'category'
		}
	},
	created: {
		title: '创建时间',
		widget: {
			id: w.datetime
		},
	}
};

export const forms: SchemaForms = {
	add: {
		widget: {
			id: w.tabs,
			tabs: ['文章信息', '文章详情', '文章评论'],
			parts: {
				0: [
					'name',
					'keyword',
					'author',
					'owner',
					'category'
				],
				1: [
					'comment',
				],
				2: [
					'uid'
				]
			},
		}
	},
	edit: {
		widget: {
			id: w.tabs,
			tabs: ['文章信息', '文章详情', '文章评论'],
			parts: {
				0: [
					'name',
					'keyword',
					'author',
					'owner',
					'category'
				],
				1: [
					'comment'
				],
				2: [
					'uid'
				]
			},
		}
	},
	view: {
		widget: {
			id: w.entry,
			title: '详情',
		}
	}
};
