import { ServiceContext } from 'typescript-rest';
import { WidgetService } from './widget.service';
import { Appearance } from '../../types/appearance';
import { WidgetResponse, CreateWidgetDto, EditWidgetDto, PaginateWidget } from './dto/widget.dto';
import { KeyValue } from '../../types/data.types';
/**
 * 小部件接口.
 */
export declare class WidgetController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: WidgetService);
    /**
     * 获取小部件管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询小部件
     * @param keyword 关键词
     * @param value 已选中的小部件编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建小部件
     * @param entry 创建参数
     */
    create(entry: CreateWidgetDto): Promise<WidgetResponse>;
    /**
     * 更新小部件
     * @param entry 小部件参数
     */
    update(entry: EditWidgetDto): Promise<WidgetResponse>;
    /**
     * 查询小部件数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, isWidget?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateWidget>;
    /**
   * 删除小部件
   * @param id 小部件编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询小部件
     * @param id 小部件编号
     */
    get(id: string): Promise<WidgetResponse>;
}
