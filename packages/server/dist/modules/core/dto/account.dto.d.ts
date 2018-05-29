export declare class CreateAccountDto {
    avatar?: string;
    email?: string;
    mobile?: string;
    groups?: string[];
    roles?: string[];
    username: string;
    password: string;
    nick: string;
}
export declare class EditAccountDto {
    id: string;
    avatar?: string;
    email?: string;
    groups?: string[];
    roles?: string[];
    mobile?: string;
    password?: string;
    nick: string;
}
export declare class AccountResponse {
    id: string;
    username: string;
    nick: string;
    avatar: string;
    type: string;
    groups: string[];
    roles: string[];
    email: string;
    mobile: string;
    profile: any;
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    expired: Date;
}
export declare class SessionUser {
    id: string;
    username: string;
    nick: string;
    avatar: string;
    type: string;
    email: string;
    groups: string[];
    roles: string[];
    mobile: string;
    profile: any;
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    expired: Date;
}
export declare const AccountResponseFields: string[];
export interface PaginateAccount {
    error?: Error;
    list: Array<AccountResponse>;
    total: number;
}
