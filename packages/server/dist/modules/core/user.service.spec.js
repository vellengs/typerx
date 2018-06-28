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
const request = require("supertest");
const data_install_1 = require("../../scripts/data.install");
const mongoUri = 'mongodb://localhost/typerx-test-user-service';
describe('User Service Test', () => {
    let installer;
    let app;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        installer = new data_install_1.Installer(mongoUri);
        yield installer.initData();
        app = require('./../../app');
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        installer.drop();
    }));
    test('user login', () => __awaiter(this, void 0, void 0, function* () {
        // expect(1).toBe(1);
        yield request(app).get('/api/account/config').expect(200);
    }));
    test("should return true", (done) => {
        request(app).post('/user/login')
            .send({ username: 'admin', password: '888888' })
            .set('Accept', 'application/json')
            .end(function (err, res) {
            console.log('err', err);
            done();
        })
            .expect(200);
    });
});
//# sourceMappingURL=user.service.spec.js.map