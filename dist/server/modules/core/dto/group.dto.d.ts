export declare class CreateGroupDto {
    outid?: number;
    name: string;
    icon?: string;
    parent?: string;
    paths?: any[];
    director?: string;
    order: number;
    isRegion?: boolean;
    description?: string;
}
export declare class EditGroupDto {
    id: string;
    outid?: number;
    name: string;
    icon?: string;
    parent?: string;
    paths?: any[];
    director?: string;
    order: number;
    isRegion?: boolean;
    description?: string;
}
export declare class GroupResponse {
    id: string;
    outid?: number;
    name: string;
    icon?: string;
    parent?: string;
    paths?: any[];
    director?: string;
    order: number;
    isRegion?: boolean;
    description?: string;
}
export declare const GroupResponseFields: string[];
