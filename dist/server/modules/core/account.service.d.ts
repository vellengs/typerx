import { Appearance } from "../../types/appearance";
import { ServiceContext } from "typescript-rest";
import { Account } from './interfaces/account.interface';
export declare class AccountService {
    private readonly context;
    constructor(context: ServiceContext);
    getAppearance(): Promise<Appearance>;
    getAccountsByKeyword(keyword?: string): Promise<Account[]>;
    create(entry: any): Promise<any>;
    update(entry: any, admin?: Account): Promise<any>;
}
