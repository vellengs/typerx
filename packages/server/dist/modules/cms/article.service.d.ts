import { Appearance } from "../../types/appearance";
import { KeyValue } from "../../types/data.types";
import { CreateArticleDto, ArticleResponse, EditArticleDto, PaginateArticle } from "./dto/article.dto";
export declare class ArticleService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    setKeyWord(entry: CreateArticleDto | EditArticleDto): void;
    create(entry: CreateArticleDto): Promise<ArticleResponse>;
    update(entry: EditArticleDto): Promise<ArticleResponse>;
    query(keyword?: string, category?: string, page?: number, size?: number, sort?: string): Promise<PaginateArticle>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<ArticleResponse>;
    private pure(entry);
}
