"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
const glob = require("glob");
require("./../schemas");
const mongoose = require("mongoose");
const config = require('./../config');
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
        this.requireModels();
        this.db = mongoose;
        this.account = this.getModel('Account');
        this.menu = this.getModel('Menu');
        this.customer = this.getModel('Customer');
        this.dict = this.getModel('Dict');
        this.domain = this.getModel('Domain');
        this.employee = this.getModel('Employee');
        this.paginate = (modelName, cond, option, callback) => {
            const paginate = this.db.model(modelName);
            return paginate['paginate'](cond, option, callback);
        };
    }
    requireModels() {
        const modelsPath = config.root + '/models/**/*.js';
        const models = glob.sync(modelsPath);
        models.forEach((m) => {
            require(m);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map