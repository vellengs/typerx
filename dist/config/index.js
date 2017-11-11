"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path'), root = path.normalize(__dirname + '/..'), server = path.normalize(__dirname + '/..'), logFilePath = path.normalize(__dirname + '/../logs/app.log'), env = process.env['NODE_ENV'] || 'development';
process.env['TZ'] = 'Asia/Shanghai';
const init = () => {
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
let instance;
instance = {
    development: init(),
    production: init(),
    test: init(),
};
instance.test.db = 'mongodb://localhost/yes-test';
instance.production.db = 'mongodb://localhost/yes-prod';
module.exports = instance[env];
//# sourceMappingURL=index.js.map