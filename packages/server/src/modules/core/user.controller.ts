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
import {
  LoginDto,
  LocalStrategyInfo,
  LoginResponse,
  ProfileResponse,
} from './dto/login.dto';
import { LogService } from './log.service';
import { UserService } from './user.service';

/**
 * 系统接口.
 */
@Tags('core')
@Path('/user')
export class UserController {
  @Context context: ServiceContext;
  constructor(private readonly service = new UserService()) {}

  /**
   * 用户登陆
   * @param dto 用户登陆参数
   */
  @POST
  @Path('login')
  async login(dto: LoginDto): Promise<LoginResponse | false> {
    return this.service.login(this.context, dto);
  }

  /**
   * 帐户信息
   */
  @GET
  @Path('profile')
  async profile(): Promise<ProfileResponse> {
    return this.service.profile(this.context);
  }

  /**
   * 退出登陆
   */
  @Path('logout')
  @GET
  async logout(): Promise<boolean> {
    await this.context.request.logOut();
    return true;
  }
}
