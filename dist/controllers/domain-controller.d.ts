import { UISchema, PaginateResponse } from 'modex';
import { Domain } from './../schemas';
/**
 * 获取领域y.
 */
export declare class DomainController {
    /**
      * 获取领域管理界面配置信息.
      */
    getConfig(): Promise<UISchema>;
    /**
     * * 按分类获取领域数据
     *
     * @param {string} category 分类键名
     * @returns {Promise<Domain[]>}
     * @memberof DomainController
     */
    getDomainByCategory(category: string): Promise<Domain[]>;
    /**
     * * 创建领域表
     *
     * @param {Domain} entry
     * @returns {Promise<Domain>}
     * @memberof DomainController
     */
    create(entry: Domain): Promise<Domain>;
    /**
     * * 更新领域表
     *
     * @param {Domain} entry
     * @returns {Promise<Domain>}
     * @memberof DomainController
     */
    update(entry: Domain): Promise<Domain>;
    /**
     * 分页查询领域表
     *
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Domain[]>>}
     * @memberof DomainController
     */
    getPaged(page?: number, size?: number, sort?: string): Promise<PaginateResponse<Domain[]>>;
    /**
     * 删除领域信息
     *
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof DomainController
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询领域
     * @param id 编号
     */
    get(id: string): Promise<Domain>;
}
