import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Category } from './interfaces/Category.interface';
import { CmsDatabase as Db } from './cms.database';
import {
    CategoryResponseFields as fields,
    CategoryResponse,
    EditCategoryDto,
    CreateCategoryDto,
    PaginateCategory,
} from './dto/category.dto';
import { appearance } from './appearance/category.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue, TreeNode } from '../../types/data.types';

export class CategoryService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async searchTree(keyword?: string, value?: string, limit: number = 10): Promise<Array<TreeNode>> {
        return Repository.searchTree(Db.Category, keyword, value, '', limit);
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Category, keyword, value, '', limit);
    }

    async create(entry: CreateCategoryDto): Promise<CategoryResponse> {
        const doc = new Db.Category(entry);
        const result: any = await doc.save();
        return result;
    }

    async update(
        entry: EditCategoryDto,
    ): Promise<CategoryResponse> {


        if (entry.id === entry.parent) {
            throw new Errors.BadRequestError('can not be set parent by self.');
        }

        const doc: any = await Db.Category.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();
        return doc;
    }

    async query(
        keyword?: string,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateCategory> {
        const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        const query = Db.Category.find(condition).sort(sort);
        const collection = Db.Category.find(condition);
        const result = await Repository.query<Category & Document,
            CategoryResponse>(query, collection, page, size, fields);

        return result;
    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Category, id);
    }

    async get(id: string): Promise<CategoryResponse> {
        const result = await Repository.get(Db.Category, id, [
            {
                path: 'roles',
                select: 'name',
            },
        ]);
        return this.pure(result);
    }

    private pure(entry: Category & Document): CategoryResponse {
        return pick(entry, [
            'id',
            'name',
            'slug',
            'order',
            'parent',
            'paths',
            'description'
        ])
    }
}
