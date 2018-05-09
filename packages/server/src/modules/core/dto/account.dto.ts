export interface CreateAccountDto {
  avatar?: string;
  email?: string;
  mobile?: string;
  username: string;
  password: string;
  nick: string;
}

export interface EditAccountDto {
  id: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  password?: string;
  nick: string;
}

export interface AccountResponse {
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

export interface SessionUser {
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
