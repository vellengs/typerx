"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
if (fs_1.existsSync(".env")) {
    logger_1.logger.debug("Using .env file to supply config environment variables");
    dotenv_1.config({ path: ".env" });
}
else {
    logger_1.logger.debug("Using .env.example file to supply config environment variables");
    dotenv_1.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "production"; // Anything else is treated as 'dev'
exports.SESSION_SECRET = process.env["SESSION_SECRET"];
exports.MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
if (!exports.SESSION_SECRET) {
    logger_1.logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    logger_1.logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map