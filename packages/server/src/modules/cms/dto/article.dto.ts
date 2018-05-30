export class ArticlePageDto {

}

export class EditArticleDto {
    id: string;
}

export class ArticleResponse {

}

export declare interface PaginateArticle {
    error?: Error;
    list: Array<ArticleResponse>;
    total: number;
}