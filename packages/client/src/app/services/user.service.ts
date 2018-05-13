import { Injectable, EventEmitter } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';
import { CoreService, LoginDto } from 'generated';

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
        return this.user.username;
    }

    get isAdmin(): boolean {
        return this.user.isAdmin;
    }

    hasRole(name: 'admin' | 'employee'): boolean {
        return this.user.roles.includes(name);
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
        const user = await this.coreService.accountProfile().toPromise();
        this.settings.setUser(user);
        return user;
    }

    async logout() {
        const result = await this.coreService.userLogout().toPromise();
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
