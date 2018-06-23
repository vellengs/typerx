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
const log_service_1 = require("../modules/core/log.service");
const core_database_1 = require("./../modules/core/core.database");
exports.apiPrefix = '/api';
const PublicRouters = [
    '/setting',
    '/install'
];
function isPublicApi(req) {
    if (req.method === 'GET') {
        for (const router of PublicRouters) {
            if (req.url.startsWith(router)) {
                return true;
            }
        }
    }
    return false;
}
function interceptor(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return req;
    });
}
exports.interceptor = interceptor;
function permissionCheck(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user && !req.user.isAdmin &&
            req.route.path.startsWith(exports.apiPrefix) &&
            !isPublicApi(req)) {
            const result = yield hasPermission(req.user.id, req.method.toLowerCase() + req.route.path);
            if (!result) {
                throw new typescript_rest_1.Errors.ForbiddenError("no permission");
            }
        }
        return req;
    });
}
exports.permissionCheck = permissionCheck;
function hasPermission(accountId, route) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = normalizePath(route);
        const apis = (yield getAccessibleApis(accountId)) || [];
        const exists = apis.findIndex((p) => {
            return p.path === path;
        });
        return exists > -1;
    });
}
function normalizePath(path) {
    if (!path) {
        return path;
    }
    var parts = path.split('/');
    parts = parts.map(function (part) { return part.startsWith(':') ? "{" + part.slice(1) + "}" : part; });
    return parts.join('/');
}
/**
 * 获取帐号能访问的所有api
 * 1. 获取角色
 * 2. 通过角色获取权限
 * 3. 通过权限后去能够访问的所有api
 * @param accountId
 */
function getAccessibleApis(accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = yield core_database_1.CoreDatabase.Account.findOne({ _id: accountId }, 'roles').exec();
        const roles = account.roles || [];
        const roleDocs = (yield core_database_1.CoreDatabase.Role.find({
            _id: { $in: roles }
        }, 'permissions').exec()) || [];
        const permissions = [];
        roleDocs.forEach((g) => {
            permissions.push(...g.permissions);
        });
        const apis = yield core_database_1.CoreDatabase.Api.find({
            permissions: {
                $in: permissions
            }
        }, 'path');
        return apis;
    });
}
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
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
            return next();
        }
        else if (isPublicApi(req)) {
            return next();
        }
        else {
            res.status(401);
            res.send({
                error: {
                    message: 'user is not authenticated'
                }
            });
        }
    });
}
exports.isAuthenticated = isAuthenticated;
;
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