"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bluebird = require("bluebird");
function connect(uri) {
    mongoose.Promise = bluebird;
    mongoose.connect(uri).then(() => {
        console.log('success connected to', uri);
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
        throw new Error('unable to connect to database at ' + uri + err);
    });
    return db;
}
exports.connect = connect;
//# sourceMappingURL=connector.js.map