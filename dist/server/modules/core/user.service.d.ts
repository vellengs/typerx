import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse } from './dto/login.dto';
export declare class UserService {
    login(context: ServiceContext, loginDto: LoginDto): Promise<LoginResponse>;
    private validate(request, response, next);
}
