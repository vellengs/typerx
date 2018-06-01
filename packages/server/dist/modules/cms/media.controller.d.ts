import { ServiceContext } from 'typescript-rest';
import { MediaService } from './media.service';
import { Appearance } from '../../types/appearance';
import { MediaResponse, CreateMediaDto, EditMediaDto, PaginateMedia } from './dto/media.dto';
import { KeyValue } from '../../types/data.types';
/**
 * 媒体接口.
 */
export declare class MediaController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: MediaService);
    /**
     * 获取媒体管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询媒体
     * @param keyword 关键词
     * @param value 已选中的媒体编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建媒体
     * @param entry 创建参数
     */
    create(entry: CreateMediaDto): Promise<MediaResponse>;
    /**
     * 更新媒体
     * @param entry 媒体参数
     */
    update(entry: EditMediaDto): Promise<MediaResponse>;
    /**
     * 查询媒体数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, isMedia?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateMedia>;
    /**
   * 删除媒体
   * @param id 媒体编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询媒体
     * @param id 媒体编号
     */
    get(id: string): Promise<MediaResponse>;
}
