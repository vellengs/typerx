import {
  Schema,
  SchemaTypes as t,
  Error,
  SchemaOptions,
  model,
} from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';

export const schema = new Schema(
  {
    username: { type: t.String, unique: true },
    password: t.String,
    avatar: t.String,
    email: t.String,
    nick: t.String,
    type: t.String,
    mobile: t.String,
    roles: [
      {
        type: t.ObjectId,
        ref: 'Role',
      },
    ],
    groups: [
      {
        type: t.ObjectId,
        ref: 'Group',
      },
    ],
    isDisable: {
      type: t.Boolean,
    },
    isAdmin: {
      type: t.Boolean,
    },
    isApproved: {
      type: t.Boolean,
    },
    expired: {
      type: t.Date,
    },
  },
  { timestamps: true },
);

function preSave(next: Function) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err: any, salt: any) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
}

function preUpdate(next: Function) {
  const updateDoc = this.getUpdate();
  const rawPassword = (updateDoc.$set || updateDoc).password;
  if (rawPassword) {
    const password = bcrypt.hashSync(rawPassword, bcrypt.genSaltSync(10));
    this.findOneAndUpdate({}, { password: password });
  }
  next();
}

schema.pre('save', preSave);
schema.pre('findOneAndUpdate', preUpdate);

schema.methods.comparePassword = function (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {},
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      if (cb) {
        cb(err, isMatch);
      }
    },
  );
};

schema.methods.pure = function () {
  const obj = this.toJSON();
  delete obj.password;
  return obj;
};
