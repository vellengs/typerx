import { GET, Path, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Db } from './../database';
import { Account } from './../schemas';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Tags('base')
@Path('/api/account')
export class AccountController {
    /**
     * 通过姓名获取帐号信息.
     * @param name The name
     */
    @Path(':name')
    @GET
    async getName( @PathParam('name') name: string): Promise<Account> {
        const account: any = await Db.account.findOne({ name: name });
        return account;
    }
}
