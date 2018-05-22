import { Appearance, SchemaTypes as t, WidgetTypes as w } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
const addForm = {
    title: '添加字典',
    properties: {
        name: {
            title: '名称',
            type: 'string',
            maxLength: 30,
            placeholder: '请输入字典名称',
            required: true
        },

    },
    required: ['name'],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};

const editForm = cloneDeep(addForm);
editForm.title = '编辑字典';

export const appearance: Appearance = {
    columnSets: {
        default: [
            {
                title: 'name',
                i18n: '名称',
                index: ['name']
            },
            {
                title: 'icon',
                i18n: '图标',
                index: ['icon']
            },
            {
                title: 'link',
                i18n: '链接',
                index: ['link']
            },
            {
                title: 'externalLink',
                i18n: '扩展链接',
                index: ['externalLink']
            },
            {
                title: 'slug',
                index: ['externalLink']
            },
            {
                title: 'order',
                index: ['order'],
                click: () => {
                    console.log('click ..');
                }
            }
        ]
    },
    formSets: {
        query: {
            properties: {
                keyword: {
                    type: 'string',
                    title: '名称',
                    maxLength: 20,
                    ui: {
                        widget: 'autocomplete',
                        debounceTime: 100,
                        placeholder: '请输入字典名称',
                        // asyncData: (input: string) => of(input ? [input, input + input, input + input + input] : [])
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}

