import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Context, ServiceContext, Preprocessor } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Appearance } from './../../types/appearance';
import { PageService } from './page.service';
import { KeyValue } from '../../types/data.types';
import { CreatePageDto, PageResponse, EditPageDto, PaginatePage } from './dto/page.dto';
import { interceptor } from '../../interceptor/interceptor';


@Tags('cms')
@Path('/api/page')
@Preprocessor(interceptor)
export class PageController {

    @Context context: ServiceContext;
    constructor(private readonly service = new PageService()) { }

    /**
     * 获取页面管理界面配置信息.
     */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }


    /**
     * 查询页面
     * @param keyword 关键词
     * @param value 已选中的页面编号
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
     * 创建页面
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreatePageDto): Promise<PageResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新页面
     * @param entry 页面参数
     */
    @PUT
    async update(entry: EditPageDto): Promise<PageResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询页面数据
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
    ): Promise<PaginatePage> {
        return this.service.query(keyword, page, size, sort);
    }


    /**
   * 删除页面
   * @param id 页面编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询页面
     * @param id 页面编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<PageResponse> {
        return this.service.get(id);
    }



}