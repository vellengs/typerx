"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongo = require("connect-mongo");
const expressValidator = require("express-validator");
const passport = require("passport");
const lusca = require("lusca");
const session = require("express-session");
const compression = require("compression");
const typescript_rest_1 = require("typescript-rest");
const log4js_1 = require("log4js");
const passport_1 = require("./config/passport");
const fs_1 = require("fs");
const controllers_1 = require("./controllers");
const custom_server_1 = require("./interceptor/custom.server");
const interceptor_1 = require("./interceptor/interceptor");
const secrets_1 = require("./util/secrets");
const connector_1 = require("./database/connector");
const MongoStore = mongo(session);
const logger = log4js_1.getLogger();
class Application {
    constructor(connected) {
        this.server = null;
        this.loaded = false;
        this.PORT = parseInt(process.env.PORT, 0) || 3600;
        this.app = express();
        if (!connected) {
            connector_1.connect(secrets_1.MONGODB_URI);
        }
        this.config();
        passport_1.initPassport();
    }
    init() {
        this.app.use(interceptor_1.apiPrefix, interceptor_1.isAuthenticated);
        this.setUploadsFolder();
        custom_server_1.CustomRestServer.buildServices(this.app, ...controllers_1.controllers);
        this.hostSwaggerDocs();
        this.handerErrors();
    }
    registerController(controller) {
        controllers_1.controllers.push(controller);
    }
    getExpressApp() {
        return this.app;
    }
    setUploadsFolder() {
        const uploads = path.resolve(process.cwd(), 'public', 'uploads');
        typescript_rest_1.Server.setFileDest(uploads);
    }
    hostSwaggerDocs() {
        const swaggerPath = process.env.SWAGGER;
        if (fs_1.existsSync(path.resolve(process.env.SWAGGER))) {
            typescript_rest_1.Server.swagger(this.app, swaggerPath, '/docs', 'localhost:' + this.PORT, ['http', 'https']);
        }
    }
    config() {
        this.app.use(compression());
        const staticSrc = path.resolve(process.cwd(), 'public');
        this.app.use(express.static(staticSrc, { maxAge: 31557600000 }));
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
        if (!this.loaded) {
            this.loaded = true;
            this.init();
        }
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err) => {
                if (err) {
                    return reject(err);
                }
                console.log('this.server:', this.server);
                let address = this.server.address();
                if (typeof address === 'object') {
                    address = address.address;
                }
                console.log('server start at', `${address}:${this.PORT}`);
                logger.info(`Server start from http://${address}:${this.PORT}`);
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
exports.Application = Application;
//# sourceMappingURL=application.js.map