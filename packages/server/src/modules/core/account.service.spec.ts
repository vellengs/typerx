import { AccountService } from './account.service';
import { connect } from './../../database/connector';
import { Connection } from 'mongoose';
import { CoreDatabase } from './core.database';

import { EditAccountDto, SessionUser } from './dto/account.dto';
import { ServiceContext } from 'typescript-rest';
const mongoUri = 'mongodb://localhost/typerx-test';

describe('Account service test', () => {
  let usersService: AccountService;
  let db: Connection;

  beforeAll(async () => {
    db = connect(mongoUri);
  })

  afterAll(async () => {
    await db.dropDatabase();
    await db.close();
  })

  beforeEach(async () => {
    usersService = new AccountService();
  })

  describe('get appearance config ', () => {
    test('should return an appearance config', async () => {
      const config = await usersService.getAppearance();
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

      const user = await usersService.create(dto);
      expect(user.nick).toBe(dto.nick);

      const existUser = await CoreDatabase.Account.findById(user.id);
      expect(existUser.password).not.toBe(dto.password);

      await usersService.create(dto).catch((error) => {
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

      usersService.setKeyWord(dto);
      expect(dto.keyword).toEqual('zhangsanfengzsf1301234567张三疯');

    });


    test('username should not be empty', async () => {
      let dto = {
        username: ' ',
        password: '1234567',
        nick: 'hello'
      };

      await usersService.create(dto).catch((error) => {
        expect(error).toBeTruthy;
      });

      dto = {
        username: '',
        password: '1234567',
        nick: 'hello'
      };

      await usersService.create(dto).catch((error) => {
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

      const user = await usersService.create(dto);
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

      const updatedUser = await usersService.update(newDto, admin)
      expect(updatedUser.nick).toBe(newDto.nick);
      expect(updatedUser.mobile).toBe(newDto.mobile);
      admin.isAdmin = false;

      try {
        await usersService.update(newDto, admin)
      } catch (e) {
        expect(e).toBeTruthy;
      }
    });
  });

  describe('query an account', () => {
    test('should be return results length great then 0', async () => {
      const dto = {
        username: 'viking5',
        password: '1234567',
        mobile: '1301234567',
        nick: '张三疯'
      };
      await usersService.create(dto);

      const results1 = await usersService.query();
      console.log(results1.total);
      expect(results1.total).toBeGreaterThan(0);

      const results2 = await usersService.query('zsf');
      console.log(results2.total);
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

      const user = await usersService.create(dto);
      const createdUser = await usersService.get(user.id);
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

      const user = await usersService.create(dto);
      expect(user.nick).toBe(user.nick);
      const deleted = await usersService.remove(user.id);
      expect(deleted).toBeTruthy;

      const exist = await usersService.get(user.id);
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

      await usersService.create(dto);
      const exists = await usersService.search();
      expect(exists.length).toBeGreaterThan(0);
      const matches = await usersService.search('1301234567');
      expect(matches.length).toBeGreaterThan(0);

    });
  });

  describe('add account from role', () => {

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
      const profile = await usersService.profile(fakeContext);
      expect(profile.username).toBe('mock');
    })

  });

});
