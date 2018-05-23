

import { Component } from '@angular/core';
import { NzMessageService, ModalOptionsForService } from 'ng-zorro-antd';
import { SettingsService, ModalHelper, _HttpClient } from '@delon/theme';
import { CoreService } from 'generated';
import { Router } from '@angular/router';
import { BaseDetailComponent } from '@shared/base/base.detail.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  changePasswordSchema = {
    type: 'object',
    required: ['oldPassword', 'newPassword', 'confirm'],
    properties: {
      oldPassword: {
        type: 'string',
        title: '旧密码',
        ui: {
          type: 'password'
        }
      },
      newPassword: {
        type: 'string',
        title: '新密码',
        ui: {
          type: 'password'
        }
      },
      confirm: {
        type: 'string',
        title: '确认密码',
        ui: {
          type: 'password'
        }
      }
    }
  };


  constructor(
    public settings: SettingsService,
    public coreService: CoreService,
    public msgSrv: NzMessageService,
    public router: Router,
    public modalHelper: ModalHelper,
    public client: _HttpClient,
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
    this.router.navigate(['/system/settings']);
  }

  setSettings() {
    this.router.navigate(['/system/settings']);
  }

  changePassword() {

    const params: ModalOptionsForService = {
      nzTitle: '修改密码',
      nzMaskClosable: false
    };

    this.modalHelper
      .static(BaseDetailComponent, {
        schema: this.changePasswordSchema,
        formData: {},
        onSave: this.save,
        context: this
      }, 420,
        params
      ).subscribe(() => {

      });
    // this.ajax.proxy.ajax({
    //   url: `account/password`,
    //   method: 'PUT',
    //   options: {
    //     body: res.value
    //   }
    // }).subscribe((result) => {
    //   this.msgSrv.success('密码修改成功');
    //   res.dialog.destroy();
    // });
  }

  async save(entry) {
    const url = `api/account/password`;
    if (entry.id) {
      return this.client.put(url, entry).toPromise();
    } else {
      return this.client.post(url, entry).toPromise();
    }
  }


}
