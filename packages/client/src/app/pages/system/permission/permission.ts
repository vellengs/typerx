import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-permission-page',
    templateUrl: './permission.html',
    styles: []
})
export class PermissionPageComponent extends BaseStandComponent implements OnInit {

    url;
    @Input() domain = 'menu';
    title = '接口访问配置';
    selectedItem = {};

    permissions = [];
    _queryParams: { [key: string]: any; } = {};

    set queryParams(val) {
        this._queryParams = val;
    }

    get queryParams() {
        const params = Object.assign({}, {
            isMenu: false
        }, this._queryParams);
        return params;
    }

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
