import { Connection } from "mongoose";
import { AccessService } from "./access.service";
import { Installer } from '../../scripts/data.install';
import { CoreDatabase } from "./core.database";
const mongoUri = 'mongodb://localhost/typerx-test-access-service';

describe('Access Service Test', () => {
    let installer: Installer;

    beforeAll(async () => {
        installer = new Installer(mongoUri);
        await installer.initData();
    })

    afterAll(async () => {
        installer.drop();
    })

    test('can edit account', async () => {

        const role = await CoreDatabase.Role.findOne();
        const admin = await CoreDatabase.Account.findOne({ 'roles': { $in: [role] } });
        const result = await AccessService.canEditAccount(admin.id);
        expect(result).toBeTruthy;

        const have = await AccessService.canEditAccount(admin.id, true);
        expect(have).toBeTruthy;

        const none = await AccessService.canEditAccount(role.id);
        expect(none).toBeFalsy;
    });
});