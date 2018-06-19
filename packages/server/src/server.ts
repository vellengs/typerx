import * as express from 'express';
import { Server } from 'typescript-rest';
import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';
import { existsSync } from 'fs';
import { controllers } from './controllers';
import * as mongo from 'connect-mongo';
import * as expressValidator from 'express-validator';
import * as passport from 'passport';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';
import { getLogger } from 'log4js';
import * as lusca from 'lusca';
import { initPassport } from './config/passport';
import { indexRender, subPage } from './plugins/render';
import session = require('express-session');
import compression = require('compression');
import { CustomRestServer } from './interceptor/custom.server';
import { isAuthenticated, apiPrefix } from './interceptor/interceptor';

const MongoStore = mongo(session);
const logger = getLogger();

export class ApiServer {
  private app: express.Application;
  private server: http.Server = null;
  public PORT: number = parseInt(process.env.PORT, 0) || 3600;

  constructor() {
    this.app = express();
    this.config();
    initPassport();

    this.app.use(apiPrefix, isAuthenticated);
    this.app.get('/', indexRender);
    const uploads = path.resolve(process.cwd(), 'public', 'uploads');
    Server.setFileDest(uploads);

    // Server.buildServices(this.app, ...controllers);
    CustomRestServer.buildServices(this.app, ...controllers);

    if (process.env.SWAGGER && existsSync(path.resolve(process.env.SWAGGER))) {
      Server.swagger(
        this.app,
        process.env.SWAGGER,
        '/docs',
        'localhost:' + this.PORT,
        ['http', 'https'],
      );
    }

    this.app.get('/:name', subPage);
    this.handerErrors();
  }

  /**
   * Configure the express app.
   */
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
    return new Promise<any>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, (err: any) => {
        if (err) {
          return reject(err);
        }
        logger.info(
          `Server start from http://${this.server.address().address}:${
          this.server.address().port
          }`,
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

process.on('unhandledRejection', (reason: any) => {
  // console.log("unhandledRejection", reason); //TODO;
});
