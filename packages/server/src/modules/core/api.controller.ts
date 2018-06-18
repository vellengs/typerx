import {
  GET,
  Path,
  QueryParam,
  Context,
  ServiceContext,
  Preprocessor,
  FormParam,
  POST,
  DELETE,
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import {
  PaginateAccount,
} from './dto/account.dto';
import { KeyValue } from '../../types/data.types';
import { interceptor } from '../../interceptor/interceptor';
import { ApiService } from './api.service';
import { PaginateApi } from './dto/api.dto';

/**
 * API 接口管理.
 */
@Tags('core')
@Path('/api/api')
export class ApiController {
  @Context context: ServiceContext;

  constructor(private readonly service = new ApiService()) { }

  /**
   * 获取接口管理界面配置信息.
   */
  @Path('config')
  @GET
  @Preprocessor(interceptor)
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  /**
   * 按关键词查询接口
   *
   * @param {string} [keyword] 关键词
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
   * 接口查询
   * @param keyword 接口关键词
   * @param page 第几页
   * @param size 页大小
   * @param sort 排序
   */
  @Path('query')
  @GET
  async query(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('permission') permission?: string,
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string
  ): Promise<PaginateApi> {
    return this.service.query(keyword, permission, page, size, sort);
  }

  /**
   * 添加API接口到权限标签
   * @param permission 权限编号
   * @param ids 接口编号列表
   */
  @Path('permission')
  @POST
  async addApisToPermission(@FormParam('permission') permission: string, @FormParam('ids') ids: string[] | string): Promise<boolean> {
    return this.service.addApiPermission(permission, ids);
  }

  /**
 * 移除API接口从权限标签
 * @param permission 权限编号
 * @param id 接口编号
 */
  @Path('permission')
  @DELETE
  async removeApisToPermission(@QueryParam('permission') permission: string, @QueryParam('id') id: string): Promise<boolean> {
    return this.service.removeApiFromPermission(permission, id);
  }

}
