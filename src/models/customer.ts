/**
 * 客户
 * 
 * @export
 * @class Customer
 */
export class Customer {

    name: string;                // 姓名
    gender: string;              // 性别
    birthday: Date;              // 出生日期
    idcard: string;              // 身份证号
    mobile: string;              // 手机号码
    qq: string;                  // QQ号码

    from_school: string;         // 公立学校
    from_grade: string;          // 年级
    from_class: string;          // 班级

    father: string;               // 父亲姓名
    father_mobile: string;          // 父亲电话
    father_job: string;           // 父亲职业
    mother_mobile: string;         // 母亲电话
    mother: string;              // 母亲姓名
    mother_job: string;          // 母亲职业
    tel: string;                 // 家庭电话
    address: string;             // 家庭住址

    from_media: string;          // 招生来源
    intent: string;              // 意向级别
    region: string;              // 所属校区
    status: number;              // 状态

    inviter: string;             // 介绍人
    primary_adviser: string;     // 主负责人
    secondary_advisers: string[];   // 副负责人
    appointment: Date;           // 试听预约时间
    created: Date;               // 创建时间
    comment: string;             //  备注

    trial: boolean;              // 试听状态
    talk_times: number;          // 沟通次数
    last_talk: Date;             // 最后一次沟通时间
    type: number;                // 客户归类
} 