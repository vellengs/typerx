"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        title: '名称',
        type: modex_1.DataTypes.string,
    },
    description: {
        title: '描述',
        type: modex_1.DataTypes.string,
        widget: modex_1.WidgetTypes.string
    },
    fields: {
        title: '字段列表',
        type: modex_1.DataTypes.array,
        items: {
            title: '字段',
            type: modex_1.DataTypes.object,
            properties: {
                name: {
                    title: '名称',
                    type: modex_1.DataTypes.string
                },
                required: {
                    title: '必填',
                    type: modex_1.DataTypes.boolean
                },
                type: {
                    title: '类型',
                    type: modex_1.DataTypes.string,
                    width: '120px',
                    widget: {
                        id: modex_1.WidgetTypes.dict,
                        category: 'field'
                    }
                },
                pattern: {
                    title: '规则',
                    type: modex_1.DataTypes.string
                },
                minlength: {
                    title: '最小长度',
                    type: modex_1.DataTypes.number
                },
                maxlength: {
                    title: '最大长度',
                    type: modex_1.DataTypes.number
                },
                widget: {
                    title: '控件',
                    type: modex_1.DataTypes.string,
                    width: '120px',
                    widget: {
                        id: modex_1.WidgetTypes.dict,
                        category: 'widget'
                    }
                }
            },
            widget: modex_1.WidgetTypes.entry
        },
        widget: modex_1.WidgetTypes.domain
    }
};
//# sourceMappingURL=domain.properties.js.map