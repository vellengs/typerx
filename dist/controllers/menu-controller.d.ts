import { UISchema, PaginateResponse } from 'modex';
import { Menu } from './../schemas';
/**
 * 菜单管理.
 */
export declare class MenuController {
    /**
      * 获取菜单管理界面配置信息.
      */
    getConfig(): Promise<UISchema>;
    /**
     * * 按分类获取菜单数据
     *
     * @param {string} category 分类键名
     * @returns {Promise<Menu[]>}
     * @memberof MenuController
     */
    getMenuByCategory(category: string): Promise<Menu[]>;
    /**
     * * 创建菜单表
     *
     * @param {Menu} entry
     * @returns {Promise<Menu>}
     * @memberof MenuController
     */
    create(entry: Menu): Promise<Menu>;
    /**
     * * 更新菜单表
     *
     * @param {Menu} entry
     * @returns {Promise<Menu>}
     * @memberof MenuController
     */
    update(entry: Menu): Promise<Menu>;
    /**
     * 分页查询菜单表
     *
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Menu[]>>}
     * @memberof MenuController
     */
    getPaged(keyword?: string, status?: number, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Menu[]>>;
    /**
     * 删除菜单信息
     *
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof MenuController
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询菜单
     * @param id 编号
     */
    get(id: string): Promise<Menu>;
}
