import { Document } from 'mongoose';

export interface Content extends Document {
  text: string;
}
