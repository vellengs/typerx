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
    }
};
//# sourceMappingURL=menu.query.js.map