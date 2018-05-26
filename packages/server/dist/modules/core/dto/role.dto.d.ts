export declare class CreateRoleDto {
    name: string;
    description: string;
    permissions: string[];
}
export declare class EditRoleDto {
    id: string;
    name: string;
    description: string;
    permissions: string[];
}
export declare class RoleResponse {
    id: string;
    name: string;
    description: string;
    permissions: string[];
}
export declare const RoleResponseFields: string[];
export interface PaginateRole {
    error?: Error;
    list: Array<RoleResponse>;
    total: number;
}
