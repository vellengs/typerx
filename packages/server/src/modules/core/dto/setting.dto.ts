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

