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
const core_database_1 = require("./core.database");
const data_install_1 = require("../../scripts/data.install");
const mongoUri = 'mongodb://localhost/typerx-test-account-service';
describe('Account service test', () => {
    let service;
    let installer;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        installer = new data_install_1.Installer(mongoUri);
        service = new account_service_1.AccountService();
        yield installer.initData();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        installer.drop();
    }));
    describe('get appearance config ', () => {
        test('should return an appearance config', () => __awaiter(this, void 0, void 0, function* () {
            const config = yield service.getAppearance();
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
            const user = yield service.create(dto);
            expect(user.nick).toBe(dto.nick);
            const existUser = yield core_database_1.CoreDatabase.Account.findById(user.id);
            expect(existUser.password).not.toBe(dto.password);
            yield service.create(dto).catch((error) => {
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
            service.setKeyWord(dto);
            expect(dto.keyword).toEqual('zhangsanfengzsf1301234567张三疯');
        }));
        test('username should not be empty', () => __awaiter(this, void 0, void 0, function* () {
            let dto = {
                username: ' ',
                password: '1234567',
                nick: 'hello'
            };
            yield service.create(dto).catch((error) => {
                expect(error).toBeTruthy;
            });
            dto = {
                username: '',
                password: '1234567',
                nick: 'hello'
            };
            yield service.create(dto).catch((error) => {
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
            const user = yield service.create(dto);
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
            const updatedUser = yield service.update(newDto, admin);
            expect(updatedUser.nick).toBe(newDto.nick);
            expect(updatedUser.mobile).toBe(newDto.mobile);
            admin.isAdmin = false;
            try {
                yield service.update(newDto, admin);
            }
            catch (e) {
                expect(e).toBeTruthy;
            }
        }));
    });
    describe('query an account', () => {
        test('should be return results length great then 0', () => __awaiter(this, void 0, void 0, function* () {
            const role = yield core_database_1.CoreDatabase.Role.findOne({}).exec();
            const group = yield core_database_1.CoreDatabase.Group.findOne({}).exec();
            const dto = {
                username: 'viking5',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯',
                roles: [role.id],
                groups: [group.id]
            };
            yield service.create(dto);
            const results1 = yield service.query();
            expect(results1.total).toBeGreaterThan(0);
            const results2 = yield service.query('zsf', group.id, role.id);
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
            const user = yield service.create(dto);
            const createdUser = yield service.get(user.id);
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
            const user = yield service.create(dto);
            expect(user.nick).toBe(user.nick);
            const deleted = yield service.remove(user.id);
            expect(deleted).toBeTruthy;
            const exist = yield service.get(user.id);
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
            yield service.create(dto);
            const exists = yield service.search();
            expect(exists.length).toBeGreaterThan(0);
            const matches = yield service.search('1301234567');
            expect(matches.length).toBeGreaterThan(0);
        }));
    });
    describe('add account from role', () => {
        test('role should be success added to account', () => __awaiter(this, void 0, void 0, function* () {
            const role = yield core_database_1.CoreDatabase.Role.findOne({}).exec();
            const dto = {
                username: 'viking9',
                password: '1234567',
                mobile: '1301234567',
                nick: '张三疯'
            };
            const account = yield service.create(dto);
            const result = yield service.addAccountsToRole(role.id, account.id);
            expect(result).toBeTruthy;
            yield service.addAccountsToRole(role.id, account.id);
            const removed = yield service.removeAccountFromRole(role.id, account.id);
            expect(removed).toBeTruthy;
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
            const profile = yield service.profile(fakeContext);
            expect(profile.username).toBe('mock');
        }));
    });
});
//# sourceMappingURL=account.service.spec.js.map