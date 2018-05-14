import { Appearance, PaginateResponse } from '../../types/appearance';
import { ServiceContext } from 'typescript-rest';
import { AccountResponse, EditAccountDto, SessionUser, CreateAccountDto } from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
export declare class AccountService {
    getAppearance(): Promise<Appearance>;
    getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]>;
    create(entry: CreateAccountDto): Promise<AccountResponse>;
    update(entry: EditAccountDto, admin?: SessionUser): Promise<AccountResponse>;
    remove(id: string): Promise<boolean>;
    profile(context: ServiceContext): Promise<ProfileResponse>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<AccountResponse[]>>;
    get(id: string): Promise<AccountResponse>;
}
