import { Appearance } from "../../types/appearance";
import { appearance } from "./appearance/page.appearance";
import { Repository } from "../../database/repository";
import { CmsDatabase as Db } from './cms.database';
import { KeyValue } from "../../types/data.types";
import { CreatePageDto, PageResponse, EditPageDto, PaginatePage, PageResponseFields } from "./dto/page.dto";
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

        const content = entry.content;
        entry.content = null;
        const doc = new Db.Page(entry);
        const result = await doc.save();

        await Db.Content.findOneAndUpdate(
            { _id: result.id },
            {
                $set: {
                    _id: result.id,
                    text: content
                }
            },
            { upsert: true, 'new': true }).exec();

        return result;

    }

    async update(
        entry: EditPageDto,
    ): Promise<PageResponse> {

        const content = entry.content;
        entry.content = entry.id;
        const doc = await Db.Page.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();

        await Db.Content.findOneAndUpdate({ _id: entry.id }, {
            text: content
        }, { upsert: true, 'new': true }).exec();
        return doc;
    }

    async query(
        keyword?: string,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginatePage> {

        const condition: any = keyword ? { keyword: new RegExp(keyword, 'i') } : {};
        const query = Db.Page.find(condition).sort(sort);

        const collection = Db.Page.find(condition);
        const result = await Repository.query<Page & Document,
            PageResponse>(query, collection, page, size, PageResponseFields);

        return result;
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
            'publish',
            'description',
            'sort',
            'disable',
            'meta',
            'content',
            'template'
        ])
    }
}