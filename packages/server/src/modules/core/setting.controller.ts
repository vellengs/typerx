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
  Preprocessor,
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
import { SettingResponse, CreateSettingDto, EditSettingDto, PaginateSetting, SettingsGroup } from './dto/setting.dto';
import { Appearance } from '../../types/appearance';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 设置管理接口.
 */
@Tags('core')
@Path('/api/setting')
@Preprocessor(interceptor)
export class SettingController {
  @Context context: ServiceContext;
  constructor(private readonly service = new SettingService()) { }

  /**
   * 获取设置管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  /**
   * 按分组获取多个设置项
   * @param keys 设置项key的集合
   */
  @Path('name/:name')
  @GET
  async getSettingsByName(@PathParam('name') name?: string): Promise<SettingsGroup> {
    return this.service.getSettingsByName(name);
  }


  /**
  * 更新设置项
  * @param entry 设置项实体
  */
  @PUT
  @Path('name/:name')
  async updateSettingsByName(
    @PathParam('name') name: string,
    entry: SettingsGroup): Promise<SettingsGroup> {
    return this.service.updateSettingsByName(name, entry);
  }

  /**
   * 通过Key获取设置项目
   * @param key 键名
   */
  @Path('key/:key')
  @GET
  async getSettingsByKey(@PathParam('key') key: string): Promise<SettingResponse> {
    return this.service.getSettingsByKey(key);
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
  ): Promise<Array<SettingResponse>> {
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
    @QueryParam('sort') sort?: string): Promise<PaginateSetting> {
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
