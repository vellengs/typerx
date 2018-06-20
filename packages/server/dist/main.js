"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
const app = start_1.start().catch(err => {
    console.error(`Error starting server: ${err.message}`);
    process.exit(-1);
});
process.on('unhandledRejection', (reason) => {
    console.log("unhandledRejection", reason);
});
process.on('uncaughtException', (reason) => {
    console.log("uncaughtException", reason);
});
exports.default = app;
//# sourceMappingURL=main.js.map