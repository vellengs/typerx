"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    category: {
        type: modex_1.SchemaTypes.String
    },
    name: {
        type: modex_1.SchemaTypes.String
    },
    translate: {
        type: modex_1.SchemaTypes.String
    }
};
modex_1.create(exports.schema, 'Dict');
//# sourceMappingURL=dict.js.map