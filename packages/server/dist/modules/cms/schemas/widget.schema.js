"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: mongoose_1.SchemaTypes.String,
    title: mongoose_1.SchemaTypes.String,
    type: mongoose_1.SchemaTypes.String,
    params: mongoose_1.SchemaTypes.Mixed
}, { timestamps: true });
//# sourceMappingURL=widget.schema.js.map