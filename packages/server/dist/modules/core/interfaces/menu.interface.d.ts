export interface Menu {
    id: string;
    name: string;
    slug: string;
    group: boolean;
    link: string;
    order: number;
    externalLink: string;
    blank: boolean;
    icon: string;
    badge: string;
    badgeDot: string;
    badgeStatus: string;
    enable: boolean;
    expanded: boolean;
    acl: string;
    paths: any[];
    parent: string | Menu;
    permissions?: any[];
    isMenu: boolean;
}
