import { Appearance } from '../../types/appearance';
import { ServiceContext } from 'typescript-rest';
import { AccountResponse, EditAccountDto, SessionUser, CreateAccountDto } from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
export declare class AccountService {
    getAppearance(): Promise<Appearance>;
    getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]>;
    create(entry: CreateAccountDto): Promise<AccountResponse>;
    valuable(value: any): any;
    update(entry: EditAccountDto, admin?: SessionUser): Promise<AccountResponse>;
    remove(id: string): Promise<boolean>;
    profile(context: ServiceContext): Promise<ProfileResponse>;
    get(id: string): Promise<AccountResponse>;
}
