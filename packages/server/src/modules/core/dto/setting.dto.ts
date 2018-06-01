export class CreateSettingDto {
  name: string;
  key: string;
  value: any;
  description: string;
}

export class EditSettingDto {
  id: string;
  name: string;
  key: string;
  value: any;
  description: string;
}

export class SettingResponse {
  id: string;
  name: string;
  key: string;
  value: any;
  description: string;
}

export class SettingsGroup {
  [key: string]: string;
}

export const SettingResponseFields = [
  'id',
  'name',
  'key',
  'value',
  'description'
];

export declare interface PaginateSetting {
  error?: Error;
  list: Array<SettingResponse>;
  total: number;
}