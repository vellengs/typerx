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
const path_1 = require("path");
const fs_1 = require("fs");
const typerx_server_1 = require("typerx-server");
const bson_1 = require("bson");
const settingService = new typerx_server_1.SettingService();
exports.pages = {
    course: renderList,
    material: renderList,
    teacher: renderList,
    order: renderList,
    content: renderArticleDetail,
    news: renderNewsPage
};
function renderNewsPage(req, res, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = (yield typerx_server_1.CmsDatabase.Article.find({}).limit(20).exec()) || [];
        const view = path_1.resolve(process.cwd(), 'views', type + '.hbs');
        const settings = yield getSettings();
        const pictures = [];
        const items = collection.map((item) => {
            return item.toJSON();
        });
        if (items.length > 2) {
            pictures.push(items.shift());
            pictures.push(items.shift());
        }
        if (fs_1.existsSync(view)) {
            settings.page = type;
            const context = {
                config: settings,
                pictures: pictures,
                items: items,
            };
            res.render(type, context);
        }
        else {
            res.render('404');
        }
    });
}
function renderList(req, res, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = (yield typerx_server_1.CmsDatabase.Custom.find({ type: type }).exec()) || [];
        const view = path_1.resolve(process.cwd(), 'views', type + '.hbs');
        const settings = yield getSettings();
        if (fs_1.existsSync(view)) {
            settings.page = type;
            const context = {
                config: settings,
                items: items.map((item) => {
                    return item.toJSON();
                }),
            };
            res.render(type, context);
        }
        else {
            res.render('404');
        }
    });
}
function renderArticleDetail(req, res, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bson_1.ObjectId.isValid(req.query.id)) {
            return res.render('404');
        }
        const settings = yield getSettings();
        const view = path_1.resolve(process.cwd(), 'views', type + '.hbs');
        const detail = yield typerx_server_1.CmsDatabase.Article.findOne({ _id: req.query.id }).populate('content').exec();
        if (fs_1.existsSync(view)) {
            settings.page = type;
            const context = {
                config: settings,
                detail: detail
            };
            res.render(type, context);
        }
        else {
            res.render('404');
        }
    });
}
function getSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield settingService.getSettingsByName('main');
    });
}
//# sourceMappingURL=sub.pages.js.map