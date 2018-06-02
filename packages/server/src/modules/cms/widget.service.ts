import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Widget } from './interfaces/Widget.interface';
import { CmsDatabase as Db } from './cms.database';
import {
    WidgetResponse,
    EditWidgetDto,
    CreateWidgetDto,
    PaginateWidget,
} from './dto/widget.dto';
import { appearance } from './appearance/widget.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class WidgetService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Widget, keyword, value, '', limit);
    }

    async create(entry: CreateWidgetDto): Promise<WidgetResponse> {
        const doc = new Db.Widget(entry);
        const result: any = await doc.save();
        return result;
    }

    async update(
        entry: EditWidgetDto,
    ): Promise<WidgetResponse> {
        const doc: any = await Db.Widget.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();
        return doc;
    }

    async query(
        keyword?: string,
        isWidget?: boolean,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateWidget> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (isWidget)
            query.isWidget = true;

        const docs: any = await Db.Widget.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
        const count = await Db.Widget.find(query).count();

        const list = docs.map((item: Widget & Document) => {
            return this.pure(item);
        });

        return {
            list: list,
            total: count
        }
    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Widget, id);
    }

    async get(id: string): Promise<WidgetResponse> {
        const result = await Repository.get(Db.Widget, id, [
            {
                path: 'roles',
                select: 'name',
            },
        ]);
        return this.pure(result);
    }

    private pure(entry: Widget & Document): WidgetResponse {
        return pick(entry, [
            'id',
            'name',
            'title',
            'params',
            'type',
        ])
    }
}
