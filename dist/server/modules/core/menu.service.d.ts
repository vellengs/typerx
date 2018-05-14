import { Appearance, PaginateResponse } from '../../types/appearance';
import { MenuResponse, EditMenuDto, CreateMenuDto } from './dto/menu.dto';
export declare class MenuService {
    getAppearance(): Promise<Appearance>;
    getMenusByKeyword(keyword?: string): Promise<MenuResponse[]>;
    create(entry: CreateMenuDto): Promise<MenuResponse>;
    update(entry: EditMenuDto): Promise<MenuResponse>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<MenuResponse[]>>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<MenuResponse>;
}
