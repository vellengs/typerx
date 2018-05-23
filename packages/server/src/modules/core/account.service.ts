import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import {
  AccountResponse,
  EditAccountDto,
  SessionUser,
  CreateAccountDto,
} from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
import { appearance } from './appearance/account.appearance';
import { pick } from 'lodash';
import { Document } from 'mongoose';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class AccountService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }


  async search(keyword?: string, value?: string, limit: number = 10): Promise<KeyValue[]> {
    return Repository.search(Db.Account, keyword, value, '', limit, 'nick');
  }

  async create(entry: CreateAccountDto): Promise<AccountResponse> {
    const doc = new Db.Account(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async update(
    entry: EditAccountDto,
    admin?: SessionUser,
  ): Promise<AccountResponse> {
    if (admin && admin.isAdmin) {
      const doc = await Db.Account.findOneAndUpdate(
        {
          _id: entry.id,
        },
        entry,
      ).exec();
      return doc;
    } else {
      throw new Errors.ForbiddenError('禁止非管理员更新账号信息！');
    }
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Account, id);
  }

  async profile(context: ServiceContext): Promise<ProfileResponse> {
    const { user } = context.request as any;
    return this.pure(user);
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<AccountResponse[]>> {
    page = page > 0 ? page : 0 || 1;
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};

    const docs: any = await Db.Account.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Account.find(query).count();
    const list = docs.map((item: Account & Document) => {
      return this.pure(item);
    });

    return {
      list: list,
      total: count
    }
  }

  async get(id: string): Promise<AccountResponse> {
    const result = await Repository.get(Db.Account, id, [
      {
        path: 'roles',
        select: 'name',
      },
    ]);
    return result;
  }


  private pure(entry: Account & Document): AccountResponse {
    return pick(entry, [
      'id',
      'username',
      'nick',
      'avatar',
      'type',
      'email',
      'mobile',
      'roles',
      'isDisable',
      'isAdmin',
      'isApproved',
      'expired',
    ])
  }

}
