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
const access_service_1 = require("./access.service");
const data_install_1 = require("../../scripts/data.install");
const core_database_1 = require("./core.database");
const mongoUri = 'mongodb://localhost/typerx-test-access-server';
describe('Access Service Test', () => {
    let installer;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        installer = new data_install_1.Installer(mongoUri);
        yield installer.initData();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        installer.drop();
    }));
    test('can edit account', () => __awaiter(this, void 0, void 0, function* () {
        const role = yield core_database_1.CoreDatabase.Role.findOne();
        const admin = yield core_database_1.CoreDatabase.Account.findOne({ 'roles': { $in: [role] } });
        const result = yield access_service_1.AccessService.canEditAccount(admin.id);
        expect(result).toBeTruthy;
        const have = yield access_service_1.AccessService.canEditAccount(admin.id, true);
        expect(have).toBeTruthy;
        const none = yield access_service_1.AccessService.canEditAccount(role.id);
        expect(none).toBeFalsy;
    }));
});
//# sourceMappingURL=access.service.spec.js.map