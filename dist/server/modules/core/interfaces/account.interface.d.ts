export interface Account {
    username: string;
    nick: string;
    password: string;
    avatar: string;
    type: string;
    email: string;
    mobile: string;
    roles: string[];
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    secret: string;
    expired: Date;
}
