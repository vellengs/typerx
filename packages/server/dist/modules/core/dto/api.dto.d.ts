export declare class ApiResponse {
    id: string;
    name: string;
    method: string;
    path: string;
    version: string;
    description: string;
    permissions: Array<string>;
}
export declare const ApiResponseFields: string[];
export interface PaginateApi {
    error?: Error;
    list: Array<ApiResponse>;
    total: number;
}
