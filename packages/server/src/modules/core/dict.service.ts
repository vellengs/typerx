import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';

import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';
import { Dict } from './interfaces/dict.interface';
import { Document } from 'mongoose';
import { DictResponse, CreateDictDto, EditDictDto, DictResponseFields as fields, PaginateDict } from './dto/dict.dto';
import { appearance } from './appearance/dict.appearance';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class DictService {

  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, category?: string, limit = 15): Promise<Array<KeyValue>> {
    return Repository.search(Db.Dict, keyword, value, category, limit, 'translate', 'name');
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
    category?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateDict> {
    page = page > 0 ? page : 0 || 1;
    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};
    if (category) {
      condition.category = category;
    }
    const query = Db.Dict.find(condition).sort(sort);
    const collection = Db.Dict.find(condition);
    const result = Repository.query<Dict & Document, DictResponse>(query, collection, page, size, fields);
    return result;
  }

  async get(id: string): Promise<DictResponse> {
    const result: any = await Repository.get(Db.Dict, id);
    const picked = this.pure(result);
    return picked;
  }

  async remove(id: string): Promise<boolean> {

    return Repository.remove(Db.Dict, id);
  }

  private pure(entry: Dict & Document): DictResponse {
    return pick(entry, [
      'id',
      'category',
      'name',
      'translate',
      'expand',
    ])
  }

}
