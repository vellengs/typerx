"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = require("./database/connector");
const server_1 = require("./server");
const dotenv = require("dotenv");
dotenv.config();
const log4js_1 = require("log4js");
const path_1 = require("path");
const cwd = process.cwd();
const config = path_1.join(cwd, 'log4js.debug.json');
log4js_1.configure(config);
const logger = log4js_1.getLogger();
const secrets_1 = require("./util/secrets");
connector_1.connect(secrets_1.MONGODB_URI);
exports.start = () => {
    return new Promise((resolve, reject) => {
        const apiServer = new server_1.ApiServer();
        apiServer.start()
            .then(resolve)
            .catch(reject);
        const graceful = () => {
            apiServer.stop().then(() => process.exit(0));
        };
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
};
//# sourceMappingURL=start.js.map