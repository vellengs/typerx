export class CreatePageDto {

}

export class EditPageDto {
    id: string;
}

export class PageResponse {

}

export declare interface PaginatePage {
    error?: Error;
    list: Array<PageResponse>;
    total: number;
}