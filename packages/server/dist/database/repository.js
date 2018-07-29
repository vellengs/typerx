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
const mongoose_1 = require("mongoose");
const lodash_1 = require("lodash");
const treeify = require('array-to-tree');
class Repository {
    static remove(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split(',');
            if (ids.length > 1) {
                return this.removeItems(model, ids);
            }
            else {
                return new Promise((resolve, reject) => {
                    model.findOneAndRemove({ _id: id }).exec((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (res)
                                resolve(true);
                            else {
                                resolve(false);
                            }
                        }
                    });
                });
            }
        });
    }
    static removeItems(model, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                model.remove({ _id: { $in: ids } }).exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    static get(model, id, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = {};
            return new Promise((resolve, reject) => {
                if (populates && populates.length) {
                    option.populate = populates;
                }
                model.findOne({ _id: id }, null, option).exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
    static searchTree(model, keyword, id, category = '', limit = 10, labelField = 'name', valueField = '_id', searchField = 'name') {
        return __awaiter(this, void 0, void 0, function* () {
            const critical = {};
            critical[searchField] = new RegExp(keyword, 'i');
            const query = keyword ? critical : {};
            if (category) {
                query.category = category;
            }
            const fields = {};
            fields[labelField] = 1;
            fields[valueField] = 1;
            fields['parent'] = 1;
            const docs = (yield model.find(query).select(fields)
                .limit(limit)
                .exec()) || [];
            if (id && (mongoose_1.Types.ObjectId.isValid(id) || valueField !== '_id')) {
                const conditions = {};
                conditions[valueField] = id;
                const selected = yield model.findOne(conditions).select(fields);
                if (selected) {
                    const found = docs.findIndex((doc) => doc[valueField] == id);
                    if (found === -1) {
                        docs.push(selected);
                    }
                }
            }
            return docs.map((item) => {
                const result = {
                    title: item[labelField],
                    id: item[valueField],
                    parent: item['parent']
                };
                return result;
            });
        });
    }
    static search(model, keyword, id, category = '', limit = 10, labelField = 'name', valueField = '_id', searchField = 'name') {
        return __awaiter(this, void 0, void 0, function* () {
            const critical = {};
            critical[searchField] = new RegExp(keyword, 'i');
            const query = keyword ? critical : {};
            if (category) {
                query.category = category;
            }
            const fields = {};
            fields[labelField] = 1;
            fields[valueField] = 1;
            const docs = (yield model.find(query).select(fields)
                .limit(limit)
                .exec()) || [];
            if (id && (mongoose_1.Types.ObjectId.isValid(id) || valueField !== '_id')) {
                const conditions = {};
                conditions[valueField] = id;
                const selected = yield model.findOne(conditions).select(fields);
                if (selected) {
                    const found = docs.findIndex((doc) => doc[valueField] == id);
                    if (found === -1) {
                        docs.push(selected);
                    }
                }
            }
            return docs.map((item) => {
                const result = {
                    label: item[labelField],
                    value: item[valueField]
                };
                return result;
            });
        });
    }
    static deeplyFind(query, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = yield query.findOne({ _id: id }).select({ _id: 1, parent: 1 }).exec();
            if (!current) {
                return [];
            }
            const items = (yield query.find().select({ _id: 1, parent: 1 }).exec()) || [];
            const currentId = current.toObject()._id;
            const data = items.map(item => item.toObject());
            const cached = lodash_1.groupBy(data, 'parent');
            const children = cached[currentId];
            if (!Array.isArray(children)) {
                return [currentId];
            }
            const result = [currentId];
            const stack = [];
            stack.push(...children);
            while (stack.length > 0) {
                const node = stack.pop();
                result.push(node._id);
                const items = cached[node._id];
                if (Array.isArray(items)) {
                    for (let item of items) {
                        stack.push(item);
                    }
                }
            }
            return result;
        });
    }
    static query(query, collection, page = 1, size = 20, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page - 1;
            if (page < 0) {
                page = 0;
            }
            const countPromise = collection.count().exec();
            const pure = (doc, fields) => {
                if (fields && Array.isArray(fields)) {
                    return lodash_1.pick(doc, fields);
                }
                else {
                    return doc.toJSON();
                }
            };
            const docsPromise = query.skip(page * size).limit(size).exec();
            const result = yield Promise.all([countPromise, docsPromise]);
            let [count, docs] = result;
            docs = docs || [];
            const list = docs.map((doc) => pure(doc, fields));
            return {
                list: list,
                total: count
            };
        });
    }
    static mergeProfile(user) {
        if (!user) {
            return null;
        }
        const doc = user.toObject();
        const instance = Object.assign({}, doc, doc.profile);
        instance.id = doc._id;
        delete instance.profile;
        delete instance._id;
        delete instance.__v;
        delete instance.password;
        instance.createdAt = doc.createdAt;
        return instance;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map