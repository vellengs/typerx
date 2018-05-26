import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse, ProfileResponse } from './dto/login.dto';
import { EditProfileDto } from './dto/profile.dto';
export declare class UserService {
    login(context: ServiceContext, loginDto: LoginDto): Promise<LoginResponse>;
    update(entry: EditProfileDto): Promise<ProfileResponse>;
    private validate(request, response, next);
    private pure(entry);
}
