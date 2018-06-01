export declare class CreateMediaDto {
}
export declare class EditMediaDto {
    id: string;
}
export declare class MediaResponse {
}
export interface PaginateMedia {
    error?: Error;
    list: Array<MediaResponse>;
    total: number;
}
