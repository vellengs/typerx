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
const cms_database_1 = require("./cms.database");
const widget_appearance_1 = require("./appearance/widget.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class WidgetService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return widget_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(cms_database_1.CmsDatabase.Widget, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new cms_database_1.CmsDatabase.Widget(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield cms_database_1.CmsDatabase.Widget.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, isWidget, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (isWidget)
                query.isWidget = true;
            const docs = (yield cms_database_1.CmsDatabase.Widget.find(query).sort(sort).skip(page * size).limit(size).exec()) || [];
            const count = yield cms_database_1.CmsDatabase.Widget.find(query).count();
            const list = docs.map((item) => {
                return this.pure(item);
            });
            return {
                list: list,
                total: count
            };
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(cms_database_1.CmsDatabase.Widget, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(cms_database_1.CmsDatabase.Widget, id, [
                {
                    path: 'roles',
                    select: 'name',
                },
            ]);
            return this.pure(result);
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'slug',
            'group',
            'link',
            'externalLink',
            'blank',
            'icon',
            'order',
            'enable',
            'expanded',
            'acl',
            'permissions',
            'parent',
            'isWidget'
        ]);
    }
}
exports.WidgetService = WidgetService;
//# sourceMappingURL=widget.service.js.map