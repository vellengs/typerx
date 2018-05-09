import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse, ProfileResponse } from './dto/login.dto';
import { UserService } from './user.service';
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
     * 帐户信息
     */
    profile(): Promise<ProfileResponse>;
    /**
     * 退出登陆
     */
    logout(): Promise<boolean>;
}
