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
const core_database_1 = require("./core.database");
const passport = require("passport");
const log_service_1 = require("./log.service");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class UserService {
    login(context, loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, response, next } = context;
            const result = yield this.validate(context);
            const ip = request.headers['x-real-ip'] || request.headers['x-forwarded-for'];
            const operatorIp = ip || (request.connection || { remoteAddress: '' }).remoteAddress;
            yield log_service_1.LogService.save({
                name: 'login',
                operator: loginDto.username,
                operatorIp: operatorIp,
                operation: request.method.toLowerCase() + request.originalUrl,
                comment: '用户登录' + result ? '成功' : '失败',
            });
            return result;
        });
    }
    getUploadConfig(action) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                "imageUrl": "/images/",
                "imagePath": "/ueditor/images/",
                "imageFieldName": "file",
                "imageMaxSize": 2048,
                "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
            };
            return result;
        });
    }
    fileUpload(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                url: '/uploads/' + file.filename
            };
        });
    }
    update(context, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request } = context;
            const profile = yield core_database_1.CoreDatabase.Profile.findOneAndUpdate({
                _id: request.user.id,
            }, entry, { upsert: true, new: true }).exec();
            entry.profile = profile._id;
            const account = yield core_database_1.CoreDatabase.Account.findOneAndUpdate({
                _id: request.user.id,
            }, entry, { new: true }).populate('profile').exec();
            if (profile) {
                const instance = repository_1.Repository.mergeProfile(account);
                return instance;
            }
            else {
                throw new typescript_rest_1.Errors.BadRequestError('user not found');
            }
        });
    }
    validate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, response, next } = context;
            const result = yield new Promise((resolve, reject) => {
                const callback = (err, user, info) => {
                    if (err) {
                        reject(false);
                    }
                    if (user) {
                        request.logIn(user, err => {
                            if (err) {
                                reject(false);
                            }
                            const picked = this.pure(user);
                            resolve(picked);
                        });
                    }
                    else {
                        resolve(false);
                    }
                };
                passport.authenticate('local', callback)(request, response, next);
            });
            return result;
        });
    }
    findAll() {
        console.log('find all...');
        return [];
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'username',
            'nick',
            'avatar',
            'type',
            'email',
            'groups',
            'roles',
            'mobile',
            'isDisable',
            'isAdmin',
            'isApproved',
            'expired',
        ]);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map