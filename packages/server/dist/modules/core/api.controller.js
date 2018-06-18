"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const typescript_rest_swagger_1 = require("typescript-rest-swagger");
const interceptor_1 = require("../../interceptor/interceptor");
const api_service_1 = require("./api.service");
/**
 * API 接口管理.
 */
let ApiController = class ApiController {
    constructor(service = new api_service_1.ApiService()) {
        this.service = service;
    }
    /**
     * 获取接口管理界面配置信息.
     */
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getAppearance();
        });
    }
    /**
     * 按关键词查询接口
     *
     * @param {string} [keyword] 关键词
     * @returns {Promise<Account[]>}
     * @memberof AccountController
     */
    getAccountsByKeyword(keyword, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.search(keyword, value);
        });
    }
    /**
     * 接口查询
     * @param keyword 接口关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword, permission, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.query(keyword, permission, page, size, sort);
        });
    }
    /**
     * 添加API接口到权限标签
     * @param permission 权限编号
     * @param ids 接口编号列表
     */
    addApisToPermission(permission, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.addApiPermission(permission, ids);
        });
    }
};
__decorate([
    typescript_rest_1.Context,
    __metadata("design:type", typescript_rest_1.ServiceContext)
], ApiController.prototype, "context", void 0);
__decorate([
    typescript_rest_1.Path('config'),
    typescript_rest_1.GET,
    typescript_rest_1.Preprocessor(interceptor_1.interceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getConfig", null);
__decorate([
    typescript_rest_1.Path('search'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getAccountsByKeyword", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('permission')),
    __param(2, typescript_rest_1.QueryParam('page')),
    __param(3, typescript_rest_1.QueryParam('size')),
    __param(4, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "query", null);
__decorate([
    typescript_rest_1.Path('permission'),
    typescript_rest_1.POST,
    __param(0, typescript_rest_1.FormParam('permission')), __param(1, typescript_rest_1.FormParam('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "addApisToPermission", null);
ApiController = __decorate([
    typescript_rest_swagger_1.Tags('core'),
    typescript_rest_1.Path('/api/api'),
    __metadata("design:paramtypes", [Object])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map