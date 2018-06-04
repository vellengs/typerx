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
const lodash_1 = require("lodash");
const setting_dto_1 = require("./dto/setting.dto");
const repository_1 = require("../../database/repository");
const setting_appearance_1 = require("./appearance/setting.appearance");
class SettingService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return setting_appearance_1.appearance;
        });
    }
    getSettingsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new setting_dto_1.SettingsGroup();
            if (name) {
                const docs = yield core_database_1.CoreDatabase.Setting.find({
                    name: name
                }).exec();
                if (docs) {
                    docs.forEach((doc) => {
                        result[doc.key] = doc.value;
                    });
                }
            }
            return result;
        });
    }
    getSettingsByKey(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const setting = yield core_database_1.CoreDatabase.Setting.findOne({
                key: name
            }).exec();
            return this.pure(setting);
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
    updateSettingsByName(name, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(entry);
            for (let key of keys) {
                const instance = {
                    key: key,
                    value: entry[key]
                };
                yield core_database_1.CoreDatabase.Setting.findOneAndUpdate({ key: key, name: name }, { $set: instance }, { upsert: true, 'new': true }).exec();
            }
            return this.getSettingsByName(name);
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entry.id) {
                const result = yield core_database_1.CoreDatabase.Setting.findOneAndUpdate({ _id: entry.id }, { $set: entry }, { upsert: true, 'new': true }).exec();
                return this.pure(result);
            }
            else {
                throw new typescript_rest_1.Errors.BadRequestError('settings not found');
            }
        });
    }
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const query = core_database_1.CoreDatabase.Setting.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Setting.find(condition);
            const result = repository_1.Repository.query(query, collection, page, size, setting_dto_1.SettingResponseFields);
            return result;
            // const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            // const docs: any = await Db.Setting.find(query).sort(sort).skip(page * size).limit(size).exec() || [];
            // const count = await Db.Setting.find(query).count();
            // const list = docs.map((item: Setting & Document) => {
            //   return this.pure(item);
            // });
            // return {
            //   list: list,
            //   total: count
            // }
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