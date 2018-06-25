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
const core_database_1 = require("./core.database");
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
    describe('get appearance config ', () => {
        it('should return an appearance config', () => __awaiter(this, void 0, void 0, function* () {
            const config = yield usersService.getAppearance();
            expect(config.formSets).toBeTruthy;
        }));
    });
    describe('create an account', () => {
        test('should success created an account', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking1',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const user = yield usersService.create(dto);
            expect(user.nick).toBe(dto.nick);
            const existUser = yield core_database_1.CoreDatabase.Account.findById(user.id);
            expect(existUser.password).not.toBe(dto.password);
            yield usersService.create(dto).catch((error) => {
                expect(error).toBeTruthy;
            });
        }));
        it('keyword should be generated', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking2',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            usersService.setKeyWord(dto);
            expect(dto.keyword).toEqual('zhangsanfengzsf1301234567张三疯');
        }));
        it('username should not be empty', () => __awaiter(this, void 0, void 0, function* () {
            let dto = {
                username: ' ',
                password: '1234567',
                nick: 'hello'
            };
            yield usersService.create(dto).catch((error) => {
                expect(error).toBeTruthy;
            });
            dto = {
                username: '',
                password: '1234567',
                nick: 'hello'
            };
            yield usersService.create(dto).catch((error) => {
                expect(error).toBeTruthy;
            });
        }));
    });
    describe('update an account', () => {
        it('should success updated an account', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking3',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const user = yield usersService.create(dto);
            const newDto = {
                id: user.id,
                password: '333333',
                mobile: '1300000000',
                nick: '张三丰'
            };
            const admin = {
                username: 'string',
                isDisable: false,
                isAdmin: true,
                isApproved: true,
            };
            const updatedUser = yield usersService.update(newDto, admin);
            expect(updatedUser.nick).toBe(newDto.nick);
            expect(updatedUser.mobile).toBe(newDto.mobile);
            admin.isAdmin = false;
            try {
                yield usersService.update(newDto, admin);
            }
            catch (e) {
                expect(e).toBeTruthy;
            }
        }));
    });
    describe('query an account', () => {
        test('should be return results length great then 0', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking5',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            yield usersService.create(dto);
            const results1 = yield usersService.query();
            console.log(results1.total);
            expect(results1.total).toBeGreaterThan(0);
            const results2 = yield usersService.query('zsf');
            console.log(results2.total);
            expect(results2.total).toBeGreaterThan(0);
        }));
    });
    describe('get an account', () => {
        it('should success return an account', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking6',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const user = yield usersService.create(dto);
            const createdUser = yield usersService.get(user.id);
            expect(createdUser.nick).toBe(createdUser.nick);
        }));
    });
    describe('remove account from role', () => {
        it('should not been found after deleted', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking7',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const user = yield usersService.create(dto);
            expect(user.nick).toBe(user.nick);
            const deleted = yield usersService.remove(user.id);
            expect(deleted).toBeTruthy;
            const exist = yield usersService.get(user.id);
            expect(exist.id).toBeUndefined;
        }));
    });
    describe('search key and value from accounts', () => {
        it('should return results', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking8',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            yield usersService.create(dto);
            const exists = yield usersService.search('viking8');
            expect(exists.length).toBeGreaterThan(0);
        }));
    });
    describe('add account from role', () => {
    });
});
//# sourceMappingURL=account.service.spec.js.map