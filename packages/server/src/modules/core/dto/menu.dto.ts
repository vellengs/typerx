import { Menu } from "../interfaces/menu.interface";

export interface CreateMenuDto {
  name: string;
  slug: string;
  group: boolean;
  link: string;
  externalLink: string;
  blank: boolean;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string | Menu;
  isMenu: boolean;
}

export interface EditMenuDto {
  id: string;
  name: string;
  slug: string;
  group: boolean;
  link: string;
  externalLink: string;
  blank: boolean;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string | Menu;
  isMenu: boolean;
}

export class MenuResponse {
  id: string;
  name: string;
  slug: string;
  group: boolean;
  link: string;
  externalLink: string;
  blank: boolean;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string | Menu;
  isMenu: boolean;
}

export const MenuResponseFields = [
  'id',
  'name',
  'slug',
  'group',
  'link',
  'externalLink',
  'blank',
  'icon',
  'order',
  'enable',
  'expanded',
  'acl',
  'permissions',
  'parent',
  'isMenu'
];


export declare interface PaginateMenu {
  error?: Error;
  list: Array<MenuResponse>;
  total: number;
}

