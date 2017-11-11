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
 * * 获取客户信息
 *
 * @export
 * @class CustomerController
 */
let CustomerController = class CustomerController {
    /**
     * 获取客户管理界面配置信息.
     */
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getUISchema('Customer');
        });
    }
    /**
     * 查询关键词
     *
     * @param {string} [keyword]
     * @returns {Promise<Customer[]>}
     * @memberof CustomerController
     */
    getCustomerByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = yield database_1.Db.customer.find(query).limit(25).exec();
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
     * 创建客户信息
     *
     * @param {Customer} entry 客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController
     */
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.create('Customer', entry);
        });
    }
    /**
     * 更新客户信息
     *
     * @param {Customer} entry  客户实例json
     * @returns {Promise<Customer>} 客户实例
     * @memberof CustomerController
    * */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.update('Customer', entry);
        });
    }
    /**
     * 查询客户信息
     *
     * @param {string} [keyword] 关键词
     * @param {string} [primary_adviser] 主负责人
     * @param {string} [secondary_advisers] 副负责人
     * @param {number} [intent] 意向程度
     * @param {string} [status] 客户状态
     * @param {number} [page] 第几页
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @param {number} [type] 客户归类 1. 待分配客户 2. 已分配客户 3. 已回收客户 4. 今日新增客户
     * @returns {Promise<PaginateResponse<Customer[]>>}
     * @memberof CustomerController
     */
    getPaged(keyword, primary_adviser, secondary_advisers, intent, status, type, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getPagedData('Customer', page, size, [
                {
                    path: 'primary_adviser', select: 'name'
                },
                {
                    path: 'secondary_advisers', select: 'name'
                }
            ], sort, {
                primary_adviser: primary_adviser,
                secondary_advisers: secondary_advisers,
                intent: intent,
                status: status,
                type: type,
                name: new RegExp(keyword, 'i')
            });
        });
    }
    getCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_1.Db.customer.find().populate('secondary_advisers', 'name');
            return res;
            // return null;
        });
    }
    /**
     * 查询客户信息
     *
     * @param {string} id 客户编号
     * @returns {Promise<Customer>}
     * @memberof CustomerController
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.get('Customer', id);
        });
    }
    /**
     * 删除客户信息
     *
     * @param {string} id 客户编号
     * @returns {Promise<boolean>}
     * @memberof CustomerController
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.remove('Customer', id);
        });
    }
};
__decorate([
    typescript_rest_1.Context,
    __metadata("design:type", typescript_rest_1.ServiceContext)
], CustomerController.prototype, "context", void 0);
__decorate([
    typescript_rest_swagger_1.Example({
        entry: {
            name: {
                title: '名字',
                description: '名字描述',
                widget: 'input',
                type: 'string'
            },
            birthday: {
                title: '生日',
                description: '生日描述',
                widget: 'date',
                type: 'string'
            },
        },
        columns: [
            {
                field: 'name',
                header: '名字',
            }
        ]
    }),
    typescript_rest_1.Path('config'),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getConfig", null);
__decorate([
    typescript_rest_1.Path('search'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerByKeyword", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __param(1, typescript_rest_1.QueryParam('primary_adviser')),
    __param(2, typescript_rest_1.QueryParam('secondary_advisers')),
    __param(3, typescript_rest_1.QueryParam('intent')),
    __param(4, typescript_rest_1.QueryParam('status')),
    __param(5, typescript_rest_1.QueryParam('type')),
    __param(6, typescript_rest_1.QueryParam('page')),
    __param(7, typescript_rest_1.QueryParam('size')),
    __param(8, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getPaged", null);
__decorate([
    typescript_rest_1.Path('test'),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCollections", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "get", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "remove", null);
CustomerController = __decorate([
    typescript_rest_swagger_1.Tags('crm'),
    typescript_rest_1.Path('/api/customer')
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer-controller.js.map