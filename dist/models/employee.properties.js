"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        type: modex_1.DataTypes.string,
        title: '名称',
    },
    nick: {
        type: modex_1.DataTypes.string,
        title: '昵称',
    },
    gender: {
        type: modex_1.DataTypes.string,
        title: '性别',
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'gender',
        }
    },
    mobile: {
        type: modex_1.DataTypes.string,
        title: '手机',
    },
    department: {
        type: modex_1.DataTypes.string,
        title: '部门',
    },
    idcard: {
        type: modex_1.DataTypes.string,
        title: '身份证',
    },
    bank_no: {
        type: modex_1.DataTypes.string,
        title: '银行卡号',
    },
    job: {
        type: modex_1.DataTypes.string,
        title: '职业',
    },
    position: {
        type: modex_1.DataTypes.string,
        title: '职位',
    },
    grade: {
        type: modex_1.DataTypes.string,
        title: '级别',
    },
    subject: {
        type: modex_1.DataTypes.string,
        title: '科目',
    },
    boss: {
        type: modex_1.DataTypes.string,
        title: '上级',
    },
    contact: {
        type: modex_1.DataTypes.string,
        title: '联系人',
    },
    email: {
        type: modex_1.DataTypes.string,
        title: '邮箱',
    },
    qq: {
        type: modex_1.DataTypes.string,
        title: 'QQ号码',
    },
    hiredate: {
        type: modex_1.DataTypes.string,
        title: '入职日期',
        widget: modex_1.WidgetTypes.date
    },
    formal: {
        type: modex_1.DataTypes.boolean,
        title: '是否转正',
    },
    formal_date: {
        type: modex_1.DataTypes.string,
        title: '转正日期',
        widget: modex_1.WidgetTypes.date,
    },
    comment: {
        type: modex_1.DataTypes.string,
        title: '备注',
    },
    auto_gen: {
        type: modex_1.DataTypes.string,
        title: '是否自动生产帐号',
    },
};
//# sourceMappingURL=employee.properties.js.map