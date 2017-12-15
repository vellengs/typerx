import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const schema: EntityProperties = {
	name: {
		title: '姓名',
		type: t.string,
		required: true,
	},
	gender: {
		title: '性别',
		widget: {
			id: w.dict,
			category: 'gender'
		},
		type: t.string
	},
	birthday: {
		title: '出生日期',
		type: t.Date,
		widget: w.date
	},
	idcard: {
		title: '身份证',
		type: t.string,
		maxlength: 23
	},
	mobile: {
		title: '手机号码',
		type: t.string,
		maxlength: 11,
		widget: w.input,
		required: true,
	},
	qq: {
		title: 'QQ号码',
		type: t.string,
		maxlength: 13
	},
	from_school: {
		title: '学校',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'school'
		}
	},
	from_grade: {
		title: '年级',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'grade'
		}
	},
	from_class: {
		title: '班级',
		type: t.string,
	},
	father: {
		title: '父亲',
		type: t.string,
	},
	father_mobile: {
		title: '父亲的手机',
		type: t.string,
		maxlength: 11,
	},
	father_job: {
		title: '父亲的职业',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'job'
		}
	},
	mother: {
		title: '母亲',
		type: t.string
	},
	mother_mobile: {
		title: '母亲的手机',
		type: t.string,
		maxlength: 11,
	},
	mother_job: {
		title: '母亲的职业',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'job'
		}
	},
	tel: {
		title: '家庭电话',
		type: t.string,
	},
	address: {
		title: '住址',
		type: t.string,
	},
	from_media: {
		title: '来源',
		type: t.string,
		required: true,
		widget: {
			id: w.dict,
			category: 'from_media'
		},
	},
	intent: {
		title: '意向等级',
		type: t.string,
		widget: w.rate
	},
	region: {
		title: '所属校区',
		type: t.string,
		widget: {
			id: w.dict,
			category: 'region'
		},
	},
	status: {
		title: '状态',
		widget: {
			id: w.dict,
			category: 'customer_status'
		}
	},
	inviter: {
		title: '邀请人',
		widget: {
			id: w.search,
			domain: 'member'
		}
	},
	primary_adviser: {
		title: '主负责人',
		widget: {
			id: w.search,
			domain: 'employee'
		}
	},
	secondary_advisers: {
		title: '副负责人',
		type: t.array,
		items: {
			// title: '字段',
			type: t.string,
		},
		widget: {
			id: w.search,
			domain: 'employee',
			multiple: 'multiple'
		}
	},
	appointment: {
		title: '预约',
		widget: {
			id: w.datetime
		}
	},
	created: {
		title: '创建时间',
		widget: {
			id: w.datetime,
			readOnly: true
		},
	},
	trial: {
		title: '试听状态',
		type: t.boolean
	},
	talk_times: {
		title: '沟通次数',
	},
	last_talk: {
		title: '最后沟通',
		widget: w.datetime
	},
	comment: {
		title: '备注',
		widget: {
			id: w.textarea,
			size: 24
		}
	},
	type: {
		title: '归类',
		widget: {
			id: w.dict,
			category: 'customer_type'
		}
	}
};
