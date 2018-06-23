import { Appearance } from '../../types/appearance';
import { Errors } from 'typescript-rest';
import { CoreDatabase as Db } from './core.database';

import { pick } from 'lodash';
import { Setting } from './interfaces/setting.interface';
import {
  SettingResponse, CreateSettingDto, EditSettingDto, PaginateSetting,
  SettingsGroup,
  SettingResponseFields as fields
} from './dto/setting.dto';
import { Document } from 'mongoose';
import { KeyValue } from '../../types/data.types';
import { Repository } from '../../database/repository';
import { appearance } from './appearance/setting.appearance';
import { Application } from '../../application';

export class SettingService {

  async getAppearance(): Promise<Appearance> {
    const config = Application.getAppearance('settings') || appearance;
    return config;
  }

  async getSettingsByName(name?: string): Promise<SettingsGroup> {
    const result = new SettingsGroup();

    if (name) {
      const docs = await Db.Setting.find({
        name: name
      }).exec();
      if (docs) {
        docs.forEach((doc) => {
          result[doc.key] = doc.value;
        });
      }
    }

    return result;
  }

  async getSettingsByKey(name: string): Promise<SettingResponse> {
    const setting = await Db.Setting.findOne({
      key: name
    }).exec();
    return this.pure(setting);
  }

  async search(keyword?: string, value?: string, limit = 15): Promise<Array<KeyValue>> {
    return Repository.search(Db.Setting, keyword, value, '', limit);
  }

  async create(entry: CreateSettingDto): Promise<SettingResponse> {
    const doc = new Db.Setting(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async updateSettingsByName(name: string, entry: SettingsGroup): Promise<SettingsGroup> {

    const keys = Object.keys(entry);
    for (let key of keys) {
      const instance = {
        key: key,
        value: entry[key]
      };
      await Db.Setting.findOneAndUpdate(
        { key: key, name: name },
        { $set: instance },
        { upsert: true, 'new': true }).exec();
    }
    return this.getSettingsByName(name);
  }

  async update(entry: EditSettingDto): Promise<SettingResponse> {
    if (entry.id) {
      const result = await Db.Setting.findOneAndUpdate(
        { _id: entry.id },
        { $set: entry },
        { upsert: true, 'new': true }).exec();
      return this.pure(result);
    } else {
      throw new Errors.BadRequestError('settings not found');
    }
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateSetting> {
    const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const query = Db.Setting.find(condition).sort(sort);
    const collection = Db.Setting.find(condition);
    const result = Repository.query<Setting & Document, SettingResponse>(query, collection, page, size, fields);
    return result;
  }

  async get(id: string): Promise<SettingResponse> {
    const result: any = await Repository.get(Db.Setting, id);
    const picked = this.pure(result);
    return picked;
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Setting, id);
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
