export declare class CreatePageDto {
}
export declare class EditPageDto {
    id: string;
}
export declare class PageResponse {
}
export interface PaginatePage {
    error?: Error;
    list: Array<PageResponse>;
    total: number;
}
