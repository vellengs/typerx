export declare class CreatePageDto {
    name: string;
    title: string;
    description: string;
    sort: number;
    disable: boolean;
    meta: string;
    publish: string;
    content: string;
    template: string;
}
export declare class EditPageDto {
    id: string;
    name: string;
    title: string;
    description: string;
    sort: number;
    disable: boolean;
    publish: string;
    meta: string;
    content: string;
    template: string;
}
export declare class PageResponse {
    id: string;
    name: string;
    title: string;
    description: string;
    sort: number;
    publish: string;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
}
export declare const PageResponseFields: string[];
export interface PaginatePage {
    error?: Error;
    list: Array<PageResponse>;
    total: number;
}
