import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, ServiceContext, Context } from 'typescript-rest';
import { Example, Tags } from 'typescript-rest-swagger';
import { UISchema, Helper, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Customer } from './../schemas';

/**
 * * 获取客户信息
 * 
 * @export
 * @class CustomerController
 */
@Tags('crm')
@Path('/api/customer')
export class CustomerController {

    @Context
    context: ServiceContext;

    /**
     * 获取客户管理界面配置信息.
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
        return Helper.getUISchema('Customer');
    }


    /**
     * 查询关键词
     * 
     * @param {string} [keyword] 
     * @returns {Promise<Customer[]>} 
     * @memberof CustomerController
     */
    @Path('search')
    @GET
    async getCustomerByKeyword( @QueryParam('keyword') keyword?: string): Promise<Customer[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const docs = await Db.Customer.find(query).limit(25).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Customer;
            });
        } else {
            return null;
        }
    }

    /**
     * 创建客户信息
     * 
     * @param {Customer} entry 客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController 
     */
    @POST
    async create(entry: Customer): Promise<Customer> {
        return Helper.create('Customer', entry);
    }


    /**
     * 更新客户信息
     * 
     * @param {Customer} entry  客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController
    * */
    @PUT
    async update(entry: Customer): Promise<Customer> {
        return Helper.update('Customer', entry);
    }



    /**
     * 查询客户信息
     * 
     * @param {string} [keyword] 关键词
     * @param {string} [primary_adviser] 主负责人
     * @param {string} [secondary_advisers] 副负责人
     * @param {number} [intent] 意向程度
     * @param {string} [status] 客户状态
     * @param {number} [page] 第几页
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @param {number} [type] 客户归类 1. 待分配客户 2. 已分配客户 3. 已回收客户 4. 今日新增客户
     * @returns {Promise<PaginateResponse<Customer[]>>}  
     * @memberof CustomerController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('keyword') keyword?: string,
        @QueryParam('primary_adviser') primary_adviser?: string,
        @QueryParam('secondary_advisers') secondary_advisers?: string,
        @QueryParam('intent') intent?: number,
        @QueryParam('status') status?: string,
        @QueryParam('type') type?: number,
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Customer[]>> {

        return Helper.getPagedData<Customer>('Customer', page, size,
            [
                {
                    path: 'primary_adviser', select: 'name'
                },
                {
                    path: 'secondary_advisers', select: 'name'
                }],
            sort,
            {
                primary_adviser: primary_adviser,
                secondary_advisers: secondary_advisers,
                intent: intent,
                status: status,
                type: type,
                name: new RegExp(keyword, 'i')
            }
        );
    }


    @Path('test')
    @GET
    async getCollections(): Promise<any> {

        let res = await Db.Customer.find().populate('secondary_advisers', 'name');

        return res as any;
        // return null;
    }


    /**
     * 查询客户信息
     * 
     * @param {string} id 客户编号
     * @returns {Promise<Customer>} 
     * @memberof CustomerController
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Customer> {
        return Helper.get('Customer', id);
    }


    /**
     * 删除客户信息
     * 
     * @param {string} id 客户编号
     * @returns {Promise<boolean>} 
     * @memberof CustomerController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Customer', id);
    }
}
