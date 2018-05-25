import { Appearance, PaginateResponse } from '../../types/appearance';
import { RoleResponse, CreateRoleDto, EditRoleDto } from './dto/role.dto';
import { KeyValue } from '../../types/data.types';
export declare class RoleService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, category?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateRoleDto): Promise<RoleResponse>;
    update(entry: EditRoleDto): Promise<RoleResponse>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<RoleResponse>>>;
    get(id: string): Promise<RoleResponse>;
    remove(id: string): Promise<boolean>;
    private pure(entry);
}
