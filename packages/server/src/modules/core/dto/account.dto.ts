export class CreateAccountDto {
  avatar?: string;
  email?: string;
  mobile?: string;
  groups?: string[];
  roles?: string[];
  username: string;
  password: string;
  nick: string;
}

export class EditAccountDto {
  id: string;
  avatar?: string;
  email?: string;
  groups?: string[];
  roles?: string[];
  mobile?: string;
  password?: string;
  nick: string;
}

export class AccountResponse {
  id: string;
  username: string;
  nick: string;
  avatar: string;
  type: string;
  groups: string[];
  roles: string[];
  email: string;
  mobile: string;
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired: Date;
}

export class SessionUser {
  id: string;
  username: string;
  nick: string;
  avatar: string;
  type: string;
  email: string;
  groups: string[];
  roles: string[];
  mobile: string;
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired: Date;
}

export const AccountResponseFields = [
  'id',
  'username',
  'nick',
  'avatar',
  'type',
  'email',
  'groups',
  'roles',
  'mobile',
  'isDisable',
  'isAdmin',
  'isApproved',
  'expired'
];