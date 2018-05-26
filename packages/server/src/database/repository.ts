
import { Model, Document, Types, DocumentQuery, Query, Connection } from 'mongoose';
import { pick, PartialDeep, groupBy } from 'lodash';
import { KeyValue } from '../types/data.types';
const treeify = require('array-to-tree');


export class Repository {

    static async remove(model: Model<Document>, id: string): Promise<any> {
        const ids = id.split(',');
        if (ids.length > 1) {
            return this.removeItems(model, ids);
        } else {
            return new Promise((resolve, reject) => {
                model.findOneAndRemove({ _id: id }).exec((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (res)
                            resolve(true);
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        }
    }

    static async removeItems(model: Model<Document>, ids: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            model.remove({ _id: { $in: ids } }).exec((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    static async get(model: Model<Document>, id: string, populates?: any[]): Promise<any> {
        const option: any = {};
        return new Promise((resolve, reject) => {

            if (populates && populates.length) {
                option.populate = populates;
            }

            model.findOne({ _id: id }, null, option).exec((err, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    static async search(model: Model<Document>,
        keyword?: string, id?: string,
        category = '', limit: number = 10, labelField = 'name', valueField = '_id'): Promise<Array<KeyValue>> {
        const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};

        if (category) {
            query.category = category;
        }

        const fields: any = {};
        fields[labelField] = 1;
        fields[valueField] = 1;

        const docs = await model.find(query).select(fields)
            .limit(limit)
            .exec() || [];

        if (id && (Types.ObjectId.isValid(id) || valueField !== '_id')) {
            const conditions: any = {};
            conditions[valueField] = id;
            const selected = await model.findOne(conditions).select(fields);
            if (selected) {
                const found = docs.findIndex((doc: any) => doc[valueField] == id);
                if (found === -1) {
                    docs.push(selected);
                }
            }
        }

        return docs.map((item: any) => {
            const result: KeyValue = {
                label: item[labelField],
                value: item[valueField]
            };
            return result;
        });
    }

    static async deeplyFind(
        query: Model<Document>,
        id: string
    ): Promise<string[]> {

        let current: any = await query.findOne({ _id: id }).select({ _id: 1, parent: 1 }).exec();
        if (!current) { return []; }
        const items = await query.find().select({ _id: 1, parent: 1 }).exec() || [];
        const currentId = current.toObject()._id;

        const data = items.map(item => item.toObject());
        const cached = groupBy(data, 'parent');
        const children = cached[currentId];

        if (!Array.isArray(children)) {
            return [currentId];
        }

        const result: string[] = [currentId];
        const stack = [];
        stack.push(...children);

        while (stack.length > 0) {
            const node: any = stack.pop();
            result.push(node._id);
            const items = cached[node._id];

            if (Array.isArray(items)) {
                for (let item of items) {
                    stack.push(item);
                }
            }
        }
        return result;
    }

    static async query<T extends Document, TResponse>(
        query: DocumentQuery<T[], T>,
        collection: DocumentQuery<T[], T>,
        page: number = 1,
        size: number = 20,
        fields: string[]
    ) {
        page = page - 1;
        const count = await collection.count().exec();
        const docs = await query.skip(page * size).limit(size).exec() || [];
        const list = docs.map((doc) => pick(doc, fields) as TResponse);
        return {
            list: list,
            total: count
        }
    }


}