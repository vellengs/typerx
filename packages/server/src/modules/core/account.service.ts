import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import { AccountResponse } from './dto/account.dto';
import { Helper } from '../../util/helper';

export class AccountService {
  async getAppearance(): Promise<Appearance> {
    return null;
  }

  async getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs = await Db.Account.find(query)
      .limit(25)
      .exec();

    const result = docs.map(doc => {
      return {
        id: doc._id,
        username: doc.username,
        nick: doc.nick,
      };
    });
    return result;
  }

  async create(entry: any): Promise<any> {
    const doc = new Db.Account(entry);
    return await doc.save();
  }

  async update(entry: any, admin?: Account): Promise<any> {
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
}
