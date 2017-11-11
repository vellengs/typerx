"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.query = {
    name: {
        title: "姓名",
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.string,
            icon: 'anticon-search'
        },
        maxlength: 30,
        placeholder: '请输入姓名、拼音、电话'
    },
    primary_adviser: {
        title: '责任人',
        type: 'string',
        widget: modex_1.WidgetTypes.input,
        maxlength: 11,
        placeholder: '请选择责任人'
    },
    intent: {
        title: '意向级别',
        type: modex_1.DataTypes.string,
        widget: modex_1.WidgetTypes.rate
    },
    status: {
        title: '客户状态',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'customer_status'
        },
        placeholder: '请选择客户状态',
    }
};
//# sourceMappingURL=dict.query.js.map