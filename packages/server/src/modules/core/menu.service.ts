import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Menu } from './interfaces/Menu.interface';
import { CoreDatabase as Db } from './core.database';
import {
  MenuResponse,
  EditMenuDto,
  CreateMenuDto,
} from './dto/menu.dto';
import { Helper } from '../../util/helper';
import { appearance } from './appearance/menu.appearance';
import { KeyValue } from './dto/pairs';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';

export class MenuService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit = 10): Promise<KeyValue[]> {
    return Helper.search(Db.Menu, keyword, value, limit);
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
  ): Promise<PaginateResponse<MenuResponse[]>> {
    const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

    if (isMenu)
      query.isMenu = true;

 
    const docs: any = await Db.Menu.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Menu.find(query).count();

    const list = docs.map((item: Menu & Document) => {
      return this.pure(item);
    });

    return {
      list: list,
      total: count
    }
  }

  async remove(id: string): Promise<boolean> {
    return Helper.remove(Db.Menu, id);
  }

  async get(id: string): Promise<MenuResponse> {
    const result = await Helper.get(Db.Menu, id, [
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
