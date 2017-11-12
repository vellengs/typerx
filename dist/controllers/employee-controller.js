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
 * 获取菜单.
 */
let EmployeeController = class EmployeeController {
    /**
      * 获取员工管理界面配置信息.
      */
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getUISchema(`${__dirname}/../models`, 'Employee');
        });
    }
    /**
     * 查询关键词
     *
     * @param {string} [keyword]
     * @returns {Promise<Employee[]>}
     * @memberof EmployeeController
     */
    getEmployeeByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = yield database_1.Db.employee.find(query).limit(25).exec();
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
     * * 创建员工表
     *
     * @param {Employee} entry
     * @returns {Promise<Employee>}
     * @memberof EmployeeController
     */
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.create('Employee', entry);
        });
    }
    /**
     * * 更新员工表
     *
     * @param {Employee} entry
     * @returns {Promise<Employee>}
     * @memberof EmployeeController
     */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.update('Employee', entry);
        });
    }
    /**
     * 分页查询员工表
     *
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Employee[]>>}
     * @memberof EmployeeController
     */
    getPaged(page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.getPagedData('Employee', page, size, [], sort);
        });
    }
    /**
     * 删除员工信息
     *
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>}
     * @memberof EmployeeController
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.remove('Employee', id);
        });
    }
    /**
     * 查询员工表
     * @param id 编号
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return modex_1.Helper.get('Employee', id);
        });
    }
};
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
], EmployeeController.prototype, "getConfig", null);
__decorate([
    typescript_rest_1.Path('search'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeByKeyword", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('query'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.QueryParam('page')),
    __param(1, typescript_rest_1.QueryParam('size')),
    __param(2, typescript_rest_1.QueryParam('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getPaged", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "remove", null);
__decorate([
    typescript_rest_1.Path(':id'),
    typescript_rest_1.GET,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "get", null);
EmployeeController = __decorate([
    typescript_rest_swagger_1.Tags('crm'),
    typescript_rest_1.Path('/api/employee')
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee-controller.js.map