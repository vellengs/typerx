import { Appearance } from '../../types/appearance';
import { CoreDatabase as Db } from './core.database';
import { appearance } from './appearance/api.appearance';
import { Document } from 'mongoose';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';
import { Api } from './interfaces/api.interface';
import { PaginateApi, ApiResponse, ApiResponseFields } from './dto/api.dto';

export class ApiService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }


  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
    return Repository.search(Db.Menu, keyword, value, '', limit);
  }

  async query(
    keyword?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateApi> {
    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const query = Db.Api.find(condition).sort(sort);
    const collection = Db.Api.find(condition);

    return Repository.query<Api & Document, ApiResponse>(query, collection, page, size, ApiResponseFields);
  }

}
