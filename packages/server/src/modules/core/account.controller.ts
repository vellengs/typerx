import {
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  DELETE,
  QueryParam,
  Context,
  ServiceContext,
  FormParam,
  Preprocessor,
} from 'typescript-rest';
import { Tags, Security } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { Account } from './interfaces/account.interface';
import { validator } from '../../util/validator';
import {
  CreateAccountDto,
  EditAccountDto,
  AccountResponse,
  PaginateAccount,
} from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
import { KeyValue } from '../../types/data.types';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 帐号管理.
 */
@Tags('core')
@Path('/api/account')
export class AccountController {
  @Context context: ServiceContext;

  constructor(private readonly service = new AccountService()) { }

  /**
   * 创建帐号
   * @param entry 帐号信息
   */
  @POST
  async create(entry: CreateAccountDto): Promise<AccountResponse> {
    return this.service.create(entry);
  }

  /**
   * 更新帐号
   * @param entry 帐号信息
   */
  @PUT
  async update(entry: EditAccountDto): Promise<AccountResponse> {
    const admin: any = this.context.request.user;
    return this.service.update(entry, admin);
  }

  /**
   * 获取帐号管理界面配置信息.
   */
  @Path('config')
  @GET
  @Preprocessor(interceptor)
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  /**
   * 按关键词查询帐号
   *
   * @param {string} [keyword]
   * @returns {Promise<Account[]>}
   * @memberof AccountController
   */
  @Path('search')
  @GET
  async getAccountsByKeyword(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('value') value?: string,
  ): Promise<Array<KeyValue>> {
    return this.service.search(keyword, value);
  }

  /**
   * 添加用户到角色
   * @param role 角色编号
   * @param accountIds 用户编号序列
   */
  @Path('role')
  @POST
  async addAccountsToRole(@FormParam('role') role: string, @FormParam('accountIds') accountIds: string[]): Promise<boolean> {
    return this.service.addAccountsToRole(role, accountIds);
  }


  /**
   * 从角色中删除用户
   * @param role 角色编号
   * @param accountId 
   */
  @Path('role')
  @DELETE
  async removeAccountFromRole(@QueryParam('role') role: string, @QueryParam('id') accountId: string): Promise<boolean> {
    return this.service.removeAccountFromRole(role, accountId);
  }

  /**
   * 分页查询帐号数据
   * @param keyword 关键词
   */
  @Path('query')
  @GET
  async query(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('group') group?: string,
    @QueryParam('role') role?: string,
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string
  ): Promise<PaginateAccount> {
    return this.service.query(keyword, group, role, page, size, sort);
  }

  /**
   * 帐户信息
   */
  @GET
  @Path('profile')
  async profile(): Promise<ProfileResponse> {
    return this.service.profile(this.context);
  }

  /**
   * 删除帐号
   * @param id 帐号编号
   */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

  /**
   * 查询帐号
   * @param id 编号
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<AccountResponse> {
    return this.service.get(id);
  }

}
