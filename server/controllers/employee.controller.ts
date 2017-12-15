import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Example, Tags } from 'typescript-rest-swagger';
import { UISchema, Helper, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Employee } from './../schemas';

/**
 * 获取菜单.
 */
@Tags('crm')
@Path('/api/employee')
export class EmployeeController {

    /**
      * 获取员工管理界面配置信息.
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
        return Helper.getUISchema(`${__dirname}/../models`, 'Employee');
    }


    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Employee[]>} 
     * @memberof EmployeeController
     */
    @Path('search')
    @GET
    async getEmployeeByKeyword( @QueryParam('keyword') keyword?: string): Promise<Employee[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.employee.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Employee;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建员工表
     * 
     * @param {Employee} entry 
     * @returns {Promise<Employee>} 
     * @memberof EmployeeController
     */
    @POST
    async create(entry: Employee): Promise<Employee> {
        return Helper.create('Employee', entry);
    }


    /**
     * * 更新员工表
     * 
     * @param {Employee} entry 
     * @returns {Promise<Employee>} 
     * @memberof EmployeeController
     */
    @PUT
    async update(entry: Employee): Promise<Employee> {
        return Helper.update('Employee', entry);
    }


    /**
     * 分页查询员工表
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Employee[]>>} 
     * @memberof EmployeeController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Employee[]>> {
        return Helper.getPagedData<Employee>('Employee', page, size, [], sort);
    }

    /**
     * 删除员工信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof EmployeeController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Employee', id);
    }


    /**
     * 查询员工表
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Employee> {
        return Helper.get('Employee', id);
    }

}
