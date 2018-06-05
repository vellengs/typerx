
export class CreateArticleDto {
    name: string;
    title: string;
    keyword: string;
    category:string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export class EditArticleDto {
    id: string;
    name: string;
    title: string;
    keyword: string;
    category:string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export class ArticleResponse {
    id: string;
    name: string;
    title: string;
    category:string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export declare interface PaginateArticle {
    error?: Error;
    list: Array<ArticleResponse>;
    total: number;
}

export const ArticleResponseFields = [
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
];
