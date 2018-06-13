import { Appearance } from "../../types/appearance";
import { KeyValue } from "../../types/data.types";
import { CreateCustomDto, CustomResponse, EditCustomDto, PaginateCustom } from './dto/custom.dto';
export declare class CustomService {
    getAppearance(type: string): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    setKeyWord(entry: CreateCustomDto | EditCustomDto): void;
    create(entry: CreateCustomDto): Promise<CustomResponse>;
    update(entry: EditCustomDto): Promise<CustomResponse>;
    query(keyword?: string, category?: string, type?: string, page?: number, size?: number, sort?: string): Promise<PaginateCustom>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<CustomResponse>;
}
