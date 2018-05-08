import { schema as ArticleSchema } from './schemas/article.schema';
import { schema as CategorySchema } from './schemas/category.schema';
import { schema as CommentSchema } from './schemas/comment.schema';
import { schema as MediaSchema } from './schemas/media.schema';
import { schema as PageSchema } from './schemas/page.schema';
import { schema as WidgetSchema } from './schemas/widget.schema';

import { model, Model, Document } from 'mongoose';
import { Category } from 'modules/cms/interfaces/category.interface';
import { Comment } from 'modules/cms/interfaces/comment.interface';
import { Media } from 'modules/cms/interfaces/media.interface';
import { Page } from './interfaces/page.interface';
import { Widget } from 'modules/cms/interfaces/widget.interface';

export const CmsDatabase = {
    Article: model<Page>('Page', ArticleSchema),
    Category: model<Category>('Category', CategorySchema),
    Comment: model<Comment>('Comment', CommentSchema),
    Media: model<Media>('Media', MediaSchema),
    Page: model<Page>('Page', PageSchema),
    Widget: model<Widget>('Widget', WidgetSchema),
}
