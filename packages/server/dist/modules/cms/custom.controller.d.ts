import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { CustomService } from './custom.service';
import { KeyValue } from '../../types/data.types';
import { CreateCustomDto, CustomResponse, EditCustomDto, PaginateCustom } from './dto/custom.dto';
export declare class CustomController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: CustomService);
    /**
     *
     * 获取自定义内容管理界面配置信息
     * @param type 自定义内容集名
     */
    getConfig(type: string): Promise<Appearance>;
    /**
     * 查询自定义内容
     * @param keyword 关键词
     * @param value 已选中的自定义内容编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建自定义内容
     * @param entry 创建参数
     */
    create(entry: CreateCustomDto): Promise<CustomResponse>;
    /**
     * 更新自定义内容
     * @param entry 自定义内容参数
     */
    update(entry: EditCustomDto): Promise<CustomResponse>;
    /**
     * 查询自定义内容数据
     * @param keyword 关键词
     * @param custom 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, category?: string, type?: string, page?: number, size?: number, sort?: string): Promise<PaginateCustom>;
    /**
   * 删除自定义内容
   * @param id 自定义内容编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询自定义内容
     * @param id 自定义内容编号
     */
    get(id: string): Promise<CustomResponse>;
}
