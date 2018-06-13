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
const appearance_1 = require("../../types/appearance");
const repository_1 = require("../../database/repository");
const cms_database_1 = require("./cms.database");
const custom_dto_1 = require("./dto/custom.dto");
const helper_1 = require("../../util/helper");
const domains_1 = require("./../../plugins/domains");
class CustomService {
    getAppearance(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = domains_1.appearances;
            if (instance[type] && instance[type].appearance)
                return instance[type].appearance;
            else
                return new appearance_1.Appearance();
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(cms_database_1.CmsDatabase.Custom, keyword, value, '', limit);
        });
    }
    setKeyWord(entry) {
        let keyword = helper_1.Helper.genPinyinKeywords(entry.title);
        keyword.push(entry.name);
        keyword.push(entry.title);
        entry.keyword = keyword.join('');
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = entry.content;
            entry.content = null;
            this.setKeyWord(entry);
            const doc = new cms_database_1.CmsDatabase.Custom(entry);
            const result = yield doc.save();
            yield cms_database_1.CmsDatabase.Custom.findOneAndUpdate({
                _id: result._id,
            }, {
                content: result._id
            }).exec();
            yield cms_database_1.CmsDatabase.Content.findOneAndUpdate({ _id: result._id }, {
                $set: {
                    _id: result._id,
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
            this.setKeyWord(entry);
            const doc = yield cms_database_1.CmsDatabase.Custom.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            yield cms_database_1.CmsDatabase.Content.findOneAndUpdate({ _id: entry.id }, {
                text: content
            }, { upsert: true, 'new': true }).exec();
            return doc;
        });
    }
    query(keyword, category, type, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { keyword: new RegExp(keyword, 'i') } : {};
            if (category) {
                condition.category = category;
            }
            if (type) {
                condition.type = type;
            }
            const query = cms_database_1.CmsDatabase.Custom.find(condition).populate([
                { path: 'category', select: 'name' }
            ]).sort(sort);
            const collection = cms_database_1.CmsDatabase.Custom.find(condition);
            const result = yield repository_1.Repository.query(query, collection, page, size, null);
            return result;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(cms_database_1.CmsDatabase.Custom, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield repository_1.Repository.get(cms_database_1.CmsDatabase.Custom, id, [
                {
                    path: 'content',
                    select: 'text',
                },
            ]);
            if (result) {
                const instance = result.toObject();
                instance.id = id;
                if (instance.content) {
                    instance.content = instance.content.text;
                }
                return instance;
            }
            else {
                return new custom_dto_1.CustomResponse();
            }
        });
    }
}
exports.CustomService = CustomService;
//# sourceMappingURL=custom.service.js.map