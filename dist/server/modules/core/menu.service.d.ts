import { Appearance, PaginateResponse } from '../../types/appearance';
import { MenuResponse, EditMenuDto, CreateMenuDto } from './dto/menu.dto';
import { KeyValue } from '../../types/data.types';
export declare class MenuService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateMenuDto): Promise<MenuResponse>;
    update(entry: EditMenuDto): Promise<MenuResponse>;
    query(keyword?: string, isMenu?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<MenuResponse>>>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<MenuResponse>;
    private pure(entry);
}
