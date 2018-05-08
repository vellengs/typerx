"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const path = require("path");
const cors = require("cors");
// import * as mongoose from 'mongoose';
const controllers_1 = require("./controllers");
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config');

class ApiServer {
    constructor() {
        this.server = null;
        this.PORT = parseInt(process.env.PORT, 0) || 3600;
        this.app = express();
        this.config();
        mongoose.connect(config.db);
        const db = mongoose.connection;
        autoIncrement.initialize(db);
        db.on('error', (err) => {
            throw new Error('unable to connect to database at ' + config.db + err);
        });
        typescript_rest_1.Server.buildServices(this.app, ...controllers_1.default);
        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        typescript_rest_1.Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:' + this.PORT, ['http']);
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
        // Native Express configuration
        // this.app.use( bodyParser.urlencoded( { extended: false } ) );
        // this.app.use( bodyParser.json( { limit: '1mb' } ) );
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
//# sourceMappingURL=api.server.js.map