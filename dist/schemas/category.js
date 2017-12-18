"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    id: {
        type: modex_1.SchemaTypes.String
    },
    name: {
        type: modex_1.SchemaTypes.String
    },
    paths: [{ type: modex_1.SchemaTypes.ObjectId, ref: 'Category' }],
    parent: {
        type: modex_1.SchemaTypes.ObjectId,
        ref: 'Category'
    }
};
modex_1.create(exports.schema, 'Category');
//# sourceMappingURL=category.js.map