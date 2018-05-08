import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Role } from './../schemas';
import { Helper } from '../utils/helper';


/**
 * 角色管理.
 */
@Tags('base')
@Path('/api/role')
export class RoleController {

    /**
      * 获取角色管理界面配置信息.
      */
    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {

        return Helper.getUISchema('Role');
    }


    /**
     * 按关键词查询账号
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Role[]>} 
     * @memberof RoleController
     */
    @Path('search')
    @GET
    async getRolesByKeyword( @QueryParam('keyword') keyword?: string): Promise<Role[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.role.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.flat() as Role;
            });
        } else {
            return [];
        }
    }



    /**
     * * 创建角色
     * 
     * @param {Role} entry 
     * @returns {Promise<Role>} 
     * @memberof RoleController
     */
    @POST
    async create(entry: Role): Promise<Role> {
        return Helper.create('Role', entry);
    }


    /**
     * * 更新角色
     * 
     * @param {Role} entry 
     * @returns {Promise<Role>} 
     * @memberof RoleController
     */
    @PUT
    async update(entry: Role): Promise<Role> {
        return Helper.update('Role', entry);
    }


    /**
     * 分页查询角色
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Role[]>>} 
     * @memberof RoleController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Role[]>> {
        return Helper.getPagedData<Role>('Role', page, size, [], sort);
    }

    /**
     * 删除角色信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof RoleController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Role', id);
    }


    /**
     * 查询角色
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Role> {
        return Helper.get('Role', id);
    }
}
