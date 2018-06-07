import { Injectable, EventEmitter, Inject } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';
import { CoreService, LoginDto } from 'generated';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import * as treeify from 'array-to-tree';
import { NzTreeNode } from 'ng-zorro-antd';

interface User {
    name?: string;
    username?: string;
    token?: string;
    roles?: string;
    isAdmin?: boolean;
}

@Injectable()
export class UserService {

    constructor(
        public client: _HttpClient,
        public settings: SettingsService,
        public coreService: CoreService
    ) {

    }

    private timeStamp = new Date().getTime();
    private authenticating = false;

    private depots: string;
    private regionIds = [];
    private _allRegions = [];
    private user: User = {};


    get isLogin(): boolean {
        return this.user.name != null;
    }

    get token(): string {
        return this.user.token;
    }

    get username(): string {
        return this.user.username;
    }

    get isAdmin(): boolean {
        return this.user.isAdmin;
    }

    hasRole(name: 'admin' | 'employee'): boolean {
        return this.user.roles.includes(name);
    }


    async treeMenus() {

        const menus: any = await this.client.get('api/menu/query', {
            size: 5000,
            isMenu: true,
        }).toPromise();

        const items = menus.list.map((item, index) => {
            return {
                title: item.name,
                key: item.id + index,
                parent: item.parent,
                id: item.id,
                // isLeaf: isLeaf
            };
        });

        const tree = treeify(items, {
            parentProperty: 'parent',
            customID: 'id'
        });

        const expandKeys = [];
        const nodes = tree.map(doc => {
            expandKeys.push(doc.key);
            return new NzTreeNode(doc);
        });

        return {
            nodes: nodes,
            expandKeys: expandKeys
        };

    }


    async treeUsers(attachUsers?: boolean) {

        const group: any = await this.client.get('api/group/query', {
            size: 5000,
        }).toPromise();

        const accounts: any = await this.client.get('api/account/query', {
            size: 10000  // TODO if user too big should be lazy load.
        }).toPromise();

        // console.log('group:', group, accounts);

        const groups = group.list.map((item, index) => {
            return {
                title: item.name,
                key: item.id + index,
                parent: item.parent,
                id: item.id,
                // isLeaf: isLeaf
            };
        });

        const users = accounts.list.map((item, index) => {
            return {
                title: item.nick || item.username,
                key: item.id + index,
                id: item.id,
                groups: item.groups,
                isLeaf: true
            };
        });

        const tree = treeify(groups, {
            parentProperty: 'parent',
            customID: 'id'
        });

        if (groups) {
            groups.forEach((d) => {
                d.children = d.children || [];
                const items = users.filter((entry) => {
                    entry.groups = entry.groups || [];
                    const exist = entry.groups.indexOf(d.id) > -1;
                    return exist;
                });

                // console.log('users:', items);

                items.forEach(i => {
                    d.children.push(i);
                });
            });
        }
        const expandKeys = [];

        console.log('tree:', tree);
        const nodes = tree.map(doc => {
            expandKeys.push(doc.key);
            return new NzTreeNode(doc);
        });

        return {
            nodes: nodes,
            expandKeys: expandKeys
        };
    }

    async login(model: LoginDto) {
        const user = await this.coreService.userLogin(model).toPromise();
        this.settings.setUser(user);
        return user;
    }

    async isUnAuthenticated(client) {
        if (this.authenticating) {
            return true;
        }
        this.authenticating = true;
        const user = await this.coreService.accountProfile().toPromise() || {};
        this.settings.setUser(user);
        return user;
    }

    async logout() {

        const result = await this.coreService.userLogout().toPromise();
        this.settings.setUser(null);
        this.user = {};

    }
}
