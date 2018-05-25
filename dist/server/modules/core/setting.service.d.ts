import { PaginateResponse } from '../../types/appearance';
import { SettingResponse, CreateSettingDto, EditSettingDto } from './dto/setting.dto';
import { KeyValue } from '../../types/data.types';
export declare class SettingService {
    getMainSettings(keys?: string): Promise<Array<SettingResponse>>;
    getSettingsByKey(name: string): Promise<SettingResponse>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateSettingDto): Promise<SettingResponse>;
    update(entry: EditSettingDto): Promise<SettingResponse>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<SettingResponse>>>;
    get(id: string): Promise<SettingResponse>;
    remove(id: string): Promise<boolean>;
    private pure(entry);
}
