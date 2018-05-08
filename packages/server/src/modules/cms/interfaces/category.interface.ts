import { Document } from 'mongoose';

export interface Category extends Document {
	name: string;				// 页面名称 
}
