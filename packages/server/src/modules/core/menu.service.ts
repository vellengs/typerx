import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Menu } from './interfaces/Menu.interface';
import { CoreDatabase as Db } from './core.database';
import {
  MenuResponse,
  EditMenuDto,
  CreateMenuDto,
  PaginateMenu,
  MenuResponseFields as fields,
} from './dto/menu.dto';
import { appearance } from './appearance/menu.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';
import { AccessService } from './access.service';
import { SessionUser } from './dto/account.dto';
import { Account } from './interfaces/account.interface';

export class MenuService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async getAllPermissionTags() {
    const result = await Db.Menu.find({ isMenu: false }).select({
      name: 1,
      slug: 1,
      link: 1
    }).exec() || [];
    return result.map((r) => {
      return { id: r._id, name: r.name, desc: r.link };
    });
  }

  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
    return Repository.search(Db.Menu, keyword, value, '', limit);
  }

  async create(entry: CreateMenuDto): Promise<MenuResponse> {
    const doc = new Db.Menu(entry);
    const result: any = await doc.save();
    return result;
  }

  async update(
    entry: EditMenuDto,
  ): Promise<MenuResponse> {
    const doc: any = await Db.Menu.findOneAndUpdate(
      {
        _id: entry.id,
      },
      entry,
    ).exec();
    return doc;
  }

  async query(
    keyword?: string,
    isMenu?: boolean,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateMenu> {
    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

    if (isMenu)
      condition.isMenu = true;

    const query = Db.Menu.find(condition).sort(sort);

    query.populate([{
      path: 'permissions',
      select: 'name',
    }]);

    const collection = Db.Menu.find(condition);

    return Repository.query<Menu & Document, MenuResponse>(query, collection, page, size, fields);
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Menu, id);
  }

  async get(id: string): Promise<MenuResponse> {
    const doc: Menu & Document = await Repository.get(Db.Menu, id, [
      {
        path: 'permissions',
        select: 'name',
      }
    ]);
    return this.pure(doc);
  }

  async getAuthenticatedMenus(user: SessionUser): Promise<Array<MenuResponse>> {
    if (!user.isAdmin) {
      const account = await Db.Account.findOne({ _id: user.id }, 'groups').exec();
      const roles = (account.toObject() as Account).roles || [];
      const roleDocs = await Db.Group.find({
        _id: { $in: roles }
      }, 'permissions').exec() || [];

      const permissions: string[] = [];
      roleDocs.forEach((g: any) => {
        permissions.push(...g.permissions);
      });
      const menus = await Db.Menu.find({
        _id: {
          $in: permissions
        },
        isMenu: true
      });
      return menus as any;
    } else {
      const menus = await Db.Menu.find({
        isMenu: true
      });
      return menus as any;
    }
  }

  private pure(entry: Menu & Document): MenuResponse {
    return pick(entry, [
      'id',
      'name',
      'slug',
      'group',
      'link',
      'externalLink',
      'blank',
      'icon',
      'order',
      'enable',
      'expanded',
      'acl',
      'permissions',
      'parent',
      'isMenu'
    ])
  }
}
