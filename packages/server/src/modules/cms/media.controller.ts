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
import { MediaService } from './media.service';
import { Appearance } from '../../types/appearance';
import { MediaResponse, CreateMediaDto, EditMediaDto, PaginateMedia } from './dto/media.dto';
import { KeyValue } from '../../types/data.types';

/**
 * 媒体接口.
 */
@Tags('core')
@Path('api/media')
export class MediaController {
    @Context context: ServiceContext;
    constructor(private readonly service = new MediaService()) { }

    /**
     * 获取媒体管理界面配置信息.
     */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }

    /**
     * 查询媒体
     * @param keyword 关键词
     * @param value 已选中的媒体编号
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
     * 创建媒体
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreateMediaDto): Promise<MediaResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新媒体
     * @param entry 媒体参数
     */
    @PUT
    async update(entry: EditMediaDto): Promise<MediaResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询媒体数据
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    @Path('query')
    @GET
    async query(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('isMedia') isMedia?: boolean,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string
    ): Promise<PaginateMedia> {
        return this.service.query(keyword, isMedia, page, size, sort);
    }


    /**
   * 删除媒体
   * @param id 媒体编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询媒体
     * @param id 媒体编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<MediaResponse> {
        return this.service.get(id);
    }
}
