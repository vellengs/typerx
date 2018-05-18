import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';
 
import { BaseListComponent } from '@shared/base/base.list.component';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-pages-page',
    templateUrl: './pages.html',
    styles: []
})
export class PagesPageComponent extends BaseStandComponent implements OnInit {

    cover;
    extra;

    @Input() domain = 'menu';
    
    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        console.log('this router:', this.route.data['value']);
        this.msg.success('hello');
    }

    submit(value: any) {

    }

    addEntry() {

    }
}
