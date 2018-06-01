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
const article_appearance_1 = require("./appearance/article.appearance");
const repository_1 = require("../../database/repository");
const cms_database_1 = require("./cms.database");
const article_dto_1 = require("./dto/article.dto");
const lodash_1 = require("lodash");
class ArticleService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return article_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(cms_database_1.CmsDatabase.Article, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new cms_database_1.CmsDatabase.Article(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield cms_database_1.CmsDatabase.Article.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, category, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const query = cms_database_1.CmsDatabase.Article.find(condition).populate([
                { path: 'category', select: 'name' }
            ]).sort(sort);
            const collection = cms_database_1.CmsDatabase.Article.find(condition);
            const result = yield repository_1.Repository.query(query, collection, page, size, article_dto_1.ArticleResponseFields);
            return result;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(cms_database_1.CmsDatabase.Article, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(cms_database_1.CmsDatabase.Article, id, [
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
            'category',
            'description',
            'author',
            'sort',
            'disable',
            'meta',
            'content',
            'template',
        ]);
    }
}
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map