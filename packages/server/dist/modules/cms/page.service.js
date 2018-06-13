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
const page_appearance_1 = require("./appearance/page.appearance");
const repository_1 = require("../../database/repository");
const cms_database_1 = require("./cms.database");
const page_dto_1 = require("./dto/page.dto");
const lodash_1 = require("lodash");
class PageService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return page_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(cms_database_1.CmsDatabase.Page, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = entry.content;
            entry.content = null;
            const doc = new cms_database_1.CmsDatabase.Page(entry);
            const result = yield doc.save();
            yield cms_database_1.CmsDatabase.Content.findOneAndUpdate({ _id: result.id }, {
                $set: {
                    _id: result.id,
                    text: content
                }
            }, { upsert: true, 'new': true }).exec();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = entry.content;
            entry.content = entry.id;
            const doc = yield cms_database_1.CmsDatabase.Page.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            yield cms_database_1.CmsDatabase.Content.findOneAndUpdate({ _id: entry.id }, {
                text: content
            }, { upsert: true, 'new': true }).exec();
            return doc;
        });
    }
    query(keyword, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { keyword: new RegExp(keyword, 'i') } : {};
            const query = cms_database_1.CmsDatabase.Page.find(condition).sort(sort);
            const collection = cms_database_1.CmsDatabase.Page.find(condition);
            const result = yield repository_1.Repository.query(query, collection, page, size, page_dto_1.PageResponseFields);
            return result;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(cms_database_1.CmsDatabase.Page, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(cms_database_1.CmsDatabase.Page, id, [
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
            'title',
            'description',
            'sort',
            'disable',
            'meta',
            'content',
            'template'
        ]);
    }
}
exports.PageService = PageService;
//# sourceMappingURL=page.service.js.map