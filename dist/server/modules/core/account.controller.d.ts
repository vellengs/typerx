import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { Account } from './interfaces/account.interface';
/**
 * 帐号管理.
 */
export declare class AccountController {
    private readonly service;
    context: ServiceContext;
    constructor(service: AccountService);
    /**
     * 创建帐号表
     *
     * @param {Account} entry
     * @returns {Promise<Account>}
     * @memberof AccountController
     */
    create(entry: Account): Promise<Account>;
    /**
     * 更新帐号表
     *
     * @param {Account} entry
     * @returns {Promise<Account>}
     * @memberof AccountController
     */
    update(entry: Account): Promise<Account>;
    /**
      * 获取帐号管理界面配置信息.
      */
    getConfig(): Promise<Appearance>;
    /**
     * 按关键词查询账号
     *
     * @param {string} [keyword]
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountsByKeyword(keyword?: string): Promise<Account[]>;
    /**
     * * 按分类获取帐号数据
     *
     * @param {string} category 分类键名
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountByCategory(category: string): Promise<Account[]>;
}
