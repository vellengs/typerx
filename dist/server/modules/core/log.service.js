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
const log_dto_1 = require("./dto/log.dto");
const log_appearance_1 = require("./appearance/log.appearance");
const repository_1 = require("../../database/repository");
const lodash_1 = require("lodash");
class LogService {
    constructor() { }
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return log_appearance_1.appearance;
        });
    }
    search(keyword, value, category, limit = 15) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Log, keyword, value, category, limit);
        });
    }
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page > 0 ? page : 0 || 1;
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const query = core_database_1.CoreDatabase.Log.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Log.find(condition);
            const result = repository_1.Repository.query(query, collection, page, size, log_dto_1.LogResponseFields);
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
    static save(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield core_database_1.CoreDatabase.Log.create(entry));
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'operator',
            'operatorIp',
            'operation',
            'comment',
            'createdAt'
        ]);
    }
}
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map