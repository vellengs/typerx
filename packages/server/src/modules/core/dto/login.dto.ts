export class LoginDto {
  username: string;
  password: string;
}

export class LocalStrategyInfo {
  message: string;
}

export class LoginResponse {
  username: string;
  nick: string;
  avatar: string;
  type: string;
  email: string;
  mobile: string;
  groups: string[];
  roles: string[];
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired: Date;
}

export class ProfileResponse {
  id: string;
  username: string;
  nick: string;
  avatar: string;
  type: string;
  email: string;
  mobile: string;
  groups: string[];
  roles: string[];
  isDisable: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  expired: Date;
  [key: string]: any;
}


export class UploadConfig {
  imageUrl: string;
  imagePath: string;
  imageFieldName: string;
  imageMaxSize: number;
  imageAllowFiles: string[];
}