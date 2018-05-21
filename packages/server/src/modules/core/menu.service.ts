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
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const fields = {
      name: 1,
    };
    
    const docs = await Db.Menu.find(query).select(fields)
      .limit(limit)
      .exec() || [];

    if (Types.ObjectId.isValid(value)) {
      const selected = await Db.Menu.findById(value).select(fields);
      const found = docs.findIndex(doc => doc._id == value);
      if (found === -1) {
        docs.push(selected);
      }
    } 

    return docs.map((item) => {
      const result: KeyValue = {
        label: item.name,
        value: item._id
      };
      return result;
    });
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
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<MenuResponse[]>> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs: any = await Db.Menu.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Menu.find(query).count();
    const list = docs.map((item: Menu) => {
      const instance: MenuResponse = pick(item, [
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
        'isMenu',
      ]);
      return instance;
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
    const result = Helper.get(Db.Menu, id, [
      {
        path: 'roles',
        select: 'name',
      },
    ]);
    return result;
  }
}
