import { ServiceContext } from 'typescript-rest';
import { CategoryService } from './category.service';
import { Appearance } from '../../types/appearance';
import { CategoryResponse, CreateCategoryDto, EditCategoryDto, PaginateCategory } from './dto/category.dto';
import { KeyValue } from '../../types/data.types';
/**
 * 分类接口.
 */
export declare class CategoryController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: CategoryService);
    /**
     * 获取分类管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询分类
     * @param keyword 关键词
     * @param value 已选中的分类编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建分类
     * @param entry 创建参数
     */
    create(entry: CreateCategoryDto): Promise<CategoryResponse>;
    /**
     * 更新分类
     * @param entry 分类参数
     */
    update(entry: EditCategoryDto): Promise<CategoryResponse>;
    /**
     * 查询分类数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateCategory>;
    /**
   * 删除分类
   * @param id 分类编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询分类
     * @param id 分类编号
     */
    get(id: string): Promise<CategoryResponse>;
}
