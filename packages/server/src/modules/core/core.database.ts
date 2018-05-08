import { schema as AccountSchema } from './schemas/account.schema';
import { schema as DictSchema } from './schemas/dict.schema';
import { schema as LogSchema } from './schemas/log.schema';
import { schema as MenuSchema } from './schemas/menu.schema';
import { schema as RoleSchema } from './schemas/role.schema';
import { schema as SettingSchema } from './schemas/setting.schema';

import { model, Model, Document } from 'mongoose';
import { Account } from './interfaces/account.interface';
import { Log } from './interfaces/log.interface';
import { Dict } from './interfaces/dict.interface';
import { Menu } from './interfaces/menu.interface';
import { Role } from './interfaces/role.interface';
import { Setting } from './interfaces/setting.interface';

export const CoreDatabase = {
    Account: model<Account & Document>('Account', AccountSchema),
    Dict: model<Dict & Document>('Dict', DictSchema),
    Log: model<Log & Document>('Log', LogSchema),
    Menu: model<Menu & Document>('Menu', MenuSchema),
    Role: model<Role & Document>('Role', RoleSchema),
    Setting: model<Setting & Document>('Setting', SettingSchema),
}
