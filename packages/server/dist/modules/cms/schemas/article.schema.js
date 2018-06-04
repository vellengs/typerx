"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String },
    title: mongoose_1.SchemaTypes.String,
    keyword: mongoose_1.SchemaTypes.String,
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
}, { timestamps: true });
function preSave(next) {
    const instance = this;
    if (!instance.isModified('content')) {
        return next();
    }
    // bcrypt.genSalt(10, (err: any, salt: any) => {
    //     if (err) {
    //         return next(err);
    //     }
    //     bcrypt.hash(user.password, salt, undefined, (err: Error, hash) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         user.password = hash;
    //         next();
    //     });
    // });
}
function preUpdate(next) {
    const updateDoc = this.getUpdate();
    // const rawPassword = (updateDoc.$set || updateDoc).password;
    // if (rawPassword) {
    //   const password = bcrypt.hashSync(rawPassword, bcrypt.genSaltSync(10));
    //   this.findOneAndUpdate({}, { password: password });
    // }
    next();
}
exports.schema.pre('save', preSave);
exports.schema.pre('findOneAndUpdate', preUpdate);
//# sourceMappingURL=article.schema.js.map