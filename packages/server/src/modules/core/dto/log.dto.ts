export class CreateLogDto {
  name: string;
  operator: string;
  operatorIp: string;
  operation: string;
  comment: string;
}

export class LogResponse {
  name: string;
  operator: string;
  operatorIp: string;
  operation: string;
  comment: string;
}