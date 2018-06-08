"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_rest_1 = require("typescript-rest");
function validator(req) {
    if (req.body.userId != undefined) {
        throw new typescript_rest_1.Errors.BadRequestError("userId not present");
    }
    else {
        return req;
    }
}
exports.validator = validator;
//# sourceMappingURL=validator.js.map