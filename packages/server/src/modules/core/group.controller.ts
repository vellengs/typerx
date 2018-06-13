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
import { GroupService } from './group.service';
import { Appearance } from '../../types/appearance';
import { GroupResponse, CreateGroupDto, EditGroupDto, PaginateGroup } from './dto/group.dto';
import { KeyValue } from '../../types/data.types';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 用户组接口.
 */
@Tags('core')
@Path('api/group')
@Preprocessor(interceptor)
export class GroupController {
  @Context context: ServiceContext;
  constructor(private readonly service = new GroupService()) { }

  /**
   * 获取用户组管理界面配置信息.
   */
  @Path('config')
  @GET
  async getConfig(): Promise<Appearance> {
    return this.service.getAppearance();
  }


  /**
   * 查询用户组
   * @param keyword 关键词
   * @param value 已选中的用户组编号
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
   * 创建用户组
   * @param entry 创建参数
   */
  @POST
  async create(entry: CreateGroupDto): Promise<GroupResponse> {
    return this.service.create(entry);
  }


  /**
   * 更新用户组
   * @param entry 用户组参数
   */
  @PUT
  async update(entry: EditGroupDto): Promise<GroupResponse> {
    return this.service.update(entry);
  }


  /**
   * 查询用户组
   * @param keyword 
   * @param isRegion 
   * @param page 
   * @param size 
   * @param sort 
   */
  @Path('query')
  @GET
  async query(
    @QueryParam('keyword') keyword?: string,
    @QueryParam('isRegion') isRegion?: boolean,
    @QueryParam('page') page?: number,
    @QueryParam('size') size?: number,
    @QueryParam('sort') sort?: string
  ): Promise<PaginateGroup> {
    return this.service.query(keyword, isRegion, page, size, sort);
  }

  /**
 * 删除用户组
 * @param id 用户组编号
 */
  @Path(':id')
  @DELETE
  async remove(@PathParam('id') id: string): Promise<boolean> {
    return this.service.remove(id);
  }

  /**
   * 查询用户组
   * @param id 用户组编号
   */
  @Path(':id')
  @GET
  async get(@PathParam('id') id: string): Promise<GroupResponse> {
    return this.service.get(id);
  }


}
