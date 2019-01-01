export interface Account {
  id: string;
  username: string; // 用户名
  name: string; // 姓名
  keyword: string;
  password: string; // 密码
  avatar: string; // 照片
  type: string; // 类型
  groups: string[];
  roles: string[];
  email: string; // 邮箱
  mobile: string; // 手机号码
  profile: any;
  isDisable: boolean; // 是否禁用
  isAdmin: boolean; // 是否管理员
  isApproved: boolean; // 是否审核
  secret: string; // 密保
  expired: Date; // 有效期
}
