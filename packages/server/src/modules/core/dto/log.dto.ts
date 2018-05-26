export class CreateLogDto {
  name: string;
  operator: string;
  operatorIp: string;
  operation: string;
  comment: string;
}

export class LogResponse {
  id: string;
  name: string;
  operator: string;
  operatorIp: string;
  operation: string;
  comment: string;
  createdAt: Date;
}

export const LogResponseFields = [
  'id',
  'name',
  'operator',
  'operatorIp',
  'operation',
  'comment',
  'createdAt'
];


export declare interface PaginateLog {
  error?: Error;
  list: Array<LogResponse>;
  total: number;
}