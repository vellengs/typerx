export declare class LoginDto {
    username: string;
    password: string;
}
export declare class LocalStrategyInfo {
    message: string;
}
export declare class LoginResponse {
    username: string;
    nick: string;
    avatar: string;
    type: string;
    email: string;
    mobile: string;
    groups: string[];
    roles: string[];
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    expired: Date;
}
export declare class ProfileResponse {
    id: string;
    username: string;
    nick: string;
    avatar: string;
    type: string;
    email: string;
    mobile: string;
    groups: string[];
    roles: string[];
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    expired: Date;
    [key: string]: any;
}
