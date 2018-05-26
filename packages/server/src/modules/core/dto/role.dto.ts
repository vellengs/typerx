export class CreateRoleDto {
  name: string;
  description: string;
  permissions: string[];
}

export class EditRoleDto {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export class RoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export const RoleResponseFields = [
  'id',
  'name',
  'description',
  'permissions'
];

export declare interface PaginateRole {
  error?: Error;
  list: Array<RoleResponse>;
  total: number;
}