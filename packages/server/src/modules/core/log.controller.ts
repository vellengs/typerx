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
import { KeyValue } from '../../types/data.types';
import { LogService } from './log.service';
import { LogResponse, PaginateLog } from './dto/log.dto';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 系统日志.
 */
@Tags('core')
@Path('/api/log')
@Preprocessor(interceptor)
export class LogController {
  @Context context: ServiceContext;
  constructor(private readonly service = new LogService()) { }

  /**
   * 获取日志管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }

  /**
   * 搜索日志
   * @param keyword 关键词
   * @param value 键
   */
  @Path('search')
  @GET
  async search(@QueryParam('keyword') keyword?: string,
    @QueryParam('value') value?: string,
  ): Promise<Array<KeyValue>> {
    return this.service.search(keyword, value);
  }

  /**
   * 分页查询日志
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
    @QueryParam('sort') sort?: string): Promise<PaginateLog> {
    return this.service.query(keyword, page, size, sort);
  }

  /**
   * 按编号获取日志
   * @param id 键
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<LogResponse> {
    return this.service.get(id);
  }

}
