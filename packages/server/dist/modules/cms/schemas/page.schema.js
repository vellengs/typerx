"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String },
    title: mongoose_1.SchemaTypes.String,
    keyword: mongoose_1.SchemaTypes.String,
    description: mongoose_1.SchemaTypes.String,
    sort: mongoose_1.SchemaTypes.Number,
    disable: mongoose_1.SchemaTypes.Boolean,
    meta: {
        ref: 'Meta', type: mongoose_1.SchemaTypes.ObjectId
    },
    content: {
        ref: 'Content', type: mongoose_1.SchemaTypes.ObjectId,
    },
    template: {
        ref: 'Content', type: mongoose_1.SchemaTypes.ObjectId
    }
}, { timestamps: true });
//# sourceMappingURL=page.schema.js.map