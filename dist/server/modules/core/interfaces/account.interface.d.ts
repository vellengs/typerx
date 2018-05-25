export interface Account {
    id: string;
    username: string;
    nick: string;
    password: string;
    avatar: string;
    type: string;
    groups: string[];
    roles: string[];
    email: string;
    mobile: string;
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    secret: string;
    expired: Date;
}
