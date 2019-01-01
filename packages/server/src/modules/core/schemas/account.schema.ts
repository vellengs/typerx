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
    username: { type: t.String, required: true, unique: true },
    password: {
      type: t.String, required: true,
    },
    avatar: t.String,
    keyword: t.String,
    email: t.String,
    name: t.String,
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
    profile: {
      type: t.ObjectId,
      ref: 'Profile',
    },
    isDisable: {
      type: t.Boolean,
      default: false,
    },
    isAdmin: {
      type: t.Boolean,
      default: false,
    },
    isApproved: {
      type: t.Boolean,
      default: false,
    },
    expired: {
      type: t.Date,
    },
  },
  { timestamps: true }
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
  const rawPassword = ((updateDoc.$set || updateDoc).password || updateDoc.password);
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
