import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors, PUT } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import * as passport from 'passport';
import {
  LoginDto,
  LocalStrategyInfo,
  LoginResponse,
  ProfileResponse,
} from './dto/login.dto';
import { LogService } from './log.service';
import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';
import { Document } from 'mongoose';
import { EditProfileDto } from './dto/profile.dto';
import { Repository } from '../../database/repository';
import { AccountResponse } from './dto/account.dto';

export class UserService {
  async login(
    context: ServiceContext,
    loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const { request, response, next } = context;
    const result: LoginResponse = await this.validate(context);
    const ip: any = request.headers['x-real-ip'] || request.headers['x-forwarded-for'];
    const operatorIp = ip || (request.connection || { remoteAddress: '' }).remoteAddress;
    await LogService.save({
      name: 'login',
      operator: loginDto.username,
      operatorIp: operatorIp,
      operation: request.method.toLowerCase() + request.originalUrl,
      comment: '用户登录' + result ? '成功' : '失败',
    });

    return result;
  }

  async getUploadConfig(action: string) {
    const result = {
      "imageUrl": "/images/",
      "imagePath": "/ueditor/images/",
      "imageFieldName": "file",
      "imageMaxSize": 2048,
      "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
    };
    return result;
  }

  async fileUpload(file: Express.Multer.File,
    field?: string) {
    return {
      url: '/uploads/' + file.filename
    }
  }

  async update(
    context: ServiceContext,
    entry: EditProfileDto,
  ): Promise<ProfileResponse> {

    const { request } = context;
    const profile: any = await Db.Profile.findOneAndUpdate(
      {
        _id: request.user.id,
      },
      entry, { upsert: true, new: true },
    ).exec();

    entry.profile = profile._id;
    const account = await Db.Account.findOneAndUpdate(
      {
        _id: request.user.id,
      },
      entry, { new: true },
    ).populate('profile').exec();

    if (profile) {
      const instance = Repository.mergeProfile(account);
      return instance;
    } else {
      throw new Errors.BadRequestError('user not found');
    }
  }

  async validate(
    context: ServiceContext
  ): Promise<LoginResponse> {
    const { request, response, next } = context;
    const result = await new Promise((resolve, reject) => {
      const callback = (err: Error, user: Account & Document, info: LocalStrategyInfo) => {
        if (err) {
          reject(false);
        }
        if (user) {
          request.logIn(user, err => {
            console.log('error:', err);
            if (err) {
              reject(false);
            }
            const picked: LoginResponse = this.pure(user);
            resolve(picked);
          });
        } else {
          resolve(false);
        }
      };
      passport.authenticate('local', callback)(request, response, next);
    });
    return result as LoginResponse;
  }

  findAll(): string[] {
    console.log('find all...');
    return [];
  }

  private pure(entry: Account & Document): LoginResponse {
    return pick(entry, [
      'id',
      'username',
      'name',
      'avatar',
      'type',
      'email',
      'groups',
      'roles',
      'mobile',
      'isDisable',
      'isAdmin',
      'isApproved',
      'expired',
    ])
  }

}
