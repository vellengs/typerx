import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';

import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';
import { Dict } from './interfaces/dict.interface';
import { Helper } from '../../util/helper';
import { Document } from 'mongoose';
import { KeyValue } from './dto/pairs';
import { DictResponse, CreateDictDto, EditDictDto } from './dto/dict.dto';
import { appearance } from './appearance/dict.appearance';

export class DictService {

  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit = 10): Promise<KeyValue[]> {
    return Helper.search(Db.Dict, keyword, value, limit);
  }

  async create(entry: CreateDictDto): Promise<DictResponse> {
    const doc = new Db.Dict(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async update(entry: EditDictDto): Promise<DictResponse> {
    const result = await Db.Dict.findOneAndUpdate(
      { _id: entry.id },
      { $set: entry },
      { upsert: true, 'new': true }).exec();
    return this.pure(result);
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<DictResponse[]>> {
    page = page > 0 ? page : 0 || 1;
    const query = keyword ? { name: new RegExp(keyword, 'i') } : {};

    const docs: any = await Db.Dict.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Dict.find(query).count();
    const list = docs.map((item: Dict & Document) => {
      const instance: DictResponse = this.pure(item);
    });

    return {
      list: list,
      total: count
    }
  }

  async get(id: string): Promise<DictResponse> {
    const result: any = Helper.get(Db.Dict, id);
    const picked = this.pure(result);
    return picked;
  }

  async remove(id: string): Promise<boolean> {
    return Helper.remove(Db.Dict, id);
  }

  private pure(entry: Dict & Document): DictResponse {
    return pick(entry, [
      'id',
      'category',
      'key',
      'name',
      'expand',
    ])
  }

}
