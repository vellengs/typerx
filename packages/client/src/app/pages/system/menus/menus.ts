import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent implements OnInit {



    constructor(public client: _HttpClient) {

    }

    ngOnInit(): void {

    }

}
