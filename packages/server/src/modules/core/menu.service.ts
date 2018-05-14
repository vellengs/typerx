import { Appearance } from '../../types/appearance';
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

export class MenuService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async getMenusByKeyword(keyword?: string): Promise<MenuResponse[]> {
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const docs: any = await Db.Menu.find(query)
      .limit(25)
      .exec();
    return docs;
  }

  async create(entry: CreateMenuDto): Promise<MenuResponse> {
    const doc = new Db.Menu(entry);
    const result = await doc.save();
    return null;
  }

  valuable(value: any) {
    return value;
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
