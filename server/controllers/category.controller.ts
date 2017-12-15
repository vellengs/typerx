import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, ServiceContext, Context } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Category } from './../schemas';
import { Helper } from '../utils/helper';

/**
 * * 获取文章分类信息
 * 
 * @export
 * @class CategoryController
 */
@Tags('article')
@Path('/api/category')
export class CategoryController {

    @Context
    context: ServiceContext;

    /**
     * 获取文章分类管理界面配置信息.
     */

    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Category');
    }


    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Category[]>} 
     * @memberof CategoryController
     */
    @Path('search')
    @GET
    async getCategoryByKeyword( @QueryParam('keyword') keyword?: string): Promise<Category[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.category.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Category;
            });
        } else {
            return null;
        }
    }

    /**
     * 创建文章分类信息
     * 
     * @param {Category} entry 文章分类实例json
     * @returns {Promise<Category>} 文章分类实例
     * @memberof CategoryController 
     */
    @POST
    async create(entry: Category): Promise<Category> {
        return Helper.create('Category', entry);
    }


    /**
     * 更新文章分类信息
     * 
     * @param {Category} entry  文章分类实例json
     * @returns {Promise<Category>} 文章分类实例
     * @memberof CategoryController
    * */
    @PUT
    async update(entry: Category): Promise<Category> {
        return Helper.update('Category', entry);
    }

    /**
     * 分类信息查询
     * @param keyword 
     * @param account 
     * @param status 
     * @param type 
     * @param page 
     * @param size 
     * @param sort 
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
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Category[]>> {

        return Helper.getPagedData<Category>('Category', page, size,
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
     * 查询文章分类信息
     * 
     * @param {string} id 文章分类编号
     * @returns {Promise<Category>} 
     * @memberof CategoryController
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Category> {
        return Helper.get('Category', id);
    }


    /**
     * 删除文章分类信息
     * 
     * @param {string} id 文章分类编号
     * @returns {Promise<boolean>} 
     * @memberof CategoryController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Category', id);
    }
}
