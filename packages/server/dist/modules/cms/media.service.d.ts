import { Appearance } from '../../types/appearance';
import { MediaResponse, EditMediaDto, CreateMediaDto, PaginateMedia } from './dto/media.dto';
import { KeyValue } from '../../types/data.types';
export declare class MediaService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateMediaDto): Promise<MediaResponse>;
    update(entry: EditMediaDto): Promise<MediaResponse>;
    query(keyword?: string, isMedia?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateMedia>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<MediaResponse>;
    private pure(entry);
}
