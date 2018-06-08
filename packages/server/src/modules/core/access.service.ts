
import { CoreDatabase as Db } from './core.database';


export class AccessService {

    static PermissionTags = {
        CanAddAccount: '是否允许添加帐号',
        CanEditAccount: '是否允许编辑帐号',
        CanRemoveAccount: '是否允许删除帐号',
    }

    /**
     * 当前登录帐号是否可以修改负责人
     * @param accountId 当前登录账号
     */
    static async canEditAccount(accountId: string, isAdmin?: boolean) {

        if (isAdmin) {
            return true;
        }
        const key = 'CanEditAccount';
        const permissions: any[] = await this.permissions(accountId) || [];
        const hasPermission = permissions.findIndex((p: any) => {
            return p.link === key;
        });

        return hasPermission > -1;
    }


    /**
     * 获取用户的所有访问权限
     * @param accountId 用户编号
     */
    static async permissions(accountId: string) {

        const account = await Db.Account.findOne({ _id: accountId }, 'roles').exec();
        if (!account) {
            return [];
        }
        const roles = account.roles || [];
        const docs = await Db.Role.find({
            _id: { $in: roles }
        }, 'permissions').exec() || [];
        const permissions: string[] = [];

        docs.forEach((r) => {
            permissions.push(...r.permissions);
        });

        const menus = await Db.Menu.find({
            _id: {
                $in: permissions
            },
            isMenu: false
        }, 'link');

        return menus as any;
    }

}