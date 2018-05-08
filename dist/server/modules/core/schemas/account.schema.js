"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
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
function preSave(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
}
function preUpdate(next) {
    const updateDoc = this.getUpdate();
    const rawPassword = (updateDoc.$set || updateDoc).password;
    if (rawPassword) {
        const password = bcrypt.hashSync(rawPassword, bcrypt.genSaltSync(10));
        this.findOneAndUpdate({}, { password: password });
    }
    next();
}
exports.schema.pre('save', preSave);
exports.schema.pre('findOneAndUpdate', preUpdate);
exports.schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (cb) {
            cb(err, isMatch);
        }
    });
};
exports.schema.methods.pure = function () {
    const obj = this.toJSON();
    delete obj.password;
    return obj;
};
//# sourceMappingURL=account.schema.js.map