import { UISchema, ColumnItem, PaginateResponse } from 'modex';
import { PaginateOption } from 'modex';
import { model as getModel } from 'mongoose';
import * as lodash from 'lodash';

export class Helper {

	/**
     * 补0函数
     * @param val 数值
     * @param length 最后生成的位数,最大15.
     */
	static addPreZero(val: any, length: number) {
		if ((val + '').length >= length) {
			return val;
		}
		return ('0000000000' + val).slice(-length);
	}

	static async getUISchema(name: string): Promise<UISchema> {
		name = lodash.snakeCase(name);

		const folder = './../models';
		const columns: any = require(`${folder}/${name}.columns`).columns;
		const schema: any = require(`${folder}/${name}.properties`).schema;
		const querySchema: any = require(`${folder}/${name}.query`).query;
		const forms: any = require(`${folder}/${name}.properties`).forms;

		const cols: ColumnItem[] = [];
		const required: string[] = [];
		for (const key in columns) {
			const col = columns[key];
			col.field = key;
			cols.push(col);
		}

		for (const key in schema) {
			const config = schema[key];
			if (!config.type) {
				config.type = 'string';
			}
			if (config.required) {
				required.push(key);
			}
			config.title = config.title || (columns[key] || { header: '' }).header;
		}

		for (const key in querySchema) {
			const config = querySchema[key];
			if (!config.type) {
				config.type = 'string';
			}
			if (config.required) {
				required.push(key);
			}
			config.title = config.title || (columns[key] || { header: '' }).header;
		}

		return {
			entry: schema,
			query: querySchema,
			required: required,
			columns: cols,
			forms: forms
		};
	}

	static async create(modelName: string, entry: any): Promise<any> {
		const model = getModel(modelName);
		const doc = new model(entry);
		return doc.save();
	}

	static async update(modelName: string, entry: any): Promise<any> {
		const model = getModel(modelName);
		const doc = model.findByIdAndUpdate(entry.uid, entry);
		return doc.exec();
	}

	static async get(modelName: string, id: string, populates?: any[]): Promise<any> {
		const model = getModel(modelName);
		const option: any = {};
		return new Promise((resolve, reject) => {

			if (populates && populates.length) {
				option.populate = populates;
			}

			model.findOne({ _id: id }, null, option).exec((err, res: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(res && res.flat());
				}
			});
		});
	}

	static async remove(modelName: string, id: string): Promise<any> {
		const model = getModel(modelName);
		const ids = id.split(',');
		if (ids.length > 1) {
			return this.removeItems(modelName, ids);
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

	static async removeItems(modelName: string, ids: string[]): Promise<any> {
		const model = getModel(modelName);
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

	static async getPagedData<T>(
		model: string,
		page: number,
		limit: number,
		populates?: any[],
		sort?: any,
		params?: object
	) {

		const option: PaginateOption = {
			page: page,
			limit: limit,
			sort: { '_id': -1 }
		};

		option.page = option.page ? option.page : 1;
		option.limit = option.limit === 0 ? 10 : option.limit;
		option.sort = sort ? sort : { '_id': -1 };

		if (populates && populates.length) {
			option.populate = populates;
		}

		params = params || {};
		params = lodash.pickBy(params);

		const modelDoc: any = getModel(model);
		const response = await new Promise((resolve, reject) => {

			modelDoc.paginate(params, option, (err: any, data: any) => {
				data = data || { docs: [], total: 0 };
				const result: PaginateResponse<T[]> = {
					error: err,
					docs: data.docs.map((doc: any) => doc.flat()),
					total: data.total
				};
				resolve(result);
			});
		});
		return response as PaginateResponse<T[]>;
	}

	static async upsert(modelName: string, entry: any): Promise<any> {
		const model = getModel(modelName);
		model.findById(entry.uid).exec((err, doc) => {
			if (doc) {
				return doc.update(entry).exec();
			} else {
				return (new model(entry)).save();
			}
		});
		// const doc = model.findByIdAndUpdate(entry.uid, entry, {upsert: true});
		// return doc.exec();
	}
}
