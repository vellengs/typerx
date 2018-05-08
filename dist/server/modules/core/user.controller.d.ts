import { ServiceContext } from 'typescript-rest';
/**
 * 系统接口.
 */
export declare class UserController {
    context: ServiceContext;
    login(userModel: any): Promise<any>;
    profile(): Promise<any>;
    logout(): Promise<any>;
}
