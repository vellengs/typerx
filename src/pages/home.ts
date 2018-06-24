import { Document } from 'mongoose';
import { CmsDatabase as Db, SettingService } from 'typerx-server';
import { Request, Response } from 'express';

export async function indexRender(req: Request, res: Response) {
    const settingService = new SettingService();
    const settings = await settingService.getSettingsByName('main');
    settings.page = 'index';
    const courses = await Db.Custom.find({ type: 'course' }).sort('createdAt').limit(3).exec();
    const teachers = await Db.Custom.find({ type: 'teacher' }).sort('createdAt').limit(4).exec();
    const context = {
        courses: courses.map((doc: Document) => {
            return doc.toJSON();
        }),
        teachers: teachers.map((doc: Document) => {
            return doc.toJSON();
        }),
        config: settings,
    };
    res.render('index', context);
}
