"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        type: modex_1.SchemaTypes.String
    },
    username: {
        type: modex_1.SchemaTypes.String,
        unique: true,
        index: true
    },
    password: {
        type: modex_1.SchemaTypes.String
    },
    alias: {
        type: modex_1.SchemaTypes.String
    },
    type: {
        type: modex_1.SchemaTypes.String
    },
    role: {
        type: modex_1.SchemaTypes.ObjectId,
        ref: 'Role'
    },
    mail: {
        type: modex_1.SchemaTypes.String,
    },
    mobile: {
        type: modex_1.SchemaTypes.String
    },
    group: {
        type: modex_1.SchemaTypes.String
    },
    isDisable: {
        type: modex_1.SchemaTypes.Boolean
    },
    isAdmin: {
        type: modex_1.SchemaTypes.Boolean
    },
    isApproved: {
        type: modex_1.SchemaTypes.Boolean
    },
    updated: {
        type: modex_1.SchemaTypes.Date,
        default: Date.now
    },
    created: {
        type: modex_1.SchemaTypes.Date,
        default: Date.now
    }
};
modex_1.create(exports.schema, 'Account');
//# sourceMappingURL=account.js.map