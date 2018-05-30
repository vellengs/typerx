import { Appearance, SchemaTypes as t, WidgetTypes as w, FormDefine } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
import { SFSchema } from "../../../types/schema.types";

const addForm: SFSchema = {
    title: '新建页面',
    properties: {

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
editForm.title = '编辑页面';
editForm.required = ['username'];
editForm.properties.secret = {
    title: '密保',
    type: t.string
};

export const appearance: Appearance = {
    columnSets: {
        default: [
            {
                title: '页面名称',
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
                        placeholder: '请输入页面名称'
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}
