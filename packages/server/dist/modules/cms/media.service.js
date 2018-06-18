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
const media_appearance_1 = require("./appearance/media.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class MediaService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return media_appearance_1.appearance;
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(cms_database_1.CmsDatabase.Media, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new cms_database_1.CmsDatabase.Media(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield cms_database_1.CmsDatabase.Media.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, isMedia, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (isMedia)
                query.isMedia = true;
            const docs = (yield cms_database_1.CmsDatabase.Media.find(query).sort(sort).skip(page * size).limit(size).exec()) || [];
            const count = yield cms_database_1.CmsDatabase.Media.find(query).count();
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
            return repository_1.Repository.remove(cms_database_1.CmsDatabase.Media, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repository_1.Repository.get(cms_database_1.CmsDatabase.Media, id, [
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
            'caption',
            'description',
            'ext',
            'url',
            'uri'
        ]);
    }
}
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map