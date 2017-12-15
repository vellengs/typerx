import * as lodash from 'lodash';
import './../schemas';
import * as mongoose from 'mongoose';
import { Mongoose, Document, Model } from 'mongoose';

// tslint:disable-next-line:interface-name
export interface INew<T> {
	new: (doc?: Object) => MongoDocument & T;
}

export interface MongoDocument extends Document {

}

// tslint:disable-next-line:interface-name
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
	public account: Model<Document> & INew<any>;
	public menu: Model<Document> & INew<any>;
	public dict: Model<Document> & INew<any>;
	public customer: Model<Document> & INew<any>;
	public domain: Model<Document> & INew<any>;
	public employee: Model<Document> & INew<any>;
	public article: Model<Document> & INew<any>;
	public role: Model<Document> & INew<any>;
	public category: Model<Document> & INew<any>;


	public handleError: (err: any, message: string, res?: any, notLog?: boolean) => void;
	public parseQuery: (req: any, modelName: any) => {};
	public paginate: (modelName: string, cond: Object, option: Object,
		callback?: (err: any, res: any) => void) => any;


	constructor() {
		this.db = mongoose;
		this.account = this.getModel('Account');
		this.menu = this.getModel('Menu');
		this.customer = this.getModel('Customer');
		this.dict = this.getModel('Dict');
		this.domain = this.getModel('Domain');
		this.employee = this.getModel('Employee');
		this.article = this.getModel('Article');
		this.role = this.getModel('Role');
		this.category = this.getModel('Category');

		this.paginate = (modelName, cond, option, callback) => {
			const paginate: any = this.db.model(modelName);
			return paginate['paginate'](cond, option, callback);
		};

	}

	getModel = (modelName: string) => {
		const model = this.db.model(modelName);
		const methods: INew<any> = {
			new: (doc?: Object) => {
				return new model(doc);
			}
		};

		const entity = lodash.extend(model, methods);
		return entity;
	}
}
