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
const lodash_1 = require("lodash");
const role_dto_1 = require("./dto/role.dto");
const repository_1 = require("../../database/repository");
const role_appearance_1 = require("./appearance/role.appearance");
class RoleService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return role_appearance_1.appearance;
        });
    }
    search(keyword, value, category, limit = 15) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Role, keyword, value, category, limit, 'name');
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Role(entry);
            const result = yield doc.save();
            return this.pure(result);
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield core_database_1.CoreDatabase.Role.findOneAndUpdate({ _id: entry.id }, { $set: entry }, { upsert: true, 'new': true }).exec();
            return this.pure(result);
        });
    }
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page > 0 ? page : 0 || 1;
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const query = core_database_1.CoreDatabase.Role.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Role.find(condition);
            const result = repository_1.Repository.query(query, collection, page, size, role_dto_1.RoleResponseFields);
            return result;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Role, id);
            const picked = this.pure(result);
            return picked;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Role, id);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'description',
            'permissions'
        ]);
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map