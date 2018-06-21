import { AccountService } from './account.service';
import { connect } from './../../database/connector';
import { Connection } from 'mongoose';
import { EditAccountDto } from './dto/account.dto';
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

  describe('create an account', () => {
    it('should success created an account', async () => {
      const dto = {
        username: 'viking',
        password: '1234567',
        nick: 'hello'
      };
      const user = await usersService.create(dto);
      expect(user.nick).toBe(dto.nick);

    });
  });

  // describe('update password', () => {
  //   it('should return a string', async () => {
  //     const dto: EditAccountDto = {
  //       id: '',
  //       password: '1234567',
  //       nick: 'hello'
  //     };
  //     // const user = await usersService.update(dto,{});
  //     // expect(user.nick).toBe(dto.nick);
  //   });
  // });

});
