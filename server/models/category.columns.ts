import { ColumnsDefine } from 'modex';

export const columns: ColumnsDefine = {
	name: {
		header: '分类名称'
	},
	parent: {
		header: '父级分类',
		format: 'prop:name'
	},
	description: {
		header: '描述'
	}
};
