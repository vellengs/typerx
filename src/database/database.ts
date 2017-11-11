import * as mongoose from "mongoose";
import * as lodash from "lodash";
import * as glob from "glob";
import './../schemas';

import { Mongoose, Document, Model } from "mongoose";
import { IConfig } from "./../config";
const config: IConfig = require('./../config');

export interface INew<T> {
	new: (doc?: Object) => MongoDocument & T;
}

export interface MongoDocument extends Document {

};

export interface ILog {
	_id?: string;
	uid?: string;
	category?: string;
	level?: number;
	url?: string;
	message: string;
	process: number;
	createdAt?: Date;
}


export class Database {
	public db: Mongoose;
	public Account: Model<Document> & INew<any>;
	public Menu: Model<Document> & INew<any>;
	public Dict: Model<Document> & INew<any>;
	public Customer: Model<Document> & INew<any>;
	public Domain: Model<Document> & INew<any>;
	public Employee: Model<Document> & INew<any>;


	public handleError: (err: any, message: string, res?: any, notLog?: boolean) => void;
	public parseQuery: (req: any, modelName: any) => {};
	public paginate: (modelName: string, cond: Object, option: Object,
		callback?: (err: any, res: any) => void) => any;


	constructor() {
		this.requireModels();
		this.db = mongoose;
		this.Account = this.getModel('Account');
		this.Menu = this.getModel('Menu');
		this.Customer = this.getModel('Customer');
		this.Dict = this.getModel('Dict');
		this.Domain = this.getModel('Domain');
		this.Employee = this.getModel('Employee');
		this.paginate = (modelName, cond, option, callback) => {
			const paginate: any = this.db.model(modelName);
			return paginate['paginate'](cond, option, callback);
		};

	}

	getModel = (modelName: string) => {
		let model = this.db.model(modelName);
		let methods: INew<any> = {
			new: (doc?: Object) => {
				return new model(doc);
			}
		}
		let entity = lodash.extend(model, methods);
		return entity;
	}

	requireModels() {
		let modelsPath = config.root + '/models/**/*.js';
		let models = glob.sync(modelsPath);
		models.forEach((m) => {
			require(m);
		});
	}

	simplify(raw: any) {
		if (!raw) return null;
		var obj = raw.toObject();
		if (obj['_id']) {
			obj['uid'] = obj['_id'].toString();
		}
		delete obj['_id'];
		delete obj['__v'];
		return obj;
	};
}