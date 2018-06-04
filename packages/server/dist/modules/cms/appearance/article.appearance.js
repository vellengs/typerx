"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appearance_1 = require("../../../types/appearance");
const lodash_1 = require("lodash");
const addForm = {
    title: '新建文章',
    properties: {
        title: {
            title: '标题',
            type: appearance_1.SchemaTypes.string,
            ui: {
                grid: {
                    span: 16
                }
            }
        },
        keyword: {
            title: '关键词',
            type: appearance_1.SchemaTypes.string
        },
        category: {
            title: '分类',
            type: appearance_1.SchemaTypes.string,
            ui: {
                widget: appearance_1.WidgetTypes.search,
                domain: 'category',
                grid: {
                    span: 16
                }
            }
        },
        description: {
            title: '摘要',
            type: appearance_1.SchemaTypes.string,
            ui: {
                widget: appearance_1.WidgetTypes.textarea,
                grid: {
                    span: 24
                }
            }
        },
        content: {
            title: '内容',
            type: appearance_1.SchemaTypes.string,
            ui: {
                widget: appearance_1.WidgetTypes.ueditor,
                grid: {
                    span: 24
                }
            }
        },
    },
    required: ['title', 'category'],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};
const editForm = lodash_1.cloneDeep(addForm);
editForm.title = '编辑文章';
exports.appearance = {
    columnSets: {
        default: [
            {
                title: '标题',
                index: 'title'
            },
            {
                title: '作者',
                index: 'author'
            },
            {
                title: '分类',
                index: 'category.name'
            }
        ]
    },
    formSets: {
        query: {
            properties: {
                name: {
                    title: '名称',
                    type: appearance_1.SchemaTypes.string,
                    maxLength: 30,
                    ui: {
                        placeholder: '请输入文章名称'
                    }
                },
                category: {
                    title: '分类',
                    type: appearance_1.SchemaTypes.string,
                    default: null,
                    ui: {
                        widget: appearance_1.WidgetTypes.search,
                        domain: 'category',
                        allowClear: true,
                        placeholder: '请选择分类'
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
};
//# sourceMappingURL=article.appearance.js.map