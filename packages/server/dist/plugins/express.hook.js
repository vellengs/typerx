"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hbs = require("hbs");
const path_1 = require("path");
function middleWareHook() {
    this.app.set('view engine', 'hbs');
    const views = path_1.resolve(process.cwd(), 'views');
    this.app.set('views', views);
    registerHbs();
}
exports.middleWareHook = middleWareHook;
function registerHbs() {
    const blocks = {};
    hbs.registerHelper('extend', function (name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }
        block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    });
    hbs.registerHelper('block', function (name) {
        var val = (blocks[name] || []).join('\n');
        // clear the block
        blocks[name] = [];
        return val;
    });
    hbs.registerHelper('equal', function (args1, args2, context) {
        if (args1 === args2) {
            //满足添加继续执行
            return context.fn(this);
        }
        else {
            if (typeof (args1) === 'number' && args1.toString() === args2.toString()) {
                return context.fn(this);
            }
            //不满足条件执行{{else}}部分
            return context.inverse(this);
        }
    });
}
exports.registerHbs = registerHbs;
//# sourceMappingURL=express.hook.js.map