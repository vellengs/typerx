"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String },
    slug: { type: mongoose_1.SchemaTypes.String },
    order: { type: mongoose_1.SchemaTypes.Number, default: 100 },
    parent: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Category' },
    paths: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Category' }],
    description: { type: mongoose_1.SchemaTypes.String }
}, { timestamps: true });
//# sourceMappingURL=category.schema.js.map