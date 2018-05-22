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
import * as passport from 'passport';
import {
  LoginDto,
  LocalStrategyInfo,
  LoginResponse,
  ProfileResponse,
} from './dto/login.dto';
import { PaginateResponse, Appearance } from '../../types/appearance';
import { KeyValue } from '../../types/data.types';
import { CreateRoleDto, RoleResponse, EditRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

/**
 * 角色管理.
 */
@Tags('core')
@Path('/api/role')
export class RoleController {
  @Context context: ServiceContext;
  constructor(private readonly service = new RoleService()) { }


  /**
   * 获取角色管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }


  /**
   * 搜索角色
   * @param keyword 关键词
   * @param value 键
   */
  @Path('search')
  @GET
  async search(@QueryParam('keyword') keyword?: string,
    @QueryParam('value') value?: string,
  ): Promise<KeyValue[]> {
    return this.service.search(keyword, value);
  }

  /**
   * 创建角色
   * @param entry 设置项实体
   */
  @POST
  async create(entry: CreateRoleDto): Promise<RoleResponse> {
    return this.service.create(entry);
  }

  /**
   * 更新角色
   * @param entry 设置项实体
   */
  @PUT
  async update(entry: EditRoleDto): Promise<RoleResponse> {
    return this.service.update(entry);
  }

  /**
   * 分页查询角色
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
    @QueryParam('sort') sort?: string): Promise<PaginateResponse<RoleResponse[]>> {
    return this.service.query(keyword, page, size, sort);
  }


  /**
   * 按编号获取角色
   * @param id 键
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<RoleResponse> {
    return this.service.get(id);
  }

  /**
   * 删除角色
   * @param id 键
   */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

}
