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
import { Helper } from '../../util/helper';
import { ProfileResponse } from './dto/login.dto';
import { appearance } from './appearance/account.appearance';

export class AccountService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs = await Db.Account.find(query)
      .limit(25)
      .exec();

    const result = docs.map(doc => {
      return {
        username: doc.username,
        nick: doc.nick,
        avatar: doc.avatar,
        type: doc.type,
        email: doc.email,
        mobile: doc.mobile,
        roles: doc.roles,
        isDisable: doc.isDisable,
        isAdmin: doc.isAdmin,
        isApproved: doc.isApproved,
        expired: doc.expired,
      };
    });
    return result;
  }

  async create(entry: CreateAccountDto): Promise<AccountResponse> {
    const doc = new Db.Account(entry);
    const result = await doc.save();
    const picked = (({ username,
      nick,
      avatar,
      type,
      email,
      mobile,
      roles,
      isDisable,
      isAdmin,
      isApproved,
      expired }) => ({
        username,
        nick,
        avatar,
        type,
        email,
        mobile,
        roles,
        isDisable,
        isAdmin,
        isApproved,
        expired
      }))(result);
    return picked;
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
    return Helper.remove(Db.Account, id);
  }

  async profile(context: ServiceContext): Promise<ProfileResponse> {
    const { user } = context.request;
    return {
      id: user.id,
      name: user.name,
    };
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<AccountResponse[]>> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs: any = await Db.Account.find(query).sort(sort).skip(page * size).limit(size).exec();
    const count = await Db.Account.find(query).count();
    return {
      docs: docs,
      total: count
    }
  }

  async get(id: string): Promise<AccountResponse> {
    const result = Helper.get(Db.Account, id, [
      {
        path: 'roles',
        select: 'name',
      },
    ]);
    return result;
  }
}
