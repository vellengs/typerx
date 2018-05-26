/// <reference types="mongoose" />
import { Model, Document } from 'mongoose';
import { Account } from './interfaces/account.interface';
import { Log } from './interfaces/log.interface';
import { Dict } from './interfaces/dict.interface';
import { Menu } from './interfaces/menu.interface';
import { Role } from './interfaces/role.interface';
import { Setting } from './interfaces/setting.interface';
import { Group } from './interfaces/group.interface';
import { Profile } from './interfaces/profile.interface';
export declare const CoreDatabase: {
    Account: Model<Account & Document>;
    Profile: Model<Profile & Document>;
    Dict: Model<Dict & Document>;
    Log: Model<Log & Document>;
    Menu: Model<Menu & Document>;
    Role: Model<Role & Document>;
    Setting: Model<Setting & Document>;
    Group: Model<Group & Document>;
};
