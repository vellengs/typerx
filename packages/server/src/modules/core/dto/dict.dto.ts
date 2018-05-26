export class CreateDictDto {
  category: string;
  translate: string;
  name: string;
  expand: Object;
}

export class EditDictDto {
  id: string;
  category: string;
  translate: string;
  name: string;
  expand: Object;
}

export class DictResponse {
  id: string;
  category: string;
  name: string;
  translate: string;
  expand: Object;
}

export const DictResponseFields = [
  'id',
  'category',
  'name',
  'translate',
  'expand'
];

export declare interface PaginateDict {
  error?: Error;
  list: Array<DictResponse>;
  total: number;
}