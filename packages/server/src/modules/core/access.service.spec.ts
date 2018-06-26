import { Connection } from "mongoose";
import { AccessService } from "./access.service";
import { Installer } from '../../scripts/data.install';
import { CoreDatabase } from "./core.database";
const mongoUri = 'mongodb://localhost/typerx-test-access-server';

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
        const admin = await CoreDatabase.Account.findOne({ 'isAdmin': true });
        const result = AccessService.canEditAccount(admin.id);
        expect(result).toBeTruthy;
    });



});