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
const setting_service_1 = require("./setting.service");
const setting_dto_1 = require("./dto/setting.dto");
/**
 * 设置管理接口.
 */
let SettingController = class SettingController {
    constructor(service = new setting_service_1.SettingService()) {
        this.service = service;
    }
    /**
     * 获取设置项
     * @param keys 设置项key的集合
     */
    getMainSettings(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getMainSettings(keys);
        });
    }
    /**
     * 通过Key获取设置项目
     * @param name 键名
     */
    getSettingsByKey(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getSettingsByKey(name);
        });
    }
    /**
     * 查询设置项
     * @param keyword 关键词
     * @param value 键
     */
    search(keyword, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search(keyword, value);
        });
    }
    /**
     * 创建设置项
     * @param entry 设置项实体
     */
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.create(entry);
        });
    }
    /**
     * 更新设置项
     * @param entry 设置项实体
     */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.update(entry);
        });
    }
    /**
     * 分页查询设置项
     * @param keyword 关键词
     * @param page 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.query(keyword, page, size, sort);
        });
    }
    /**
     * 按编号获取设置项
     * @param id 键
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.get(id);
        });
    }
    /**
     * 删除设置项
     * @param id 键
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.remove(id);
        });
    }
};
__decorate([
    typescript_rest_1.Context,
    __metadata("design:type", typescript_rest_1.ServiceContext)
], SettingController.prototype, "context", void 0);
__decorate([
    typescript_rest_1.Path('main'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keys')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getMainSettings", null);
__decorate([
    typescript_rest_1.Path('key/:name'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getSettingsByKey", null);
__decorate([
    typescript_rest_1.Path('search'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "search", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_dto_1.CreateSettingDto]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_dto_1.EditSettingDto]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('page')),
    __param(2, typescript_rest_1.QueryParam('size')),
    __param(3, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "query", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "get", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "remove", null);
SettingController = __decorate([
    typescript_rest_swagger_1.Tags('core'),
    typescript_rest_1.Path('/api/setting'),
    __metadata("design:paramtypes", [Object])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map