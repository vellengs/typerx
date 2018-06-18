import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { KeyValue } from '../../types/data.types';
import { ApiService } from './api.service';
import { PaginateApi } from './dto/api.dto';
/**
 * API 接口管理.
 */
export declare class ApiController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: ApiService);
    /**
     * 获取接口管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 按关键词查询接口
     *
     * @param {string} [keyword] 关键词
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountsByKeyword(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 接口查询
     * @param keyword 接口关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, permission?: string, page?: number, size?: number, sort?: string): Promise<PaginateApi>;
    /**
     * 添加API接口到权限标签
     * @param permission 权限编号
     * @param ids 接口编号列表
     */
    addApisToPermission(permission: string, ids: string[]): Promise<boolean>;
}
