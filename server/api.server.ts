import * as express from 'express';
import { Server } from 'typescript-rest';
import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';

// import * as mongoose from 'mongoose';
import controllers from './controllers';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const config = require('./config');
const autoIncrement = require('mongoose-auto-increment');

export class ApiServer {

    private app: express.Application;
    private server: http.Server = null;
    public PORT: number = parseInt(process.env.PORT, 0) || 3600;

    constructor() {
        this.app = express();
        this.config();

        mongoose.connect(config.db);
        const db = mongoose.connection;
        autoIncrement.initialize(db);

        db.on('error', (err: any) => {
            throw new Error('unable to connect to database at ' + config.db + err);
        });

        Server.buildServices(this.app, ...controllers);
        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:' + this.PORT, ['http']);

        this.app.use((
            err: any,
            req: express.Request,
            res: express.Response, next: any) => {
            if (res.headersSent) {
                return next(err);
            }
            if (err && err.statusCode) {
                res.status(err.statusCode);
            } else {
                res.status(500);
            }
            res.send({ error: err });
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
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
    public start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
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
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

}

process.on('unhandledRejection', (reason) => {
    // console.log("unhandledRejection", reason); //TODO;
});
