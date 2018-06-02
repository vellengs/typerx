import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-logs-page',
    templateUrl: './logs.html',
    styles: []
})
export class LogsPageComponent extends BaseStandComponent implements OnInit {

    @Input() domain = 'log';
    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.queryUrl = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {

        });
        this.load();
    }

}
