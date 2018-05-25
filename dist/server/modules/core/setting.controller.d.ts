import { ServiceContext } from 'typescript-rest';
import { SettingService } from './setting.service';
import { SettingResponse, CreateSettingDto, EditSettingDto } from './dto/setting.dto';
import { PaginateResponse, Appearance } from '../../types/appearance';
/**
 * 设置管理接口.
 */
export declare class SettingController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: SettingService);
    /**
     * 获取设置管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 获取设置项
     * @param keys 设置项key的集合
     */
    getMainSettings(keys?: string): Promise<Array<SettingResponse>>;
    /**
     * 通过Key获取设置项目
     * @param name 键名
     */
    getSettingsByKey(name: string): Promise<SettingResponse>;
    /**
     * 查询设置项
     * @param keyword 关键词
     * @param value 键
     */
    search(keyword?: string, value?: string): Promise<Array<SettingResponse>>;
    /**
     * 创建设置项
     * @param entry 设置项实体
     */
    create(entry: CreateSettingDto): Promise<SettingResponse>;
    /**
     * 更新设置项
     * @param entry 设置项实体
     */
    update(entry: EditSettingDto): Promise<SettingResponse>;
    /**
     * 分页查询设置项
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<SettingResponse>>>;
    /**
     * 按编号获取设置项
     * @param id 键
     */
    get(id: string): Promise<SettingResponse>;
    /**
     * 删除设置项
     * @param id 键
     */
    remove(id: string): Promise<boolean>;
}
