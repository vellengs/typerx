export declare class CreateSettingDto {
    name: string;
    key: string;
    value: any;
    description: string;
}
export declare class EditSettingDto {
    id: string;
    name: string;
    key: string;
    value: any;
    description: string;
}
export declare class SettingResponse {
    id: string;
    name: string;
    key: string;
    value: any;
    description: string;
}
export declare class SettingsGroup {
    [key: string]: string;
}
export declare const SettingResponseFields: string[];
export interface PaginateSetting {
    error?: Error;
    list: Array<SettingResponse>;
    total: number;
}
