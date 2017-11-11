"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        type: modex_1.SchemaTypes.String
    },
    password: {
        type: modex_1.SchemaTypes.String
    },
    role: {
        type: modex_1.SchemaTypes.ObjectId,
        ref: 'Role'
    }
};
modex_1.create(exports.schema, 'Account');
//# sourceMappingURL=account.js.map