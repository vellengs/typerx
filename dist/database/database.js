"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
require("./../schemas");
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.getModel = (modelName) => {
            const model = this.db.model(modelName);
            const methods = {
                new: (doc) => {
                    return new model(doc);
                }
            };
            const entity = lodash.extend(model, methods);
            return entity;
        };
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
        this.setting = this.getModel('Setting');
        this.permission = this.getModel('Permission');
        this.paginate = (modelName, cond, option, callback) => {
            const paginate = this.db.model(modelName);
            return paginate['paginate'](cond, option, callback);
        };
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map