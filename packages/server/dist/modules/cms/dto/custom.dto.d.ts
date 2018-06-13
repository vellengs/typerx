export declare class CreateCustomDto {
    name: string;
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
    type: string;
    [key: string]: any;
}
export declare class EditCustomDto {
    id: string;
    name: string;
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
    type: string;
    [key: string]: any;
}
export declare class CustomResponse {
    id: string;
    name: string;
    title: string;
    category: string;
    description: string;
    author: string;
    sort: number;
    disable: boolean;
    meta: string;
    content: string;
    template: string;
    type: string;
    [key: string]: any;
}
export interface PaginateCustom {
    error?: Error;
    list: Array<CustomResponse>;
    total: number;
}
export declare const CustomResponseFields: string[];
