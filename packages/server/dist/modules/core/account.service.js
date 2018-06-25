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
const account_dto_1 = require("./dto/account.dto");
const account_appearance_1 = require("./appearance/account.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
const helper_1 = require("../../util/helper");
const bson_1 = require("bson");
class AccountService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return account_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Account, keyword, value, '', limit, 'nick');
        });
    }
    setKeyWord(entry) {
        let keyword = helper_1.Helper.genPinyinKeywords(entry.nick, true);
        keyword.push(entry.email);
        keyword.push(entry.mobile);
        keyword.push(entry.nick);
        entry.keyword = keyword.join('');
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Account(entry);
            this.setKeyWord(entry);
            const result = yield doc.save();
            return this.pure(result);
        });
    }
    update(entry, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (admin && admin.isAdmin) {
                this.setKeyWord(entry);
                const doc = yield core_database_1.CoreDatabase.Account.findOneAndUpdate({
                    _id: entry.id,
                }, entry, {
                    new: true
                }).exec();
                return doc;
            }
            else {
                throw new typescript_rest_1.Errors.ForbiddenError('禁止非管理员更新帐号信息！');
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Account, id);
        });
    }
    profile(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = context.request;
            return user;
        });
    }
    query(keyword, group, role, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { keyword: new RegExp(keyword, 'i') } : {};
            if (group) {
                const ids = yield repository_1.Repository.deeplyFind(core_database_1.CoreDatabase.Group, group);
                condition.groups = {
                    $in: ids
                };
            }
            if (role) {
                condition.roles = {
                    $in: [role]
                };
            }
            const query = core_database_1.CoreDatabase.Account.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Account.find(condition);
            const result = repository_1.Repository.query(query, collection, page, size, account_dto_1.AccountResponseFields);
            return result;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Account, id);
            return this.pure(result);
        });
    }
    removeAccountFromRole(role, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role && accountId) {
                yield core_database_1.CoreDatabase.Account.update({
                    _id: {
                        $in: accountId
                    }
                }, { $pullAll: { roles: [role] } }, { multi: true }).exec();
            }
            return true;
        });
    }
    addAccountsToRole(role, accountIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(accountIds) && bson_1.ObjectId.isValid(accountIds)) {
                accountIds = [accountIds];
            }
            if (role && Array.isArray(accountIds)) {
                const existIds = (yield core_database_1.CoreDatabase.Account.find({
                    _id: {
                        $in: accountIds
                    },
                    roles: {
                        $in: [role]
                    }
                }, { _id: 1 }).exec());
                const exists = (existIds || []).map((item) => item._id.toString());
                const ids = accountIds.filter((id) => {
                    return exists.indexOf(id) === -1;
                });
                const effects = yield core_database_1.CoreDatabase.Account.update({
                    _id: {
                        $in: ids
                    }
                }, { $push: { roles: role } }, { multi: true }).exec();
            }
            return true;
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'username',
            'nick',
            'avatar',
            'type',
            'email',
            'groups',
            'roles',
            'mobile',
            'isDisable',
            'isAdmin',
            'isApproved',
            'profile',
            'expired',
        ]);
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map