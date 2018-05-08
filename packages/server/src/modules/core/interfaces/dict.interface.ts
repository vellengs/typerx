import { Document } from 'mongoose';
export interface Dict extends Document {
    category: string;           // 字典类别
    key: string;                // 键名
    name: string;               // 名称
    expand: Object;
}
