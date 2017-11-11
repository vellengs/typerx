const pluralize = require('pluralize');
const glob = require('glob');
const config = require('./../config');
const db = require('mongoose');
const path = require('path');
// tslint:disable-next-line:variable-name
const ObjectID = require('bson-objectid');
const S = require('string');
function convertTo12bytes(raw) {
    if (raw.length > 12) {
        raw = raw.length > 24 ? S(raw).right(24).s : raw;
        let i = 0;
        const arr = raw.split('').filter(function (r) {
            i++;
            return i % 2 === 0;
        });
        return S(arr.join('')).pad(12).s;
    }
    else {
        return S(raw).pad(12).s;
    }
}
function convertFieldToObjectId(properties, item) {
    properties.forEach(function (p) {
        if (item[p]) {
            const key = p === 'uid' ? '_id' : p;
            item[key] = ObjectID(convertTo12bytes(item[p]));
        }
    });
}
module.exports.init = function () {
    const collections = glob.sync(config.server + '/../data/*.json');
    collections.forEach(function (file) {
        const data = require(file);
        let modelName = path.basename(file, '.json');
        modelName = pluralize.singular(modelName);
        modelName = S(modelName).capitalize().s;
        // tslint:disable-next-line:variable-name
        const Model = db.model(modelName);
        Model.collection.drop(function () {
            Model.collection.insert(data.map(function (item) {
                if (modelName === 'Menu') {
                    convertFieldToObjectId(['uid', 'parent'], item);
                }
                const entry = new Model(item);
                return entry.toServer();
            }), function (error, res) {
                if (error) {
                    // console.log(error);
                }
            });
        });
    });
};
//# sourceMappingURL=data.js.map