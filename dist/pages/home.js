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
const typerx_server_1 = require("typerx-server");
function indexRender(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const settingService = new typerx_server_1.SettingService();
        const settings = yield settingService.getSettingsByName('main');
        settings.page = 'index';
        const courses = yield typerx_server_1.CmsDatabase.Custom.find({ type: 'course' }).sort('createdAt').limit(3).exec();
        const teachers = yield typerx_server_1.CmsDatabase.Custom.find({ type: 'teacher' }).sort('createdAt').limit(4).exec();
        const context = {
            courses: courses.map((doc) => {
                return doc.toJSON();
            }),
            teachers: teachers.map((doc) => {
                return doc.toJSON();
            }),
            config: settings,
        };
        res.render('index', context);
    });
}
exports.indexRender = indexRender;
//# sourceMappingURL=home.js.map