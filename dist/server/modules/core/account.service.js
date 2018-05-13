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
const typescript_rest_1 = require("typescript-rest");
const core_database_1 = require("./core.database");
const helper_1 = require("../../util/helper");
class AccountService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getAccountsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = yield core_database_1.CoreDatabase.Account.find(query)
                .limit(25)
                .exec();
            const result = docs.map(doc => {
                return {
                    username: doc.username,
                    nick: doc.nick,
                    avatar: doc.avatar,
                    type: doc.type,
                    email: doc.email,
                    mobile: doc.mobile,
                    roles: doc.roles,
                    isDisable: doc.isDisable,
                    isAdmin: doc.isAdmin,
                    isApproved: doc.isApproved,
                    expired: doc.expired,
                };
            });
            return result;
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Account(entry);
            const result = yield doc.save();
            const picked = (({ username, nick, avatar, type, email, mobile, roles, isDisable, isAdmin, isApproved, expired }) => ({
                username,
                nick,
                avatar,
                type,
                email,
                mobile,
                roles,
                isDisable,
                isAdmin,
                isApproved,
                expired
            }))(result);
            return picked;
        });
    }
    valuable(value) {
        return value;
    }
    update(entry, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (admin && admin.isAdmin) {
                const doc = yield core_database_1.CoreDatabase.Account.findOneAndUpdate({
                    _id: entry.id,
                }, entry).exec();
                return doc;
            }
            else {
                throw new typescript_rest_1.Errors.ForbiddenError('禁止非管理员更新账号信息！');
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return helper_1.Helper.remove(core_database_1.CoreDatabase.Account, id);
        });
    }
    profile(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = context.request;
            return {
                id: user.id,
                name: user.name,
            };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = helper_1.Helper.get(core_database_1.CoreDatabase.Account, id, [
                {
                    path: 'roles',
                    select: 'name',
                },
            ]);
            return result;
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map