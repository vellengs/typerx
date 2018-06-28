"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require("errorhandler");
const app_1 = require("./app");
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.default.use(errorHandler());
/**
 * Start Express server.
 */
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map