import { PaginateResponse } from 'modex';
import { Menu } from '../schemas';
import { Helper } from '../utils/helper';

export class MenuService {


	static async getPagedData(
		keyword?: string,
		status?: number,
		page?: number,
		size?: number,
		sort?: string): Promise<PaginateResponse<Menu[]>> {
		const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};
		
		return Helper.getPagedData<Menu>('Menu', page, size, [], sort, query);
	}
}
