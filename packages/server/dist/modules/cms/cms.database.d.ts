/// <reference types="mongoose" />
import { Model, Document } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Comment } from './interfaces/comment.interface';
import { Media } from './interfaces/media.interface';
import { Page } from './interfaces/page.interface';
import { Widget } from './interfaces/widget.interface';
import { Content } from './interfaces/content.interface';
import { Article } from './interfaces/article.interface';
import { Custom } from './interfaces/custom.interface';
export declare const CmsDatabase: {
    Article: Model<Article & Document>;
    Category: Model<Category & Document>;
    Comment: Model<Comment & Document>;
    Media: Model<Media & Document>;
    Page: Model<Page & Document>;
    Widget: Model<Widget & Document>;
    Content: Model<Content & Document>;
    Custom: Model<Custom & Document>;
};
