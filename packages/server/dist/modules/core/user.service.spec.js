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
const log_service_1 = require("./log.service");
const httpMock = require("node-mocks-http");
// import app from '../../app';
const user_service_1 = require("./user.service");
jest.mock('./log.service');
const login_dto_1 = require("./dto/login.dto");
const mongoUri = 'mongodb://localhost/typerx-test-user-service';
describe('User Service Test', () => {
    let service;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        service = new user_service_1.UserService();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
    }));
    test.only('user login', () => __awaiter(this, void 0, void 0, function* () {
        const result = new login_dto_1.LoginResponse();
        const context = new typescript_rest_1.ServiceContext();
        context.request = httpMock.createRequest();
        const loginDto = {
            username: 'admin',
            password: '888888'
        };
        log_service_1.LogService.save.mockResolvedValue(result);
        jest.spyOn(service, 'validate').mockImplementation((context) => result);
        expect(yield service.login(context, loginDto)).toBe(result);
    }));
});
//# sourceMappingURL=user.service.spec.js.map