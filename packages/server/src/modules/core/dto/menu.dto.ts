export interface CreateMenuDto {
  name: string;
  slug: string;
  group: string;
  link: string;
  externalLink: string;
  blank: string;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string;
  isMenu: boolean;
}

export interface EditMenuDto {
  id: string;
  name: string;
  slug: string;
  group: string;
  link: string;
  externalLink: string;
  blank: string;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string;
  isMenu: boolean;
}

export class MenuResponse {
  name: string;
  slug: string;
  group: string;
  link: string;
  externalLink: string;
  blank: string;
  icon: string;
  order: number;
  enable: boolean;
  expanded: boolean;
  acl: string;
  permissions?: string[];
  parent?: string;
  isMenu: boolean;
}
