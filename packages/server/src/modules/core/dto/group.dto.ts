export class CreateGroupDto {
  outid?: number;
  name: string;
  icon?: string;
  parent?: string;
  paths?: any[];
  director?: string
  order: number;
  isRegion?: boolean;
  description?: string;
}

export class EditGroupDto {
  id: string;
  outid?: number;
  name: string;
  icon?: string;
  parent?: string;
  paths?: any[];
  director?: string
  order: number;
  isRegion?: boolean;
  description?: string;
}

export class GroupResponse {
  id: string;
  outid?: number;
  name: string;
  icon?: string;
  parent?: string;
  paths?: any[];
  director?: string
  order: number;
  isRegion?: boolean;
  description?: string;
}

export const GroupResponseFields = [
  'outid',
  'id',
  'name',
  'icon',
  'parent',
  'paths',
  'director',
  'order',
  'isRegion',
  'description'
];


export declare interface PaginateGroup {
  error?: Error;
  list: Array<GroupResponse>;
  total: number;
}