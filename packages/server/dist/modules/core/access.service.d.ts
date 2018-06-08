export declare class AccessService {
    static PermissionTags: {
        CanAddAccount: string;
        CanEditAccount: string;
        CanRemoveAccount: string;
    };
    /**
     * 当前登录帐号是否可以修改负责人
     * @param accountId 当前登录账号
     */
    static canEditAccount(accountId: string, isAdmin?: boolean): Promise<boolean>;
    /**
     * 获取用户的所有访问权限
     * @param accountId 用户编号
     */
    static permissions(accountId: string): Promise<any>;
}
