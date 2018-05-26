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
const dict_dto_1 = require("./dto/dict.dto");
const dict_appearance_1 = require("./appearance/dict.appearance");
const repository_1 = require("../../database/repository");
class DictService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return dict_appearance_1.appearance;
        });
    }
    search(keyword, value, category, limit = 15) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Dict, keyword, value, category, limit, 'translate', 'name');
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Dict(entry);
            const result = yield doc.save();
            return this.pure(result);
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield core_database_1.CoreDatabase.Dict.findOneAndUpdate({ _id: entry.id }, { $set: entry }, { upsert: true, 'new': true }).exec();
            return this.pure(result);
        });
    }
    query(keyword, category, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page > 0 ? page : 0 || 1;
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (category) {
                condition.category = category;
            }
            const query = core_database_1.CoreDatabase.Dict.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Dict.find(condition);
            const result = repository_1.Repository.query(query, collection, page, size, dict_dto_1.DictResponseFields);
            return result;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Dict, id);
            const picked = this.pure(result);
            return picked;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Dict, id);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'category',
            'name',
            'translate',
            'expand',
        ]);
    }
}
exports.DictService = DictService;
//# sourceMappingURL=dict.service.js.map