import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { CreateAccountDto, EditAccountDto, AccountResponse, PaginateAccount } from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
import { KeyValue } from '../../types/data.types';
/**
 * 帐号管理.
 */
export declare class AccountController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: AccountService);
    /**
     * 创建帐号
     * @param entry 帐号信息
     */
    create(entry: CreateAccountDto): Promise<AccountResponse>;
    /**
     * 更新帐号
     * @param entry 帐号信息
     */
    update(entry: EditAccountDto): Promise<AccountResponse>;
    /**
     * 获取帐号管理界面配置信息.
     */
    getConfig(): Promise<Appearance>;
    /**
     * 按关键词查询帐号
     *
     * @param {string} [keyword]
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountsByKeyword(keyword?: string, value?: string): Promise<Array<KeyValue>>;
    /**
     * 添加用户到角色
     * @param role 角色编号
     * @param accountIds 用户编号序列
     */
    addAccountsToRole(role: string, accountIds: string[] | string): Promise<boolean>;
    /**
     * 从角色中删除用户
     * @param role 角色编号
     * @param accountId
     */
    removeAccountFromRole(role: string, accountId: string): Promise<boolean>;
    /**
     * 分页查询帐号数据
     * @param keyword 关键词
     */
    query(keyword?: string, group?: string, role?: string, page?: number, size?: number, sort?: string): Promise<PaginateAccount>;
    /**
     * 帐户信息
     */
    profile(): Promise<ProfileResponse>;
    /**
     * 删除帐号
     * @param id 帐号编号
     */
    remove(id: string): Promise<boolean>;
    /**
     * 查询帐号
     * @param id 编号
     */
    get(id: string): Promise<AccountResponse>;
}
