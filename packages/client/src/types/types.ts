import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema } from '@delon/form';

export class Appearance {
    columnSets: ColumnSets;
    formSets: FormSets;
}

export interface ColumnSets {
    default: SimpleTableColumn[];
    [key: string]: SimpleTableColumn[];
}

export interface FormSets {
    default: SFSchema;
    query?: SFSchema;
    add?: SFSchema;
    edit?: SFSchema;
    [key: string]: SFSchema;
}

export interface BasePage {
    load(): void;
    reload(): void;
}

export interface BaseTable extends BasePage {
    domain: string;
    columnSets: {
        [key: string]: SimpleTableColumn[]
    };
    queryParams: {
        [key: string]: any
    };
    total: number;
}

export interface CurdPage extends BaseTable {
    add(): void;
    edit(entry: any): void;
    remove(entry: any): void;
    removeChecked(): void;
    formSets: FormSets;
}

export interface TreeData {
    nodes: Array<any>;
    expandKeys: Array<string>;
}

export interface TransferItem {
    id: string;
    name: string;
    desc: string;
}
