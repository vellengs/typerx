
export interface IConfig {
    root: string,
    cookieName: string,
    cookieSecret: string,
    rebuild: boolean,
    apiPath: string,
    server: string,
    debugLevel: string,
    app: {
        name: string
    },
    port: number,
    db: string,
    target: string,
    logSettings: ILogSettings,
}
export interface ILogSettings {
    logFilePath: string,
    category: string
    level: string
}

export interface ISchema {
    name?: string,
    title?: string,
    type: any,
    default?: any,
    ref?: any,
    unique?: boolean,
    index?: any,
    trim?: boolean,
    required?: boolean
}



export interface IQuery {
    name: string,
    type?: string,
    title?: string,
    titleMap?: any
}


let path = require('path'),
    root = path.normalize(__dirname + '/..'),
    server = path.normalize(__dirname + '/..'),
    logFilePath = path.normalize(__dirname + '/../logs/app.log'),
    env = process.env['NODE_ENV'] || 'development';

process.env['TZ'] = 'Asia/Shanghai';
let init = (): IConfig => {
    return {
        apiPath: '/api',
        app: {
            name: 'yes'
        },
        cookieName: 'RZG',
        cookieSecret: 'O0O0B9UCI1L9B',
        db: 'mongodb://localhost/yes-dev',
        debugLevel: 'WARN',
        logSettings: {
            category: 'app',
            level: 'DEBUG',
            logFilePath: logFilePath,
        },
        port: 3000,
        rebuild: true,
        root: root,
        server: server,
        target: 'src',
    };
};

let instance: any;
instance = {
    development: init(),
    production: init(),
    test: init(),
};
instance.test.db = 'mongodb://localhost/yes-test';
instance.production.db = 'mongodb://localhost/yes-prod';
module.exports = instance[env];
