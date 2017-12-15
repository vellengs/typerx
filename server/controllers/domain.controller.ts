import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Domain } from './../schemas';
import { Helper } from '../utils/helper';


/**
 * 获取领域y.
 */
@Tags('base')
@Path('/api/domain')
export class DomainController {

    /**
      * 获取领域管理界面配置信息.
      */
    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Domain');
    }


    /**
     * * 按分类获取领域数据
     * 
     * @param {string} category 分类键名
     * @returns {Promise<Domain[]>} 
     * @memberof DomainController
     */
    @Path('category/:category')
    @GET
    async getDomainByCategory( @PathParam('category') category: string): Promise<Domain[]> {
        const docs = await Db.domain.find({ category: category }).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Domain;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建领域表
     * 
     * @param {Domain} entry 
     * @returns {Promise<Domain>} 
     * @memberof DomainController
     */
    @POST
    async create(entry: Domain): Promise<Domain> {
        return Helper.create('Domain', entry);
    }


    /**
     * * 更新领域表
     * 
     * @param {Domain} entry 
     * @returns {Promise<Domain>} 
     * @memberof DomainController
     */
    @PUT
    async update(entry: Domain): Promise<Domain> {
        return Helper.update('Domain', entry);
    }


    /**
     * 分页查询领域表
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Domain[]>>} 
     * @memberof DomainController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Domain[]>> {
        return Helper.getPagedData<Domain>('Domain', page, size, [], sort);
    }

    /**
     * 删除领域信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof DomainController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Domain', id);
    }


    /**
     * 查询领域
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Domain> {
        return Helper.get('Domain', id);
    }
}
