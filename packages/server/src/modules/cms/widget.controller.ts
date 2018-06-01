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
import { WidgetService } from './widget.service';
import { Appearance } from '../../types/appearance';
import { WidgetResponse, CreateWidgetDto, EditWidgetDto, PaginateWidget } from './dto/widget.dto';
import { KeyValue } from '../../types/data.types';

/**
 * 小部件接口.
 */
@Tags('cms')
@Path('api/widget')
export class WidgetController {
    @Context context: ServiceContext;
    constructor(private readonly service = new WidgetService()) { }

    /**
     * 获取小部件管理界面配置信息.
     */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }

    /**
     * 查询小部件
     * @param keyword 关键词
     * @param value 已选中的小部件编号
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
     * 创建小部件
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreateWidgetDto): Promise<WidgetResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新小部件
     * @param entry 小部件参数
     */
    @PUT
    async update(entry: EditWidgetDto): Promise<WidgetResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询小部件数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    @Path('query')
    @GET
    async query(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('isWidget') isWidget?: boolean,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string
    ): Promise<PaginateWidget> {
        return this.service.query(keyword, isWidget, page, size, sort);
    }


    /**
   * 删除小部件
   * @param id 小部件编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询小部件
     * @param id 小部件编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<WidgetResponse> {
        return this.service.get(id);
    }
}
