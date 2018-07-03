import { AccountService } from './account.service';
import { CoreDatabase } from './core.database';
import { EditAccountDto, SessionUser } from './dto/account.dto';
import { Installer } from '../../scripts/data.install';
const mongoUri = 'mongodb://localhost/typerx-test-account-service';

describe('Account service test', () => {
  let service: AccountService;
  let installer: Installer;

  beforeAll(async () => {
    installer = new Installer(mongoUri);
    service = new AccountService();
    await installer.initData();
  })

  afterAll(async () => {
    installer.drop();
  })


  describe('get appearance config ', () => {
    test('should return an appearance config', async () => {
      const config = await service.getAppearance();
      expect(config.formSets).toBeTruthy;
    })
  })


  describe('create an account', () => {

    test('should success created an account', async () => {
      const dto = {
        username: 'viking1',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      const user = await service.create(dto);
      expect(user.nick).toBe(dto.nick);

      const existUser = await CoreDatabase.Account.findById(user.id);
      expect(existUser.password).not.toBe(dto.password);

      await service.create(dto).catch((error) => {
        expect(error).toBeTruthy;
      });

    });

    test('keyword should be generated', async () => {
      const dto: any = {
        username: 'viking2',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      service.setKeyWord(dto);
      expect(dto.keyword).toEqual('zhangsanfengzsf1301234567张三疯');

    });

    test('username should not be empty', async () => {
      let dto = {
        username: ' ',
        password: '1234567',
        nick: 'hello'
      };

      await service.create(dto).catch((error) => {
        expect(error).toBeTruthy;
      });

      dto = {
        username: '',
        password: '1234567',
        nick: 'hello'
      };

      await service.create(dto).catch((error) => {
        expect(error).toBeTruthy;
      });
    });

  });


  describe('update an account', () => {

    test('should success updated an account', async () => {
      const dto = {
        username: 'viking3',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      const user = await service.create(dto);
      const newDto: EditAccountDto = {
        id: user.id,
        password: '333333',
        mobile: '1300000000',
        nick: '张三丰'
      }

      const admin: SessionUser = {
        username: 'string',
        isDisable: false,
        isAdmin: true,
        isApproved: true,
      };

      const updatedUser = await service.update(newDto, admin)
      expect(updatedUser.nick).toBe(newDto.nick);
      expect(updatedUser.mobile).toBe(newDto.mobile);
      admin.isAdmin = false;

      try {
        await service.update(newDto, admin)
      } catch (e) {
        expect(e).toBeTruthy;
      }
    });
  });

  describe('query an account', () => {
    test('should be return results length great then 0', async () => {

      const role = await CoreDatabase.Role.findOne({}).exec();
      const group = await CoreDatabase.Group.findOne({}).exec();
      const dto = {
        username: 'viking5',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯',
        roles: [role.id],
        groups: [group.id]
      };
      await service.create(dto);

      const results1 = await service.query();
      expect(results1.total).toBeGreaterThan(0);

      const results2 = await service.query('zsf', group.id, role.id);
      expect(results2.total).toBeGreaterThan(0);

    })

  });

  describe('get an account', () => {

    test('should success return an account', async () => {
      const dto = {
        username: 'viking6',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      const user = await service.create(dto);
      const createdUser = await service.get(user.id);
      expect(createdUser.nick).toBe(createdUser.nick);

    });
  });

  describe('remove account from role', () => {

    test('should not been found after deleted', async () => {
      const dto = {
        username: 'viking7',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      const user = await service.create(dto);
      expect(user.nick).toBe(user.nick);
      const deleted = await service.remove(user.id);
      expect(deleted).toBeTruthy;

      const exist = await service.get(user.id);
      expect(exist.id).toBeUndefined;

    });

  });

  describe('search key and value from accounts', () => {
    test('should return results', async () => {
      const dto = {
        username: 'viking8',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      await service.create(dto);
      const exists = await service.search();
      expect(exists.length).toBeGreaterThan(0);
      const matches = await service.search('1301234567');
      expect(matches.length).toBeGreaterThan(0);

    });
  });

  describe('add account from role', () => {
    test('role should be success added to account', async () => {

      const role = await CoreDatabase.Role.findOne({}).exec();
      const dto = {
        username: 'viking9',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };

      const account = await service.create(dto);
      const result = await service.addAccountsToRole(role.id, account.id);

      expect(result).toBeTruthy;
      await service.addAccountsToRole(role.id, account.id);
      const removed = await service.removeAccountFromRole(role.id, account.id);
      expect(removed).toBeTruthy;

    });

  });

  describe('get profile', () => {
    test('should return results', async () => {
      const fakeContext: any = {
        request: {
          user: {
            username: 'mock'
          }
        }
      };
      const profile = await service.profile(fakeContext);
      expect(profile.username).toBe('mock');
    })

  });





});
