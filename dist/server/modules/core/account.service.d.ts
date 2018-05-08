import { Appearance } from "../../types/appearance";
import { Account } from './interfaces/account.interface';
export declare class AccountService {
    getAppearance(): Promise<Appearance>;
    getAccountsByKeyword(keyword?: string): Promise<Account[]>;
    create(entry: any): Promise<any>;
    update(entry: any, admin?: Account): Promise<any>;
}
