import { ColumnsDefine } from 'modex';

export const columns: ColumnsDefine = {
	name: {
		header: '姓名'
	},
	gender: {
		header: '性别',
		format: 'dict:gender',
		hidden: true,
	},
	birthday: {
		header: '生日',
		format: 'date:yyyy-MM-dd',
		hidden: true,
	},
	idcard: {
		header: '身份证',
		hidden: true,
	},
	mobile: {
		header: '手机'
	},
	qq: {
		header: 'qq',
		hidden: true,
	},
	from_school: {
		header: '学校',
		hidden: true,
	},
	from_grade: {
		header: '年级',
		hidden: true,
	},
	from_class: {
		header: '班级',
		hidden: true,
	},
	father: {
		header: '父亲',
		hidden: true,
	},
	father_mobile: {
		header: '父亲的手机',
		hidden: true,
	},
	father_job: {
		header: '父亲的职业',
		hidden: true,
	},
	mother_mobile: {
		header: '母亲的手机',
		hidden: true,
	},
	mother: {
		header: '母亲',
		hidden: true,
	},
	mother_job: {
		header: '母亲的职业',
		hidden: true,
	},
	tel: {
		header: '家庭电话',
		hidden: true,
	},
	address: {
		header: '家庭住址',
		hidden: true,
	},
	from_media: {
		header: '信息来源',
		hidden: true,
	},
	intent: {
		header: '意向等级'
	},
	region: {
		header: '校区',
		hidden: true,
	},
	status: {
		header: '状态'
	},
	inviter: {
		header: '邀请人',
		hidden: true,
	},
	primary_adviser: {
		header: '主要负责人',
		format: 'prop:name',
	},
	secondary_advisers: {
		header: '副负责人',
		format: 'prop:name',
	},
	appointment: {
		header: '预约时间'
	},
	created: {
		header: '创建日期'
	},
	comment: {
		header: '备注',
		hidden: true,
	},
	trial: {
		header: '试听'
	},
	talk_times: {
		header: '联系次数'
	},
	last_talk: {
		header: '最后联系时间'
	},
};

