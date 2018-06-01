export declare class CreateCategoryDto {
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}
export declare class EditCategoryDto {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}
export declare class CategoryResponse {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}
export interface PaginateCategory {
    error?: Error;
    list: Array<CategoryResponse>;
    total: number;
}
export declare const CategoryResponseFields: string[];
