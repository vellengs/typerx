import { Application } from 'typerx-server';
import controllers from './controllers';
import { appearances } from './appearances';
import { indexRender } from './pages/home';
import { pages } from './pages/sub.pages';
import * as express from 'express';
import { resolve } from 'path';
import * as hbs from 'hbs';

const server = new Application();
const app = server.getExpressApp();

const staticSrc = resolve(process.cwd(), 'views/assets');

app.use('/assets',
    express.static(staticSrc, { maxAge: 31557600000 }),
);

const adminFrontFolder = resolve(process.cwd(), 'packages/client/dist');
app.use('/admin', express.static(adminFrontFolder, { maxAge: 31557600000 }));

app.set('view engine', 'hbs');
const views = resolve(process.cwd(), 'views');
app.set('views', views);
registerHbs();

app.get('/', indexRender);

Object.keys(pages).forEach((page: string) => {
    const fn = pages[page];
    const render = (req: express.Request, res: express.Response) => {
        return fn(req, res, page);
    };
    app.get('/' + page, render);
});

Object.keys(appearances).forEach((key) => {
    const config: any = appearances[key];
    server.registerAppearances(key, config.appearance);
});

controllers.forEach((controller) => {
    server.registerController(controller);
});

server.start().catch(err => {
    console.error(`Error starting server: ${err.message}`);
});

process.on('unhandledRejection', (reason: any) => {
    console.log("unhandledRejection", reason);
});

process.on('uncaughtException', (reason: any) => {
    console.log("uncaughtException", reason);
});

function registerHbs() {

    const blocks: any = {};
    hbs.registerHelper('extend', function (name: string, context: any) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }
        block.push(context.fn(this));
    });

    hbs.registerHelper('block', function (name: string) {
        var val = (blocks[name] || []).join('\n');
        blocks[name] = [];
        return val;
    });

    hbs.registerHelper('equal', function (args1: any, args2: any, context: any) {
        if (args1 === args2) {
            return context.fn(this);
        } else {
            if (typeof (args1) === 'number' && args1.toString() === args2.toString()) {
                return context.fn(this);
            }
            return context.inverse(this);
        }
    });
}

export default server;