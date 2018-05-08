"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String
    },
    key: {
        type: mongoose_1.SchemaTypes.String
    },
    value: {
        type: mongoose_1.SchemaTypes.Mixed
    },
    description: {
        type: mongoose_1.SchemaTypes.String
    }
}, { timestamps: true });
//# sourceMappingURL=setting.schema.js.map