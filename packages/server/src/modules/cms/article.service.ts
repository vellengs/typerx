import { Appearance } from "../../types/appearance";
import { appearance } from "./appearance/article.appearance";
import { Repository } from "../../database/repository";
import { CmsDatabase as Db } from './cms.database';
import { KeyValue } from "../../types/data.types";
import { CreateArticleDto, ArticleResponse, EditArticleDto, PaginateArticle } from "./dto/article.dto";
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
        isMenu?: boolean,
        article?: number,
        size?: number,
        sort?: string
    ): Promise<PaginateArticle> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (isMenu)
            query.isMenu = true;

        const docs: any = await Db.Article.find(query).sort(sort).skip(article * size).limit(size).exec() || [];
        const count = await Db.Article.find(query).count();

        const list = docs.map((item: Article & Document) => {
            return this.pure(item);
        });

        return {
            list: list,
            total: count
        }
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
            'isMenu'
        ])
    }
}