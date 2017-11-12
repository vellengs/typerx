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
const modex_1 = require("modex");
const database_1 = require("./../database");
/**
 * 获取菜单y.
 */
let DictController = class DictController {
    /**
      * 获取客户管理界面配置信息.
      */
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getUISchema(`${__dirname}/../models`, 'Dict');
        });
    }
    /**
     * * 按分类获取字典数据
     * @param {string} category 分类键名
     * @returns {Promise<Dict[]>};
     * @memberof DictController
     */
    getDictByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield database_1.Db.dict.find({ category: category }).exec();
            if (docs) {
                return docs.map((res) => {
                    return res.toClient();
                });
            }
            else {
                return null;
            }
        });
    }
    /**
     * * 创建字典表
     * @param {Dict} entry;
     * @returns {Promise<Dict>};
     * @memberof DictController
     */
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.create('Dict', entry);
        });
    }
    /**
     * * 更新字典表
     * @param {Dict} entry;
     * @returns {Promise<Dict>};
     * @memberof DictController
     */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.update('Dict', entry);
        });
    }
    /**
     * 分页查询字典表

     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Dict[]>>}
     * @memberof DictController
     */
    getPaged(page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getPagedData('Dict', page, size, [], sort);
        });
    }
    /**
     * 删除字典信息
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof DictController
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.remove('Dict', id);
        });
    }
    /**
     * 查询字典表
     * @param id 编号
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.get('Dict', id);
        });
    }
};
__decorate([
    typescript_rest_swagger_1.Example({
        columns: [
            {
                field: 'name',
                header: '名字',
            }
        ],
        entry: {
            birthday: {
                description: '生日描述',
                title: '生日',
                type: 'string',
                widget: 'date',
            },
            name: {
                description: '名字描述',
                title: '名字',
                type: 'string',
                widget: 'input',
            },
        }
    }),
    typescript_rest_1.Path('config'),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DictController.prototype, "getConfig", null);
__decorate([
    typescript_rest_1.Path('category/:category'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "getDictByCategory", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('page')),
    __param(1, typescript_rest_1.QueryParam('size')),
    __param(2, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "getPaged", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "remove", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "get", null);
DictController = __decorate([
    typescript_rest_swagger_1.Tags('base'),
    typescript_rest_1.Path('/api/dict')
], DictController);
exports.DictController = DictController;
//# sourceMappingURL=dict-controller.js.map