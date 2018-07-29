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
const typescript_rest_1 = require("typescript-rest");
const core_database_1 = require("./core.database");
const menu_dto_1 = require("./dto/menu.dto");
const menu_appearance_1 = require("./appearance/menu.appearance");
const lodash_1 = require("lodash");
const repository_1 = require("../../database/repository");
class MenuService {
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            return menu_appearance_1.appearance;
        });
    }
    getAllPermissionTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield core_database_1.CoreDatabase.Menu.find({ isMenu: false }).select({
                name: 1,
                slug: 1,
                link: 1
            }).exec()) || [];
            return result.map((r) => {
                return { id: r._id, name: r.name, desc: r.link };
            });
        });
    }
    search(keyword, value, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.search(core_database_1.CoreDatabase.Menu, keyword, value, '', limit);
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new core_database_1.CoreDatabase.Menu(entry);
            const result = yield doc.save();
            return result;
        });
    }
    update(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entry.id === entry.parent) {
                throw new typescript_rest_1.Errors.BadRequestError('can not be set parent by self.');
            }
            const doc = yield core_database_1.CoreDatabase.Menu.findOneAndUpdate({
                _id: entry.id,
            }, entry).exec();
            return doc;
        });
    }
    query(keyword, isMenu, page, size, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = keyword ? { name: new RegExp(keyword, 'i') } : {};
            if (isMenu != null) {
                condition.isMenu = isMenu;
            }
            const query = core_database_1.CoreDatabase.Menu.find(condition).sort(sort);
            query.populate([{
                    path: 'permissions',
                    select: 'name',
                }]);
            const collection = core_database_1.CoreDatabase.Menu.find(condition);
            return repository_1.Repository.query(query, collection, page, size, menu_dto_1.MenuResponseFields);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.remove(core_database_1.CoreDatabase.Menu, id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield repository_1.Repository.get(core_database_1.CoreDatabase.Menu, id, [
                {
                    path: 'permissions',
                    select: 'name',
                }
            ]);
            return this.pure(doc);
        });
    }
    getAuthenticatedMenus(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new typescript_rest_1.Errors.UnauthorizedError("user is not authenticated");
            }
            if (!user.isAdmin) {
                const account = yield core_database_1.CoreDatabase.Account.findOne({ _id: user.id }, 'groups').exec();
                const roles = account.toObject().roles || [];
                const roleDocs = (yield core_database_1.CoreDatabase.Group.find({
                    _id: { $in: roles }
                }, 'permissions').exec()) || [];
                const permissions = [];
                roleDocs.forEach((g) => {
                    permissions.push(...g.permissions);
                });
                const menus = yield core_database_1.CoreDatabase.Menu.find({
                    _id: {
                        $in: permissions
                    },
                    isMenu: true
                });
                return menus;
            }
            else {
                const menus = yield core_database_1.CoreDatabase.Menu.find({
                    isMenu: true
                });
                return menus;
            }
        });
    }
    pure(entry) {
        return lodash_1.pick(entry, [
            'id',
            'name',
            'slug',
            'group',
            'link',
            'externalLink',
            'blank',
            'icon',
            'order',
            'enable',
            'expanded',
            'acl',
            'permissions',
            'parent',
            'isMenu'
        ]);
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map