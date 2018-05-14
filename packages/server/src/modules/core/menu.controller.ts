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
import { Appearance, PaginateResponse } from '../../types/appearance';
import { MenuResponse, CreateMenuDto, EditMenuDto } from './dto/menu.dto';

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
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string
  ): Promise<PaginateResponse<MenuResponse[]>> {
    return {
      docs: [],
      total: 1
    }
  }


}
