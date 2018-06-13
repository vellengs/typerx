"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String },
    title: mongoose_1.SchemaTypes.String,
    keyword: mongoose_1.SchemaTypes.String,
    type: mongoose_1.SchemaTypes.String,
    description: mongoose_1.SchemaTypes.String,
    author: mongoose_1.SchemaTypes.String,
    sort: mongoose_1.SchemaTypes.Number,
    disable: mongoose_1.SchemaTypes.Boolean,
    category: {
        ref: 'Category', type: mongoose_1.SchemaTypes.ObjectId
    },
    meta: {
        ref: 'Meta', type: mongoose_1.SchemaTypes.ObjectId
    },
    content: {
        ref: 'Content', type: mongoose_1.SchemaTypes.ObjectId,
    },
    template: {
        ref: 'Content', type: mongoose_1.SchemaTypes.ObjectId
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    strict: false
});
//# sourceMappingURL=custom.schema.js.map