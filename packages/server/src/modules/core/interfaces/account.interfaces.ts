import { Document } from 'mongoose';

export interface Account extends Document {
	username: string;				// 用户名
	nick: string;					// 姓名
	password: string;				// 密码
	alias: string;					// 别名
	type: string;					// 类型
	role: any;						// 角色
	mail: string;					// 邮箱
	mobile: string;					// 手机号码
	group: string;					// 分组
	isDisable: boolean;				// 是否禁用
	isAdmin: boolean;				// 是否管理员
	isApproved: boolean;			// 是否审核
	secret: string;					// 密保
	salt: string;					// 盐值
}
