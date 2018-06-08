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
const group_dto_1 = require("./dto/group.dto");
const group_appearance_1 = require("./appearance/group.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class GroupService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return group_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Group, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Group(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield core_database_1.CoreDatabase.Group.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, isRegion, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (isRegion)
                condition.isRegion = true;
            const query = core_database_1.CoreDatabase.Group.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Group.find(condition);
            return repository_1.Repository.query(query, collection, page, size, group_dto_1.GroupResponseFields);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Group, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Group, id, [
                {
                    path: 'roles',
                    select: 'name',
                },
            ]);
            return this.pure(result);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'outid',
            'id',
            'name',
            'icon',
            'parent',
            'paths',
            'director',
            'order',
            'isRegion',
            'description'
        ]);
    }
}
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map