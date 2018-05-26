import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse, ProfileResponse } from './dto/login.dto';
import { UserService } from './user.service';
import { EditProfileDto } from './dto/profile.dto';
/**
 * 系统接口.
 */
export declare class UserController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: UserService);
    /**
     * 用户登陆
     * @param dto 用户登陆参数
     */
    login(dto: LoginDto): Promise<LoginResponse | false>;
    /**
   * 更新帐号
   * @param entry 帐号信息
   */
    update(entry: EditProfileDto): Promise<ProfileResponse>;
    /**
     * 退出登陆
     */
    logout(): Promise<boolean>;
}
