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
const connector_1 = require("./../../database/connector");
const mongoUri = 'mongodb://localhost/typerx-test';
describe('Account service test', () => {
    let usersService;
    let db;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        db = connector_1.connect(mongoUri);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield db.dropDatabase();
        yield db.close();
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        usersService = new account_service_1.AccountService();
    }));
    describe('create an account', () => {
        it('should success created an account', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking',
                password: '1234567',
                nick: 'hello'
            };
            const user = yield usersService.create(dto);
            expect(user.nick).toBe(dto.nick);
        }));
    });
    // describe('update password', () => {
    //   it('should return a string', async () => {
    //     const dto: EditAccountDto = {
    //       id: '',
    //       password: '1234567',
    //       nick: 'hello'
    //     };
    //     // const user = await usersService.update(dto,{});
    //     // expect(user.nick).toBe(dto.nick);
    //   });
    // });
});
//# sourceMappingURL=account.service.spec.js.map