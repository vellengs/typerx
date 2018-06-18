import { Appearance } from '../../types/appearance';
import { KeyValue } from '../../types/data.types';
import { PaginateApi } from './dto/api.dto';
export declare class ApiService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    addApiPermission(permission: string, apIds: string[]): Promise<boolean>;
    query(keyword?: string, permission?: string, page?: number, size?: number, sort?: string): Promise<PaginateApi>;
}
