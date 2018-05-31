import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';
import { BaseComponent } from '@shared/base/base.component';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories.html',
    styles: []
})
export class CategoriesPageComponent extends BaseStandComponent implements OnInit {

    @Input() domain = 'category';
    configReady;
    queryUrl;

    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.queryUrl = `api/${this.domain}/query`;

        this.onConfigChanged.subscribe((config) => {
            this.configReady = true;
        });
    }

}
