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
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { MenuService } from './menu.service';
import { Appearance } from '../../types/appearance';
import { MenuResponse, CreateMenuDto, EditMenuDto, PaginateMenu } from './dto/menu.dto';
import { KeyValue, SelectorItem } from '../../types/data.types';

/**
 * 菜单接口.
 */
@Tags('core')
@Path('api/menu')
export class MenuController {
  @Context context: ServiceContext;
  constructor(private readonly service = new MenuService()) { }

  /**
   * 获取帐号管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  @Path('permissions')
  @GET
  async getPermissionTags(): Promise<Array<SelectorItem>> {
    return this.service.getAllPermissionTags();
  }

  /**
   * 查询菜单
   * @param keyword 关键词
   * @param value 已选中的菜单编号
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
   * 创建菜单
   * @param entry 创建参数
   */
  @POST
  async create(entry: CreateMenuDto): Promise<MenuResponse> {
    return this.service.create(entry);
  }


  /**
   * 更新菜单
   * @param entry 菜单参数
   */
  @PUT
  async update(entry: EditMenuDto): Promise<MenuResponse> {
    return this.service.update(entry);
  }

  /**
   * 查询菜单数据
   * @param keyword 关键词
   * @param page 第几页
   * @param size 页大小
   * @param sort 排序
   */
  @Path('query')
  @GET
  async query(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('isMenu') isMenu?: boolean,
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string
  ): Promise<PaginateMenu> {
    return this.service.query(keyword, isMenu, page, size, sort);
  }


  /**
   * 返回用户鉴权后的菜单
   */
  @Path('auth')
  @GET
  async getUserMenus(): Promise<Array<MenuResponse>> {
    const { request } = this.context;
    return this.service.getAuthenticatedMenus(request.user);
  }
  /**
 * 删除菜单
 * @param id 菜单编号
 */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

  /**
   * 查询菜单
   * @param id 菜单编号
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<MenuResponse> {
    return this.service.get(id);
  }


}
