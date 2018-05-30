import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Category } from './interfaces/Category.interface';
import { CmsDatabase as Db } from './cms.database';
import {
    CategoryResponse,
    EditCategoryDto,
    CreateCategoryDto,
    PaginateCategory,
} from './dto/category.dto';
import { appearance } from './appearance/category.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class CategoryService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
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
        isCategory?: boolean,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateCategory> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (isCategory)
            query.isCategory = true;

        const docs: any = await Db.Category.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
        const count = await Db.Category.find(query).count();

        const list = docs.map((item: Category & Document) => {
            return this.pure(item);
        });

        return {
            list: list,
            total: count
        }
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
            'group',
            'link',
            'externalLink',
            'blank',
            'icon',
            'order',
            'enable',
            'expanded',
            'acl',
            'permissions',
            'parent',
            'isCategory'
        ])
    }
}
