export class CreateWidgetDto {

}

export class EditWidgetDto {
    id: string;
}

export class WidgetResponse {

}

export declare interface PaginateWidget {
    error?: Error;
    list: Array<WidgetResponse>;
    total: number;
}