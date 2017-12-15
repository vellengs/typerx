import { ColumnsDefine } from 'modex';

export const columns: ColumnsDefine = {
	name: {
		header: '文章标题'
	},
	keyword: {
		header: '关键词'
	},
	author: {
		header: '作者'
	},
	owner: {
		header: '发布人',
		hidden: true,
	},
	category: {
		header: '分类'
	},
	comment: {
		header: '备注',
		hidden: true,
	},
	created: {
		header: '创建日期',
		hidden: true,
	}
};

