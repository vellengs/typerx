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