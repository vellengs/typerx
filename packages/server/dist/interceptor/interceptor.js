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
const log_service_1 = require("../modules/core/log.service");
const core_database_1 = require("./../modules/core/core.database");
function interceptor(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return req;
    });
}
exports.interceptor = interceptor;
function operationLog(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user && req.method !== 'GET') {
            const user = req.user;
            const desc = yield getApiDescription(req.route.path, req.method);
            const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
            yield log_service_1.LogService.save({
                name: req.method,
                operator: user.username,
                operatorIp: ip || req.connection.remoteAddress,
                operation: req.method.toLowerCase() + req.originalUrl,
                comment: desc
            });
            return req;
        }
        return req;
    });
}
exports.operationLog = operationLog;
function getApiDescription(path, method) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield core_database_1.CoreDatabase.Api.findOne({
            path: path,
            method: method
        }).exec();
        const result = api || { description: '' };
        return result.description;
    });
}
//# sourceMappingURL=interceptor.js.map