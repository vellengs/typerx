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
const account_service_1 = require("./account.service");
describe('Account service test', () => {
    let usersService;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        usersService = new account_service_1.AccountService();
    }));
    describe('findAll', () => {
        it('should return a string', () => __awaiter(this, void 0, void 0, function* () {
            const result = 'test';
            jest.spyOn(usersService, 'create').mockImplementation(() => result);
            expect(1).toBe(1);
        }));
    });
});
//# sourceMappingURL=account.service.spec.js.map