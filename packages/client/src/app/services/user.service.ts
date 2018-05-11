import { Injectable, EventEmitter } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';


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

    ) {
        this.onRegionsChanged = new EventEmitter();
        this.changeRegionType = new EventEmitter();
    }

    private timeStamp = new Date().getTime();
    private authenticating = false;

    private depots: string;
    private regionIds = [];
    private _allRegions = [];
    private user: User = {};

    public onRegionsChanged: EventEmitter<string[]>;

    public changeRegionType: EventEmitter<number>;

    get isLogin(): boolean {
        return this.user.name != null;
    }

    get token(): string {
        return this.user.token;
    }

    get username(): string {
        console.log('user:', this.user);
        return this.user.username;
    }

    get isAdmin(): boolean {
        return this.user.isAdmin;
    }

    hasRole(name: 'admin' | 'employee'): boolean {
        return this.user.roles.includes(name);
    }

    async login(model: any) {
        // const user = await this.ajax.signIn(model).toPromise();
        // user.avatar = user.avatar || ' ';
        // this.settings.setUser(user);
        // return user;
    }

    async isUnAuthenticated(client) {
        if (this.authenticating) {
            return true;
        }
        this.authenticating = true;
        const user = await client.get('api/account/authenticated').toPromise();
        if (user) {
            user.avatar = user.avatar || ' ';
            this.settings.setUser(user);
        }
        console.log('user', user);
        return user;
    }

    async logout() {
        // const result = await this.ajax.signOut().toPromise();
        this.user.name = null;
    }

    get allRegions() {
        return this._allRegions;
    }

    set allRegions(val) {
        this._allRegions = val;
    }

    get regions() {
        return this.regionIds;
    }

    set regions(val) {
        this.regionIds = val;
        this.onRegionsChanged.emit(val);
    }

    get depot() {
        return this.depots;
    }

    set depot(val) {
        this.depots = val;
    }
}
