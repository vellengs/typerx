import { Request, Response } from 'express';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CmsDatabase as Db, SettingService } from 'typerx-server';
import { ObjectId } from 'bson';

const settingService = new SettingService();

export const pages: {
    [key: string]: (req: Request, res: Response, type: string) => void
} = {
    course: renderList,
    material: renderList,
    teacher: renderList,
    order: renderList,
    content: renderArticleDetail,
    news: renderNewsPage
}

async function renderNewsPage(req: Request, res: Response, type: string) {
    const collection = await Db.Article.find({}).limit(20).exec() || [];
    const view = resolve(process.cwd(), 'views', type + '.hbs');
    const settings = await getSettings();

    const pictures = [];
    const items = collection.map((item) => {
        return item.toJSON();
    });

    if (items.length > 2) {
        pictures.push(items.shift());
        pictures.push(items.shift());
    }


    if (existsSync(view)) {
        settings.page = type;
        const context = {
            config: settings,
            pictures: pictures,
            items: items,
        };
        res.render(type, context);
    } else {
        res.render('404');
    }
}

async function renderList(req: Request, res: Response, type: string) {
    const items = await Db.Custom.find({ type: type }).exec() || [];
    const view = resolve(process.cwd(), 'views', type + '.hbs');
    const settings = await getSettings();

    if (existsSync(view)) {
        settings.page = type;
        const context = {
            config: settings,
            items: items.map((item) => {
                return item.toJSON();
            }),
        };
        res.render(type, context);
    } else {
        res.render('404');
    }
}

async function renderArticleDetail(req: Request, res: Response, type: string) {
    if (!ObjectId.isValid(req.query.id)) {
        return res.render('404');
    }

    const settings = await getSettings();
    const view = resolve(process.cwd(), 'views', type + '.hbs');
    const detail = await Db.Article.findOne({ _id: req.query.id }).populate('content').exec();
    if (existsSync(view)) {
        settings.page = type;
        const context = {
            config: settings,
            detail: detail
        };
        res.render(type, context);
    } else {
        res.render('404');
    }
}

async function getSettings() {
    return await settingService.getSettingsByName('main');
} 
