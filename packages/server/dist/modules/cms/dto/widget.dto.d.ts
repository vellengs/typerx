export declare class CreateWidgetDto {
    name: string;
    title: string;
    params: any;
    type: string;
}
export declare class EditWidgetDto {
    id: string;
    name: string;
    title: string;
    params: any;
    type: string;
}
export declare class WidgetResponse {
    id: string;
    name: string;
    title: string;
    params: any;
    type: string;
}
export declare const WidgetResponseFields: string[];
export interface PaginateWidget {
    error?: Error;
    list: Array<WidgetResponse>;
    total: number;
}
