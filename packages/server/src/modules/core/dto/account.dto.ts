export class CreateAccountDto {
  avatar?: string;
  email?: string;
  mobile?: string;
  username: string;
  password: string;
  nick: string;
}

export class EditAccountDto {
  id: string;
  avatar?: string;
  email?: string;
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
  email: string;
  mobile: string;
  roles: string[];
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
  mobile: string;
  roles: string[];
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired: Date;
}
