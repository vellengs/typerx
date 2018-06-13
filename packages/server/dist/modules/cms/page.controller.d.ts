import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { PageService } from './page.service';
import { KeyValue } from '../../types/data.types';
import { CreatePageDto, PageResponse, EditPageDto, PaginatePage } from './dto/page.dto';
export declare class PageController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: PageService);
    /**
     * 获取页面管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询页面
     * @param keyword 关键词
     * @param value 已选中的页面编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建页面
     * @param entry 创建参数
     */
    create(entry: CreatePageDto): Promise<PageResponse>;
    /**
     * 更新页面
     * @param entry 页面参数
     */
    update(entry: EditPageDto): Promise<PageResponse>;
    /**
     * 查询页面数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginatePage>;
    /**
   * 删除页面
   * @param id 页面编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询页面
     * @param id 页面编号
     */
    get(id: string): Promise<PageResponse>;
}
