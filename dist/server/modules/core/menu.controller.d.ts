import { ServiceContext } from 'typescript-rest';
import { MenuService } from './menu.service';
import { Appearance, PaginateResponse } from '../../types/appearance';
import { MenuResponse, CreateMenuDto, EditMenuDto } from './dto/menu.dto';
/**
 * 菜单接口.
 */
export declare class MenuController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: MenuService);
    /**
     * 获取帐号管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 获取帐号管理界面配置信息.
     */
    search(keyword?: string): Promise<MenuResponse[]>;
    /**
     * 创建菜单
     * @param entry 创建参数
     */
    create(entry: CreateMenuDto): Promise<MenuResponse>;
    /**
     * 更新菜单
     * @param entry 菜单参数
     */
    update(entry: EditMenuDto): Promise<MenuResponse>;
    /**
     * 查询菜单数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<MenuResponse[]>>;
}
