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
  FileParam,
  FormParam,
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
import { EditProfileDto } from './dto/profile.dto';

/**
 * 系统接口.
 */
@Tags('core')
@Path('/user')
export class UserController {
  @Context context: ServiceContext;
  constructor(private readonly service = new UserService()) { }

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
 * 更新帐号
 * @param entry 帐号信息
 */
  @PUT
  async update(entry: EditProfileDto): Promise<ProfileResponse> {
    return this.service.update(entry);
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

  @POST
  @Path("upload")
  userFileUpload(@FileParam("file") file: Express.Multer.File,
    @FormParam("field") field?: string) {

    console.log('file:', file);
    return {
      url: 'uploads/' + file.filename
    }
  }



}
