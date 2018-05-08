import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam, Context, ServiceContext } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

/**
 * 系统接口.
 */
@Tags('core')
@Path('/')
export class UserController {
    @Context
    context: ServiceContext;

    @POST
    @Path('login')
    async login(userModel: any): Promise<any> {

    }

    @GET
    @Path('profile')
    async profile(): Promise<any> {

    }

    @Path('logout')
    @GET
    async logout(): Promise<any> {
        await this.context.request.logOut();
        return true;
    }

}