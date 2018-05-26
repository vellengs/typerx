/// <reference types="mongoose" />
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Comment } from './interfaces/comment.interface';
import { Media } from './interfaces/media.interface';
import { Page } from './interfaces/page.interface';
import { Widget } from './interfaces/widget.interface';
export declare const CmsDatabase: {
    Article: Model<Page>;
    Category: Model<Category>;
    Comment: Model<Comment>;
    Media: Model<Media>;
    Page: Model<Page>;
    Widget: Model<Widget>;
};
