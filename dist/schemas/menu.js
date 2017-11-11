"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    uid: { type: modex_1.SchemaTypes.String },
    text: { type: modex_1.SchemaTypes.String },
    translate: { type: modex_1.SchemaTypes.String },
    group: { type: modex_1.SchemaTypes.Boolean },
    link: { type: modex_1.SchemaTypes.String },
    externalLink: { type: modex_1.SchemaTypes.String },
    target: { type: modex_1.SchemaTypes.String },
    icon: { type: modex_1.SchemaTypes.String },
    badge: { type: modex_1.SchemaTypes.String },
    badgeDot: { type: modex_1.SchemaTypes.String },
    badgeStatus: { type: modex_1.SchemaTypes.String },
    hide: { type: modex_1.SchemaTypes.String },
    acl: { type: modex_1.SchemaTypes.String },
    parent: {
        type: modex_1.SchemaTypes.ObjectId,
        ref: 'Menu'
    }
};
modex_1.create(exports.schema, 'Menu');
//# sourceMappingURL=menu.js.map