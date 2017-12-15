'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const api_server_1 = require("./api.server");
exports.start = () => {
    return new Promise((resolve, reject) => {
        const apiServer = new api_server_1.ApiServer();
        apiServer.start()
            .then(resolve)
            .catch(reject);
        const graceful = () => {
            apiServer.stop().then(() => process.exit(0));
        };
        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
};
//# sourceMappingURL=start.js.map