import { UISchema, PaginateResponse } from 'modex';
import { Account } from './../schemas';
/**
 * 帐号管理.
 */
export declare class AccountController {
    /**
      * 获取帐号管理界面配置信息.
      */
    getTest(): Promise<UISchema>;
    /**
      * 获取帐号管理界面配置信息.
      */
    getConfig(): Promise<UISchema>;
    /**
     * * 按分类获取帐号数据
     *
     * @param {string} category 分类键名
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountByCategory(category: string): Promise<Account[]>;
    /**
     * * 创建帐号表
     *
     * @param {Account} entry
     * @returns {Promise<Account>}
     * @memberof AccountController
     */
    create(entry: Account): Promise<Account>;
    /**
     * * 更新帐号表
     *
     * @param {Account} entry
     * @returns {Promise<Account>}
     * @memberof AccountController
     */
    update(entry: Account): Promise<Account>;
    /**
     * 分页查询帐号表
     *
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Account[]>>}
     * @memberof AccountController
     */
    getPaged(page?: number, size?: number, sort?: string): Promise<PaginateResponse<Account[]>>;
    /**
     * 删除帐号信息
     *
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof AccountController
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询帐号
     * @param id 编号
     */
    get(id: string): Promise<Account>;
}
