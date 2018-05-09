import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse, ProfileResponse } from './dto/login.dto';
export declare class UserService {
    login(context: ServiceContext, loginDto: LoginDto): Promise<LoginResponse | false>;
    profile(context: ServiceContext): Promise<ProfileResponse>;
    private validate(request, response, next);
}
