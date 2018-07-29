import { Appearance } from '../../types/appearance';
import { GroupResponse, EditGroupDto, CreateGroupDto, PaginateGroup } from './dto/group.dto';
import { KeyValue, TreeNode } from '../../types/data.types';
export declare class GroupService {
    getAppearance(): Promise<Appearance>;
    searchTree(keyword?: string, value?: string, limit?: number): Promise<Array<TreeNode>>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateGroupDto): Promise<GroupResponse>;
    update(entry: EditGroupDto): Promise<GroupResponse>;
    query(keyword?: string, isRegion?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateGroup>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<GroupResponse>;
    private pure(entry);
}
