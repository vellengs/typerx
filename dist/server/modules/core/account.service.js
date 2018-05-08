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
class AccountService {
    constructor(context) {
        this.context = context;
    }
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getAccountsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = yield core_database_1.CoreDatabase.Account.find(query).limit(25).exec();
            console.log('docs:', docs);
            return docs;
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Account(entry);
            return yield doc.save();
        });
    }
    update(entry, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (admin && admin.isAdmin) {
                const doc = yield core_database_1.CoreDatabase.Account.findOneAndUpdate({
                    _id: entry.id
                }, entry).exec();
                return doc;
            }
            else {
                throw new typescript_rest_1.Errors.ForbiddenError('禁止非管理员更新账号信息！');
            }
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map