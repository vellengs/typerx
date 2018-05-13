export interface CreateMenuDto {
  avatar?: string;
  email?: string;
  mobile?: string;
  username: string;
  password: string;
  nick: string;
}

export interface EditMenuDto {
  id: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  password?: string;
  nick: string;
}

export interface MenuResponse {
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
 