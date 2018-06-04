import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';
import { BaseSelectorComponent } from '@shared/base/base.selector';
import { BaseTreeSelectorComponent } from '@shared/base/base.tree.selector';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-roles-page',
    templateUrl: './roles.html',
    styles: []
})
export class RolesPageComponent extends BaseStandComponent implements OnInit {

    url;
    @Input() domain = 'role';
    title = '权限管理';
    selectedItem: any = {};
    queryParams: any = {};

    @ViewChild('accountList') accounts: BaseStandComponent;

    constructor(
        public userService: UserService,
        injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.url = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {
        });
        this.load();
    }

    addAccount() {

    }

    editPermission() {

    }

    addAccountsToRole() {

        const self = this;
        const columns = this.accounts.columnSets.default;
        this.modalHelper.static(BaseTreeSelectorComponent, {
            queryUrl: this.accounts.queryUrl,
            queryParams: {},
            columns: columns,
            asyncData: () => {
                const ajax = self.userService.treeUsers(true);
                return Observable.fromPromise(ajax);
            }
        }, 'lg', {
                nzTitle: '添加角色成员',
            }).subscribe(() => {

            });
    }

    select(item) {
        this.selectedItem = item;
        this.queryParams = {
            role: item.id
        };
        if (this.accounts) {
            this.accounts.queryParams = this.queryParams;
            this.accounts.reload();
        }
    }

}
