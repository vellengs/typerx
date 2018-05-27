import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import {
  AccountResponseFields as fields,
  AccountResponse,
  EditAccountDto,
  SessionUser,
  CreateAccountDto,
  PaginateAccount,
} from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
import { appearance } from './appearance/account.appearance';
import { pick } from 'lodash';
import { Document } from 'mongoose';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';
import { Group } from './interfaces/group.interface';

export class AccountService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
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
      throw new Errors.ForbiddenError('禁止非管理员更新帐号信息！');
    }
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Account, id);
  }

  async profile(context: ServiceContext): Promise<ProfileResponse> {
    const { user } = context.request as any;

    console.log('user:', user);

    return this.pure(user);
  }

  async query(
    keyword?: string,
    group?: string,
    role?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateAccount> {
    page = page > 0 ? page : 0 || 1;

    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};
    if (group) {
      const ids = await Repository.deeplyFind(Db.Group, group);
      condition.groups = {
        $in: ids
      };
    }

    if (role) {
      condition.roles = {
        $in: [role]
      };
    }

    const query = Db.Account.find(condition).sort(sort);
    const collection = Db.Account.find(condition);
    const result = Repository.query<Account & Document, AccountResponse>(query, collection, page, size, fields);
    return result;
  }

  async get(id: string): Promise<AccountResponse> {
    const result = await Repository.get(Db.Account, id);
    return this.pure(result);
  }


  private pure(entry: Account & Document): AccountResponse {
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
      'profile',
      'isDisable',
      'isAdmin',
      'isApproved',
      'expired',
    ])
  }

}
