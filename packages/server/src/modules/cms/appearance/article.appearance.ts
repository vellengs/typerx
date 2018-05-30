import { Appearance, SchemaTypes as t, WidgetTypes as w, FormDefine } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
import { SFSchema } from "../../../types/schema.types";

const addForm: SFSchema = {
    title: '新建文章',
    properties: {
        title: {
            title: '标题',
            type: t.string,
            ui: {
                grid: {
                    span: 16
                }
            }
        },

        keyword: {
            title: '关键词',
            type: t.string
        },
        category: {
            title: '分类',
            type: t.string,
            ui: {
                widget: w.search,
                domain: 'category',
                grid: {
                    span: 16
                }
            }
        },
        description: {
            title: '摘要',
            type: t.string,
            ui: {
                widget: w.textarea,
                grid: {
                    span: 24
                }
            }
        },
        content: {
            title: '内容',
            type: t.string,
            ui: {
                widget: w.ueditor,
                grid: {
                    span: 24
                }
            }
        },
    },
    required: [],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};

const editForm = cloneDeep(addForm);
editForm.title = '编辑文章';
editForm.required = ['username'];
editForm.properties.secret = {
    title: '密保',
    type: t.string
};

export const appearance: Appearance = {
    columnSets: {
        default: [
            {
                title: '文章名称',
                index: 'name',
                type: 'link',
                action: 'edit'
            },
            {
                title: '标题',
                index: 'title'
            }
        ]
    },
    formSets: {
        query: {
            properties: {
                name: {
                    title: '名称',
                    type: t.string,
                    maxLength: 30,
                    ui: {
                        placeholder: '请输入文章名称'
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}
