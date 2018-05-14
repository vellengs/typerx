import { Appearance } from '../../types/appearance';
import { MenuResponse, EditMenuDto, CreateMenuDto } from './dto/menu.dto';
export declare class MenuService {
    getAppearance(): Promise<Appearance>;
    getMenusByKeyword(keyword?: string): Promise<MenuResponse[]>;
    create(entry: CreateMenuDto): Promise<MenuResponse>;
    valuable(value: any): any;
    update(entry: EditMenuDto): Promise<MenuResponse>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<MenuResponse>;
}
