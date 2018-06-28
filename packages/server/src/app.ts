import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as lusca from "lusca";
import * as mongo from "connect-mongo";
import * as passport from "passport";
import * as expressValidator from "express-validator";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { CustomRestServer } from "./interceptor/custom.server";
import { controllers } from "./controllers";
import { initPassport } from './config/passport';
import { connect } from "./database/connector";

connect(MONGODB_URI);
const MongoStore = mongo(session);
const app: express.Express = express();
initPassport();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: MONGODB_URI,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

CustomRestServer.buildServices(app, ...controllers);

export default app; 