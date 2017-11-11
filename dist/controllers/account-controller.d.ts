import { Account } from './../schemas';
/**
 * This is a demo operation to show how to use typescript-rest library.
 */
export declare class AccountController {
    /**
     * 通过姓名获取帐号信息.
     * @param name The name
     */
    getName(name: string): Promise<Account>;
}
