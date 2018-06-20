import { Request, Response } from 'express';
import { SettingService } from '../modules/core/setting.service';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CmsDatabase as Db } from '../modules/cms/cms.database';

const settingService = new SettingService();

export async function indexRender(req: Request, res: Response) {
    // const settings = await settingService.getSettingsByName('main');
    // settings.page = 'index';
    // const xxx = await Db.Custom.find({ type: 'xxx' }).sort('createdAt').limit(3).exec();
    // const context = {
    //     courses: xxx.map((doc) => {
    //         return doc.toJSON();
    //     }),
    //     config: settings,
    // };
    // res.render('index', context);
    res.send('not implement home page . ');
}

export async function subPage(req: Request, res: Response) {

    res.send('not implement sub page');

    // const settings = await settingService.getSettingsByName('main');
    // const page = req.params.name;
    // const view = resolve(process.cwd(), 'views', page + '.hbs');

    // if (existsSync(view)) {
    //     settings.page = page;
    //     const context = {
    //         config: settings,
    //     };
    //     res.render(page, context);
    // } else {
    //     res.render('404');
    // }
}