
import { Model, Document, Types } from 'mongoose';
import { KeyValue } from '../modules/core/dto/pairs';

export class Helper {

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
                        resolve(true);
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

    static async search(model: Model<Document>, keyword?: string, value?: string, limit = 10, labelField = 'name'): Promise<KeyValue[]> {
        const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
        const fields = {
            name: 1,
        };

        const docs = await model.find(query).select(fields)
            .limit(limit)
            .exec() || [];

        if (Types.ObjectId.isValid(value)) {
            const selected = await model.findById(value).select(fields);
            const found = docs.findIndex(doc => doc._id == value);
            if (found === -1) {
                docs.push(selected);
            }
        }

        return docs.map((item: any) => {
            const result: KeyValue = {
                label: item[labelField],
                value: item._id
            };
            return result;
        });
    }

}