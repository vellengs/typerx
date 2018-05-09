import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
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

export class UserService {
  async login(
    context: ServiceContext,
    loginDto: LoginDto,
  ): Promise<LoginResponse | false> {
    const { request, response, next } = context;
    const result: LoginResponse | any | false = await this.validate(
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

  async profile(context: ServiceContext): Promise<ProfileResponse> {
    const { user } = context.request;
    return {
      id: user.id,
      name: user.name,
    };
  }

  private async validate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<LoginResponse | any | false> {
    return await new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        (err: Error, user: LoginResponse, info: LocalStrategyInfo) => {
          if (err) {
            reject(err);
          }
          if (user) {
            request.logIn(user, err => {
              if (err) {
                reject(err);
              }
              resolve(user);
            });
          } else {
            resolve(false);
          }
        },
      )(request, response, next);
    });
  }
}
