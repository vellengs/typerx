export class CreateRoleDto {
  name: string;
  role: string;
  description: string;
  permissions: string[];
}

export class EditRoleDto {
  id: string;
  name: string;
  role: string;
  description: string;
  permissions: string[];
}

export class RoleResponse {
  id: string;
  name: string;
  role: string;
  description: string;
  permissions: string[];
}

export const RoleResponseFields = [
  'id',
  'role',
  'name',
  'description',
  'permissions'
];