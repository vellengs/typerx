
export class ApiResponse {
  id: string;
  name: string;
  method: string;
  path: string;
  version: string;
  description: string;
}

export const ApiResponseFields = [
  'id',
  'name',
  'method',
  'path',
  'version',
  'description'
];

export declare interface PaginateApi {
  error?: Error;
  list: Array<ApiResponse>;
  total: number;
}