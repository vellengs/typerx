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
const appearance_1 = require("../../types/appearance");
const core_database_1 = require("./core.database");
const helper_1 = require("../../util/helper");
class MenuService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return new appearance_1.Appearance();
        });
    }
    getMenusByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = keyword ? { name: new RegExp(keyword, 'i') } : {};
            const docs = yield core_database_1.CoreDatabase.Menu.find(query)
                .limit(25)
                .exec();
            return docs;
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Menu(entry);
            const result = yield doc.save();
            return null;
        });
    }
    valuable(value) {
        return value;
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield core_database_1.CoreDatabase.Menu.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return helper_1.Helper.remove(core_database_1.CoreDatabase.Menu, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = helper_1.Helper.get(core_database_1.CoreDatabase.Menu, id, [
                {
                    path: 'roles',
                    select: 'name',
                },
            ]);
            return result;
        });
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map