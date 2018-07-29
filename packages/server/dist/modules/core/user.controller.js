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
const login_dto_1 = require("./dto/login.dto");
const user_service_1 = require("./user.service");
const profile_dto_1 = require("./dto/profile.dto");
const interceptor_1 = require("../../interceptor/interceptor");
/**
 * 系统接口.
 */
let UserController = class UserController {
    constructor(service = new user_service_1.UserService()) {
        this.service = service;
    }
    /**
     * 用户登陆
     * @param dto 用户登陆参数
     */
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.login(this.context, dto);
        });
    }
    /**
   * 更新帐号
   * @param entry 帐号信息
   */
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.update(this.context, entry);
        });
    }
    /**
     * 退出登陆
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.context.request.logOut();
            return true;
        });
    }
    /**
     * 上传附件
     * @param file
     * @param field
     */
    fileUpload(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('file:', field);
            const result = yield this.service.fileUpload(file, field);
            return result;
        });
    }
    /**
     * 编辑器附件上传
     * @param file
     * @param field
     */
    umeditorUpload(file, field) {
        return `{
          "state": "SUCCESS",
          "url": "uploads/${file.filename}" ,
          "name": "${file.originalname}",
          "originalName": "${file.originalname}",
          "size": ${file.size},
          "type": "${file.mimetype}",
      }`;
    }
    /**
     * 文件上传配置
     */
    uploadConfig(action) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getUploadConfig(action);
        });
    }
};
__decorate([
    typescript_rest_1.Context,
    __metadata("design:type", typescript_rest_1.ServiceContext)
], UserController.prototype, "context", void 0);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.EditProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('logout'),
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path("upload"),
    __param(0, typescript_rest_1.FileParam("file")),
    __param(1, typescript_rest_1.FormParam("field")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fileUpload", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path("umeditor/upload"),
    __param(0, typescript_rest_1.FileParam("file")),
    __param(1, typescript_rest_1.FormParam("field")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "umeditorUpload", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path("upload"),
    __param(0, typescript_rest_1.QueryParam("action")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadConfig", null);
UserController = __decorate([
    typescript_rest_swagger_1.Tags('core'),
    typescript_rest_1.Path('/user'),
    typescript_rest_1.Preprocessor(interceptor_1.interceptor),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map