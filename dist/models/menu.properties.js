"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        title: '名称',
        type: modex_1.DataTypes.string,
        maxlength: 30,
        placeholder: '请输入菜单名称'
    },
    parent: {
        title: '父级菜单',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.search,
            domain: 'menu'
        }
    },
    description: {
        title: '描述',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.textarea,
            size: 24
        }
    }
};
exports.forms = {
    add: {
        widget: {
            id: modex_1.WidgetTypes.entry,
            title: '新增菜单',
        }
    },
    edit: {
        widget: {
            id: modex_1.WidgetTypes.entry,
            title: '编辑菜单',
        }
    },
    view: {
        widget: {
            id: modex_1.WidgetTypes.entry,
            title: '菜单详情',
        }
    }
};
//# sourceMappingURL=menu.properties.js.map