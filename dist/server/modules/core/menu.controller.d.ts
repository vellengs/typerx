import { ServiceContext } from 'typescript-rest';
import { MenuService } from './menu.service';
import { Appearance } from '../../types/appearance';
/**
 * 菜单接口.
 */
export declare class MenuController {
    private readonly service;
    context: ServiceContext;
    constructor(service?: MenuService);
    /**
   * 获取帐号管理界面配置信息.
   */
    getConfig(): Promise<Appearance>;
}
