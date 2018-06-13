"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_server_1 = require("./internal.server");
class CustomRestServer {
    static buildServices(router, ...types) {
        const internalServer = new internal_server_1.CustomInternalServer(router);
        internalServer.buildServices(types);
    }
}
exports.CustomRestServer = CustomRestServer;
//# sourceMappingURL=custom.server.js.map