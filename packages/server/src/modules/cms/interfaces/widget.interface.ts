import { Document } from 'mongoose';

export interface Widget extends Document {
  id: string;
  name: string;
  title: string;
  type: string;
  params: any;
}
