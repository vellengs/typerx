import { ServiceContext } from 'typescript-rest';
import { PaginateResponse, Appearance } from '../../types/appearance';
import { KeyValue } from '../../types/data.types';
import { LogService } from './log.service';
import { LogResponse } from './dto/log.dto';
/**
 * 系统日志.
 */
export declare class LogController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: LogService);
    /**
     * 获取日志管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 搜索日志
     * @param keyword 关键词
     * @param value 键
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 分页查询日志
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<LogResponse>>>;
    /**
     * 按编号获取日志
     * @param id 键
     */
    get(id: string): Promise<LogResponse>;
}
