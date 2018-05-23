import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-roles-page',
    templateUrl: './roles.html',
    styles: []
})
export class RolesPageComponent extends BaseStandComponent implements OnInit {

    url;
    @Input() domain = 'role';
    title = '权限管理';
    selectedItem = {};
    constructor(injector: Injector) {
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

    select(item) {
        this.selectedItem = item;
    }

}
