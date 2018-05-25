import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';

import { Request, Response, NextFunction } from 'express';
import { pick } from 'lodash';
import { Document } from 'mongoose';
import { RoleResponse, CreateRoleDto, EditRoleDto, RoleResponseFields as fields } from './dto/role.dto';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';
import { Role } from './interfaces/role.interface';
import { appearance } from './appearance/role.appearance';

export class RoleService {

  async getAppearance(): Promise<Appearance> {
    return appearance;
  }

  async search(keyword?: string, value?: string, category?: string, limit = 15): Promise<Array<KeyValue>> {
    return Repository.search(Db.Role, keyword, value, category, limit, 'name');
  }

  async create(entry: CreateRoleDto): Promise<RoleResponse> {
    const doc = new Db.Role(entry);
    const result = await doc.save();
    return this.pure(result);
  }

  async update(entry: EditRoleDto): Promise<RoleResponse> {
    const result = await Db.Role.findOneAndUpdate(
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
  ): Promise<PaginateResponse<Array<RoleResponse>>> {
    page = page > 0 ? page : 0 || 1;
    const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
    const query = Db.Role.find(condition).sort(sort);
    const collection = Db.Role.find(condition);
    const result = Repository.query<Role & Document, RoleResponse>(query, collection, page, size, fields);
    return result;
  }

  async get(id: string): Promise<RoleResponse> {
    const result: any = await Repository.get(Db.Role, id);
    const picked = this.pure(result);
    return picked;
  }

  async remove(id: string): Promise<boolean> {
    return Repository.remove(Db.Role, id);
  }

  private pure(entry: Role & Document): RoleResponse {
    return pick(entry, [
      'id',
      'name',
      'description',
      'permissions'
    ])
  }

}
