import { Appearance, PaginateResponse } from '../../types/appearance';
import { LogResponse, CreateLogDto } from './dto/log.dto';
import { KeyValue } from '../../types/data.types';
export declare class LogService {
    constructor();
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, category?: string, limit?: number): Promise<Array<KeyValue>>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateResponse<Array<LogResponse>>>;
    get(id: string): Promise<LogResponse>;
    static save(entry: CreateLogDto): Promise<LogResponse>;
    private pure(entry);
}
