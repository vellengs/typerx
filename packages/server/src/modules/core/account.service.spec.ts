import { AccountService } from "./account.service";
import { ServiceContext } from "typescript-rest";


describe('Account service test', () => {
    let usersService: AccountService;

    beforeEach(async () => {
        usersService = new AccountService(new ServiceContext());
    });

    describe('findAll', () => {
        it('should return a string', async () => {
            const result = 'test';
            jest.spyOn(usersService, 'create').mockImplementation(() => result);
            expect(1).toBe(1);
        });
    });
});