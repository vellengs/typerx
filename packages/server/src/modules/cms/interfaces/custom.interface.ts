export interface Custom {
  id: string;
  name: string;
  title: string;
  keyword: string;
  category: string;
  description: string;
  author: string;
  sort: number;
  disable: boolean;
  meta: string;
  content: string;
  template: string;
  type: string;
  [key: string]: any;
}
