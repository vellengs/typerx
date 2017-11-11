const pluralize = require('pluralize');

var glob = require('glob');
var config = require('./../config');
var db = require('mongoose');
var path = require("path");
var ObjectID = require("bson-objectid");
var S = require('string');

function convertTo12bytes(raw: any) {
	if (raw.length > 12) {
		raw = raw.length > 24 ? S(raw).right(24).s : raw;
		var i = 0;
		var arr = raw.split('').filter(function (r: any) {
			i++;
			return i % 2 == 0;
		});
		return S(arr.join('')).pad(12).s;
	} else {
		return S(raw).pad(12).s;
	}
}

function convertFieldToObjectId(properties: any, item: any) {
	properties.forEach(function (p: any) {

		if (item[p]) {
			var key = p == 'uid' ? "_id" : p;
			item[key] = ObjectID(convertTo12bytes(item[p]));
		}
	});
}

module.exports.init = function () {
	var collections = glob.sync(config.server + '/../data/*.json');
	collections.forEach(function (file: any) {
		var data = require(file);
		var modelName = path.basename(file, ".json");
		modelName = pluralize.singular(modelName);
		modelName = S(modelName).capitalize().s;
		var Model = db.model(modelName);
		Model.collection.drop(function () {
			Model.collection.insert(data.map(function (item: any) {
				if (modelName == "Menu")
					convertFieldToObjectId(['uid', 'parent'], item);
				var entry = new Model(item);
				return entry.toServer();
			}), function (error: any, res: any) {
				if (error)
					console.log(error);
			});
		});
	});
};