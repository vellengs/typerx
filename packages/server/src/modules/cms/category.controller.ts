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
import { CategoryService } from './category.service';
import { Appearance } from '../../types/appearance';
import { CategoryResponse, CreateCategoryDto, EditCategoryDto, PaginateCategory } from './dto/category.dto';
import { KeyValue } from '../../types/data.types';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 分类接口.
 */
@Tags('cms')
@Path('api/category')
@Preprocessor(interceptor)
export class CategoryController {
    @Context context: ServiceContext;
    constructor(private readonly service = new CategoryService()) { }

    /**
     * 获取分类管理界面配置信息.
     */
    @Path('config')
    @GET
    async getConfig(): Promise<Appearance> {
        return this.service.getAppearance();
    }

    /**
     * 查询分类
     * @param keyword 关键词
     * @param value 已选中的分类编号
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
     * 创建分类
     * @param entry 创建参数
     */
    @POST
    async create(entry: CreateCategoryDto): Promise<CategoryResponse> {
        return this.service.create(entry);
    }


    /**
     * 更新分类
     * @param entry 分类参数
     */
    @PUT
    async update(entry: EditCategoryDto): Promise<CategoryResponse> {
        return this.service.update(entry);
    }

    /**
     * 查询分类数据
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
    ): Promise<PaginateCategory> {
        return this.service.query(keyword, page, size, sort);
    }


    /**
   * 删除分类
   * @param id 分类编号
   */
    @Path(':id')
    @DELETE
    async remove(@PathParam('id') id: string): Promise<boolean> {
        return this.service.remove(id);
    }

    /**
     * 查询分类
     * @param id 分类编号
     */
    @Path(':id')
    @GET
    async get(@PathParam('id') id: string): Promise<CategoryResponse> {
        return this.service.get(id);
    }


}
