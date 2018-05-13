import {
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  DELETE,
  QueryParam,
  Context,
  ServiceContext,
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { MenuService } from './menu.service';

/**
 * 菜单接口.
 */
@Tags('core')
@Path('/menu')
export class MenuController {
  @Context context: ServiceContext;
  constructor(private readonly service = new MenuService()) { }

  


}
