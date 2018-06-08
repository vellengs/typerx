import { Appearance } from "../../types/appearance";
import { KeyValue } from "../../types/data.types";
import { CreatePageDto, PageResponse, EditPageDto, PaginatePage } from "./dto/page.dto";
export declare class PageService {
    getAppearance(): Promise<Appearance>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreatePageDto): Promise<PageResponse>;
    update(entry: EditPageDto): Promise<PageResponse>;
    query(keyword?: string, isMenu?: boolean, page?: number, size?: number, sort?: string): Promise<PaginatePage>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<PageResponse>;
    private pure(entry);
}
