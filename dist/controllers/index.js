"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_controller_1 = require("./article.controller");
const account_controller_1 = require("./account.controller");
const dict_controller_1 = require("./dict.controller");
const employee_controller_1 = require("./employee.controller");
exports.default = [
    account_controller_1.AccountController,
    dict_controller_1.DictController,
    article_controller_1.ArticleController,
    employee_controller_1.EmployeeController,
];
//# sourceMappingURL=index.js.map