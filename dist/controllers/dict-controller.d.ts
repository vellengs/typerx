import { UISchema, PaginateResponse } from 'modex';
import { Dict } from './../schemas';
/**
 * 获取菜单y.
 */
export declare class DictController {
    /**
      * 获取客户管理界面配置信息.
      */
    getConfig(): Promise<UISchema>;
    /**
     * * 按分类获取字典数据
     * @param {string} category 分类键名
     * @returns {Promise<Dict[]>};
     * @memberof DictController
     */
    getDictByCategory(category: string): Promise<Dict[]>;
    /**
     * * 创建字典表
     * @param {Dict} entry;
     * @returns {Promise<Dict>};
     * @memberof DictController
     */
    create(entry: Dict): Promise<Dict>;
    /**
     * * 更新字典表
     * @param {Dict} entry;
     * @returns {Promise<Dict>};
     * @memberof DictController
     */
    update(entry: Dict): Promise<Dict>;
    /**
     * 分页查询字典表

     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Dict[]>>}
     * @memberof DictController
     */
    getPaged(page?: number, size?: number, sort?: string): Promise<PaginateResponse<Dict[]>>;
    /**
     * 删除字典信息
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof DictController
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询字典表
     * @param id 编号
     */
    get(id: string): Promise<Dict>;
}
