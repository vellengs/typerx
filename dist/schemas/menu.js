"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modex_1 = require("modex");
exports.schema = {
    uid: { type: modex_1.SchemaTypes.String },
    name: { type: modex_1.SchemaTypes.String },
    translate: { type: modex_1.SchemaTypes.String },
    group: { type: modex_1.SchemaTypes.Boolean },
    link: { type: modex_1.SchemaTypes.String },
    externalLink: { type: modex_1.SchemaTypes.String },
    target: { type: modex_1.SchemaTypes.String },
    icon: { type: modex_1.SchemaTypes.String },
    // badge: { type: t.String },
    // badgeDot: { type: t.String },
    // badgeStatus: { type: t.String },
    hide: { type: modex_1.SchemaTypes.Boolean },
    acl: { type: modex_1.SchemaTypes.String },
    paths: [{
            type: modex_1.SchemaTypes.ObjectId,
            ref: 'Menu'
        }],
    parent: {
        type: modex_1.SchemaTypes.ObjectId,
        ref: 'Menu'
    }
};
modex_1.create(exports.schema, 'Menu');
//# sourceMappingURL=menu.js.map