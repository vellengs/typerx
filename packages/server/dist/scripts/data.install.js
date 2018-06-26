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
const core_database_1 = require("../modules/core/core.database");
const fs_1 = require("fs");
const path_1 = require("path");
class Installer {
    static loadJson(dataFolder, file) {
        const filePath = path_1.resolve(dataFolder, 'data', `/export.${file}.json`);
        if (fs_1.existsSync(filePath)) {
            console.log('load ...', filePath);
            return require(filePath);
        }
        return [];
    }
    static initData(dataFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield core_database_1.CoreDatabase.Role.insertMany(Installer.loadJson(dataFolder, 'roles'));
            yield core_database_1.CoreDatabase.Dict.insertMany(Installer.loadJson(dataFolder, 'dicts'));
            yield core_database_1.CoreDatabase.Menu.insertMany(Installer.loadJson(dataFolder, 'menus'));
            yield core_database_1.CoreDatabase.Setting.insertMany(Installer.loadJson(dataFolder, 'settings'));
            yield core_database_1.CoreDatabase.Account.insertMany(Installer.loadJson(dataFolder, 'accounts'));
            console.log('all installed');
        });
    }
}
exports.Installer = Installer;
//# sourceMappingURL=data.install.js.map