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
const article_service_1 = require("./article.service");
const article_dto_1 = require("./dto/article.dto");
const interceptor_1 = require("../../interceptor/interceptor");
let ArticleController = class ArticleController {
    constructor(service = new article_service_1.ArticleService()) {
        this.service = service;
    }
    /**
     * 获取文章管理界面配置信息.
     */
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getAppearance();
        });
    }
    /**
     * 查询文章
     * @param keyword 关键词
     * @param value 已选中的文章编号
     */
    search(keyword, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.search(keyword, value);
        });
    }
    /**
     * 创建文章
     * @param entry 创建参数
     */
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.create(entry);
        });
    }
    /**
     * 更新文章
     * @param entry 文章参数
     */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.update(entry);
        });
    }
    /**
     * 查询文章数据
     * @param keyword 关键词
     * @param article 第几页
     * @param size 页大小
     * @param sort 排序
     */
    query(keyword, category, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.query(keyword, category, page, size, sort);
        });
    }
    /**
   * 删除文章
   * @param id 文章编号
   */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.remove(id);
        });
    }
    /**
     * 查询文章
     * @param id 文章编号
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.get(id);
        });
    }
};
__decorate([
    typescript_rest_1.Context,
    __metadata("design:type", typescript_rest_1.ServiceContext)
], ArticleController.prototype, "context", void 0);
__decorate([
    typescript_rest_1.Path('config'),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getConfig", null);
__decorate([
    typescript_rest_1.Path('search'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "search", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.EditArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('category')),
    __param(2, typescript_rest_1.QueryParam('page')),
    __param(3, typescript_rest_1.QueryParam('size')),
    __param(4, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "query", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "remove", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "get", null);
ArticleController = __decorate([
    typescript_rest_swagger_1.Tags('cms'),
    typescript_rest_1.Path('/api/article'),
    typescript_rest_1.Preprocessor(interceptor_1.interceptor),
    __metadata("design:paramtypes", [Object])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map