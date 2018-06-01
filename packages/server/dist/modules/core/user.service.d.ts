/// <reference types="multer" />
import { ServiceContext } from 'typescript-rest';
import { LoginDto, LoginResponse, ProfileResponse } from './dto/login.dto';
import { EditProfileDto } from './dto/profile.dto';
export declare class UserService {
    login(context: ServiceContext, loginDto: LoginDto): Promise<LoginResponse>;
    getUploadConfig(action: string): Promise<{
        "imageUrl": string;
        "imagePath": string;
        "imageFieldName": string;
        "imageMaxSize": number;
        "imageAllowFiles": string[];
    }>;
    fileUpload(file: Express.Multer.File, field?: string): Promise<{
        url: string;
    }>;
    update(context: ServiceContext, entry: EditProfileDto): Promise<ProfileResponse>;
    private validate(request, response, next);
    private pure(entry);
}
