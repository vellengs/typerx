"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression"); // compresses requests
const session = require("express-session");
const bodyParser = require("body-parser");
const lusca = require("lusca");
const mongo = require("connect-mongo");
const passport = require("passport");
const expressValidator = require("express-validator");
const secrets_1 = require("./util/secrets");
const custom_server_1 = require("./interceptor/custom.server");
const controllers_1 = require("./controllers");
const passport_1 = require("./config/passport");
const connector_1 = require("./database/connector");
connector_1.connect(secrets_1.MONGODB_URI);
const MongoStore = mongo(session);
const app = express();
passport_1.initPassport();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: secrets_1.MONGODB_URI,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
custom_server_1.CustomRestServer.buildServices(app, ...controllers_1.controllers);
app.use((req, res, next) => {
    next();
});
exports.default = app;
// import * as express from 'express';
// import { CustomRestServer } from './interceptor/custom.server';
// import { controllers } from './controllers';
// import { connect } from './database/connector';
// // import { MONGODB_URI } from './util/secrets';
// import { initPassport } from './config/passport';
// const app: express.Express = express();
// // connect(MONGODB_URI);
// initPassport();
// CustomRestServer.buildServices(app, ...controllers);
// app.use(function (req, res) {
//     console.log('404 found ...');
//     res.send('404 found ..');
// });
// export default app; 
//# sourceMappingURL=app.js.map