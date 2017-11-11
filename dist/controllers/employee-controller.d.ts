import { UISchema, PaginateResponse } from 'modex';
import { Employee } from './../schemas';
/**
 * 获取菜单.
 */
export declare class EmployeeController {
    /**
      * 获取员工管理界面配置信息.
      */
    getConfig(): Promise<UISchema>;
    /**
     * 查询关键词
     *
     * @param {string} [keyword]
     * @returns {Promise<Employee[]>}
     * @memberof EmployeeController
     */
    getEmployeeByKeyword(keyword?: string): Promise<Employee[]>;
    /**
     * * 创建员工表
     *
     * @param {Employee} entry
     * @returns {Promise<Employee>}
     * @memberof EmployeeController
     */
    create(entry: Employee): Promise<Employee>;
    /**
     * * 更新员工表
     *
     * @param {Employee} entry
     * @returns {Promise<Employee>}
     * @memberof EmployeeController
     */
    update(entry: Employee): Promise<Employee>;
    /**
     * 分页查询员工表
     *
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Employee[]>>}
     * @memberof EmployeeController
     */
    getPaged(page?: number, size?: number, sort?: string): Promise<PaginateResponse<Employee[]>>;
    /**
     * 删除员工信息
     *
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof EmployeeController
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询员工表
     * @param id 编号
     */
    get(id: string): Promise<Employee>;
}
