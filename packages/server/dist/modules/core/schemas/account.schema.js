"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
exports.schema = new mongoose_1.Schema({
    username: { type: mongoose_1.SchemaTypes.String, required: true, unique: true },
    password: {
        type: mongoose_1.SchemaTypes.String, required: true,
    },
    avatar: mongoose_1.SchemaTypes.String,
    keyword: mongoose_1.SchemaTypes.String,
    email: mongoose_1.SchemaTypes.String,
    nick: mongoose_1.SchemaTypes.String,
    type: mongoose_1.SchemaTypes.String,
    mobile: mongoose_1.SchemaTypes.String,
    roles: [
        {
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'Role',
        },
    ],
    groups: [
        {
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'Group',
        },
    ],
    profile: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'Profile',
    },
    isDisable: {
        type: mongoose_1.SchemaTypes.Boolean,
        default: false,
    },
    isAdmin: {
        type: mongoose_1.SchemaTypes.Boolean,
        default: false,
    },
    isApproved: {
        type: mongoose_1.SchemaTypes.Boolean,
        default: false,
    },
    expired: {
        type: mongoose_1.SchemaTypes.Date,
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