import { schema as AccountSchema } from './schemas/account';
import { model, Model, Document } from 'mongoose';
import { Account } from './interfaces/account.interfaces';

export const CoreDatabase = {
    Account: model<Account>('Account', AccountSchema)
}
