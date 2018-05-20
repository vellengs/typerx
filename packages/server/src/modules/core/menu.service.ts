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

export class MenuService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string): Promise<KeyValue[]> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs: any = await Db.Menu.find(query).select({
      name: 1,
    })
      .limit(25)
      .exec() || [];
    return docs.map((item: any) => {
      return {
        label: item.name,
        value: item._id
      }
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
    const docs: any = await Db.Menu.find(query).sort(sort).skip(page * size).limit(size).exec();
    const count = await Db.Menu.find(query).count();
    return {
      list: docs,
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
