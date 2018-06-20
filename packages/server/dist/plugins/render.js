"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const setting_service_1 = require("../modules/core/setting.service");
const settingService = new setting_service_1.SettingService();
function indexRender(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.indexRender = indexRender;
function subPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.subPage = subPage;
//# sourceMappingURL=render.js.map