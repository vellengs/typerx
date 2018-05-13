export interface LoginDto {
    username: string;
    password: string;
}
export interface LocalStrategyInfo {
    message: string;
}
export interface LoginResponse {
    username: string;
    nick: string;
    avatar: string;
    type: string;
    email: string;
    mobile: string;
    roles: string[];
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    expired: Date;
}
export interface ProfileResponse {
    id: string;
    name: string;
}
