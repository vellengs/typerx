import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UISchema, PaginateResponse } from 'modex';
import { Helper } from '../utils/helper';
import { Db } from '../database';
import { Log } from '../schemas';

/**
 * 日志.
 */
@Tags('base')
@Path('/api/log')
export class LogController {

    /**
      * 获取日志界面配置信息.
      */

    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Log');
    }


    /**
     * * 按分类获取字典数据
     * 
     * @param {string} category 分类键名
     * @returns {Promise<Log[]>} 
     * @memberof LogController
     */
    @Path('category/:category')
    @GET
    async getLogByCategory( @PathParam('category') category: string): Promise<Log[]> {
        const docs = await Db.log.find({ category: category }).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.flat() as Log;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建日志
     * 
     * @param {Log} entry 
     * @returns {Promise<Log>} 
     * @memberof LogController
     */
    @POST
    async create(entry: Log): Promise<Log> {
        return Helper.create('Log', entry);
    }


    /**
     * * 更新日志
     * 
     * @param {Log} entry 
     * @returns {Promise<Log>} 
     * @memberof LogController
     */
    @PUT
    async update(entry: Log): Promise<Log> {
        return Helper.update('Log', entry);
    }


    /**
     * 分页查询日志
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Log[]>>} 
     * @memberof LogController
     */
    @Path('query')
    @GET
    async getPaged(

        @QueryParam('keyword') keyword?: string,
        @QueryParam('category') category?: string,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Log[]>> {


        let kw: any;
        if (keyword) {
            kw = new RegExp(keyword, 'i');
        }

        return Helper.getPagedData<Log>('Log', page, size, [], sort, {
            name: kw,
            category: category
        });
    }

    /**
     * 删除字典信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof LogController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Log', id);
    }


    /**
     * 查询日志
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Log> {
        return Helper.get('Log', id);
    }

}
