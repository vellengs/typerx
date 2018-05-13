"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static remove(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split(',');
            if (ids.length > 1) {
                return this.removeItems(model, ids);
            }
            else {
                return new Promise((resolve, reject) => {
                    model.findOneAndRemove({ _id: id }).exec((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
            }
        });
    }
    static removeItems(model, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                model.remove({ _id: { $in: ids } }).exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    static get(model, id, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = {};
            return new Promise((resolve, reject) => {
                if (populates && populates.length) {
                    option.populate = populates;
                }
                model.findOne({ _id: id }, null, option).exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res && res.pure());
                    }
                });
            });
        });
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map