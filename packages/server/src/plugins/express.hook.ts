import * as hbs from 'hbs';
import { resolve } from 'path';

export function middleWareHook() {
  this.app.set('view engine', 'hbs');
  const views = resolve(process.cwd(), 'views');
  this.app.set('views', views);
  registerHbs();
}

export function registerHbs() {

  const blocks: any = {};

  hbs.registerHelper('extend', function (name: string, context: any) {
    var block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', function (name: string) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('equal', function (args1, args2, context) {
    if (args1 === args2) {
      //满足添加继续执行
      return context.fn(this);
    } else {
      if (typeof (args1) === 'number' && args1.toString() === args2.toString()) {
        return context.fn(this);
      }
      //不满足条件执行{{else}}部分
      return context.inverse(this);
    }
  });
}