import { Component, ViewChild, OnInit } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';
import { CoreService } from 'generated';
import * as treeify from 'array-to-tree';
import { StartupService } from '@core/startup/startup.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    searchToggleStatus: boolean;

    constructor(
        public settings: SettingsService,
        public menuService: MenuService,
        public coreService: CoreService,
        public startupService: StartupService,

    ) { }
    async  ngOnInit() {
        // this.menuService.clear();
        // this.startupService.load();
        // this.menuService.clear();
        // const menuData = await this.coreService.menuGetUserMenus().toPromise();
        // if (menuData && Array.isArray(menuData)) {
        //     const menus = menuData.map((item) => {
        //         return {
        //             id: item.id,
        //             text: item.name,
        //             group: item.group,
        //             icon: item.icon,
        //             link: item.link,
        //             parent: item.parent
        //         };
        //     });
        //     const tree = treeify(menus, {
        //         parentProperty: 'parent',
        //         customID: 'id'
        //     });

        //     this.menuService.add([{
        //         text: '主导航',
        //         group: true,
        //         children: tree
        //     }]);
        // }
    }
    toggleCollapsedSidebar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}
