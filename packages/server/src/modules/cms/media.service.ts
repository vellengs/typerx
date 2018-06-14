import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Media } from './interfaces/Media.interface';
import { CmsDatabase as Db } from './cms.database';
import {
    MediaResponse,
    EditMediaDto,
    CreateMediaDto,
    PaginateMedia,
} from './dto/media.dto';
import { appearance } from './appearance/media.appearance';
import { Document, Types } from 'mongoose';
import { pick, merge } from 'lodash';
import { Repository } from '../../database/repository';
import { KeyValue } from '../../types/data.types';

export class MediaService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Media, keyword, value, '', limit);
    }

    async create(entry: CreateMediaDto): Promise<MediaResponse> {
        const doc = new Db.Media(entry);
        const result: any = await doc.save();
        return result;
    }

    async update(
        entry: EditMediaDto,
    ): Promise<MediaResponse> {
        const doc: any = await Db.Media.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();
        return doc;
    }

    async query(
        keyword?: string,
        isMedia?: boolean,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateMedia> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (isMedia)
            query.isMedia = true;

        const docs: any = await Db.Media.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
        const count = await Db.Media.find(query).count();

        const list = docs.map((item: Media & Document) => {
            return this.pure(item);
        });

        return {
            list: list,
            total: count
        }
    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Media, id);
    }

    async get(id: string): Promise<MediaResponse> {
        const result = await Repository.get(Db.Media, id, [
            {
                path: 'roles',
                select: 'name',
            },
        ]);
        return this.pure(result);
    }

    private pure(entry: Media & Document): MediaResponse {
        return pick(entry, [
            'id',
            'name',
            'caption',
            'description',
            'ext',
            'url',
            'uri'
        ])
    }
}
