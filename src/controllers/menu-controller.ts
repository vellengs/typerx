import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Example, Tags } from 'typescript-rest-swagger';
import { UISchema, Helper, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Menu } from './../schemas';

/**
 * 获取菜单y.
 */
@Tags('base')
@Path('/api/menu')
export class MenuController {

    /**
      * 获取菜单管理界面配置信息.
      */
    @Example<UISchema>({
        entry: {
            name: {
                title: '名字',
                description: '名字描述',
                widget: 'input',
                type: 'string'
            },
            birthday: {
                title: '生日',
                description: '生日描述',
                widget: 'date',
                type: 'string'
            },
        },
        columns: [
            {
                field: 'name',
                header: '名字',
            }
        ]
    })
    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Menu');
    }


    /**
     * * 按分类获取菜单数据
     * 
     * @param {string} category 分类键名
     * @returns {Promise<Menu[]>} 
     * @memberof MenuController
     */
    @Path('category/:category')
    @GET
    async getMenuByCategory( @PathParam('category') category: string): Promise<Menu[]> {
        const docs = await Db.menu.find({ category: category }).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Menu;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建菜单表
     * 
     * @param {Menu} entry 
     * @returns {Promise<Menu>} 
     * @memberof MenuController
     */
    @POST
    async create(entry: Menu): Promise<Menu> {
        return Helper.create('Menu', entry);
    }


    /**
     * * 更新菜单表
     * 
     * @param {Menu} entry 
     * @returns {Promise<Menu>} 
     * @memberof MenuController
     */
    @PUT
    async update(entry: Menu): Promise<Menu> {
        return Helper.update('Menu', entry);
    }


    /**
     * 分页查询菜单表
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Menu[]>>} 
     * @memberof MenuController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Menu[]>> {
        return Helper.getPagedData<Menu>('Menu', page, size, [], sort);
    }

    /**
     * 删除菜单信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof MenuController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Menu', id);
    }


    /**
     * 查询菜单
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Menu> {
        return Helper.get('Menu', id);
    }
}
