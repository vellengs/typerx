import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Context, ServiceContext, Preprocessor } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { ArticleService } from './article.service';
import { KeyValue } from '../../types/data.types';
import { CreateArticleDto, ArticleResponse, EditArticleDto, PaginateArticle } from './dto/article.dto';
import { interceptor } from '../../interceptor/interceptor';


@Tags('cms')
@Path('/api/article')
@Preprocessor(interceptor)
export class ArticleController {

    @Context context: ServiceContext;
    constructor(private readonly service = new ArticleService()) { }

    /**
     * 获取文章管理界面配置信息.
     */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }


    /**
     * 查询文章
     * @param keyword 关键词
     * @param value 已选中的文章编号
     */
    @Path('search')
    @GET
    async search(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('value') value?: string
    ): Promise<Array<KeyValue>> {
        return this.service.search(keyword, value);
    }


    /**
     * 创建文章
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreateArticleDto): Promise<ArticleResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新文章
     * @param entry 文章参数
     */
    @PUT
    async update(entry: EditArticleDto): Promise<ArticleResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询文章数据
     * @param keyword 关键词
     * @param article 第几页
     * @param size 页大小
     * @param sort 排序
     */
    @Path('query')
    @GET
    async query(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('category') category?: string,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string
    ): Promise<PaginateArticle> {
        return this.service.query(keyword, category, page, size, sort);
    }

    /**
   * 删除文章
   * @param id 文章编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询文章
     * @param id 文章编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<ArticleResponse> {
        return this.service.get(id);
    }



}