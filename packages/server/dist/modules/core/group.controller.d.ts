import { ServiceContext } from 'typescript-rest';
import { GroupService } from './group.service';
import { Appearance } from '../../types/appearance';
import { GroupResponse, CreateGroupDto, EditGroupDto, PaginateGroup } from './dto/group.dto';
import { KeyValue, TreeNode } from '../../types/data.types';
/**
 * 用户组接口.
 */
export declare class GroupController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: GroupService);
    /**
     * 获取用户组管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 查询用户组
     * @param keyword 关键词
     * @param value 已选中的用户组编号
     */
    search(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    searchTree(keyword?: string, value?: string): Promise<Array<TreeNode>>;
    /**
     * 创建用户组
     * @param entry 创建参数
     */
    create(entry: CreateGroupDto): Promise<GroupResponse>;
    /**
     * 更新用户组
     * @param entry 用户组参数
     */
    update(entry: EditGroupDto): Promise<GroupResponse>;
    /**
     * 查询用户组
     * @param keyword
     * @param isRegion
     * @param page
     * @param size
     * @param sort
     */
    query(keyword?: string, isRegion?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateGroup>;
    /**
   * 删除用户组
   * @param id 用户组编号
   */
    remove(id: string): Promise<boolean>;
    /**
     * 查询用户组
     * @param id 用户组编号
     */
    get(id: string): Promise<GroupResponse>;
}
