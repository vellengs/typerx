export declare class CreateLogDto {
    name: string;
    operator: string;
    operatorIp: string;
    operation: string;
    comment: string;
}
export declare class LogResponse {
    id: string;
    name: string;
    operator: string;
    operatorIp: string;
    operation: string;
    comment: string;
    createdAt: Date;
}
export declare const LogResponseFields: string[];
export interface PaginateLog {
    error?: Error;
    list: Array<LogResponse>;
    total: number;
}
