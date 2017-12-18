import { ColumnsDefine } from 'modex';

export const columns: ColumnsDefine = {
	name: {
		header: '名称'
	},
	icon: {
		header: '图标'
	},
	link: {
		header: '链接'
	},
	externalLink: {
		header: '扩展链接',
		hidden: true
	},
	acl: {
		header: '访问控制'
	}
};

