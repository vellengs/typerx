import { ColumnsDefine } from 'modex';

export const columns: ColumnsDefine = {
	username: {
		header: '账号名称'
	},
	name: {
		header: '姓名'
	},
	password: {
		header: '密码',
		hidden: true,
	},
	alias: {
		header: '别名',
		hidden: true,
	},
	type: {
		header: '类型',
		hidden: true,
	},
	role: {
		header: '角色',
	},
	mail: {
		header: '邮箱',
	},
	mobile: {
		header: '手机号',
	},
	group: {
		header: '分组',
	},
	isDisable: {
		header: '是否禁用',
	},
	isAdmin: {
		header: '是否管理员',
	},
	isApproved: {
		header: '是否已审核',
	},
	secret: {
		header: '密保',
		hidden: true
	},
	salt: {
		header: '盐值',
		hidden: true
	}
};
