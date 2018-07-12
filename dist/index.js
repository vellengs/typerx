"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typerx_server_1 = require("typerx-server");
const controllers_1 = require("./controllers");
const appearances_1 = require("./appearances");
const home_1 = require("./pages/home");
const sub_pages_1 = require("./pages/sub.pages");
const express = require("express");
const path_1 = require("path");
const hbs = require("hbs");
const server = new typerx_server_1.Application();
const app = server.getExpressApp();
const staticSrc = path_1.resolve(process.cwd(), 'views/assets');
app.use('/assets', express.static(staticSrc, { maxAge: 31557600000 }));
const adminSrc = path_1.resolve(process.cwd(), 'client');
app.use('/admin', express.static(adminSrc, { maxAge: 31557600000 }));
app.set('view engine', 'hbs');
const views = path_1.resolve(process.cwd(), 'views');
app.set('views', views);
registerHbs();
app.get('/', home_1.indexRender);
Object.keys(sub_pages_1.pages).forEach((page) => {
    const fn = sub_pages_1.pages[page];
    const render = (req, res) => {
        return fn(req, res, page);
    };
    app.get('/' + page, render);
});
Object.keys(appearances_1.appearances).forEach((key) => {
    const config = appearances_1.appearances[key];
    server.registerAppearance(key, config.appearance);
});
controllers_1.default.forEach((controller) => {
    server.registerController(controller);
});
server.start().catch(err => {
    console.error(`Error starting server: ${err.message}`);
});
process.on('unhandledRejection', (reason) => {
    console.log("unhandledRejection", reason);
});
process.on('uncaughtException', (reason) => {
    console.log("uncaughtException", reason);
});
function registerHbs() {
    const blocks = {};
    hbs.registerHelper('extend', function (name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }
        block.push(context.fn(this));
    });
    hbs.registerHelper('block', function (name) {
        var val = (blocks[name] || []).join('\n');
        blocks[name] = [];
        return val;
    });
    hbs.registerHelper('equal', function (args1, args2, context) {
        if (args1 === args2) {
            return context.fn(this);
        }
        else {
            if (typeof (args1) === 'number' && args1.toString() === args2.toString()) {
                return context.fn(this);
            }
            return context.inverse(this);
        }
    });
}
exports.default = server;
//# sourceMappingURL=index.js.map