import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';
import * as mongo from 'connect-mongo';
import * as expressValidator from 'express-validator';
import * as passport from 'passport';
import * as lusca from 'lusca';
import session = require('express-session');
import compression = require('compression');
import { Server } from 'typescript-rest';
import { getLogger } from 'log4js';
import { initPassport } from './config/passport';
import { existsSync } from 'fs';
import { controllers } from './controllers';
import { CustomRestServer } from './interceptor/custom.server';
import { isAuthenticated, apiPrefix } from './interceptor/interceptor';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';
import { connect } from './database/connector';
import { ContainerService } from './container';
import { Appearance } from './types/appearance';
const MongoStore = mongo(session);
const logger = getLogger();

export interface Plugin {

}

export class Application {
  private server: http.Server = null;
  private loaded = false;
  private plugin: Plugin;
  private app: express.Application;
  public PORT: number = parseInt(process.env.PORT, 0) || 3600;

  constructor(connected?: boolean) {
    this.app = express();
    if (!connected) {
      connect(MONGODB_URI);
    }
    this.config();
    initPassport();
  }

  public init() {
    this.app.use(apiPrefix, isAuthenticated);
    this.setUploadsFolder();
    CustomRestServer.buildServices(this.app, ...controllers);
    this.hostSwaggerDocs();
    this.handerErrors();
  }

  public registerController(controller: any) {
    controllers.push(controller);
  }

  public registerAppearance(name: string, appearance: Appearance) {
    ContainerService.registerAppearance(name, appearance);
  }

  public getExpressApp() {
    return this.app;
  }

  private setUploadsFolder() {
    const uploads = path.resolve(process.cwd(), 'public', 'uploads');
    Server.setFileDest(uploads);
  }

  private hostSwaggerDocs() {
    const swaggerPath = process.env.SWAGGER;
    if (existsSync(path.resolve(process.env.SWAGGER))) {
      Server.swagger(
        this.app,
        swaggerPath,
        '/docs',
        'localhost:' + this.PORT,
        ['http', 'https'],
      );
    }
  }

  private config(): void {

    this.app.use(compression());
    const staticSrc = path.resolve(process.cwd(), 'public');
    this.app.use(
      express.static(staticSrc, { maxAge: 31557600000 }),
    );
    this.app.use(cors());

    this.app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
          url: MONGODB_URI,
          autoReconnect: true,
        }),
      }),
    );

    this.app.use(expressValidator());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));
    this.app.use((req, res, next) => {
      res.on('finish', () => {
        logger.debug(
          res.statusCode && res.statusCode.toString(),
          req.method,
          req.originalUrl,
        );
      });
      next();
    });
  }

  private handerErrors() {
    this.app.use(
      (err: any, req: express.Request, res: express.Response, next: any) => {
        if (res.headersSent) {
          return next(err);
        }
        if (err && err.statusCode) {
          res.status(err.statusCode);
        } else {
          logger.error(err);
          res.status(500);
        }
        if (err && err.message) {
          res.send(Object.assign({}, err, { message: err.message }));
        } else {
          res.send(err);
        }
      },
    );
  }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public start(): Promise<any> {
    if (!this.loaded) {
      this.loaded = true;
      this.init();
    }

    return new Promise<any>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, (err: any) => {
        if (err) {
          return reject(err);
        }
        console.log('this.server:', this.server);
        let address = this.server.address();
        if (typeof address === 'object') {
          address = address.address;
        }
        console.log('server start at', `${address}:${this.PORT}`);
        logger.info(
          `Server start from http://${address}:${this.PORT}`,
        );
        return resolve(this.app);
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
