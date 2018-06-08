import { Appearance } from '../../types/appearance';
import { LogResponse, CreateLogDto, PaginateLog } from './dto/log.dto';
import { KeyValue } from '../../types/data.types';
export declare class LogService {
    constructor();
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, category?: string, limit?: number): Promise<Array<KeyValue>>;
    query(keyword?: string, page?: number, size?: number, sort?: string): Promise<PaginateLog>;
    get(id: string): Promise<LogResponse>;
    static save(entry: CreateLogDto): Promise<LogResponse>;
    private pure(entry);
}
