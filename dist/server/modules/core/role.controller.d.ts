import { ServiceContext } from 'typescript-rest';
import { PaginateResponse, Appearance } from '../../types/appearance';
import { KeyValue } from '../../types/data.types';
import { CreateRoleDto, RoleResponse, EditRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
/**
 * 角色管理.
 */
export declare class RoleController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: RoleService);
    /**
     * 获取角色管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 搜索角色
     * @param keyword 关键词
     * @param value 键
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 创建角色
     * @param entry 设置项实体
     */
    create(entry: CreateRoleDto): Promise<RoleResponse>;
    /**
     * 更新角色
     * @param entry 设置项实体
     */
    update(entry: EditRoleDto): Promise<RoleResponse>;
    /**
     * 分页查询角色
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<RoleResponse>>>;
    /**
     * 按编号获取角色
     * @param id 键
     */
    get(id: string): Promise<RoleResponse>;
    /**
     * 删除角色
     * @param id 键
     */
    remove(id: string): Promise<boolean>;
}
