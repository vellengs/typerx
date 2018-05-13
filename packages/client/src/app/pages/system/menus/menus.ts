import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent implements OnInit {

    domain = 'menus';
    constructor(public context: ListContext) {

    }

    ngOnInit(): void {
        this.context.init(this.domain);
    }

}
