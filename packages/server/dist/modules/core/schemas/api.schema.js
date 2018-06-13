"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String
    },
    method: {
        type: mongoose_1.SchemaTypes.String
    },
    version: {
        type: mongoose_1.SchemaTypes.String
    },
    path: {
        type: mongoose_1.SchemaTypes.String
    },
    description: {
        type: mongoose_1.SchemaTypes.String
    }
}, { timestamps: true });
//# sourceMappingURL=api.schema.js.map