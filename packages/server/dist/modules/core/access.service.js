"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_database_1 = require("./core.database");
class AccessService {
    /**
     * 当前登录帐号是否可以修改负责人
     * @param accountId 当前登录账号
     */
    static canEditAccount(accountId, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isAdmin) {
                return true;
            }
            const key = 'CanEditAccount';
            const permissions = (yield this.permissions(accountId)) || [];
            const hasPermission = permissions.findIndex((p) => {
                return p.link === key;
            });
            return hasPermission > -1;
        });
    }
    /**
     * 获取用户的所有访问权限
     * @param accountId 用户编号
     */
    static permissions(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield core_database_1.CoreDatabase.Account.findOne({ _id: accountId }, 'roles').exec();
            if (!account) {
                return [];
            }
            const roles = account.roles || [];
            const docs = (yield core_database_1.CoreDatabase.Role.find({
                _id: { $in: roles }
            }, 'permissions').exec()) || [];
            const permissions = [];
            docs.forEach((r) => {
                permissions.push(...r.permissions);
            });
            const menus = yield core_database_1.CoreDatabase.Menu.find({
                _id: {
                    $in: permissions
                },
                isMenu: false
            }, 'link');
            return menus;
        });
    }
}
AccessService.PermissionTags = {
    CanAddAccount: '是否允许添加帐号',
    CanEditAccount: '是否允许编辑帐号',
    CanRemoveAccount: '是否允许删除帐号',
};
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map