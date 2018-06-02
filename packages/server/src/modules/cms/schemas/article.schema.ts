import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: { type: t.String },
    title: t.String,
    keyword: t.String,
    description: t.String,
    author: t.String,
    sort: t.Number,
    disable: t.Boolean,
    category: {
        ref: 'Category', type: t.ObjectId
    },
    meta: {
        ref: 'Meta', type: t.ObjectId
    },
    content: {
        ref: 'Content', type: t.ObjectId,
    },
    template: {
        ref: 'Content', type: t.ObjectId
    }
},
    { timestamps: true });


function preSave(next: Function) {
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

function preUpdate(next: Function) {
    const updateDoc = this.getUpdate();
    // const rawPassword = (updateDoc.$set || updateDoc).password;
    // if (rawPassword) {
    //   const password = bcrypt.hashSync(rawPassword, bcrypt.genSaltSync(10));
    //   this.findOneAndUpdate({}, { password: password });
    // }
    next();
}

schema.pre('save', preSave);
schema.pre('findOneAndUpdate', preUpdate);