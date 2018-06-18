"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: mongoose_1.SchemaTypes.String,
    caption: mongoose_1.SchemaTypes.Number,
    description: mongoose_1.SchemaTypes.String,
    ext: mongoose_1.SchemaTypes.Mixed,
    url: mongoose_1.SchemaTypes.String,
    uri: mongoose_1.SchemaTypes.String,
}, { timestamps: true });
//# sourceMappingURL=media.schema.js.map