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
import { pick } from 'lodash';

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


  private async validate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<LoginResponse> {
    const result = await new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        (err: Error, user: LoginResponse, info: LocalStrategyInfo) => {
          if (err) {
            reject(false);
          }
          if (user) {
            request.logIn(user, err => {
              if (err) {
                reject(false);
              }
              const picked = pick(user, ['username', 'nick', 'avatar', 'type',
                'email', 'mobile', 'roles', 'isDisable', 'isAdmin', 'isApproved', 'expired']);
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




}
