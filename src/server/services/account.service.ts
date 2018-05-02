import { PaginateResponse } from 'modex';
import { Account } from '../schemas';
import { Helper } from '../utils/helper';

export class AccountService {

	async getPaged(
		keyword?: string,
		status?: number,
		page?: number,
		size?: number,
		sort?: string): Promise<PaginateResponse<Account[]>> {

		const query: any = keyword ? { name: new RegExp(keyword, 'i') } : {};
		return Helper.getPagedData<Account>('Account', page, size, [], sort, query);
	}
}
