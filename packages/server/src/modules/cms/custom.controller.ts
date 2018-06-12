import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Context, ServiceContext } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { CustomService } from './custom.service';
import { KeyValue } from '../../types/data.types';
import { CreateCustomDto, CustomResponse, EditCustomDto, PaginateCustom } from './dto/custom.dto';


@Tags('cms')
@Path('/api/custom')
export class CustomController {

    @Context context: ServiceContext;
    constructor(private readonly service = new CustomService()) { }

    /** 
     * 
     * 获取自定义内容管理界面配置信息
     * @param type 自定义内容集名
     */
    @Path('config')
    @GET
    async getConfig(@QueryParam('type') type: string): Promise<Appearance> {
        return this.service.getAppearance(type);
    }

    /**
     * 查询自定义内容
     * @param keyword 关键词
     * @param value 已选中的自定义内容编号
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
     * 创建自定义内容
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreateCustomDto): Promise<CustomResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新自定义内容
     * @param entry 自定义内容参数
     */
    @PUT
    async update(entry: EditCustomDto): Promise<CustomResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询自定义内容数据
     * @param keyword 关键词
     * @param custom 第几页
     * @param size 页大小
     * @param sort 排序
     */
    @Path('query')
    @GET
    async query(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('category') category?: string,
        @QueryParam('type') type?: string,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string
    ): Promise<PaginateCustom> {
        return this.service.query(keyword, category, type, page, size, sort);
    }

    /**
   * 删除自定义内容
   * @param id 自定义内容编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询自定义内容
     * @param id 自定义内容编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<CustomResponse> {
        return this.service.get(id);
    }



}