"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_controller_1 = require("./account.controller");
const user_controller_1 = require("./user.controller");
const menu_controller_1 = require("./menu.controller");
const setting_controller_1 = require("./setting.controller");
const dict_controller_1 = require("./dict.controller");
const role_controller_1 = require("./role.controller");
const log_controller_1 = require("./log.controller");
const group_controller_1 = require("./group.controller");
exports.default = [
    account_controller_1.AccountController,
    user_controller_1.UserController,
    menu_controller_1.MenuController,
    setting_controller_1.SettingController,
    dict_controller_1.DictController,
    role_controller_1.RoleController,
    log_controller_1.LogController,
    group_controller_1.GroupController,
];
//# sourceMappingURL=core.controllers.js.map