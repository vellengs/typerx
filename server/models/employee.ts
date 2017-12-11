
/**
 * 员工
 * 
 * @export
 * @class Employee
 */
export class Employee {
	name: string;                   // 姓名
	nick: string;                   // 昵称
	gender: string;                 // 性别
	mobile: string;                 // 手机号码
	department: string;             // 部门
	idcard: string;                 // 身份证号
	bank_no: string;                // 银行帐号
	job: string;                    // 在职类型
	position: string;               // 级别
	grade: string;                  // 授课年级
	subject: string;                // 授课科目
	boss: string;                   // 上司
	contact: string;                // 联系方式
	email: string;                  // 邮箱
	qq: string;                     // QQ号码
	hiredate: Date;                 // 入职日期
	formal: boolean;                // 正式员工
	formal_date: Date;              // 转正日期
	comment: string;                // 备注
	auto_gen: boolean;              // 是否自动创建登录帐号
}