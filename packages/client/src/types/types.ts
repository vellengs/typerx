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
