import { Appearance } from "../../types/appearance";
import { Repository } from "../../database/repository";
import { CmsDatabase as Db } from './cms.database';
import { KeyValue } from "../../types/data.types";
import {
    CreateCustomDto, CustomResponse, EditCustomDto, PaginateCustom
} from './dto/custom.dto';
import { Custom } from "./interfaces/custom.interface";
import { Document } from "mongoose";
import { Helper } from "../../util/helper";
import { ContainerService } from "../../container";

export class CustomService {

    async getAppearance(type: string): Promise<Appearance> {
        return ContainerService.getAppearance(type);
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Custom, keyword, value, '', limit);
    }

    setKeyWord(entry: CreateCustomDto | EditCustomDto) {
        let keyword: Array<string> = Helper.genPinyinKeywords(entry.title, false);
        keyword.push(entry.name);
        keyword.push(entry.title);
        entry.keyword = keyword.join('');
    }

    async create(entry: CreateCustomDto): Promise<CustomResponse> {
        const content = entry.content;
        entry.content = null;
        this.setKeyWord(entry);
        const doc = new Db.Custom(entry);
        const result = await doc.save();

        await Db.Custom.findOneAndUpdate(
            {
                _id: result._id,
            },
            {
                content: result._id
            },
        ).exec();

        await Db.Content.findOneAndUpdate(
            { _id: result._id },
            {
                $set: {
                    _id: result._id,
                    text: content
                }
            },
            { upsert: true, 'new': true }).exec();

        return result;
    }

    async update(
        entry: EditCustomDto,
    ): Promise<CustomResponse> {
        const content = entry.content;
        entry.content = entry.id;
        this.setKeyWord(entry);
        const doc = await Db.Custom.findOneAndUpdate(
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
        category?: string,
        type?: string,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateCustom> {
        const condition: any = keyword ? { keyword: new RegExp(keyword, 'i') } : {};

        if (category) {
            condition.category = category;
        }

        if (type) {
            condition.type = type;
        }

        const query = Db.Custom.find(condition).populate([
            { path: 'category', select: 'name' }
        ]).sort(sort);
        const collection = Db.Custom.find(condition);
        const result = await Repository.query<Custom & Document,
            CustomResponse>(query, collection, page, size, null);

        return result;

    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Custom, id);
    }

    async get(id: string): Promise<CustomResponse> {
        let result: Custom & Document = await Repository.get(Db.Custom, id, [
            {
                path: 'content',
                select: 'text',
            },
        ]);

        if (result) {
            const instance = result.toObject();
            instance.id = id;
            if (instance.content) {
                instance.content = instance.content.text;
            }
            return instance;
        } else {
            return new CustomResponse();
        }
    }
}