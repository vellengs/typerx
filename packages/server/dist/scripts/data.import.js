"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = require("./../database/connector");
const secrets_1 = require("./../util/secrets");
const core_database_1 = require("../modules/core/core.database");
connector_1.connect(secrets_1.MONGODB_URI);
const fs_1 = require("fs");
const path_1 = require("path");
function loadJson(file) {
    const filePath = path_1.resolve(process.cwd(), `data/export.${file}.json`);
    if (fs_1.existsSync(filePath)) {
        return require(filePath);
    }
    return [];
}
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield core_database_1.CoreDatabase.Dict.insertMany(loadJson('dicts'));
        yield core_database_1.CoreDatabase.Menu.insertMany(loadJson('menus'));
        yield core_database_1.CoreDatabase.Setting.insertMany(loadJson('settings'));
        yield core_database_1.CoreDatabase.Account.insertMany(loadJson('accounts'));
        console.log('done ....');
    });
}
importData();
//# sourceMappingURL=data.import.js.map