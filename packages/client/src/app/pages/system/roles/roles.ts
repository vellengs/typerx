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



    @ViewChild('slaves') slaves: BaseStandComponent;

    constructor(
        public userService: UserService,
        injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.url = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {
        });

        const self = this;

        this.operations = {
            title: '操作',
            width: '180px',
            buttons: [
                {
                    text: '移出',
                    type: 'del',
                    click: (record: any) => {
                        self.coreService.accountRemoveAccountFromRole(this.selectedItem.id, record.id).subscribe(
                            (res) => {
                                if (res) {
                                    self.msg.success('移除成功！');
                                    self.slaves.reload();
                                }
                            }
                        );
                    }
                }
            ]
        };

        this.load();
    }

    addAccount() {

    }

    editPermission(item, $event) {
        $event.preventDefault();
        $event.stopPropagation();

        const self = this;
        this.modalHelper.static(BaseTreeSelectorComponent, {
            showResults: false,
            asyncData: () => {
                const ajax = self.userService.treeMenus();
                return Observable.fromPromise(ajax);
            }
        }, 'lg', {
                nzTitle: '编辑' + item.name + '的权限',
            }).subscribe((res) => {
                if (res) {
                    const ids = res.map(a => a.id);
                    // this.coreService.accountAddAccountsToRole(this.selectedItem.id, ids).subscribe(() => {
                    //     this.msg.success('完成');
                    //     self.slaves.reload();
                    // });
                }
            });

    }

    removeRole(item, $event) {
        this.remove(item);
        $event.preventDefault();
        $event.stopPropagation();
    }

    editRole(item, $event) {
        this.edit(item);
        $event.preventDefault();
        $event.stopPropagation();
    }


    addAccountsToRole() {
        const self = this;
        this.modalHelper.static(BaseTreeSelectorComponent, {
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
                        self.slaves.reload();
                    });
                }
            });
    }

    select(item) {
        this.selectedItem = item;
        this.queryParams = {
            role: item.id
        };
        if (this.slaves) {
            this.slaves.queryParams = this.queryParams;
            this.slaves.reload();
        }
    }

}
