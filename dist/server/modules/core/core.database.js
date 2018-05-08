"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_schema_1 = require("./schemas/account.schema");
const mongoose_1 = require("mongoose");
exports.CoreDatabase = {
    Account: mongoose_1.model('Account', account_schema_1.schema)
};
//# sourceMappingURL=core.database.js.map