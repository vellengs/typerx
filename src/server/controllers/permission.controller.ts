import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, ServiceContext, Context } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Permission } from './../schemas';
import { Helper } from '../utils/helper';

/**
 * * 获取权限信息
 * 
 * @export
 * @class PermissionController
 */
@Tags('system')
@Path('/api/permission')
export class PermissionController {

    @Context
    context: ServiceContext;

    /**
     * 获取权限管理界面配置信息.
     */

    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Permission');
    }

    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Permission[]>} 
     * @memberof PermissionController
     */
    @Path('search')
    @GET
    async getPermissionByKeyword( @QueryParam('keyword') keyword?: string): Promise<Permission[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.permission.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.flat() as Permission;
            });
        } else {
            return [];
        }
    }

    /**
     * 创建权限信息
     * 
     * @param {Permission} entry 权限实例json
     * @returns {Promise<Permission>} 权限实例
     * @memberof PermissionController 
     */
    @POST
    async create(entry: Permission): Promise<Permission> {
        return Helper.create('Permission', entry);
    }


    /**
     * 更新权限信息
     * 
     * @param {Permission} entry  权限实例json
     * @returns {Promise<Permission>} 权限实例
     * @memberof PermissionController
    * */
    @PUT
    async update(entry: Permission): Promise<Permission> {
        return Helper.update('Permission', entry);
    }


    /**
     * 查询设置项
     * @param keyword 
     * @param status 
     * @param page 
     * @param size 
     * @param sort 
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('status') status?: number,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Permission[]>> {
        return Helper.getPagedData<Permission>('Permission', page, size, [], sort, {
            name: new RegExp(keyword, 'i'),
            status: status,
            created: { 'created': { '$lt': new Date('2017'), '$gt': new Date('2018') } },
        });
    }


    /**
     * 查询权限信息
     * 
     * @param {string} id 权限编号
     * @returns {Promise<Permission>} 
     * @memberof PermissionController
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Permission> {
        return Helper.get('Permission', id);
    }


    /**
     * 删除权限信息
     * 
     * @param {string} id 权限编号
     * @returns {Promise<boolean>} 
     * @memberof PermissionController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Permission', id);
    }
}
