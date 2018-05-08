import { schema as PageSchema } from './schemas/page.schema';
import { model, Model, Document } from 'mongoose';
import { Page } from './interfaces/page.interface';

export const CoreDatabase = {
    Account: model<Page>('Page', PageSchema)
}
