import { ServiceContext } from 'typescript-rest';
import { UISchema, PaginateResponse } from 'modex';
import { Customer } from './../schemas';
/**
 * * 获取客户信息
 *
 * @export
 * @class CustomerController
 */
export declare class CustomerController {
    context: ServiceContext;
    /**
     * 获取客户管理界面配置信息.
     */
    getConfig(): Promise<UISchema>;
    /**
     * 查询关键词
     *
     * @param {string} [keyword]
     * @returns {Promise<Customer[]>}
     * @memberof CustomerController
     */
    getCustomerByKeyword(keyword?: string): Promise<Customer[]>;
    /**
     * 创建客户信息
     *
     * @param {Customer} entry 客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController
     */
    create(entry: Customer): Promise<Customer>;
    /**
     * 更新客户信息
     *
     * @param {Customer} entry  客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController
    * */
    update(entry: Customer): Promise<Customer>;
    /**
     * 查询客户信息
     *
     * @param {string} [keyword] 关键词
     * @param {string} [primary_adviser] 主负责人
     * @param {string} [secondary_advisers] 副负责人
     * @param {number} [intent] 意向程度
     * @param {string} [status] 客户状态
     * @param {number} [page] 第几页
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @param {number} [type] 客户归类 1. 待分配客户 2. 已分配客户 3. 已回收客户 4. 今日新增客户
     * @returns {Promise<PaginateResponse<Customer[]>>}
     * @memberof CustomerController
     */
    getPaged(keyword?: string, primary_adviser?: string, secondary_advisers?: string, intent?: number, status?: string, type?: number, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Customer[]>>;
    getCollections(): Promise<any>;
    /**
     * 查询客户信息
     *
     * @param {string} id 客户编号
     * @returns {Promise<Customer>}
     * @memberof CustomerController
     */
    get(id: string): Promise<Customer>;
    /**
     * 删除客户信息
     *
     * @param {string} id 客户编号
     * @returns {Promise<boolean>}
     * @memberof CustomerController
     */
    remove(id: string): Promise<boolean>;
}
