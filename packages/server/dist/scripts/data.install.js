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
const connector_1 = require("../database/connector");
class Installer {
    constructor(mongooseUri) {
        this.mongooseUri = '';
        this.mongooseUri = mongooseUri;
        this.db = connector_1.connect(mongooseUri);
    }
    static loadJson(dataFolder, file) {
        const filePath = path_1.resolve(dataFolder, `data/export.${file}.json`);
        if (fs_1.existsSync(filePath)) {
            return require(filePath);
        }
        return [];
    }
    initData() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFolder = process.cwd();
            yield core_database_1.CoreDatabase.Role.insertMany(Installer.loadJson(dataFolder, 'roles'));
            yield core_database_1.CoreDatabase.Dict.insertMany(Installer.loadJson(dataFolder, 'dicts'));
            yield core_database_1.CoreDatabase.Menu.insertMany(Installer.loadJson(dataFolder, 'menus'));
            yield core_database_1.CoreDatabase.Group.insertMany(Installer.loadJson(dataFolder, 'groups'));
            yield core_database_1.CoreDatabase.Setting.insertMany(Installer.loadJson(dataFolder, 'settings'));
            yield core_database_1.CoreDatabase.Account.insertMany(Installer.loadJson(dataFolder, 'accounts'));
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.dropDatabase();
            this.db.close();
        });
    }
}
exports.Installer = Installer;
//# sourceMappingURL=data.install.js.map