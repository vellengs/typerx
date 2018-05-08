import { Document } from 'mongoose';

export interface Widget extends Document {
	name: string;				// 页面名称 
}
