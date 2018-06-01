import { schema as ArticleSchema } from './schemas/article.schema';
import { schema as CategorySchema } from './schemas/category.schema';
import { schema as CommentSchema } from './schemas/comment.schema';
import { schema as MediaSchema } from './schemas/media.schema';
import { schema as PageSchema } from './schemas/page.schema';
import { schema as WidgetSchema } from './schemas/widget.schema';
import { schema as ContentSchema } from './schemas/content.schema';

import { model, Model, Document } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Comment } from './interfaces/comment.interface';
import { Media } from './interfaces/media.interface';
import { Page } from './interfaces/page.interface';
import { Widget } from './interfaces/widget.interface';
import { Content } from './interfaces/content.interface';
import { Article } from './interfaces/article.interface';

export const CmsDatabase = {
    Article: model<Article>('Article', ArticleSchema),
    Category: model<Category>('Category', CategorySchema),
    Comment: model<Comment>('Comment', CommentSchema),
    Media: model<Media>('Media', MediaSchema),
    Page: model<Page>('Page', PageSchema),
    Widget: model<Widget>('Widget', WidgetSchema),
    Content: model<Content>('Content', ContentSchema),
}
