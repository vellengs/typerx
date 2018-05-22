import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';

import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';
import { Setting } from './interfaces/setting.interface';
import { SettingResponse, CreateSettingDto, EditSettingDto } from './dto/setting.dto';
import { Helper } from '../../util/helper';
import { Document } from 'mongoose';
import { KeyValue } from './dto/pairs';

export class SettingService {

  async getMainSettings(keys?: string): Promise<SettingResponse[]> {

    if (!keys) {
      return [];
    }

    const names = keys.split(',');
    const docs = await Db.Setting.find({
      key: {
        $in: names
      }
    }).exec();

    if (docs) {
      return docs.map((res) => {
        return this.pure(res);
      });
    } else {
      return [];
    }
  }

  async getSettingsByKey(name: string): Promise<SettingResponse> {

    const setting: any = await Db.Setting.findOne({
      name: name
    }).exec();

    return setting;
  }

  async search(keyword?: string, value?: string, limit = 10): Promise<KeyValue[]> {
    return Helper.search(Db.Setting, keyword, value, limit);
  }

  async create(entry: CreateSettingDto): Promise<SettingResponse> {
    const doc = new Db.Setting(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async update(entry: EditSettingDto): Promise<SettingResponse> {
    if (entry.id) {
      const result = await Db.Setting.findOneAndUpdate(
        { _id: entry.id },
        { $set: entry },
        { upsert: true, 'new': true }).exec();
      return this.pure(result);
    } else {
      const result = await Db.Setting.findOneAndUpdate(
        { key: entry.key },
        { $set: entry },
        { upsert: true, 'new': true }).exec();
      return this.pure(result);
    }
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<SettingResponse[]>> {
    page = page > 0 ? page : 0 || 1;
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};

    const docs: any = await Db.Setting.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Setting.find(query).count();
    const list = docs.map((item: Setting & Document) => {
      const instance: SettingResponse = this.pure(item);
    });

    return {
      list: list,
      total: count
    }
  }

  async get(id: string): Promise<SettingResponse> {
    const result: any = Helper.get(Db.Setting, id);
    const picked = this.pure(result);
    return picked;
  }

  async remove(id: string): Promise<boolean> {
    return Helper.remove(Db.Setting, id);
  }

  private pure(entry: Setting & Document): SettingResponse {
    return pick(entry, [
      'id',
      'name',
      'key',
      'value',
      'description',
    ])
  }

}
