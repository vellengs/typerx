import { ServiceContext } from 'typescript-rest';
import * as express from 'express';
import { Installer } from '../../scripts/data.install';
import { LogService } from './log.service';
import * as httpMock from 'node-mocks-http';
// import app from '../../app';
import { UserService } from './user.service';
jest.mock('./log.service');
import { LoginResponse } from './dto/login.dto';
const mongoUri = 'mongodb://localhost/typerx-test-user-service';

describe('User Service Test', () => {
  let service: UserService;

  beforeAll(async () => {
    service = new UserService();
  })

  afterAll(async () => {

  })

  test.only('user login', async () => {
    const result = new LoginResponse();
    const context = new ServiceContext();
    context.request = httpMock.createRequest();
    const loginDto = {
      username: 'admin',
      password: '888888'
    };

    (<any>LogService.save).mockResolvedValue(result);
    jest.spyOn(service, 'validate').mockImplementation((context: any) => result);
    expect(await service.login(context, loginDto)).toBe(false);

  });

});