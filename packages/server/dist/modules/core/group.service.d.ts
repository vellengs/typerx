import { Appearance } from '../../types/appearance';
import { GroupResponse, EditGroupDto, CreateGroupDto, PaginateGroup } from './dto/group.dto';
import { KeyValue } from '../../types/data.types';
export declare class GroupService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateGroupDto): Promise<GroupResponse>;
    update(entry: EditGroupDto): Promise<GroupResponse>;
    query(keyword?: string, isRegion?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateGroup>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<GroupResponse>;
    private pure(entry);
}
