import { ColumnSets, FormSets } from 'types/types';

export const columnSets: ColumnSets = {
    default: [
        {
            title: 'name',
            i18n: '名称',
        },
        {
            title: 'icon',
            i18n: '图标',
        },
        {
            title: 'link',
            i18n: '链接',
        },
        {
            title: 'slug'
        },
        {
            title: 'order',
            i18n: '排序'
        }
    ]
};

export const formSets: FormSets = {
    query: {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                maxLength: 20,
                ui: {
                    
                }
            },
            name: {
                type: 'string',
                title: '姓名',
                minLength: 3
            }
        }
    },
    default: {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                maxLength: 20
            },
            name: {
                type: 'string',
                title: '姓名',
                minLength: 3
            }
        }
    }
};

