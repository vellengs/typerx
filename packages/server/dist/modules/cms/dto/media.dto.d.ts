export declare class CreateMediaDto {
    name: string;
    caption: string;
    description: string;
    ext: any;
    url: string;
    uri: string;
}
export declare class EditMediaDto {
    id: string;
    name: string;
    caption: string;
    description: string;
    ext: any;
    url: string;
    uri: string;
}
export declare class MediaResponse {
    id: string;
    name: string;
    caption: string;
    description: string;
    ext: any;
    url: string;
    uri: string;
}
export interface PaginateMedia {
    error?: Error;
    list: Array<MediaResponse>;
    total: number;
}
export declare const MediaResponseFields: string[];
