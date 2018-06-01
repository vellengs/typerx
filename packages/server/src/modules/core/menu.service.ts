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

export class MenuService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
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
    const collection = Db.Menu.find(condition);
    return Repository.query<Menu & Document, MenuResponse>(query, collection, page, size, fields);
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Menu, id);
  }

  async get(id: string): Promise<MenuResponse> {
    const result = await Repository.get(Db.Menu, id, [
      {
        path: 'roles',
        select: 'name',
      },
    ]);
    return this.pure(result);
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
