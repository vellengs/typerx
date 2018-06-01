import { Appearance } from '../../types/appearance';
import { WidgetResponse, EditWidgetDto, CreateWidgetDto, PaginateWidget } from './dto/widget.dto';
import { KeyValue } from '../../types/data.types';
export declare class WidgetService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateWidgetDto): Promise<WidgetResponse>;
    update(entry: EditWidgetDto): Promise<WidgetResponse>;
    query(keyword?: string, isWidget?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateWidget>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<WidgetResponse>;
    private pure(entry);
}
