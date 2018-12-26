export declare class CreateDictDto {
    category: string;
    translate: string;
    name: string;
    expand: object;
}
export declare class EditDictDto {
    id: string;
    category: string;
    translate: string;
    name: string;
    expand: object;
}
export declare class DictResponse {
    id: string;
    category: string;
    name: string;
    translate: string;
    expand: object;
}
export declare const DictResponseFields: string[];
export interface PaginateDict {
    error?: Error;
    list: Array<DictResponse>;
    total: number;
}
