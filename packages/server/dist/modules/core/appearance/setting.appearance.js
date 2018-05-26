"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appearance_1 = require("../../../types/appearance");
const profile = {
    title: '个人信息',
    properties: {
        nick: {
            title: '昵称',
            type: appearance_1.SchemaTypes.string,
        },
        email: {
            title: '邮箱',
            type: appearance_1.SchemaTypes.string
        },
        mobile: {
            title: '手机',
            pattern: '^1[0-9]{10}$',
            type: appearance_1.SchemaTypes.string
        },
        siteUrl: {
            title: '网址',
            type: appearance_1.SchemaTypes.string,
            ui: {
                grid: {
                    span: 12
                }
            }
        },
        company: {
            title: '公司名称',
            type: appearance_1.SchemaTypes.string,
            ui: {
                grid: {
                    span: 12
                }
            }
        },
        address: {
            title: '地址',
            type: appearance_1.SchemaTypes.string,
            ui: {
                grid: {
                    span: 24
                }
            }
        },
    },
    required: ['nick', 'email', 'mobile'],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};
const sysSetting = {
    title: '系统设置',
    properties: {
        name: {
            title: '系统名称',
            type: appearance_1.SchemaTypes.string
        },
        logo: {
            title: '系统标志',
            type: appearance_1.SchemaTypes.string,
            ui: {
                widget: appearance_1.WidgetTypes.upload,
                fileType: 'image/png,image/jpeg,image/gif,image/bmp',
                listType: 'picture-card',
                grid: {
                    span: 24
                }
            },
        },
    },
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 12
        }
    }
};
exports.appearance = {
    columnSets: {},
    formSets: {
        profile: profile,
        sysSetting: sysSetting
    }
};
//# sourceMappingURL=setting.appearance.js.map