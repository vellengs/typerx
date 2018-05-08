import { schema as AccountSchema } from './schemas/account.schema';
import { model, Model, Document } from 'mongoose';
import { Account } from './interfaces/account.interface';

export const CoreDatabase = {
    Account: model<Account>('Account', AccountSchema)
}
