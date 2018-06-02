export class CreatePageDto {
    name: string;
    title: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export class EditPageDto {
    id: string;
    name: string;
    title: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export class PageResponse {
    id: string;
    name: string;
    title: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}

export const PageResponseFields = [
    'id',
    'name',
    'title',
    'description',
    'author',
    'sort',
    'disable',
    'meta',
    'content',
    'template',
];


export declare interface PaginatePage {
    error?: Error;
    list: Array<PageResponse>;
    total: number;
}