"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_schema_1 = require("./schemas/page.schema");
const mongoose_1 = require("mongoose");
exports.CoreDatabase = {
    Account: mongoose_1.model('Page', page_schema_1.schema)
};
//# sourceMappingURL=cms.database.js.map