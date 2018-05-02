import { create, SchemaDefinition, SchemaTypes as t } from 'modex';

export interface Menu {
	uid: string;    							// 菜单编号
	name: string;								// 菜单名称
	translate: string;							// 多语言键值
	group: boolean;								// 是否是分组
	link: string;								// 菜单链接
	externalLink: string;						// 扩展链接
	target: string;								// 窗口打开方式
	icon: string;								// 图标
	badge?: string;								//
	badgeDot?: string;							//
	badgeStatus?: string;						//
	hide: boolean;								// 隐藏
	acl: string;								// 访问控制
	paths?: any[];								// 菜单路径
	parent: string | Menu;						// 父级菜单
}

export let schema: SchemaDefinition = {
	uid: { type: t.String },
	name: { type: t.String },
	translate: { type: t.String },
	group: { type: t.Boolean },
	link: { type: t.String },
	externalLink: { type: t.String },
	target: { type: t.String },
	icon: { type: t.String },
	// badge: { type: t.String },
	// badgeDot: { type: t.String },
	// badgeStatus: { type: t.String },
	hide: { type: t.Boolean },
	acl: { type: t.String },
	paths: [{
		type: t.ObjectId,
		ref: 'Menu'
	}],
	parent: {
		type: t.ObjectId,
		ref: 'Menu'
	}
};

create(schema, 'Menu');
