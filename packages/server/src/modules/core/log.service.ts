import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import { LogResponseFields as fields, LogResponse, CreateLogDto } from './dto/log.dto';
import { appearance } from './appearance/log.appearance';
import { Log } from './interfaces/log.interface';
import { Document } from 'mongoose';
import { Repository } from '../../database/repository';
import { pick } from 'lodash';
import { KeyValue } from '../../types/data.types';

export class LogService {
  constructor() { }

  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, category?: string, limit = 15): Promise<KeyValue[]> {
    return Repository.search(Db.Log, keyword, value, category, limit);
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<LogResponse[]>> {
    page = page > 0 ? page : 0 || 1;
    const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const query = Db.Log.find(condition).sort(sort);
    const collection = Db.Log.find(condition);
    const result = Repository.query<Log & Document, LogResponse>(query, collection, page, size, fields);
    return result;
  }

  async get(id: string): Promise<LogResponse> {
    const result: any = await Repository.get(Db.Dict, id);
    const picked = this.pure(result);
    return picked;
  }

  static async save(entry: CreateLogDto) {
    return (await Db.Log.create(entry)) as LogResponse;
  }

  private pure(entry: Log & Document): LogResponse {
    return pick(entry, [
      'id',
      'name',
      'operator',
      'operatorIp',
      'operation',
      'comment',
      'createdAt'
    ])
  }


}
