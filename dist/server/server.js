"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const path = require("path");
const cors = require("cors");
const fs_1 = require("fs");
const controllers_1 = require("./controllers");
const mongo = require("connect-mongo");
const expressValidator = require("express-validator");
const passport = require("passport");
const secrets_1 = require("./util/secrets");
const log4js_1 = require("log4js");
const lusca = require("lusca");
const passport_1 = require("./config/passport");
const session = require('express-session');
const MongoStore = mongo(session);
const compression = require('compression');
const logger = log4js_1.getLogger();
function isPublicRouters(routers, current) {
    for (const router of routers) {
        if (current.startsWith(router)) {
            return true;
        }
    }
    return false;
}
class ApiServer {
    constructor() {
        this.server = null;
        this.PORT = parseInt(process.env.PORT, 0) || 3600;
        this.app = express();
        passport_1.init();
        this.app.use('/api', passport_1.isAuthenticated);
        this.config();
        typescript_rest_1.Server.buildServices(this.app, ...controllers_1.controllers);
        if (process.env.SWAGGER && fs_1.existsSync(path.resolve(process.env.SWAGGER))) {
            typescript_rest_1.Server.swagger(this.app, process.env.SWAGGER, '/docs', 'localhost:' + this.PORT, ['http', 'https']);
        }
        this.handerErrors();
    }
    /**
     * Configure the express app.
     */
    config() {
        this.app.use(compression());
        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors());
        this.app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: secrets_1.SESSION_SECRET,
            store: new MongoStore({
                url: secrets_1.MONGODB_URI,
                autoReconnect: true,
            }),
        }));
        this.app.use(expressValidator());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(lusca.xframe('SAMEORIGIN'));
        this.app.use(lusca.xssProtection(true));
        this.app.use((req, res, next) => {
            res.on('finish', () => {
                logger.debug(res.statusCode && res.statusCode.toString(), req.method, req.originalUrl);
            });
            next();
        });
    }
    handerErrors() {
        this.app.use((err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }
            if (err && err.statusCode) {
                res.status(err.statusCode);
            }
            else {
                logger.error(err);
                res.status(500);
            }
            if (err && err.message) {
                res.send(Object.assign({}, err, { message: err.message }));
            }
            else {
                res.send(err);
            }
        });
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
                logger.info(`Server start from http://${this.server.address().address}:${this.server.address().port}`);
                return resolve(this.app);
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