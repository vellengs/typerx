import { Appearance } from '../../types/appearance';
import { ServiceContext } from 'typescript-rest';
import { AccountResponse, EditAccountDto, SessionUser, CreateAccountDto, PaginateAccount } from './dto/account.dto';
import { ProfileResponse } from './dto/login.dto';
import { KeyValue } from '../../types/data.types';
export declare class AccountService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateAccountDto): Promise<AccountResponse>;
    update(entry: EditAccountDto, admin?: SessionUser): Promise<AccountResponse>;
    remove(id: string): Promise<boolean>;
    profile(context: ServiceContext): Promise<ProfileResponse>;
    query(keyword?: string, group?: string, role?: string, page?: number, size?: number, sort?: string): Promise<PaginateAccount>;
    get(id: string): Promise<AccountResponse>;
    private pure(entry);
}
