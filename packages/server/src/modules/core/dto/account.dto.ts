export interface CreateAccountDto {
    id: string;
    username: string;
    nick: string;
}

export interface EditAccountDto {
    id: string;
    username: string;
    nick: string;
}

export interface AccountResponse {
    id: string;
    username: string;
    nick: string;
}

export interface SessionUser {
    id: string;
    username: string;
    nick: string;
}