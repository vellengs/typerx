export declare class Appearance {
    columnSets: ColumnSets;
    form: FormSets;
}
export interface ColumnSets {
    [key: string]: ColumnDefine[];
}
export interface FormSets {
    [key: string]: FormDefine;
}
export interface ColumnDefine {
    type?: 'checkbox' | 'link' | 'radio' | 'img' | 'currency' | 'number' | 'date' | 'yn';
    title: string;
    i18n?: string;
    index?: string | string[];
    render?: string;
    renderTitle?: string;
    width?: string;
    sort?: 'ascend' | 'descend';
    sorter?: Function;
    sortKey?: string;
    sortReName?: {
        ascend?: string;
        descend?: string;
    };
    filter?: Function;
    filtered?: boolean;
    filterIcon?: string;
    filterConfirmText?: string;
    filterClearText?: string;
    filterMultiple?: boolean;
    filterKey?: string;
    format?: Function;
    className?: string;
    colSpan?: number;
    numberDigits?: string;
    dateFormat?: string;
    ynTruth?: any;
    ynYes?: string;
    ynNo?: string;
    exported?: boolean;
    acl?: any;
    default?: string;
    fixed?: 'left' | 'right';
    [key: string]: any;
}
export interface FormDefine {
}
