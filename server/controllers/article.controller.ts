import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, ServiceContext, Context } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Article } from './../schemas';
import { Helper } from '../utils/helper';

/**
 * * 获取文章信息
 * 
 * @export
 * @class ArticleController
 */
@Tags('crm')
@Path('/api/article')
export class ArticleController {

    @Context
    context: ServiceContext;

    /**
     * 获取文章管理界面配置信息.
     */

    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Article');
    }


    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Article[]>} 
     * @memberof ArticleController
     */
    @Path('search')
    @GET
    async getArticleByKeyword( @QueryParam('keyword') keyword?: string): Promise<Article[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.article.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Article;
            });
        } else {
            return null;
        }
    }

    /**
     * 创建文章信息
     * 
     * @param {Article} entry 文章实例json
     * @returns {Promise<Article>} 文章实例
     * @memberof ArticleController 
     */
    @POST
    async create(entry: Article): Promise<Article> {
        return Helper.create('Article', entry);
    }


    /**
     * 更新文章信息
     * 
     * @param {Article} entry  文章实例json
     * @returns {Promise<Article>} 文章实例
     * @memberof ArticleController
    * */
    @PUT
    async update(entry: Article): Promise<Article> {
        return Helper.update('Article', entry);
    }



    /**
     * 查询文章信息
     * 
     * @param {string} [keyword] 关键词
     * @param {string} [primary_adviser] 主负责人
     * @param {string} [secondary_advisers] 副负责人
     * @param {number} [intent] 意向程度
     * @param {string} [status] 文章状态
     * @param {number} [page] 第几页
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @param {number} [type] 文章归类 1. 待分配文章 2. 已分配文章 3. 已回收文章 4. 今日新增文章
     * @returns {Promise<PaginateResponse<Article[]>>}  
     * @memberof ArticleController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('account') account?: string,
        @QueryParam('status') status?: string,
        @QueryParam('type') type?: number,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Article[]>> {

        return Helper.getPagedData<Article>('Article', page, size,
            [
                {
                    path: 'account', select: 'name'
                }],
            sort,
            {
                account: account,
                status: status,
                type: type,
                name: new RegExp(keyword, 'i')
            }
        );
    }

    /**
     * 查询文章信息
     * 
     * @param {string} id 文章编号
     * @returns {Promise<Article>} 
     * @memberof ArticleController
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Article> {
        return Helper.get('Article', id);
    }


    /**
     * 删除文章信息
     * 
     * @param {string} id 文章编号
     * @returns {Promise<boolean>} 
     * @memberof ArticleController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Article', id);
    }
}
