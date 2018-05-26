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

export class UserService {
  async login(
    context: ServiceContext,
    loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const { request, response, next } = context;
    const result: LoginResponse = await this.validate(
      request,
      response,
      next,
    );

    await LogService.save({
      name: 'login',
      operator: loginDto.username,
      operatorIp: request.connection.remoteAddress,
      operation: request.method.toLowerCase() + request.originalUrl,
      comment: '用户登录',
    });

    return result;
  }

  async update(
    entry: EditProfileDto,
  ): Promise<ProfileResponse> {
    const doc: any = await Db.Profile.findOneAndUpdate(
      {
        _id: entry.id,
      },
      entry,
    ).exec();
    return doc;
  }

  private async validate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<LoginResponse> {
    const result = await new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        (err: Error, user: Account & Document, info: LocalStrategyInfo) => {
          if (err) {
            reject(false);
          }
          if (user) {
            request.logIn(user, err => {
              if (err) {
                reject(false);
              }
              const picked: LoginResponse = this.pure(user);
              resolve(picked);
            });
          } else {
            resolve(false);
          }
        },
      )(request, response, next);
    });
    return result as LoginResponse;
  }

  private pure(entry: Account & Document): LoginResponse {
    return pick(entry, [
      'id',
      'username',
      'nick',
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
