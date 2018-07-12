

import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Group } from './interfaces/Group.interface';
import { CoreDatabase as Db } from './core.database';
import {
  GroupResponse,
  EditGroupDto,
  CreateGroupDto,
  PaginateGroup,
  GroupResponseFields as fields,
} from './dto/group.dto';
import { appearance } from './appearance/group.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue, TreeNode } from '../../types/data.types';

export class GroupService {
  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async searchTree(keyword?: string, value?: string, limit: number = 10): Promise<Array<TreeNode>> {
    return Repository.searchTree(Db.Group, keyword, value, '', limit);
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

    if (entry.id === entry.parent) {
      throw new Errors.BadRequestError('can not be set parent by self.');
    }

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
    isRegion?: boolean,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginateGroup> {
    const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

    if (isRegion)
      condition.isRegion = true;

    const query = Db.Group.find(condition).sort(sort);
    const collection = Db.Group.find(condition);
    return Repository.query<Group & Document, GroupResponse>(query, collection, page, size, fields);
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
