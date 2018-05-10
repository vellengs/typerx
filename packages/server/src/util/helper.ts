
import { Model, Document } from 'mongoose';

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
                    resolve(res && res.pure());
                }
            });
        });

    }


}