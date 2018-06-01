export declare class CreateWidgetDto {
}
export declare class EditWidgetDto {
    id: string;
}
export declare class WidgetResponse {
}
export interface PaginateWidget {
    error?: Error;
    list: Array<WidgetResponse>;
    total: number;
}
