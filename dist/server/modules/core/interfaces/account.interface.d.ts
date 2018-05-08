export interface Account {
    username: string;
    nick: string;
    password: string;
    alias: string;
    type: string;
    role: any;
    mail: string;
    mobile: string;
    group: string;
    isDisable: boolean;
    isAdmin: boolean;
    isApproved: boolean;
    secret: string;
    salt: string;
}
