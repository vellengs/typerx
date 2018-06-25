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
import { Helper } from '../../util/helper';
import { ObjectId } from 'bson';

export class AccountService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
    return Repository.search(Db.Account, keyword, value, '', limit, 'nick');
  }

  setKeyWord(entry: CreateAccountDto | EditAccountDto) {
    let keyword: Array<string> = Helper.genPinyinKeywords(entry.nick, true);
    keyword.push(entry.email);
    keyword.push(entry.mobile);
    keyword.push(entry.nick);
    entry.keyword = keyword.join('');
  }

  async create(entry: CreateAccountDto): Promise<AccountResponse> {
    const doc = new Db.Account(entry);
    this.setKeyWord(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async update(
    entry: EditAccountDto,
    admin?: SessionUser,
  ): Promise<AccountResponse> {
    if (admin && admin.isAdmin) {
      this.setKeyWord(entry);
      const doc = await Db.Account.findOneAndUpdate(
        {
          _id: entry.id,
        },
        entry,
        {
          new: true
        }
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
    return user;
  }

  async query(
    keyword?: string,
    group?: string,
    role?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateAccount> {

    const condition: any = keyword ? { keyword: new RegExp(keyword, 'i') } : {};
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


  async removeAccountFromRole(role: string, accountId: string) {

    if (role && accountId) {
      await Db.Account.update({
        _id: {
          $in: accountId
        }
      }, { $pullAll: { roles: [role] } }, { multi: true }).exec();
    }

    return true;
  }

  async addAccountsToRole(role: string, accountIds: string[] | string) {

    if (!Array.isArray(accountIds) && ObjectId.isValid(accountIds)) {
      accountIds = [accountIds];
    }

    if (role && Array.isArray(accountIds)) {
      const existIds = (await Db.Account.find({
        _id: {
          $in: accountIds
        },
        roles: {
          $in: [role]
        }
      }, { _id: 1 }).exec());

      const exists = (existIds || []).map((item: Document) => item._id.toString());
      const ids = accountIds.filter((id) => {
        return exists.indexOf(id) === -1;
      });

      const effects = await Db.Account.update({
        _id: {
          $in: ids
        }
      }, { $push: { roles: role } }, { multi: true }).exec();
    }

    return true;
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
      'isDisable',
      'isAdmin',
      'isApproved',
      'profile',
      'expired',
    ])
  }

}
