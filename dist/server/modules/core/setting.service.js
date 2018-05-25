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
const repository_1 = require("../../database/repository");
class SettingService {
    getMainSettings(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys) {
                return [];
            }
            const names = keys.split(',');
            const docs = yield core_database_1.CoreDatabase.Setting.find({
                key: {
                    $in: names
                }
            }).exec();
            if (docs) {
                return docs.map((res) => {
                    return this.pure(res);
                });
            }
            else {
                return [];
            }
        });
    }
    getSettingsByKey(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const setting = yield core_database_1.CoreDatabase.Setting.findOne({
                name: name
            }).exec();
            return setting;
        });
    }
    search(keyword, value, limit = 15) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Setting, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Setting(entry);
            const result = yield doc.save();
            return this.pure(result);
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entry.id) {
                const result = yield core_database_1.CoreDatabase.Setting.findOneAndUpdate({ _id: entry.id }, { $set: entry }, { upsert: true, 'new': true }).exec();
                return this.pure(result);
            }
            else {
                const result = yield core_database_1.CoreDatabase.Setting.findOneAndUpdate({ key: entry.key }, { $set: entry }, { upsert: true, 'new': true }).exec();
                return this.pure(result);
            }
        });
    }
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page > 0 ? page : 0 || 1;
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = (yield core_database_1.CoreDatabase.Setting.find(query).sort(sort).skip(page * size).limit(size).exec()) || [];
            const count = yield core_database_1.CoreDatabase.Setting.find(query).count();
            const list = docs.map((item) => {
                return this.pure(item);
            });
            return {
                list: list,
                total: count
            };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(core_database_1.CoreDatabase.Setting, id);
            const picked = this.pure(result);
            return picked;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Setting, id);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'key',
            'value',
            'description',
        ]);
    }
}
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map