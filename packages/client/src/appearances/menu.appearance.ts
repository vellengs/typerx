// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { ColumnSets, FormSets } from './../types/types';

export const columnSets: ColumnSets = {
    default: [
        {
            title: 'name',
            i18n: '名称',
            index: 'name'
        },
        {
            title: 'icon',
            i18n: '图标',
            index: 'icon'
        },
        {
            title: 'link',
            i18n: '链接',
            index: 'link'
        },
        {
            title: 'slug',
            index: 'slug'
        },
        {
            title: 'order',
            i18n: '排序',
            index: 'order'
        }
    ]
};

export const formSets: FormSets = {
    query: {
        properties: {
            name: {
                type: 'string',
                title: '名称',
                maxLength: 20,
                ui: {
                    widget: 'autocomplete',
                    debounceTime: 100,
                    placeholder: '请输入菜单名称',
                    asyncData: (input: string) => of(input ? [input, input + input, input + input + input] : [])
                }
            }
        }
    },
    default: {
        properties: {
            email: {
                type: 'string',
                title: '',
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

export default {
    columnSets: columnSets,
    formSets: formSets
};
