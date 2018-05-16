

import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { CoreService } from 'generated';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {


  constructor(
    public settings: SettingsService,
    public coreService: CoreService,
    public msgSrv: NzMessageService,
    public router: Router,
  ) { }

  logout() {

    this.coreService.userLogout().subscribe(
      (result) => {
        if (result) {
          this.msgSrv.success('成功退出');
          this.router.navigate(['/login']);
        }
      }
    );
  }

  profile() {

  }

  setSettings() {

  }

  changePassword() {

  }
}
