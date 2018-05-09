import {
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  DELETE,
  QueryParam,
  Context,
  ServiceContext,
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import * as passport from 'passport';
import { LoginDto, LocalStrategyInfo, LoginResponse } from './dto/login.dto';
import { LogService } from './log.service';
import { UserService } from './user.service';

/**
 * 系统接口.
 */
@Tags('core')
@Path('/')
export class UserController {
  @Context context: ServiceContext;

  constructor(private readonly service: UserService) {
    this.service = new UserService(this.context);
  }

  @POST
  @Path('login')
  async login(dto: LoginDto): Promise<LoginResponse | false> {
    return this.service.login(dto);
  }

  @GET
  @Path('profile')
  async profile(): Promise<any> {
    return this.service.profile();
  }

  @Path('logout')
  @GET
  async logout(): Promise<any> {
    await this.context.request.logOut();
    return true;
  }
}
