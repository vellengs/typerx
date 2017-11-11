export interface IConfig {
    root: string;
    cookieName: string;
    cookieSecret: string;
    rebuild: boolean;
    apiPath: string;
    server: string;
    debugLevel: string;
    app: {
        name: string;
    };
    port: number;
    db: string;
    target: string;
    logSettings: ILogSettings;
}
export interface ILogSettings {
    logFilePath: string;
    category: string;
    level: string;
}
export interface ISchema {
    name?: string;
    title?: string;
    type: any;
    default?: any;
    ref?: any;
    unique?: boolean;
    index?: any;
    trim?: boolean;
    required?: boolean;
}
