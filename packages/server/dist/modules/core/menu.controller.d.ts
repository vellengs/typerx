import { ServiceContext } from 'typescript-rest';
import { MenuService } from './menu.service';
import { Appearance } from '../../types/appearance';
import { MenuResponse, CreateMenuDto, EditMenuDto, PaginateMenu } from './dto/menu.dto';
import { KeyValue, SelectorItem } from '../../types/data.types';
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
     * 获取菜单权限标签列表
     */
    getPermissionTags(): Promise<Array<SelectorItem>>;
    /**
     * 查询菜单
     * @param keyword 关键词
     * @param value 已选中的菜单编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
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
    query(keyword?: string, isMenu?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateMenu>;
    /**
     * 返回用户鉴权后的菜单
     */
    getUserMenus(): Promise<Array<MenuResponse>>;
    /**
   * 删除菜单
   * @param id 菜单编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询菜单
     * @param id 菜单编号
     */
    get(id: string): Promise<MenuResponse>;
}
