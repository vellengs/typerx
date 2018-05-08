"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    username: mongoose_1.SchemaTypes.String,
    password: mongoose_1.SchemaTypes.String,
    avatar: mongoose_1.SchemaTypes.String,
    email: mongoose_1.SchemaTypes.String,
    nick: mongoose_1.SchemaTypes.String,
    type: mongoose_1.SchemaTypes.String,
    mobile: mongoose_1.SchemaTypes.String,
    roles: [{
            type: mongoose_1.SchemaTypes.ObjectId, ref: 'Role'
        }],
    isDisable: {
        type: mongoose_1.SchemaTypes.Boolean
    },
    isAdmin: {
        type: mongoose_1.SchemaTypes.Boolean
    },
    isApproved: {
        type: mongoose_1.SchemaTypes.Boolean
    },
    expired: {
        type: mongoose_1.SchemaTypes.Boolean
    },
}, { timestamps: true });
//# sourceMappingURL=account.schema.js.map