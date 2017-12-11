import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Errors } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, Helper, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Account } from './../schemas';


/**
 * 帐号管理.
 */
@Tags('base')
@Path('/api/account')
export class AccountController {

    /**
      * 获取帐号管理界面配置信息.
      */
    @Path('test')
    @GET
    async getTest(): Promise<UISchema> {
        throw new Errors.UnauthorizedError('没有登录');
        // return null;
    }

    /**
      * 获取帐号管理界面配置信息.
      */
    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema(`${__dirname}/../models`, 'Account');
    }


    /**
     * * 按分类获取帐号数据
     * 
     * @param {string} category 分类键名
     * @returns {Promise<Account[]>} 
     * @memberof AccountController
     */
    @Path('category/:category')
    @GET
    async getAccountByCategory( @PathParam('category') category: string): Promise<Account[]> {
        const docs = await Db.account.find({ category: category }).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Account;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建帐号表
     * 
     * @param {Account} entry 
     * @returns {Promise<Account>} 
     * @memberof AccountController
     */
    @POST
    async create(entry: Account): Promise<Account> {
        return Helper.create('Account', entry);
    }


    /**
     * * 更新帐号表
     * 
     * @param {Account} entry 
     * @returns {Promise<Account>} 
     * @memberof AccountController
     */
    @PUT
    async update(entry: Account): Promise<Account> {
        return Helper.update('Account', entry);
    }


    /**
     * 分页查询帐号表
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Account[]>>} 
     * @memberof AccountController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Account[]>> {
        return Helper.getPagedData<Account>('Account', page, size, [], sort);
    }

    /**
     * 删除帐号信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof AccountController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Account', id);
    }


    /**
     * 查询帐号
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Account> {
        return Helper.get('Account', id);
    }
}
