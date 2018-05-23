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
import { SettingService } from './setting.service';
import { SettingResponse, CreateSettingDto, EditSettingDto } from './dto/setting.dto';
import { PaginateResponse } from '../../types/appearance';

/**
 * 设置管理接口.
 */
@Tags('core')
@Path('/api/setting')
export class SettingController {
  @Context context: ServiceContext;
  constructor(private readonly service = new SettingService()) { }

  /**
   * 获取设置项
   * @param keys 设置项key的集合
   */
  @Path('main')
  @GET
  async getMainSettings(@QueryParam('keys') keys?: string): Promise<SettingResponse[]> {
    return this.service.getMainSettings(keys);
  }

  /**
   * 通过Key获取设置项目
   * @param name 键名
   */
  @Path('key/:name')
  @GET
  async getSettingsByKey(@PathParam('name') name: string): Promise<SettingResponse> {
    return this.service.getSettingsByKey(name);
  }

  /**
   * 查询设置项
   * @param keyword 关键词
   * @param value 键
   */
  @Path('search')
  @GET
  async search(@QueryParam('keyword') keyword?: string,
    @QueryParam('value') value?: string,
  ): Promise<SettingResponse[]> {
    return this.search(keyword, value);
  }

  /**
   * 创建设置项
   * @param entry 设置项实体
   */
  @POST
  async create(entry: CreateSettingDto): Promise<SettingResponse> {
    return this.service.create(entry);
  }

  /**
   * 更新设置项
   * @param entry 设置项实体
   */
  @PUT
  async update(entry: EditSettingDto): Promise<SettingResponse> {
    return this.service.update(entry);
  }

  /**
   * 分页查询设置项
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
    @QueryParam('sort') sort?: string): Promise<PaginateResponse<SettingResponse[]>> {
    return this.service.query(keyword, page, size, sort);
  }


  /**
   * 按编号获取设置项
   * @param id 键
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<SettingResponse> {
    return this.service.get(id);
  }

  /**
   * 删除设置项
   * @param id 键
   */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

}
