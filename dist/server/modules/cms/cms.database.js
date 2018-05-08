"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_schema_1 = require("./schemas/article.schema");
const category_schema_1 = require("./schemas/category.schema");
const comment_schema_1 = require("./schemas/comment.schema");
const media_schema_1 = require("./schemas/media.schema");
const page_schema_1 = require("./schemas/page.schema");
const widget_schema_1 = require("./schemas/widget.schema");
const mongoose_1 = require("mongoose");
exports.CmsDatabase = {
    Article: mongoose_1.model('Page', article_schema_1.schema),
    Category: mongoose_1.model('Category', category_schema_1.schema),
    Comment: mongoose_1.model('Comment', comment_schema_1.schema),
    Media: mongoose_1.model('Media', media_schema_1.schema),
    Page: mongoose_1.model('Page', page_schema_1.schema),
    Widget: mongoose_1.model('Widget', widget_schema_1.schema),
};
//# sourceMappingURL=cms.database.js.map