

import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Group } from './interfaces/Group.interface';
import { CoreDatabase as Db } from './core.database';
import {
  GroupResponse,
  EditGroupDto,
  CreateGroupDto,
} from './dto/group.dto';
import { appearance } from './appearance/group.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class GroupService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
    return Repository.search(Db.Group, keyword, value, '', limit);
  }

  async create(entry: CreateGroupDto): Promise<GroupResponse> {
    const doc = new Db.Group(entry);
    const result: any = await doc.save();
    return result;
  }

  async update(
    entry: EditGroupDto,
  ): Promise<GroupResponse> {
    const doc: any = await Db.Group.findOneAndUpdate(
      {
        _id: entry.id,
      },
      entry,
    ).exec();
    return doc;
  }

  async query(
    keyword?: string,
    isGroup?: boolean,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateResponse<Array<GroupResponse>>> {
    const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

    if (isGroup)
      query.isGroup = true;


    const docs: any = await Db.Group.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
    const count = await Db.Group.find(query).count();

    const list = docs.map((item: Group & Document) => {
      return this.pure(item);
    });

    return {
      list: list,
      total: count
    }
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Group, id);
  }

  async get(id: string): Promise<GroupResponse> {
    const result = await Repository.get(Db.Group, id, [
      {
        path: 'roles',
        select: 'name',
      },
    ]);
    return this.pure(result);
  }

  private pure(entry: Group & Document): GroupResponse {
    return pick(entry, [
      'outid',
      'id',
      'name',
      'icon',
      'parent',
      'paths',
      'director',
      'order',
      'isRegion',
      'description'
    ])
  }
}
