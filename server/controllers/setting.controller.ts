import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, ServiceContext, Context } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Setting } from './../schemas';
import { Helper } from '../utils/helper';

/**
 * * 获取文章分类信息
 * 
 * @export
 * @class SettingController
 */
@Tags('system')
@Path('/api/setting')
export class SettingController {

    @Context
    context: ServiceContext;

    /**
     * 获取文章分类管理界面配置信息.
     */

    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Setting');
    }


    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Setting[]>} 
     * @memberof SettingController
     */
    @Path('search')
    @GET
    async getSettingByKeyword( @QueryParam('keyword') keyword?: string): Promise<Setting[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.setting.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.flat() as Setting;
            });
        } else {
            return [];
        }
    }

    /**
     * 创建文章分类信息
     * 
     * @param {Setting} entry 文章分类实例json
     * @returns {Promise<Setting>} 文章分类实例
     * @memberof SettingController 
     */
    @POST
    async create(entry: Setting): Promise<Setting> {
        return Helper.create('Setting', entry);
    }


    /**
     * 更新文章分类信息
     * 
     * @param {Setting} entry  文章分类实例json
     * @returns {Promise<Setting>} 文章分类实例
     * @memberof SettingController
    * */
    @PUT
    async update(entry: Setting): Promise<Setting> {
        return Helper.update('Setting', entry);
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
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Setting[]>> {
        return Helper.getPagedData<Setting>('Menu', page, size, [], sort, {
            name: new RegExp(keyword, 'i'),
            status: status,
            created: { 'created': { '$lt': new Date('2017'), '$gt': new Date('2018') } },
        });
    }


    /**
     * 查询文章分类信息
     * 
     * @param {string} id 文章分类编号
     * @returns {Promise<Setting>} 
     * @memberof SettingController
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Setting> {
        return Helper.get('Setting', id);
    }


    /**
     * 删除文章分类信息
     * 
     * @param {string} id 文章分类编号
     * @returns {Promise<boolean>} 
     * @memberof SettingController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Setting', id);
    }
}
