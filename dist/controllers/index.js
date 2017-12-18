"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_controller_1 = require("./setting.controller");
const domain_controller_1 = require("./domain.controller");
const article_controller_1 = require("./article.controller");
const account_controller_1 = require("./account.controller");
const dict_controller_1 = require("./dict.controller");
const employee_controller_1 = require("./employee.controller");
const category_controller_1 = require("./category.controller");
const customer_controller_1 = require("./customer.controller");
const permission_controller_1 = require("./permission.controller");
const menu_controller_1 = require("./menu.controller");
exports.default = [
    account_controller_1.AccountController,
    dict_controller_1.DictController,
    article_controller_1.ArticleController,
    employee_controller_1.EmployeeController,
    category_controller_1.CategoryController,
    domain_controller_1.DomainController,
    customer_controller_1.CustomerController,
    setting_controller_1.SettingController,
    permission_controller_1.PermissionController,
    menu_controller_1.MenuController
];
//# sourceMappingURL=index.js.map