import { Appearance } from '../../types/appearance';
import { CoreDatabase as Db } from './core.database';
import { appearance } from './appearance/api.appearance';
import { Document } from 'mongoose';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';
import { Api } from './interfaces/api.interface';
import { PaginateApi, ApiResponse, ApiResponseFields } from './dto/api.dto';
import { ObjectId } from 'bson';

export class ApiService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
    return Repository.search(Db.Menu, keyword, value, '', limit);
  }

  async addApiPermission(permission: string, apIds: string[] | string) {

    if (!Array.isArray(apIds) && ObjectId.isValid(apIds)) {
      apIds = [apIds];
    }

    if (permission && Array.isArray(apIds)) {
      const existIds = (await Db.Api.find({
        _id: {
          $in: apIds
        },
        permissions: {
          $in: [permission]
        }
      }, { _id: 1 }).exec());

      const exists = (existIds || []).map(item => item.toObject()._id);
      const ids = apIds.filter((id) => {
        return exists.indexOf(id) === -1;
      });

      await Db.Api.update({
        _id: {
          $in: ids
        }
      }, { $push: { permissions: permission } }, { multi: true }).exec();
    }

    return true;
  }

  async query(
    keyword?: string,
    permission?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateApi> {
    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

    if (permission) {
      condition.permissions = {
        $in: permission
      }
    }

    const query = Db.Api.find(condition).sort(sort);
    const collection = Db.Api.find(condition);

    return Repository.query<Api & Document, ApiResponse>(query, collection, page, size, ApiResponseFields);
  }

}
