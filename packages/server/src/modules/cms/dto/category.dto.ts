export class CreateCategoryDto {

}

export class EditCategoryDto {
    id: string;
}

export class CategoryResponse {

}

export declare interface PaginateCategory {
    error?: Error;
    list: Array<CategoryResponse>;
    total: number;
}