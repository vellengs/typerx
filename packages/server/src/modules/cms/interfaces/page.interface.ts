import { Document } from 'mongoose';

export interface Page extends Document {
	name: string;				// 页面名称 
}
