export declare class CreateArticleDto {
    name: string;
    title: string;
    keyword: string;
    picture: string;
    category: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}
export declare class EditArticleDto {
    id: string;
    name: string;
    picture: string;
    title: string;
    keyword: string;
    category: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}
export declare class ArticleResponse {
    id: string;
    name: string;
    title: string;
    picture: string;
    category: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}
export interface PaginateArticle {
    error?: Error;
    list: Array<ArticleResponse>;
    total: number;
}
export declare const ArticleResponseFields: string[];
