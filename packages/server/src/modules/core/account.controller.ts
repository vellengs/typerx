import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Context, ServiceContext } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { Account } from './interfaces/account.interface';

/**
 * 帐号管理.
 */
@Tags('core')
@Path('/api/account')
export class AccountController {

    @Context
    context: ServiceContext;

    constructor(
        private readonly service: AccountService
    ) {
        this.service = new AccountService(this.context);
    }

    /**
     * 创建帐号表
     * 
     * @param {Account} entry 
     * @returns {Promise<Account>} 
     * @memberof AccountController
     */
    @POST
    async create(entry: Account): Promise<Account> {
        return this.service.create(entry);
    }

    /**
     * 更新帐号表
     * 
     * @param {Account} entry 
     * @returns {Promise<Account>} 
     * @memberof AccountController
     */
    @PUT
    async update(entry: Account): Promise<Account> {
        const admin: any = this.context.request.user;
        return this.service.update(entry, admin);
    }

    /**
      * 获取帐号管理界面配置信息.
      */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }

    /**
     * 按关键词查询账号
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Account[]>} 
     * @memberof AccountController
     */
    @Path('search')
    @GET
    async getAccountsByKeyword(@QueryParam('keyword') keyword?: string): Promise<Account[]> {
        return this.service.getAccountsByKeyword(keyword);
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
    async getAccountByCategory(@PathParam('category') category: string): Promise<Account[]> {
        return [];
    }
}
