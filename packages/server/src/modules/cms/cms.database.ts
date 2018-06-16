import { schema as ArticleSchema } from './schemas/article.schema';
import { schema as CategorySchema } from './schemas/category.schema';
import { schema as CommentSchema } from './schemas/comment.schema';
import { schema as MediaSchema } from './schemas/media.schema';
import { schema as PageSchema } from './schemas/page.schema';
import { schema as WidgetSchema } from './schemas/widget.schema';
import { schema as ContentSchema } from './schemas/content.schema';
import { schema as CustomSchema } from './schemas/custom.schema';

import { model, Model, Document } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Comment } from './interfaces/comment.interface';
import { Media } from './interfaces/media.interface';
import { Page } from './interfaces/page.interface';
import { Widget } from './interfaces/widget.interface';
import { Content } from './interfaces/content.interface';
import { Article } from './interfaces/article.interface';
import { Custom } from './interfaces/custom.interface';

export const CmsDatabase = {
    Article: model<Article & Document>('Article', ArticleSchema),
    Category: model<Category & Document>('Category', CategorySchema),
    Comment: model<Comment & Document>('Comment', CommentSchema),
    Media: model<Media & Document>('Media', MediaSchema),
    Page: model<Page & Document>('Page', PageSchema),
    Widget: model<Widget & Document>('Widget', WidgetSchema),
    Content: model<Content & Document>('Content', ContentSchema),
    Custom: model<Custom & Document>('Custom', CustomSchema),
}
