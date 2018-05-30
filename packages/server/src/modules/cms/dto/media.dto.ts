export class CreateMediaDto {

}

export class EditMediaDto {
    id: string;
}

export class MediaResponse {

}

export declare interface PaginateMedia {
    error?: Error;
    list: Array<MediaResponse>;
    total: number;
}