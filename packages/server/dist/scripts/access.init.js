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
const core_database_1 = require("../modules/core/core.database");
const access_service_1 = require("../modules/core/access.service");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = 0;
        const tags = access_service_1.AccessService.PermissionTags;
        const keys = Object.keys(tags);
        for (let key of keys) {
            const menu = {
                name: tags[key],
                slug: key,
                link: key,
                isMenu: false
            };
            const count = yield core_database_1.CoreDatabase.Menu.findOneAndUpdate({ link: menu.link }, menu, { upsert: true, 'new': true }).exec();
            if (count) {
                result++;
            }
        }
        console.log('result', result);
    });
}
init();
//# sourceMappingURL=access.init.js.map