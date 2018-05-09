import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';

export class AccountService {
  constructor(private readonly context: ServiceContext) {}

  async getAppearance(): Promise<Appearance> {
    return null;
  }

  async getAccountsByKeyword(keyword?: string): Promise<Account[]> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs = await Db.Account.find(query)
      .limit(25)
      .exec();
    console.log('docs:', docs);
    return docs;
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
}
