import { Appearance, SchemaTypes as t, WidgetTypes as w, FormDefine } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
import { SFSchema } from "../../../types/schema.types";

const profile: SFSchema = {
    title: '个人信息',
    properties: {
        nick: {
            title: '昵称',
            type: t.string,
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
        address: {
            title: '地址',
            type: t.string
        },
        siteUrl: {
            title: '网址',
            type: t.string
        },
        company: {
            title: '公司名称',
            type: t.string
        }
    },
    required: ['nick', 'email', 'mobile'],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};

const sysSetting: SFSchema = {
    title: '系统设置',
    properties: {
        name: {
            title: '系统名称',
            type: t.string,
        },
        logo: {
            title: '系统标志',
            type: t.string,
        },
    }
};

export const appearance: Appearance = {
    columnSets: {
    },
    formSets: {
        profile: profile,
        sysSetting: sysSetting
    }
}
