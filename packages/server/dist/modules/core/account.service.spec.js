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
const data_install_1 = require("../../scripts/data.install");
const mongoUri = 'mongodb://localhost/typerx-test';
describe('Account service test', () => {
    let usersService;
    let db;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const folder = process.cwd();
        db = connector_1.connect(mongoUri);
        data_install_1.Installer.initData(folder);
        console.log('init ...');
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield db.dropDatabase();
        yield db.close();
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        usersService = new account_service_1.AccountService();
    }));
    describe('get appearance config ', () => {
        test('should return an appearance config', () => __awaiter(this, void 0, void 0, function* () {
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
        test('keyword should be generated', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking2',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            usersService.setKeyWord(dto);
            expect(dto.keyword).toEqual('zhangsanfengzsf1301234567张三疯');
        }));
        test('username should not be empty', () => __awaiter(this, void 0, void 0, function* () {
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
        test('should success updated an account', () => __awaiter(this, void 0, void 0, function* () {
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
            expect(results1.total).toBeGreaterThan(0);
            const results2 = yield usersService.query('zsf');
            expect(results2.total).toBeGreaterThan(0);
        }));
    });
    describe('get an account', () => {
        test('should success return an account', () => __awaiter(this, void 0, void 0, function* () {
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
        test('should not been found after deleted', () => __awaiter(this, void 0, void 0, function* () {
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
        test('should return results', () => __awaiter(this, void 0, void 0, function* () {
            const dto = {
                username: 'viking8',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            yield usersService.create(dto);
            const exists = yield usersService.search();
            expect(exists.length).toBeGreaterThan(0);
            const matches = yield usersService.search('1301234567');
            expect(matches.length).toBeGreaterThan(0);
        }));
    });
    describe('add account from role', () => {
        test.only('role should be success added to account', () => __awaiter(this, void 0, void 0, function* () {
            const role = yield core_database_1.CoreDatabase.Role.findOne({}).exec();
            const dto = {
                username: 'viking9',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const account = yield usersService.create(dto);
            const result = yield usersService.addAccountsToRole(role.id, account.id);
            expect(result).toBeTruthy;
        }));
    });
    describe('get profile', () => {
        test('should return results', () => __awaiter(this, void 0, void 0, function* () {
            const fakeContext = {
                request: {
                    user: {
                        username: 'mock'
                    }
                }
            };
            const profile = yield usersService.profile(fakeContext);
            expect(profile.username).toBe('mock');
        }));
    });
});
//# sourceMappingURL=account.service.spec.js.map