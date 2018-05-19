import { Appearance, SchemaTypes as t, WidgetTypes as w } from "../../../types/appearance";

const addForm = {
    properties: {
        name: {
            title: '名称',
            type: 'string',
            maxLength: 30,
            placeholder: '请输入菜单名称',
            required: true
        },
        parent: {
            title: '父级菜单',
            type: 'string',
            ui: {
                widget: w.search,
                domain: 'menu'
            }
        },
        link: {
            title: '链接',
            type: 'string',
            maxLength: 512,
            placeholder: '请输入链接'
        },
        slug: {
            title: '标识',
            type: 'string',
            maxLength: 30,
            placeholder: '请输标识'
        },
        group: {
            title: '是否分组',
            type: t.boolean,
            maxLength: 30,
        },
        icon: {
            title: '图标',
            type: 'string',
            ui: {
                widget: w.autocomplete
            }
        },
        expanded: {
            title: '是否展开',
            type: t.boolean,
        },
        order: {
            title: '顺序',
            type: t.number,
        },
        permissions: {
            title: '权限列表',
            type: t.array,
            items: {
                type: 'string',
            },
            ui: {
                widget: 'listBox',
                title: '选择API',
                dialog: 'apiSelector',
                params: {
                    multiple: true
                }
            }
        }
    }
};

const editForm = addForm;

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
                name: {
                    type: 'string',
                    title: '名称',
                    maxLength: 20,
                    ui: {
                        widget: 'autocomplete',
                        debounceTime: 100,
                        placeholder: '请输入菜单名称',
                        // asyncData: (input: string) => of(input ? [input, input + input, input + input + input] : [])
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}

