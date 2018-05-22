export class CreateDictDto {
  category: string;
  key: string;
  name: string;
  expand: Object;
}

export class EditDictDto {
  id: string;
  category: string;
  key: string;
  name: string;
  expand: Object;
}

export class DictResponse {
  id: string;
  category: string;
  key: string;
  name: string;
  expand: Object;
}
