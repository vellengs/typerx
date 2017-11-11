"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    name: {
        title: '姓名',
        type: modex_1.DataTypes.string,
        required: true,
    },
    gender: {
        title: '性别',
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'gender'
        },
        type: modex_1.DataTypes.string
    },
    birthday: {
        title: '出生日期',
        type: modex_1.DataTypes.Date,
        widget: modex_1.WidgetTypes.date
    },
    idcard: {
        title: '身份证',
        type: modex_1.DataTypes.string,
        maxlength: 23
    },
    mobile: {
        title: '手机号码',
        type: modex_1.DataTypes.string,
        maxlength: 11,
        widget: modex_1.WidgetTypes.input,
        required: true,
    },
    qq: {
        title: 'QQ号码',
        type: modex_1.DataTypes.string,
        maxlength: 13
    },
    from_school: {
        title: '学校',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'school'
        }
    },
    from_grade: {
        title: '年级',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'grade'
        }
    },
    from_class: {
        title: '班级',
        type: modex_1.DataTypes.string,
    },
    father: {
        title: '父亲',
        type: modex_1.DataTypes.string,
    },
    father_mobile: {
        title: '父亲的手机',
        type: modex_1.DataTypes.string,
        maxlength: 11,
    },
    father_job: {
        title: '父亲的职业',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'job'
        }
    },
    mother: {
        title: '母亲',
        type: modex_1.DataTypes.string
    },
    mother_mobile: {
        title: '母亲的手机',
        type: modex_1.DataTypes.string,
        maxlength: 11,
    },
    mother_job: {
        title: '母亲的职业',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'job'
        }
    },
    tel: {
        title: '家庭电话',
        type: modex_1.DataTypes.string,
    },
    address: {
        title: '住址',
        type: modex_1.DataTypes.string,
    },
    from_media: {
        title: '来源',
        type: modex_1.DataTypes.string,
        required: true,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'from_media'
        },
    },
    intent: {
        title: '意向等级',
        type: modex_1.DataTypes.string,
        widget: modex_1.WidgetTypes.rate
    },
    region: {
        title: '所属校区',
        type: modex_1.DataTypes.string,
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'region'
        },
    },
    status: {
        title: '状态',
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'customer_status'
        }
    },
    inviter: {
        title: '邀请人',
        widget: {
            id: modex_1.WidgetTypes.search,
            domain: 'member'
        }
    },
    primary_adviser: {
        title: '主负责人',
        widget: {
            id: modex_1.WidgetTypes.search,
            domain: 'employee'
        }
    },
    secondary_advisers: {
        title: '副负责人',
        type: modex_1.DataTypes.array,
        items: {
            // title: '字段',
            type: modex_1.DataTypes.string,
        },
        widget: {
            id: modex_1.WidgetTypes.search,
            domain: 'employee',
            multiple: 'multiple'
        }
    },
    appointment: {
        title: '预约',
        widget: {
            id: modex_1.WidgetTypes.datetime
        }
    },
    created: {
        title: '创建时间',
        widget: {
            id: modex_1.WidgetTypes.datetime,
            readOnly: true
        },
    },
    trial: {
        title: '试听状态',
        type: modex_1.DataTypes.boolean
    },
    talk_times: {
        title: '沟通次数',
    },
    last_talk: {
        title: '最后沟通',
        widget: modex_1.WidgetTypes.datetime
    },
    comment: {
        title: '备注',
        widget: {
            id: modex_1.WidgetTypes.textarea,
            size: 24
        }
    },
    type: {
        title: '归类',
        widget: {
            id: modex_1.WidgetTypes.dict,
            category: 'customer_type'
        }
    }
};
//# sourceMappingURL=customer.properties.js.map