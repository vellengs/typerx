import { ServiceContext } from 'typescript-rest';
import { Appearance } from '../../types/appearance';
import { DictService } from './dict.service';
import { DictResponse, CreateDictDto, EditDictDto, PaginateDict } from './dto/dict.dto';
import { KeyValue } from '../../types/data.types';
/**
 * 字典表.
 */
export declare class DictController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: DictService);
    /**
     * 获取帐号管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 搜索字典表
     * @param keyword 关键词
     * @param value 键
     */
    search(keyword?: string, value?: string, category?: string): Promise<Array<KeyValue>>;
    /**
     * 创建字典
     * @param entry 设置项实体
     */
    create(entry: CreateDictDto): Promise<DictResponse>;
    /**
     * 更新字典
     * @param entry 设置项实体
     */
    update(entry: EditDictDto): Promise<DictResponse>;
    /**
     * 分页查询字典
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, category?: string, page?: number, size?: number, sort?: string): Promise<PaginateDict>;
    /**
     * 按编号获取字典
     * @param id 键
     */
    get(id: string): Promise<DictResponse>;
    /**
     * 删除字典
     * @param id 键
     */
    remove(id: string): Promise<boolean>;
}
