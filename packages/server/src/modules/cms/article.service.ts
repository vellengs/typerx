import { Appearance } from "../../types/appearance";
import { appearance } from "./appearance/article.appearance";
import { Repository } from "../../database/repository";
import { CmsDatabase as Db } from './cms.database';
import { KeyValue } from "../../types/data.types";
import {
    CreateArticleDto, ArticleResponse, EditArticleDto, PaginateArticle,
    ArticleResponseFields as fields
} from "./dto/article.dto";
import { Article } from "./interfaces/article.interface";
import { Document } from "mongoose";
import { pick } from "lodash";

export class ArticleService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Article, keyword, value, '', limit);
    }

    async create(entry: CreateArticleDto): Promise<ArticleResponse> {
        const doc = new Db.Article(entry);
        const result: any = await doc.save();
        return result;
    }

    async update(
        entry: EditArticleDto,
    ): Promise<ArticleResponse> {
        const doc: any = await Db.Article.findOneAndUpdate(
            {
                _id: entry.id,
            },
            entry,
        ).exec();
        return doc;
    }

    async query(
        keyword?: string,
        category?: string,
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateArticle> {
        const condition: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        const query = Db.Article.find(condition).populate([
            { path: 'category', select: 'name' }
        ]).sort(sort);
        const collection = Db.Article.find(condition);
        const result = await Repository.query<Article & Document,
            ArticleResponse>(query, collection, page, size, fields);

        return result;

    }

    async remove(id: string): Promise<boolean> {
        return Repository.remove(Db.Article, id);
    }

    async get(id: string): Promise<ArticleResponse> {
        const result = await Repository.get(Db.Article, id, [
            {
                path: 'roles',
                select: 'name',
            },
        ]);
        return this.pure(result);
    }

    private pure(entry: Article & Document): ArticleResponse {
        return pick(entry, [
            'id',
            'name',
            'title',
            'category',
            'description',
            'author',
            'sort',
            'disable',
            'meta',
            'content',
            'template',
        ])
    }
}