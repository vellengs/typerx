export interface Account {
    id: string;
    username: string;
    name: string;
    keyword: string;
    password: string;
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
    secret: string;
    expired: Date;
}
