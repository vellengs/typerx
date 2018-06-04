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

        this.operations = {
            title: '操作',
            width: '180px',
            buttons: [
                {
                    text: '移出',
                    type: 'del',
                    click: (record: any) => {
                        console.log('this:', this);
                        // if (this.accounts) {
                        //     this.accounts.remove(record, false);
                        // }
                    }
                }
            ]
        };

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
            }).subscribe((res) => {
                if (res) {

                    const ids = res.map(a => a.id);
                    this.coreService.accountAddAccountsToRole(this.selectedItem.id, ids).subscribe(() => {
                        this.msg.success('完成');
                    });
                }
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
