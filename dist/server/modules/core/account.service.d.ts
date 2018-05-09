import { Appearance } from '../../types/appearance';
import { Account } from './interfaces/account.interface';
import { AccountResponse } from './dto/account.dto';
export declare class AccountService {
    getAppearance(): Promise<Appearance>;
    getAccountsByKeyword(keyword?: string): Promise<AccountResponse[]>;
    create(entry: any): Promise<any>;
    update(entry: any, admin?: Account): Promise<any>;
    remove(id: string): Promise<boolean>;
}
