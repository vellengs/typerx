import { Document } from 'mongoose';

export interface Article extends Document {
	name: string;				// 页面名称 
}
