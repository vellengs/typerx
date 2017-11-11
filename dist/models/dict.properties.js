"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    category: {
        title: '字典分类',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'category'
        }
    },
    name: {
        title: '字典键',
        type: modex_1.DataTypes.string,
    },
    translate: {
        title: '名称',
        type: modex_1.DataTypes.string,
    }
};
//# sourceMappingURL=dict.properties.js.map