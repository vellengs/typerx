export class CreateAccountDto {
  avatar?: string;
  email?: string;
  keyword?:string;
  mobile?: string;
  groups?: string[];
  roles?: string[];
  username: string;
  password: string;
  name: string;
}

export class EditAccountDto {
  id: string;
  avatar?: string;
  email?: string;
  keyword?:string;
  groups?: string[];
  roles?: string[];
  mobile?: string;
  password?: string;
  name: string;
}

export class AccountResponse {
  id: string;
  username: string;
  name: string;
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

export class SessionUser {
  id?: string;
  username: string;
  name?: string;
  avatar?: string;
  type?: string;
  email?: string;
  groups?: string[];
  roles?: string[];
  mobile?: string;
  profile?: any;
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired?: Date;
}

export const AccountResponseFields = [
  'id',
  'username',
  'name',
  'avatar',
  'type',
  'email',
  'groups',
  'roles',
  'mobile',
  'isDisable',
  'isAdmin',
  'isApproved',
  'profile',
  'expired'
];

export declare interface PaginateAccount {
  error?: Error;
  list: Array<AccountResponse>;
  total: number;
}