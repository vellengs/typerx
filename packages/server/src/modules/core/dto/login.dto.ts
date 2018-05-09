export class LoginDto {
    username: string;
    password: string;
}

export interface LocalStrategyInfo {
    message: string;
}

export interface LoginResponse {
    name: string;
    operator: string;
    operatorIp: string;
    operation: string;
    comment: string;
}

export interface ProfileResponse {
    id: string;
    name: string;
}