import { Document } from 'mongoose';

export interface Category extends Document {
  name: string,
  slug: string,
  order: number,
  parent: string,
  paths: string[],
  description: string
}
