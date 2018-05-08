"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const path = require("path");
const cors = require("cors");
const fs_1 = require("fs");
const controllers_1 = require("./controllers");
class ApiServer {
    constructor() {
        this.server = null;
        this.PORT = parseInt(process.env.PORT, 0) || 3600;
        this.app = express();
        this.config();
        typescript_rest_1.Server.buildServices(this.app, ...controllers_1.controllers);
        if (process.env.SWAGGER && fs_1.existsSync(path.resolve(process.env.SWAGGER))) {
            typescript_rest_1.Server.swagger(this.app, process.env.SWAGGER, '/docs', 'localhost:' + this.PORT, ['http', 'https']);
        }
        this.app.use((err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }
            if (err && err.statusCode) {
                res.status(err.statusCode);
            }
            else {
                res.status(500);
            }
            res.send({ error: err });
        });
    }
    /**
     * Configure the express app.
     */
    config() {
        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors());
    }
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start() {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err) => {
                if (err) {
                    return reject(err);
                }
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);
                return resolve();
            });
        });
    }
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            }
            else {
                return resolve(true);
            }
        });
    }
}
exports.ApiServer = ApiServer;
process.on('unhandledRejection', (reason) => {
    // console.log("unhandledRejection", reason); //TODO;
});
//# sourceMappingURL=server.js.map