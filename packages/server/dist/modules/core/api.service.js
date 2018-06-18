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
const api_appearance_1 = require("./appearance/api.appearance");
const repository_1 = require("../../database/repository");
const api_dto_1 = require("./dto/api.dto");
const bson_1 = require("bson");
class ApiService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return api_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Menu, keyword, value, '', limit);
        });
    }
    removeApiFromPermission(permission, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (permission && apiId) {
                yield core_database_1.CoreDatabase.Api.update({
                    _id: {
                        $in: apiId
                    }
                }, { $pullAll: { roles: [permission] } }, { multi: true }).exec();
            }
            return true;
        });
    }
    addApiPermission(permission, apIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(apIds) && bson_1.ObjectId.isValid(apIds)) {
                apIds = [apIds];
            }
            if (permission && Array.isArray(apIds)) {
                const existIds = (yield core_database_1.CoreDatabase.Api.find({
                    _id: {
                        $in: apIds
                    },
                    permissions: {
                        $in: [permission]
                    }
                }, { _id: 1 }).exec());
                const exists = (existIds || []).map(item => item.toObject()._id);
                const ids = apIds.filter((id) => {
                    return exists.indexOf(id) === -1;
                });
                yield core_database_1.CoreDatabase.Api.update({
                    _id: {
                        $in: ids
                    }
                }, { $push: { permissions: permission } }, { multi: true }).exec();
            }
            return true;
        });
    }
    query(keyword, permission, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (permission) {
                condition.permissions = {
                    $in: permission
                };
            }
            const query = core_database_1.CoreDatabase.Api.find(condition).sort(sort);
            const collection = core_database_1.CoreDatabase.Api.find(condition);
            return repository_1.Repository.query(query, collection, page, size, api_dto_1.ApiResponseFields);
        });
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map