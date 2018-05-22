import { Appearance, SchemaTypes as t, WidgetTypes as w } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
const addForm = {
    title: '添加帐号',
    properties: {
        username: {
            title: '账号名',
            type: t.string,
        },
        nick: {
            title: '昵称',
            type: t.string,
        },
        password: {
            title: '密码',
            type: t.string
        },
        type: {
            title: '类型',
            type: t.string
        },
        email: {
            title: '邮箱',
            type: t.string
        },
        mobile: {
            title: '手机',
            pattern: '^1[0-9]{10}$',
            type: t.string
        },
        isDisable: {
            title: '是否禁用',
            type: t.boolean
        },
        isAdmin: {
            title: '是否超管',
            type: t.boolean,
            readOnly: true,
        },
        isApproved: {
            title: '启用',
            default: true,
            type: t.boolean
        },
        expired: {
            title: '有效期',
            type: t.string,
            format: 'date-time',
            ui: {
                widget: w.date
            }
        },
        secret: {
            title: '密保',
            type: t.string
        }
    },
    required: ['username', 'password'],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};

const editForm = cloneDeep(addForm);
editForm.title = '编辑帐号';
editForm.required = ['username'];

export const appearance: Appearance = {
    columnSets: {
        default: [
            {
                title: 'username',
                i18n: '账号名称',
                index: ['username']
            },
            {
                title: 'nick',
                i18n: '姓名',
                index: ['nick']
            },
            {
                title: 'type',
                i18n: '类型',
                index: ['type']
            },
            {
                title: 'email',
                i18n: '邮箱',
                index: ['email']
            },
            {
                title: 'mobile',
                i18n: '手机号',
                index: ['mobile'],
            }
        ]
    },
    formSets: {
        query: {
            properties: {
                username: {
                    title: '账号',
                    type: t.string,
                    maxLength: 30,
                    ui: {
                        placeholder: '请输入账号名称'
                    }
                },
                mobile: {
                    title: '手机',
                    type: 'string',
                    ui: {
                        placeholder: '请输入手机号码'
                    }
                },
                email: {
                    title: '邮箱',
                    type: t.string,
                    ui: {
                        placeholder: '请输入邮箱'
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}
