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
connector_1.connect(secrets_1.MONGODB_URI);
const fs_1 = require("fs");
const core_database_1 = require("../modules/core/core.database");
function save2File(file, data) {
    fs_1.writeFileSync(`data/export.${file}.json`, JSON.stringify(data));
}
function exportData() {
    return __awaiter(this, void 0, void 0, function* () {
        const accounts = yield core_database_1.CoreDatabase.Account.find().exec();
        save2File('accounts', accounts.map((item) => {
            return {
                _id: item._id,
                username: item.username,
                nick: item.nick,
                password: item.password,
                avatar: item.avatar,
                type: item.type,
                email: item.email,
                mobile: item.mobile,
                roles: item.roles,
                groups: item.groups,
                isDisable: item.isDisable,
                isAdmin: item.isAdmin,
                isApproved: item.isApproved,
                secret: item.secret,
                expired: item.expired
            };
        }));
        const dicts = yield core_database_1.CoreDatabase.Dict.find().exec();
        save2File('dicts', dicts.map((item) => {
            return {
                _id: item._id,
                category: item.category,
                name: item.name,
                translate: item.translate,
            };
        }));
        const menus = yield core_database_1.CoreDatabase.Menu.find().exec();
        save2File('menus', menus.map((item) => {
            return {
                _id: item._id,
                name: item.name,
                parent: item.parent,
                paths: item.paths,
                order: item.order,
                isMenu: item.isMenu,
                link: item.link,
                slug: item.slug,
                externalLink: item.externalLink,
                blank: item.blank,
                icon: item.icon,
                enable: item.enable,
                permissions: item.permissions
            };
        }));
        const settings = yield core_database_1.CoreDatabase.Setting.find().exec();
        save2File('settings', settings.map((item) => {
            return {
                _id: item._id,
                name: item.name,
                key: item.key,
                value: item.value,
                description: item.description
            };
        }));
        console.log('export data done....');
    });
}
exportData();
//# sourceMappingURL=data.export.js.map