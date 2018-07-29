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
  Preprocessor,
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import * as passport from 'passport';
import {
  LoginDto,
  LocalStrategyInfo,
  LoginResponse,
  ProfileResponse,
  UploadConfig,
} from './dto/login.dto';
import { LogService } from './log.service';
import { UserService } from './user.service';
import { EditProfileDto } from './dto/profile.dto';
import { interceptor } from '../../interceptor/interceptor';

/**
 * 系统接口.
 */
@Tags('core')
@Path('/user')
@Preprocessor(interceptor)
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
    return this.service.update(this.context, entry);
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


  /**
   * 上传附件
   * @param file 
   * @param field 
   */
  @POST
  @Path("upload")
  async fileUpload(@FileParam("file") file: Express.Multer.File,
    @FormParam("field") field?: string) {
    console.log('file:', field);
    const result = await this.service.fileUpload(file, field);
    return result;
  }

  /**
   * 编辑器附件上传
   * @param file 
   * @param field 
   */
  @POST
  @Path("umeditor/upload")
  umeditorUpload(@FileParam("upfile") file: Express.Multer.File,
    @FormParam("field") field?: string) {

    return `{
          "state": "SUCCESS",
          "url": "uploads/${file.filename}" ,
          "name": "${file.originalname}",
          "originalName": "${file.originalname}",
          "size": ${file.size},
          "type": "${file.mimetype}",
      }`;
  }


  /**
   * 文件上传配置
   */
  @GET
  @Path("upload")
  async uploadConfig(@QueryParam("action") action?: string): Promise<UploadConfig> {
    return this.service.getUploadConfig(action);
  }

}
