import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { ArticleService } from './article.service';
import { KeyValue } from '../../types/data.types';
import { CreateArticleDto, ArticleResponse, EditArticleDto, PaginateArticle } from './dto/article.dto';
export declare class ArticleController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: ArticleService);
    /**
     * 获取文章管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询文章
     * @param keyword 关键词
     * @param value 已选中的文章编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建文章
     * @param entry 创建参数
     */
    create(entry: CreateArticleDto): Promise<ArticleResponse>;
    /**
     * 更新文章
     * @param entry 文章参数
     */
    update(entry: EditArticleDto): Promise<ArticleResponse>;
    /**
     * 查询文章数据
     * @param keyword 关键词
     * @param article 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, category?: string, page?: number, size?: number, sort?: string): Promise<PaginateArticle>;
    /**
   * 删除文章
   * @param id 文章编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询文章
     * @param id 文章编号
     */
    get(id: string): Promise<ArticleResponse>;
}
