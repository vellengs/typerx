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
import { Helper } from "../../util/helper";

export class ArticleService {
    async getAppearance(): Promise<Appearance> {
        return appearance;
    }

    async search(keyword?: string, value?: string, limit: number = 10): Promise<Array<KeyValue>> {
        return Repository.search(Db.Article, keyword, value, '', limit);
    }

    setKeyWord(entry: CreateArticleDto | EditArticleDto) {
        let keyword: Array<string> = Helper.genPinyinKeywords(entry.title);
        keyword.push(entry.name);
        keyword.push(entry.title);
        entry.keyword = keyword.join('');
    }

    async create(entry: CreateArticleDto): Promise<ArticleResponse> {
        const content = entry.content;
        entry.content = null;
        this.setKeyWord(entry);
        const doc = new Db.Article(entry);
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
        entry: EditArticleDto,
    ): Promise<ArticleResponse> {
        const content = entry.content;
        entry.content = entry.id;
        this.setKeyWord(entry);
        const doc = await Db.Article.findOneAndUpdate(
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
        page?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateArticle> {
        const condition: any = keyword ? { keyword: new RegExp(keyword, 'i') } : {};

        if (category) {
            condition.category = category;
        }

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
        let result: Article & Document = await Repository.get(Db.Article, id, [
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
            return this.pure(instance);
        } else {
            return new ArticleResponse();
        }
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