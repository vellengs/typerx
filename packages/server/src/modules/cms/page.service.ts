import { Appearance } from "../../types/appearance";
import { appearance } from "./appearance/page.appearance";
import { Repository } from "../../database/repository";
import { CmsDatabase as Db } from './cms.database';
import { KeyValue } from "../../types/data.types";
import { CreatePageDto, PageResponse, EditPageDto, PaginatePage } from "./dto/page.dto";
import { Page } from "./interfaces/page.interface";
import { Document } from "mongoose";
import { pick } from "lodash";

export class PageService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Page, keyword, value, '', limit);
    }

    async create(entry: CreatePageDto): Promise<PageResponse> {
        const doc = new Db.Page(entry);
        const result: any = await doc.save();
        return result;
    }

    async update(
        entry: EditPageDto,
    ): Promise<PageResponse> {
        const doc: any = await Db.Page.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();
        return doc;
    }

    async query(
        keyword?: string,
        isMenu?: boolean,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginatePage> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (isMenu)
            query.isMenu = true;

        const docs: any = await Db.Page.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
        const count = await Db.Page.find(query).count();

        const list = docs.map((item: Page & Document) => {
            return this.pure(item);
        });

        return {
            list: list,
            total: count
        }
    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Page, id);
    }

    async get(id: string): Promise<PageResponse> {
        const result = await Repository.get(Db.Page, id, [
            {
                path: 'roles',
                select: 'name',
            },
        ]);
        return this.pure(result);
    }

    private pure(entry: Page & Document): PageResponse {
        return pick(entry, [
            'id',
            'name',
            'title',
            'description',
            'sort',
            'disable',
            'meta',
            'content',
            'template'
        ])
    }
}