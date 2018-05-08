import { Document } from 'mongoose';
export interface Role extends Document {
	name: string;
	role: string;
	description: string;
	permissions: string[];
}
