import { ServiceContext } from 'typescript-rest';
import { Appearance } from './../../types/appearance';
import { AccountService } from './account.service';
import { CreateAccountDto, EditAccountDto, AccountResponse } from './dto/account.dto';
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
     * 按关键词查询账号
     *
     * @param {string} [keyword]
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]>;
    /**
     * * 按分类获取帐号数据
     *
     * @param {string} category 分类键名
     * @returns {Promise<AccountResponse[]>}
     * @memberof AccountController
     */
    getAccountByCategory(category: string): Promise<AccountResponse[]>;
}
