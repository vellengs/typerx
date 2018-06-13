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
import { Appearance } from '../../types/appearance';
import { DictService } from './dict.service';
import { DictResponse, CreateDictDto, EditDictDto, PaginateDict } from './dto/dict.dto';
import { KeyValue } from '../../types/data.types';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 字典表.
 */
@Tags('core')
@Path('/api/dict')
@Preprocessor(interceptor)
export class DictController {
  @Context context: ServiceContext;
  constructor(private readonly service = new DictService()) { }


  /**
   * 获取帐号管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }


  /**
   * 搜索字典表
   * @param keyword 关键词
   * @param value 键
   */
  @Path('search')
  @GET
  async search(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('value') value?: string,
    @QueryParam('category') category?: string,
  ): Promise<Array<KeyValue>> {
    return this.service.search(keyword, value, category);
  }

  /**
   * 创建字典
   * @param entry 设置项实体
   */
  @POST
  async create(entry: CreateDictDto): Promise<DictResponse> {
    return this.service.create(entry);
  }

  /**
   * 更新字典
   * @param entry 设置项实体
   */
  @PUT
  async update(entry: EditDictDto): Promise<DictResponse> {
    return this.service.update(entry);
  }

  /**
   * 分页查询字典
   * @param keyword 关键词
   * @param page 第几页
   * @param size 页大小
   * @param sort 排序
   */
  @Path('query')
  @GET
  async query(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('category') category?: string,
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string): Promise<PaginateDict> {
    return this.service.query(keyword, category, page, size, sort);
  }


  /**
   * 按编号获取字典
   * @param id 键
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<DictResponse> {
    return this.service.get(id);
  }

  /**
   * 删除字典
   * @param id 键
   */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

}
