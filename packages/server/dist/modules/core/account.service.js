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
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Account(entry);
            const result = yield doc.save();
            return this.pure(result);
        });
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
            return this.pure(user);
        });
    }
    query(keyword, group, role, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page > 0 ? page : 0 || 1;
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
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
            'expired',
        ]);
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map