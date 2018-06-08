import { Appearance } from '../../types/appearance';
import { CategoryResponse, EditCategoryDto, CreateCategoryDto, PaginateCategory } from './dto/category.dto';
import { KeyValue } from '../../types/data.types';
export declare class CategoryService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateCategoryDto): Promise<CategoryResponse>;
    update(entry: EditCategoryDto): Promise<CategoryResponse>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateCategory>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<CategoryResponse>;
    private pure(entry);
}
