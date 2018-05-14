import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent implements OnInit {

    domain = 'menu';
    url = `api/menu/query`;
    params = {};

    columns: SimpleTableColumn[] = [
        { title: '编号', index: 'id.value' },
        { title: '头像', type: 'img', width: '50px', index: 'picture.thumbnail' },
        { title: '邮箱', index: 'email' },
        { title: '电话', index: 'phone' },
        { title: '注册时间', type: 'date', index: 'registered' }
    ];

    constructor(public context: ListContext) {

    }

    async ngOnInit() {
        const config = await this.context.init(this.domain);
        console.log('config:', config);
    }

}
