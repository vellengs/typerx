import { Appearance } from '../../types/appearance';
import { DictResponse, CreateDictDto, EditDictDto, PaginateDict } from './dto/dict.dto';
import { KeyValue } from '../../types/data.types';
export declare class DictService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, category?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateDictDto): Promise<DictResponse>;
    update(entry: EditDictDto): Promise<DictResponse>;
    query(keyword?: string, category?: string, page?: number, size?: number, sort?: string): Promise<PaginateDict>;
    get(id: string): Promise<DictResponse>;
    remove(id: string): Promise<boolean>;
    private pure(entry);
}
